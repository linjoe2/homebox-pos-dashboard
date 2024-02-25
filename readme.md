# HomeBox POS Dashboard

The HomeBox POS Dashboard is a web-based tool that provides a Point-of-Sale (POS) interface for managing items within the HomeBox system. This dashboard allows users to rent and return items, as well as update the state of items to indicate whether they are broken, need refilling, or have other status changes.

## Features

- **Rent Items:** Easily rent items from the HomeBox inventory with a simple and intuitive interface.
    
- **Return Items:** Streamlined process for returning items to the HomeBox system.
    
- **Status Updates:** Quickly update the state of items to reflect their condition, such as 'broken,' 'refill needed,' or 'other.'
    
- **User Management:** Retrieve and manage user information from Nextcloud for a personalized experience.
    

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A HomeBox API key for authentication.

### Installation

1. Clone the repository:
    
    bashCopy code
    
    `git clone https://github.com/your-username/homebox-pos-dashboard.git`
    
2. Navigate to the project folder:
    
    bashCopy code
    
    `cd homebox-pos-dashboard`
    
3. Install dependencies:
    
    bashCopy code
    
    `npm install`
    
4. Create a `.env` file in the project root and add your HomeBox API key:
    
    envCopy code
    
    `VITE_HOMEBOX_API_KEY=your-api-key`
5.  Configure Nextcloud integration by updating the `.env` file:

	envCopy code
```
NEXTCLOUD_API_URL=https://your-nextcloud-instance.com NEXTCLOUD_API_USERNAME=your-nextcloud-username 
NEXTCLOUD_API_PASSWORD=your-nextcloud-password`
```
    

### Usage

1. Start the development server:
    
    bashCopy code
    
    `npm run dev`
    
2. Open your browser and go to http://localhost:5000 to access the HomeBox POS Dashboard.
    

## Configuration

The `.env` file in the project root is used for configuring the HomeBox API key. Update this file if necessary.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](https://chat.openai.com/c/CONTRIBUTING.md) for details on the development process.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to [Svelte](https://svelte.dev/), Nextcloud and Homebox for making the development of this dashboard smooth and enjoyable.
