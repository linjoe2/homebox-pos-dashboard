import axios from 'axios';
// import { redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { loginToHomeBox } from '../auth.js';

import 'dotenv/config';
const homeboxUrl = process.env.HOMEBOX_URL;

let token

export async function GET(data) {
  let start = Date.now()

    let params = new URL(data.url).searchParams;
    let User = params.get("User");
    // let lessen = params.get("lessen");
    // let type = params.get("type")

    let response = await getHomeboxLabels()
    console.log("delay:", Date.now() - start)

  console.log("test", response.data.data.length)
	return json(response.data.data);
}



let getHomeboxLabels = async () => {
      const apiUrl = `${homeboxUrl}/api/v1/labels`;
      if (!!!token) token = await loginToHomeBox();
      const config = {
        headers: {
          'Authorization': token,
        },
      };
    
      try {
        const response = await axios.get(apiUrl, config);
        // Format the response
    
    
        return {data: response};
      } catch (error) {
        // console.error('Error making the request:', error);
        // Handle the error, you may choose to throw it or return a default value
        return null;
      }
};
    // ${homeboxUrl}/api/v1/items?q=&labels=82941d0b-ea1f-480a-a2bb-e394a9f08746&labels=49b7e40a-cac5-4667-a810-e46d4a80e9f0&includeArchived=false&page=1&pageSize=21
  



  
  
  
  
  // async function homeBoxAPI(url, method, data = null) {
  //   const token = await loginToHomeBox();
  
  //   try {
  //       let response = await axios({
  //         method,
  //         url,
  //         data,
  //         headers:  {
  //           'Authorization': token,
  //         }
  //       });
  
  //       return response
  
  //     // get all items and add them to the object
  //   } catch (error) {
  //     console.error('Error making the request:', error);
  //     // Handle the error, you may choose to throw it or return a default value
  //     return {date: "error"};
  //   }
  // }