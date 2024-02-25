import { json } from '@sveltejs/kit';
import 'dotenv/config';
const nextcloudUsername = process.env.NEXTCLOUD_USERNAME;
const nextcloudPassword = process.env.NEXTCLOUD_PASSWORD;
const nextcloudUrl = process.env.NEXTCLOUD_URL;

import axios from "axios";
export async function GET() {
    let response = await getNextcloudUsers()
    console.log("ussr", response)
    return json(response)
  }


const getNextcloudUsers = async () =>{
    const url = `${nextcloudUrl}/ocs/v1.php/cloud/users/details?format=json`;
  
    const config = {
      headers: {
        'OCS-APIRequest': 'true',
      },
      auth: {
        username: nextcloudUsername,
        password: nextcloudPassword,
      },
      params: {
        groups: "User",
      },
    };
  
    try {
      const response = await axios.get(url, config);
      
      console.log("res", response.data.ocs.data.users)
      
      let usersArray = response.data.ocs.data.users || [];
      console.log(usersArray)
 
      const transformData = (input) => {
        return Object.keys(input).map((key) => {
          return {
            label: input[key].displayname || input[key]['display-name'] || key,
            value: key,
          };
        });
      };
      
      const result = transformData(usersArray);
      console.log(result);
    
      return result
  
    } catch (error) {
      console.error('Error making the request:', error);
      return {
        status: 500,
        body: {
          error: 'Internal Server Error',
        },
      };
    }
  }