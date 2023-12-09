**REPO FOR my personal website
[kevincrab.be](https://kevincrab.be)**
===

## Accessable at...
### [https://kevincrab.be](https://kevincrab.be)
Main url used as a personal website.
### [https://me.kevincrab.be](https://me.kevincrab.be)
Alias for kevincrab.be\
Also used as a personal website, but with some minor accessibility improvements.
### [https://links.kevincrab.be](https://links.kevincrab.be)
Alias for kevincrab.be\
Automatically redirects to the desktop and opens up the links window.
### [https://emulator.kevincrab.be](https://emulator.kevincrab.be)
Highlights the Win95 features of this website.
Does not include as many personal links as the main website.


# [kevincrab.be](https://kevincrab.be) frontend

## This project was bootstrapped with... 
### ReactJS \ Typescript \ @Redux \ SCSS

---
## Available Scripts from within this directory
In the project directory, you can run:

### `npm run start:local`
Open in browser: [http://localhost:3000](http://localhost:3000)\
Runs the app in the local development mode.
- Does not connect to Firebase 

### `npm run start:dev`
Open in browser: [http://localhost:3000](http://localhost:3000)\
Runs the app in the local development mode.
- DOES connect to Firebase (if secrets are set)

### `npm run start:local-production`
Open in browser: [http://localhost:3000](http://localhost:3000)\
Runs the app as production, with firebase configs, (if set)

### `npm run build:local-production`
Build the application as it would to deploy (if secrets are set)\
Use `serve -s build` to run whatever is in the build folder

## Automation
### `npm run build:prod --omit=dev`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build 

### `serve -s build`
Serves the build application on some random port.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More
To learn React, check out the [React documentation](https://reactjs.org/).
