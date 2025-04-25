## Cities: Interactive Map of Cities and Capitals

Cities is a full-stack web application that allows users to manage and visualize cities and their capitals on an interactive map. The project leverages modern technologies like React, TailwindCSS, Zustand, and Mapbox for the frontend, and NestJS with TypeORM for the backend.

### Features
- **Interactive Map**: Add, edit, and remove city markers on a Mapbox-powered map.
- **City Management**: Create, update, and delete cities with details like name, country, latitude, and longitude.
- **Dynamic Styling**: Customize marker colors dynamically.
- **REST API**: A robust backend API for managing city data.
- **Database Integration**: PostgreSQL database with schema management using TypeORM.

### Tech Stack
- **Frontend**: React, TailwindCSS, Zustand, Vite, Mapbox GL
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Infrastructure**: Docker for database setup

### Getting Started
1. Clone the repository.
2. Set up the database using Docker:
   ```bash
   docker-compose up -d
   ```
3. Start the backend:
   ```bash
   cd server
   npm run dev
   ```
4. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```

### Environment Variables
- **Frontend**: Add a `.env.local` file in the client folder with your Mapbox token:
  ```
  VITE_MAPBOX_TOKEN=<your_mapbox_token>
  ```

### License
This project is licensed under the MIT License.

---

Let me know if you'd like to customize this further!