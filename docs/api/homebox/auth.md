### Function: `loginToHomeBox`

#### Description:

This asynchronous function performs user authentication to a HomeBox API by sending a POST request with the provided credentials and returns the authentication token.

#### Parameters:

- None

#### Usage:

javascriptCopy code

`const authToken = await loginToHomeBox(); console.log(authToken);`

#### Example:

javascriptCopy code

`// Import the function import { loginToHomeBox } from './your-file-path';  // Call the function and log the authentication token (async () => {   try {     const authToken = await loginToHomeBox();     console.log('Authentication Token:', authToken);   } catch (error) {     console.error('Error:', error);   } })();`

#### Details:

- **API URL:** '[https://materialen.mediawegwijs.nl/api/v1/users/login](https://materialen.mediawegwijs.nl/api/v1/users/login)'
- **Request Body:**
    - `username: 'materialen@team.mediawegwijs.nl'`
    - `password: 'PatrickOpenIraqConference'`
- The function uses the Axios library to make an HTTP POST request to the specified HomeBox API for user authentication.

#### Return Value:

The function returns the authentication token obtained from the API response.

#### Error Handling:

If an error occurs during the HTTP request, the function logs the error and returns `null`. You may customize the error handling based on your requirements.