# SocialSphere - MERN Project

SocialConnect is a dynamic MERN (MongoDB, Express.js, React, Node.js) project that fosters an interactive and engaging online community. It encompasses a wide range of features to enhance user interactions and provide a seamless experience.

## Features

- **Follow/Unfollow:** Users can connect with each other by following or unfollowing profiles.
- **Posts and Likes:** Users can create posts and engage with them by liking.
- **Light/Dark Theme:** Users can choose between light and dark themes based on their preference.
- **Search User:** Users can easily discover and connect with others using the search functionality.
- **Real-Time Chat:** Implemented a real-time chat feature using Socket.IO, enabling users to chat instantly.

## Installation and Setup

### Frontend
1. Clone `https://github.com/vishwas031/social-sphere-frontend.git` to your local machine.
2. Navigate to the project directory: `cd social-sphere-frontend`.
3. Run `npm install` to install client-side dependencies.
4. Create `.env` file in the social-sphere-frontend directory and add the following environment variables :

 ```
 REACT_APP_BACKEND_URL=BACKEND_URL
 ```
5. Run the client: run `npm start`
    
### Backend
  1. Clone `https://github.com/vishwas031/social-sphere-backend.git` to your local machine.
  2. Navigate to the project directory: `cd social-sphere-backend`.
  3. Run `npm install` to install server-side dependencies.
  4. Create `.env` file in the social-sphere-backend directory and add the following environment variables :

  ```
  MONGO_URI=YOUR_MONGO_URI
  PORT=PORT_FOR_FRONTEND
  JWT_SECRET=JWT_SECRET
  ```
5. Run the server: run `npm start`

### Socket.io Server
  1. Clone `https://github.com/vishwas031/mySocket.git` to your local machine.
  2. Navigate to the project directory: `cd mySocket`.
  3. Run `npm install` to install server-side dependencies.
  4. Create `.env` file in the mySocket directory and add the following environment variables :

  ```
  FRONTEND_URL=FRONTEND_URL
  ```
5. Run the socket server: run `npm start`

## Screenshots
