const axios = require('axios');

const DataBaseURL = Bun.env.DATABASE_URL

export async function search(data:string) {

    try {
      const response = await axios.post(DataBaseURL+'/search', {
        query:data
      });
      console.log('Response:', response.data);
      return response.data
    } catch (error) {
      console.error('Error:', error.message);
    }
  }