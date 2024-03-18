# Delivery report Service

This service allows us to report late orders with the ability to file late requests for delayed orders to be reviewed by someone.

### This service has three routes that include

#### 1. Record Delay Request
- **Description**: This route allows users to record delays and add them to the review queue for further processing.
- **Endpoint**: `/orders/:orderId/delay`
- **HTTP Method**: POST

#### 2. Support Request Pickup
- **Description**: This route enables support agents to pick up requests from the review queue for resolution.
- **Endpoint**: `/orders/:orderId/assign-employee`
- **HTTP Method**: POST

#### 3. Weekly Delay Report
- **Description**: This route generates a weekly report of delays for all stores.
- **Endpoint**: `/vendors/reports/weekly`
- **HTTP Method**: GET

## Installation
- Clone the project somewhere

- Build your env file according to the requirements stated in the env.example file

- Install the required packages for the project:
```bash
npm install
```

- Create a suitable production output from the project:
```bash
npm run build
```

- Create the config.json file to create databases using sequelize-cli at the config/config.json address:
```json
{
    "development": {
        "username": "postgres",
        "password": "password",
        "database": "myDatabase",
        "host": "postgres",
        "dialect": "postgres"
    },
    "test": {
        "username": "postgres",
        "password": "password",
        "database": "myDatabase",
        "host": "localhost",
        "dialect": "postgres"
    },
    "production": {
        "username": "postgres",
        "password": "password",
        "database": "myDatabase",
        "host": "postgres",
        "dialect": "postgres"
    }
}
```
- Make sure Docker is installed and then run the following command
```bash
docker compose up -d
```
- Run this command to create databases inside the project container:
```bash
npx sequelize-cli db:migrate 
```
- To create initial data for testing (optional):
```bash
npx sequelize-cli db:seed:all
```

- Running project tests (optional):
```bash
npm run test
```
