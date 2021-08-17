<h1> Vaccination Reservation System for COVID 19 </h1>

## Description

- A test project made for  **Homage**.

<br/>

## Project Stack

- Docker
- Postgres
- Express
- NodeJS
  <br/>

### Installation

- install the **[docker](https://docs.docker.com/engine/install/ubuntu/)** and **[docker compose](https://docs.docker.com/compose/install/)**.
  <br/>


## Development
- pull the project,
  ```sh
  $ git clone 
  ```
- get inside to project directory,
  ```sh
  $ cd homage
  ```
- install dependencies
  ```sh
  $ npm install
  ```
- start the project
  ```sh
  $ npm run start
  ```
- start test
  ```sh
  $ npm run test
  ```

## Docker
- in terminal, run this command inside the project directory to start docker. (Wouldn't connect to the internal postgres db because of some network config which needs to be fixed. Please try manual installation with a local postgres db from the .env.example and run the server with npm)

  ```sh
  $ docker-compose build;
  $ docker-compose up;
  ```

- use the following command to stop docker.

  ```sh
  $ docker-compose down;
  ```

- Visit **http://localhost:3000/login** for accessing the web interface.
  <br/>

## Features
- Login, Authentication system for admin users. For the demo, use seeded user:
    - email: rifatbinreza@gmail.com
    - password: Test1234
- Create vaccination centres, nurses and patients. Add schedule for vaccination center based on nurses schedule
- Simple authentication for patients to view and create their own bookings. Visit this route for booking: **http://localhost:3000/bookings**
- Patients can view, delete, book vaccination slots from their desired centres and time.
- Patients can book only two slots
- Central loggin system to keep track of all the server logs


## TODO
- Add delete logic for centres, nurses, patients etc which will require in depth business logic.
- Add schema validation for all the requests
- Add update logic for all the entities
- Validate request for datetime so that situation like, start time is greater than end time doesn't happen.
- Add Redis cache to store the calculated slots so that we don't have to calculate the slots every time. Then simply maintain the slots as key and bookings as value and update them when there's a new booking or a booking is deleted. It will make the API very fast.
- Validate nurses schedule so that they can't be scheduled at the same time in different centres or the same centre.
- Create test cases
- Fix docker-compose network issue to connect to localhost

## Note
The goal of this assignment for me is to show the way I design and architect my projects rather than showing a fully completed one. That's why I mention the TODOs so that the project progress is known. Please refer to this video for a demo: **https://youtu.be/AVNXh5sjxaI**
