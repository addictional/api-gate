import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  FlightSearchResponse,
  FlightsEntity,
  FlightListItem,
  FlightListItemFlights,
  FeaturesEntity,
  DataEntity,
  References,
  AirlinesEntity,
} from '../dto';

interface GroupCollectionEntity {
  groupIndex: number;
  flights: FlightsEntity[];
  prices: number[];
  baggage: { value: number; content: string } | null;
  isExchangeable: boolean | null;
  isRefundable: boolean | null;
  features: FeaturesEntity[];
}

@Injectable()
export class FlightSearchNormalizer {
  private groupCollection: GroupCollectionEntity[] = [];
  private airlineReferencesCollection: Map<string, AirlinesEntity> = new Map();

  private setGroupCollection(data: DataEntity[]) {
    this.groupCollection = [];
    data.forEach((item) => {
      const feature = item.features.find(
        (feature) => feature.type === 'Baggage',
      );
      const baggage = feature
        ? { value: feature.value, content: feature.content }
        : null;
      if (item.groups.length === 1) {
        this.groupCollection.push({
          groupIndex: item.index,
          flights: item.groups[0].flights,
          prices: item.prices,

          isExchangeable: item.isExchangeable,
          isRefundable: item.isRefundable,
          features: item.features,
          baggage,
        });
      } else {
        item.groups[0].flights.forEach((itm) => {
          item.groups[1].flights.forEach((itm2) => {
            this.groupCollection.push({
              groupIndex: item.index,
              flights: [itm, itm2],
              prices: item.prices,

              isExchangeable: item.isExchangeable,
              isRefundable: item.isRefundable,
              baggage,
              features: item.features,
            });
          });
        });
      }
    });
  }

  private setAirlineReferencesCollection(references: References) {
    this.airlineReferencesCollection.clear();
    references.Airlines.forEach((airline) =>
      this.airlineReferencesCollection.set(airline.code, airline),
    );
  }

  private getAirlineInfo(group: GroupCollectionEntity) {
    return Array.from(
      new Set(
        group.flights.reduce(
          (acc, x) => [
            ...acc,
            ...x.segments.map((segment) =>
              this.airlineReferencesCollection.get(segment.airlineCode),
            ),
          ],
          [] as AirlinesEntity[],
        ),
      ),
    );
  }

  transformResponse(response: FlightSearchResponse, oneWay: boolean) {
    this.setGroupCollection(response.data);
    this.setAirlineReferencesCollection(response.references);

    const tickets: FlightListItem[] = [];
    this.groupCollection.forEach((group) => {
      const airlinesInfo = this.getAirlineInfo(group);

      if (oneWay) {
        group.flights.forEach((flight) => {
          const from = flight.segments[0].from;
          const to = flight.segments[flight.segments.length - 1].to;

          tickets.push({
            features: group.features as any,
            airlinesInfo,
            id: uuid(),
            groupIndex: group.groupIndex,
            isExchangeable: group.isExchangeable,
            isRefundable: group.isRefundable,
            flights: [
              {
                index: flight.index,
                stops: flight.stops,
                duration: flight.duration,
                from,
                to,
                segments: flight.segments.map((segment) => {
                  const marketingAirline = this.airlineReferencesCollection.get(
                    segment.airlineCode,
                  );
                  const operatingAirline = this.airlineReferencesCollection.get(
                    segment.operatingAirlineCode,
                  );
                  return {
                    ...segment,
                    airlineInfo: {
                      ...marketingAirline[segment.airlineCode],
                      operatingAirlineCode: segment.operatingAirlineCode,
                      operatingAirlineName: operatingAirline.name,
                    },
                  };
                }),
              },
            ],
            prices: group.prices,
            baggage: group.baggage,
            searchId: response.responseId || '',
          });
        });
      } else {
        const flights: FlightListItemFlights = [];

        group.flights.forEach((flight) => {
          const from = flight.segments[0].from;
          const to = flight.segments[flight.segments.length - 1].to;

          flights.push({
            index: flight.index,
            stops: flight.stops,
            duration: flight.duration,
            from,
            to,
            segments: flight.segments.map((segment) => {
              const marketingAirline = this.airlineReferencesCollection.get(
                segment.airlineCode,
              );
              const operatingAirline = this.airlineReferencesCollection.get(
                segment.operatingAirlineCode,
              );
              return {
                ...segment,
                airlineInfo: {
                  ...marketingAirline[segment.airlineCode],
                  operatingAirlineCode: segment.operatingAirlineCode,
                  operatingAirlineName: operatingAirline.name,
                },
              };
            }),
          });
        });

        tickets.push({
          features: group.features as any,
          airlinesInfo,
          groupIndex: group.groupIndex,
          id: uuid(),
          flights: flights,
          isExchangeable: group.isExchangeable,
          isRefundable: group.isRefundable,
          prices: group.prices,
          baggage: group.baggage,
          searchId: response.responseId || '',
        });
      }
    });

    this.groupCollection = [];
    this.airlineReferencesCollection.clear();

    return {
      flightsList: {
        items: tickets,
        notFilteredItems: tickets,
      },
    };
  }
}
