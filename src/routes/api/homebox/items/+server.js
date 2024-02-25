import axios from 'axios';
import { redirect } from '@sveltejs/kit';
import {json} from '@sveltejs/kit'
import {loginToHomeBox} from "../auth"
let token


import 'dotenv/config';
const homeboxUrl = process.env.HOMEBOX_URL;


export async function GET(data) {
    let start = Date.now()
    let params = new URL(data.url).searchParams;
    let id = params.get("id");
    let user = params.get("user");
    let label = {id, user}

    let response = await getHomeboxItems(label)
    console.log("delay:", Date.now() - start)
    // console.log(response)
	return json(response);
}


export async function POST({ request, cookies }) {
	const req = await request.json();
  postHomeboxItems(req)


	return json({}, { status: 201 });
}




const getHomeboxItems = async (label) => {
    let params = ''
    console.log("user",label.user)

    if(!!label.user){
      params += `&fields=User%3D${label.user}`

    }

    if(!!label.id){
      params += `&labels=${label.id}`

    }
    console.log("params", params)
  
    const apiUrl = `${homeboxUrl}/api/v1/items?${params}`;
    console.log("api", apiUrl)
    const response = await homeBoxAPI(apiUrl, 'get')
    let items = response.data?.items || []
    console.log(items)


   
  
    return items ;
    
  };


  const postHomeboxItems = async (Items) => {

    console.log("Items", Items)

    for (let i = 0; i < Items.length; i++) {
      let type = Items[i].type
      let user = Items[i].user
      let status = Items[i].status
      let statusDescription = Items[i].statusDescription
      console.log(type)
      console.log(user)
      if(type == "bank" && !!user || type == "bag" && !!user || type == "return") {
        let req = await homeBoxAPI(`${homeboxUrl}/api/v1/items/${Items[i].id}`, "GET")
        let Item = req.data


        
        Item.updatedAt = new Date(Date.now()).toISOString()
        Item = await addUser(Item, user, type)
        Item = await addStatus(Item, status,statusDescription,user)
        Item.labelIds = Item.labels.map(l => l.id);
        Item.locationId = Item.location.id;
        
        await homeBoxAPI(`${homeboxUrl}/api/v1/items/${Item.id}`, "PUT", Item)
      }
      // PUT ${homeboxUrl}/api/v1/items/${Item.id}
    }




    
  };

  const addStatus = async(Item, status, statusDescription, user) => {
    console.log(status)
    if (status === 'kapot') {
      // Check if the defect label already exists
      const defectLabelExists = Item.labels.some(label => label.name === '!Defect') || false;
      
      // Add defect label if it doesn't exist
      if (!defectLabelExists) {
        Item.labels.push({
          id: '67b45764-5bf6-4e03-bd9f-29802d83deb4',
          name: '!Defect',
          description: ''
        });
      }
    } else if (status === 'anders') {
      // Check if the anders label already exists
      const andersLabelExists = Item.labels.some(label => label.name === '!Anders') || false;
      
      // Add anders label if it doesn't exist
      if (!andersLabelExists) {
        Item.labels.push({
          id: '82c0793b-8bf5-489f-85c5-5bfffbf99090',
          name: '!Anders',
          description: ''
        });
      }
    } else if (status === 'bijvullen') {
      // Check if the bijvullen label already exists
      const bijvullenLabelExists = Item.labels.some(label => label.name === '!Bijvullen') || false;
      
      // Add bijvullen label if it doesn't exist
      if (!bijvullenLabelExists) {
        Item.labels.push({
          id: '1b4bc96c-6e34-468c-a8d6-4e5b66ac379b',
          name: '!Bijvullen',
          description: ''
        });
      }
    } else if (status === 'in orde') {
      // Remove labels for bijvullen, anders, and defect
      Item.labels = Item.labels.filter(label => !['!Bijvullen', '!Anders', '!Defect'].includes(label.name));
    }
    const field ={  
      "id": null,
      "name": "status",
      "type": "text",
      "textValue": `${user}: ${statusDescription}`,
      "numberValue": 0,
      "booleanValue": false,
      "timeValue": null
}
    let statusExists = false
    if(Item.fields) {
      for (let i = 0; i < Item.fields.length; i++) {
        const element = Item.fields[i];
        if(element.name == "status") {
          statusExists = true
          element.textValue = `${user}: ${statusDescription}`
        }
      }
      if(!statusExists) {
        Item.fields.push(field);
      }
    } else {
      Item.fields = [field];   
    }


    return Item
  }


  const addUser = async(item, username) => {
    let UserExists = false
    const field ={  
      "id": null,
      "name": "User",
      "type": "text",
      "textValue": username,
      "numberValue": 0,
      "booleanValue": false,
      "timeValue": null
}
  if(item.fields) {
    for (let i = 0; i < item.fields.length; i++) {
      const element = item.fields[i];
      if(element.name == "User") {
        UserExists = true
        element.textValue = username
      }
    }
    if(!UserExists) {
      item.fields.push(field);
    }
  } else {
    item.fields = [field];   
  }
      return item
  }


 



  
  
  
  async function homeBoxAPI(url, method, data = null) {
    if (!!!token) token = await loginToHomeBox();

  
    try {
        let response = await axios({
          method,
          url,
          data,
          headers:  {
            'Authorization': token,
          }
        });
  
        return response
  
      // get all items and add them to the object
    } catch (error) {
      console.error('Error making the request:', error);
      // Handle the error, you may choose to throw it or return a default value
      return {date: "error"};
    }
  }