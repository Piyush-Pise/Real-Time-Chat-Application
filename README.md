# Real-Time Chat Application

This project is a real-time chat application built using the MERN (MongoDB, Express, React, Node.js) stack and Socket.IO for websocket connections. The application includes features such as authentication and authorization using JWT, the ability to create individual chats and groups, and send real-time messages.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can view a live demo of the project [here](https://real-time-chat-application-frontend-lac.vercel.app/).

## Features

- User authentication and authorization using JWT
- Create individual chats and group chats
- Real-time messaging with Socket.IO
- Responsive design
- User-friendly UI
- Persistent data storage with MongoDB

## Tech Stack

- **Frontend:** HTML, CSS, ReactJS
- **Backend:** Node.js, Express, Mongoose, Socket.IO
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Encryption:** bcrypt

## API Endpoints

### Authentication

- `POST /api/auth/sign-up` - Register a new user
- `POST /api/auth/log-in` - Login a user and get a JWT
- `GET /api/auth/verify-token` - Verify if a JWT is valid or not

## WebSocket Endpoints

### User
- `user's data` - Get user information
- `search users` - Search for users that matches given query

### Chats and Groups

- `create room` - Create a new chat or group

### Messages

- `get messages array for roomId` - Get all messages for a specific chat
- `message form socket` - Send a new message

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
