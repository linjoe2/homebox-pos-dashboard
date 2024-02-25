
import axios from 'axios';
import 'dotenv/config';

const homeboxUsername = process.env.HOMEBOX_USERNAME;
const homeboxPassword = process.env.HOMEBOX_PASSWORD;
const homeboxUrl = process.env.HOMEBOX_URL;

export const loginToHomeBox = async () => {
    const apiUrl = `${homeboxUrl}/api/v1/users/login`;
    const requestBody = {
      username: homeboxUsername,
      password: homeboxPassword,
    };
    console.log(requestBody)
  
    try {
      const response = await axios.post(apiUrl, requestBody);
      // Assuming the response is in JSON format
      
      return response.data.token;
    } catch (error) {
      console.error('Error making the request:', error);
      // Handle the error, you may choose to throw it or return a default value
      return null;
    }
  };
  
  
  