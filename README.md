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
- *assets/* - Holds images needed for application
- *public/* - holds files to be copied to the build directory
    - *index.html* - Principal web page to host the React app
    - *electron.js* - Electron's launch point, opens the main
- *src/* - Holds main source of application
    window and controls the application
    - *components/* - React components
        - *ConnectionMenu.jsx* - Holds connection button and server
          selector
        - *FileExplorer.jsx* - File explorer component
        - *Loader.jsx* - Establishes SSH connection while loading
        - *Login.jsx* - User login credentials form
        - *MainWindow.jsx* - The main application view
        - *MasterTab.jsx* - Individual tab component
        - *ServerSelector.jsx* - Server selection component
        - *Terminal.jsx* - Terminal emulator
    - *config/* - Configuration files
        - *servers.json* - a list of selectable servers to connect to
    - *App.js* - The main React component
    - *App.test.js* - Tests for *App.js*
    - *Connection.js* - interface for SSH connection to SEASnet
    - *index.css* - Global CSS to affect all pages
    - *index.js* - React's launch point
    - *registerServiceWorker.js* - utility from `create-react-app`
- *config-overrides.js* - change default configuration of webpack
  from `create-react-app`
- *package.json* - Description of dependencies and scripts to
  test/build the application

## Contributing
General Guidelines:
* Major changes should be done in branches
* Commit messages should be descriptive and written as actions:
  Ex: `Add login fields and error message to GUI`
