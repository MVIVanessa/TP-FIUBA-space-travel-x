
# TP Integrador - Intro. al desarrollo de software (2do Cuatrimestre 2024)

Welcome to Space Travel X. Find the best bundles for the space travel of your dreams!

<br/>

## Authors

- [Vanesa Mariani - 112013](https://github.com/MVIVanessa)
- [Gustavo González - 108574](https://github.com/gugob)
- [Eduardo Sosa - 105100](https://github.com/edusosa24)

<br/>

## Requirements

For running this repository you would need node and docker installed on your pc

<br/>

## Backend 

#### How to run?
 To run enter the next commands from the backend directory:

```bash
npm i
touch .env
echo "PORT={port}" >> ".env"  
echo "DATABASE_URL=postgresql://{name}:{password}@localhost:{port}/{database}" >> ".env"
npx prisma generate 
docker compose build
docker compose up db
```
Now you need to open a second terminal to run:
```bash
npx prisma db push
docker compose up backend
```
---
NOTE 1: Replace the variables on {} with your data. You need to change the compose.yaml file to match the info you put on the .env file 

NOTE 2: On Linux you might need to run some commands with sudo. On Windows you need to have docker desktop open

NOTE 3: It's required to have the ports 3000 and 5432 free, both on docker and the local computer
(If needed, you can modify compose.yaml file and Dockerfile to change the ports)

---

The backend will start up at http://localhost:3000


#### After the first time, you only need to run this:

```bash
docker compose up
```

### End Points
####  [Documentation](https://documenter.getpostman.com/view/16394716/2sAYBbd8us)

<br/>

## Frontend

#### How to run?
 To run enter the next commands from the frontend directory:

```bash
docker compose build
docker compose up
```

It's required to have the port 8080 free on the local computer and 80 free on docker.
(If needed, you can modify compose.yaml file and Dockerfile to change the ports).

The frontend will start up at http://localhost:8080

#### After the first time, you only need to run this:

```bash
docker compose up
```
