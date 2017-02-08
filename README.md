This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


[Demo](https://vouill.github.io/reactTableApp/)

This app takes a Github event stream url and displays it in a table.
Features: 

- Filter the table by dates
- Search string in commits messages

Libs used:

- Ui-kit:  [react-bootstrap](https://react-bootstrap.github.io/)
- redux
- redux-thunk to handle asynchronous actions
- momentJS

Infos:

The duck file structure is used to manage the redux multi folder madness.
A module file contains the Constants, Action creators and Reducers




## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.
