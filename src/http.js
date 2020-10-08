import axios from 'axios';

export class Http {
  static URL = 'http://ergast.com/api/f1';

  static async get(action, limit, offset) {
    try {
      const config = {
        method: 'GET',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      };
      const link = `${Http.URL}/${action}.json?limit=${limit}&offset=${offset}`;
      const response = await axios(link, config);
      return await response.data;
    } catch (ex) {
      throw ex;
    }
  }
}
