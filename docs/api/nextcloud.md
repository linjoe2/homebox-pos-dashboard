### Function: `getNextcloudUsers`

#### Description:

This asynchronous function retrieves user details from a Nextcloud server and transforms the data into a simplified format.

#### Parameters:

- None

#### Usage:

javascriptCopy code

`const users = await getNextcloudUsers(); console.log(users);`

#### Example:

javascriptCopy code

`// Import the function import { getNextcloudUsers } from './your-file-path';  // Call the function and log the result (async () => {   try {     const users = await getNextcloudUsers();     console.log('Nextcloud Users:', users);   } catch (error) {     console.error('Error:', error);   } })();`

#### Details:

- **URL:** '[https://team.mediawegwijs.nl/ocs/v1.php/cloud/users/details?format=json](https://team.mediawegwijs.nl/ocs/v1.php/cloud/users/details?format=json)'
- **Headers:**
    - `'OCS-APIRequest': 'true'`
- **Authentication:**
    - Username: 'materialen'
    - Password: 'LeaveSaleSwedenImportance'
- **Parameters:**
    - `groups: "User"`
- The function uses the Axios library to make an HTTP GET request to the specified Nextcloud server.

#### Return Value:

The function returns an array of objects representing Nextcloud users. Each object contains a `label` and a `value`, extracted from the user details.

#### Error Handling:

If an error occurs during the HTTP request, the function logs the error and returns an object with a status code of 500 and an error message.