export interface GeoIpLiteResponse {
  rangeLow: number;
  rangeHigh: number;
  country: string;
  region: string;
  eu: string;
  timezone: string;
  city: string;
  lat: number;
  lon: number;
  metro: number;
  area: number;
}

export interface IpApiResponse {
  status?: string | null;
  message?: string | null;
  continent?: string | null;
  continentCode?: string | null;
  country?: string | null;
  countryCode?: string | null;
  region?: string | null;
  regionName?: string | null;
  city?: string | null;
  district?: string | null;
  zip?: string | null;
  lat?: string | null;
  lon?: string | null;
  timezone?: string | null;
  offset?: string | null;
  currency?: string | null;
  isp?: string | null;
  org?: string | null;
  as?: string | null;
  asname?: string | null;
  reverse?: string | null;
  mobile?: string | null;
  proxy?: string | null;
  hosting?: string | null;
  query?: string | null;
}

export interface GeoData {
  ip?: string | null;
  origin?: string | null;
  line?: string | null;
  geoIp?: GeoIpLiteResponse | null;
  ipApi?: IpApiResponse | null;
}
