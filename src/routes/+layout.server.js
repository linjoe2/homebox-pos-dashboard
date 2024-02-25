import axios from 'axios';



export const load = async () => {
  let Users = {}//await getNextcloudUsers()
  let lessen = []//await getHomeboxLabels()
  // let formattedData = lessen?.data.data.map(item => ({
  //   label: item.name,
  //   value: item.id,
  //   description: item.description
  // }));
  return {
    body: {
      Users,
      lessen
    },
  };
}



