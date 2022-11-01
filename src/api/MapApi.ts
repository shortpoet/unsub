import { GmailMessageDTO } from '../types/messageDTO';
import { Api } from './Api';
import { IApiConfig } from './IApi';

export class MapApi extends Api {
  constructor(config: IApiConfig) {
    super(config);
  }

  public async getGeodata(params?: any): Promise<any> {
    params = { fetchCount: 10, ...params };
    // try {
    //   let geoData: GmailMessageDTO[] = [];
    //   messages = (await this.get(`/api/map/get`, params))
    //     ?.data as GmailMessageDTO[];
    // } catch (error) {
    //   console.log('MapApi.getGeodata error', error);
    //   return error;
    // }
  }
}

const parseGeoData = (data: GmailMessageDTO[]) => {
  return data.map((message: GmailMessageDTO) => {
    const { geoData } = message;
    if (geoData) {
      if (geoData?.length > 0) {
        const { ip, ipApi, geoIp } = geoData[0];
        if (ipApi) {
          const { lon, lat } = ipApi;
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lon, lat]
            },
            properties: {
              ip: ip,
              ipApi: ipApi,
              geoIp: geoIp,
              message: message,
              status: message.status
            }
          };
        } else if (geoIp) {
          const { lat, lon } = geoIp;
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lon, lat]
            },
            properties: {
              ip: ip,
              ipApi: ipApi,
              geoIp: geoIp,
              message: message,
              status: message.status
            }
          };
        } else {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0]
            },
            properties: {
              ip: ip,
              ipApi: ipApi,
              geoIp: geoIp,
              message: message,
              status: message.status
            }
          };
        }
      } else {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0]
          },
          properties: {
            ip: '',
            ipApi: undefined,
            geoIp: undefined,
            message: message,
            status: message.status
          }
        };
      }
    } else {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        properties: {
          ip: '',
          ipApi: undefined,
          geoIp: undefined,
          message: message,
          status: message.status
        }
      };
    }
  });
  // .reduce(
  //   (acc, curr) => {
  //     if (curr.properties.status === 'HAS_DATA') {
  //       acc.hasData++;
  //     } else if (curr.properties.status === 'HAS_UNSUB_LINK') {
  //       acc.hasUnsub++;
  //     } else if (curr.properties.status === 'HAS_BOTH') {
  //       acc.hasBoth++;
  //     } else if (curr.properties.status === 'HAS_MAILTO') {
  //       acc.hasMailto++;
  //     } else if (curr.properties.status === '--> HAS_MANY_LINKS <--') {
  //       acc.hasManyLinks++;
  //     }
  //     return acc;
  //   },
  //   { hasData: 0, hasUnsub: 0, hasMailto: 0, hasManyLinks: 0, hasBoth: 0 }
  // );
};
