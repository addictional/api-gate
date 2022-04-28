export interface FlightSearchResponse {
  request: Request;
  data?: DataEntity[] | null;
  references: References;
  responseId: string;
  errors?: null;
}
export interface Request {
  route?: RouteEntity[] | null;
  passengers: Passengers;
  class: string;
  directOnly: boolean;
}
export interface RouteEntity {
  index: number;
  from: string;
  to: string;
  date: string;
}
export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}
export interface DataEntity {
  index: number;
  airlines: string;
  airlinesCode: string;
  serviceClass: string;
  prices?: number[] | null;
  price: Price;
  groups?: GroupsEntity[] | null;
  features?: FeaturesEntity[] | null;
  isRefundable: boolean;
  isExchangeable?: null;
}
export interface Price {
  total: TotalOrMarkup;
  markup: TotalOrMarkup;
}
export interface TotalOrMarkup {
  amount: number;
  currency: string;
}
export interface GroupsEntity {
  index: number;
  stopsCount: number;
  flights?: FlightsEntity[] | null;
}
export interface FlightsEntity {
  index: number;
  time: string;
  minAvailSeats: number;
  segments?: SegmentsEntity[] | null;
  stops?: (StopsEntity | null)[] | null;
  duration: number;
  transitVisaInfo?: null;
}
export interface SegmentsEntity {
  index: number;
  fareFamilyFeature?: null;
  techLandings?: null[] | null;
  duration: number;
  luggage: Luggage;
  flightNo: string;
  airplane: string;
  airline: string;
  operatingAirlineCode: string;
  airlineCode: string;
  from: FromOrTo;
  to: FromOrTo;
  fromDate: string;
  fromTime: string;
  toDate: string;
  toTime: string;
  time: string;
  flightClass: string;
  fareBasis: string;
  availSeats: number;
  classCode: string;
  fareFamily: string;
}
export interface Luggage {
  unit: string;
  value: number;
}
export interface FromOrTo {
  code: string;
  airport: string;
  city: string;
  country: string;
  terminal: string;
}
export interface StopsEntity {
  city: City;
  time: string;
  duration: number;
}
export interface City {
  code: string;
  airport: string;
  city: string;
  country: string;
}
export interface FeaturesEntity {
  content: string;
  style: string;
  type: string;
  order: number;
  value?: number | null;
}
export interface References {
  Airlines?: AirlinesEntity[] | null;
  DepartureCountry: DepartureCountryOrArrivalCountryOrDepartureCityOrArrivalCity;
  ArrivalCountry: DepartureCountryOrArrivalCountryOrDepartureCityOrArrivalCity;
  DepartureCity: DepartureCountryOrArrivalCountryOrDepartureCityOrArrivalCity;
  ArrivalCity: DepartureCountryOrArrivalCountryOrDepartureCityOrArrivalCity;
  Timetable?: TimetableEntity[] | null;
  TopAirlines?: null;
}
export interface AirlinesEntity {
  code: string;
  name: string;
  logoUrl: string;
}
export interface DepartureCountryOrArrivalCountryOrDepartureCityOrArrivalCity {
  nameRu: string;
  nameEn: string;
  code: string;
}
export interface TimetableEntity {
  values?: ValuesEntity[] | null;
  operationalDay: string;
}
export interface ValuesEntity {
  price: number;
  operationalDay: string;
}

export interface FlightListItem {
  groupIndex: number;
  flights: any;
  baggage: { value: number; content: string } | null;
  id: string;
  airlinesInfo: AirlinesEntity[];
  prices: number[];
  airGds?: string;
  isActive?: boolean;
  searchId: string;
  isExchangeable: boolean | null;
  isRefundable: boolean | null;
  features: {
    content: string;
    style: string;
    type: string;
    order: number;
    value: number | null;
  }[];
}

export type FlightListItemFlights = {
  index: number;
  from: any;
  to: any;
  segments: any[];
  stops: any[];
  duration: number;
}[];
