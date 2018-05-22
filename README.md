# Meet
## Location Aware Chat

Meet is built in NodeJS. It relies on [ExpressJS](https://expressjs.com/) and [SocketIO](https://socket.io/).

### Installation

After cloning the repo and installing the dependencies, run the app with: `node run index.js`

For development, you can use `nodemon run index.js` instead. Nodemon checks for changes and restarts your server automatically.

### Stylesheets

Meet uses [Syntactically Awesome Styles Sheets](https://sass-lang.com/). Make sure any CSS you write is in `style.scss` or else it will be overwritten during compile. The command to compile SASS into CSS is `npm run sass:compile`.