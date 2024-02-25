const axios = require('axios');

const url = 'https://team.mediawegwijs.nl/ocs/v1.php/cloud/users?format=json';
const username = 'materialen';
const password = 'LeaveSaleSwedenImportance';
const groups = 'Users';

const config = {
  headers: {
    'OCS-APIRequest': 'true',
  },
  auth: {
    username: username,
    password: password,
  },
  params: {
    groups: groups,
  },
};




export const load = async () => {
  axios.get(url, config)
    .then(response => {
      const xml2js = require('xml2js');
      const parser = new xml2js.Parser();

      parser.parseString(response.data, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          return;
        }

        console.log("users", result.ocs.data[0].users)

        const usersArray = result.ocs.data[0].users[0].element.map(user => user);

        console.log(JSON.stringify(usersArray));
        return usersArray
      });
    })
    .catch(error => {
      console.error('Error making the request:', error);
    });}