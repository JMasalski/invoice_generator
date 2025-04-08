# Billify App

![React](https://img.shields.io/badge/React-blue?style=flat-square&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-gray?style=flat-square&logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-gray?style=flat-square&logo=node.js)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-blueviolet?style=flat-square)
![Express](https://img.shields.io/badge/Express-lightgrey?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=flat-square&logo=mongodb)

An application for managing invoices, allowing users to create, edit, download invoices in PDF format, and manage clients. The system is adapted for Polish tax regulations, including Polish NIP (tax identification number) validation.

## Features

- **User Authentication**: Registration, login, logout, profile updates.
- **Client Management**: Add, edit, and delete clients.
- **Invoices**: Create invoices and download them in PDF format.
- **Data Validation**: Handling of correct data formats (e.g., IBAN, Polish NIP).
- **Responsive Interface**: User-friendly design.

## Technologies

- **Frontend**: React, Zustand, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: Axios, React Hot Toast, Lucide Icons

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Configure the .env file in the server directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=your_port
   ```

5. Run the application:
    * Server:
      ```bash
      cd server
      npm run dev
      ```
    * Client:
      ```bash
      cd client
      npm run dev
      ```
## Dashboard
![Dashboard](./screenshots/dashboard.png)

## Invoice Example
![Invoice](./screenshots/invoice.png)

## Author

Project created by Jakub Masalski

## License

This project is licensed under the MIT License. See the LICENSE file for details.