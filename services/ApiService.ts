import { API_URL } from '../config';
import { Purchase } from '../types/Purchase';

export default {
    getItem: async (itemId: string) => {
        let response;
        try {
          response = await fetch(`${API_URL}/items/${itemId}`, {
            method: 'GET',
          });
        } catch(e) {
          throw 'A server error has occurred !';
        }

        const data = await response.json();

        if ( !response.ok ) {
            throw 'Server send not ok !';
        } 

        return data;
    },
    getPurchaseHistory: async (customerId: number) => {
      let response;
      try {
        response = await fetch(`${API_URL}/payments/${customerId}`, {
          method: 'GET',
        });
      } catch(e) {
        throw 'A server error has occurred !';
      }

      const data = await response.json();

      if ( !response.ok ) {
          throw 'Server send not ok !';
      } 

      return data.filter((purchase: Purchase) => purchase.is_checked);
    }
};