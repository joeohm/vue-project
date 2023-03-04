# Vue Project

This is a Vue.js project designed and built by me. It's scaffolded by Vite, a build tool that provides a fast and efficient development experience.

## Features

The project pulls and displays post and comment data from https://dummyapi.io/  
The UI is designed to be simple, user-friendly, responsive and accessible

### UPDATE 230304:

Now also features Cypress E2E tests!

## Installation

To install the project, follow these steps:

- Clone the repository: `git clone https://github.com/joeohm/vue-project.git`
- Install the dependencies: `npm install`
- Run the development server: `npm run dev`

## Usage

To use this project, create a .env file and add:

- `VITE_APP_ID` from 'https://dummyapi.io/'
- `VITE_API_BASE_URL` set to 'https://dummyapi.io/data/v1'

## Running E2E Tests

To run the end-to-end tests, follow these steps:

1. Ensure that your Vue project is running locally on port 5173 (default port). You can start the development server by running the following command from the project root directory:

```
npm run dev
```

2. Open a new terminal window and navigate to the root directory of your project.

3. Run the following command to open the Cypress Test Runner:

```
npx cypress open
```

4. In the Cypress Test Runner, either choose a specifc test to run, or press "Run all specs"

5. Alternatively, you can run the tests in headless mode by running the following command:

```
npx cypress run --spec "cypress/e2e/ListView.cy.js"
```

## Packages

The main packages used in this project are:

Vue.js: 3.2  
Vite: 4  
Vue Query: 1.26  
Vue Router: 4.1

You can find the full list of packages and their versions in the package.json file.

## View it live

https://joels-vue-project.netlify.app/
