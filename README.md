# SEASide
## About
SEASide is a cross-platform graphical desktop application to make using
the UCLA SEASnet servers as easy as possible.

## Project Setup
- First install [yarn](https://yarnpkg.com/)
- Clone the repository and enter the directory:
  ```sh
  $ git clone https://github.com/awolk/SEASide.git
  $ cd SEASide
  ```
- Run `yarn` to install the required packages
- To test run `yarn start`

## File Structure
- *package.json* - Description of dependencies and scripts to
  test/build the application
- *public/index.html* - Principal web page to host the React app
- *src* - Holds main source of application
    - *electron-start.js* - Electron's launch point, opens the main
      window and controls the application
    - *index.css* - Global CSS to affect all pages
    - *index.js* - React's launch point
    - *registerServiceWorker.js* - utility from `create-react-app`
    - *App.js* - The main React component
    - *App.test.js* - Tests for *App.js*
    - *config* - Configuration files
        - *servers.json* - a list of selectable servers to connect to
    - *components* - React components
        - *MainWindow.jsx* - The main application view
        - *ServerSelector.jsx* - Server selection component
        - *Terminal.jsx* - Terminal emulator

## Contributing
General Guidelines:
* Major changes should be done in branches
* Commit messages should be descriptive and written as actions:
  Ex: `Add login fields and error message to GUI`
