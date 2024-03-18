# Delivery report Service

This service facilitates the reporting of late orders, allowing delayed requests to be filed for review by designated personnel. The project is developed using TypeScript with the Express framework, utilizes a PostgreSQL database managed through Sequelize ORM, and is containerized with Docker. Additionally, it includes integration tests to ensure reliability.

### This service has three routes that include

#### 1. Record Delay Request
- **Description**: Records delays and adds them to the review queue for further processing.
- **Endpoint**: `/orders/:orderId/delay`
- **HTTP Method**: POST

#### 2. Support Request Pickup
- **Description**: Enables support agents to pick up requests from the review queue for resolution.
- **Endpoint**: `delivery-reports/assign-employee`
- **HTTP Method**: POST

#### 3. Weekly Delay Report
- **Description**: Generates a weekly report of delays for all vendors.
- **Endpoint**: `/vendors/reports/weekly`
- **HTTP Method**: GET

## Installation
- Clone the project repository

- Configure your environment variables based on the specifications outlined in the env.example file.

- Install the necessary project dependencies:
```bash
npm install
```

- Build the project for production:
```bash
npm run build
```

- Create a config.json file at config/config.json to manage database configurations using Sequelize CLI:
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
- Ensure Docker is installed and run the following command:
```bash
docker compose up -d
```
- Create databases within the project container:
```bash
npx sequelize-cli db:migrate 
```
- Optionally, seed initial data for testing:
```bash
npx sequelize-cli db:seed:all
```

- Optionally, run project tests:
```bash
npm run test
```
