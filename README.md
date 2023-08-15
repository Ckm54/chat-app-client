# Chat App

A real-time chat application built using React, TypeScript, Node.js, MongoDB, and Socket.io. Users can create accounts, log in, start conversations, log out, and find have all their chats persisted in a mmongodb database.

### Backend repo:
[Chat app backend](https://github.com/Ckm54/chat-backend)

## Screenshot

![Screenshot](/public/images/chats.png)

## Features

- User Authentication:
  
     - Users can create accounts, log in, and log out.
- Real-Time Chat:
  
     - Users can start conversations and exchange messages in real-time using Socket.io.
- Data Persistence:
  
     - All chats are stored in a MongoDB database, ensuring conversations are intact even after logging out.
- React and TypeScript:
  
     - The frontend is built with React and TypeScript for type safety and maintainability.
- Node.js Backend:
  
     - The backend server is built using Node.js, providing a foundation for handling user authentication and real-time messaging as well as type safety with typescript.

## Getting Started
Prerequisites

    Node.js and npm installed on your machine.
    A MongoDB database instance for storing user accounts and chat messages.

Installation

    Clone the repository:

    bash

git clone https://github.com/Ckm54/chat-app-client.git

Navigate to the project directory:

bash

cd chat-app-client

Install dependencies for both the server and the client:

bash
   yarn

Set up environment variables:

    Rename .env.example in the root directory to .env and fill in the required values.

Start the client:

bash

    # In the root directory
    yarn dev

    Open your browser and go to http://localhost:5173 to use the app.

## Technologies Used

    React
    TypeScript
    Node.js
    Express.js
    MongoDB
    Socket.io
    HTML5, CSS3
    Tailwindcss

## Future Enhancements

    Group chat functionality
    Message history and pagination
    Profile pictures and user profiles
    Emojis and file sharing

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT License.
