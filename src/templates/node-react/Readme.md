### Node+React Template project

*NOTE*: This is a Work in progress.

This is a proposal for a React template project with:

- [ReactJS](https://reactjs.org/) (with SSR for BOT's)
- [Styled Components](https://styled-components.com/) for styling
- [Redux](https://redux.js.org/) for state management
- [Redux-Observable](https://redux-observable.js.org/) for advanced state management
- [@LinguiJS](https://lingui.js.org/) for internationalization 

## How to Start

First you need to install all dependencies `npm i` or `yarn` will do the trick!

Once the template is instaled you need to run `npm run watch` to start watching your changes to transpile, after the first build its finish you can run `npm run nodemon` to start the server.

Now you can navegate to [http://localhost:3000](http://localhost:3000)

By default this will liten to `port 3000` you can change this with a env variable PORT with the new port you want to use, `PORT=3001 npm run nodemon` will start the server on port 3001.

## Deploy

TODO

## Guidelines

- File names are kebab-case
- Variable names are camelCase
- Modules should be a folder with an `index.js` that expose the module and an `[module-name].js` that contain all the logic.

## Views, Navigations and Folder Structures



## TODO

- [ ] Improve documentation
- [ ] Add Hot Module Reload
- [ ] Add Manifest for PWA
- [ ] Merge webpack watch and start nodeserver as one command (To avoid to consoles)

## Troubleshooting

### Webpack fail to pack

- If you are using a library that webpack can't pack, add it as an external dependency on Webpack and install it in the final docker image