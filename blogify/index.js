require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const app = express();
const port = 3000;
const {User, Post} = require('./seq')
const mongo = require('./model/model_post_mongo')
const apiUser = require('./api/api_user')
const apiPost = require('./api/api_user')

/* Middleware functions have access to both request (HTTP request) 
 * and repsonse (HTTP response)  objects   
 *  express is a routing and middleware webframework 
 * application is actaully a series of middleware functions calls
 */

app.use(session({
  secret: process.env.RANDOM_SECRET_WORD,
  resave: true,
  saveUninitialized: false
}));
 
const oidc = new ExpressOIDC({
    issuer:`https://${process.env.OKTA_ORG_URL}/oauth2/default`,
    client_id: process.env.OKTA_CLIENT_ID,
    client_secret: process.env.OKTA_CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URL,
    scope: 'openid profile',
    routes: {
      callback: {
        path:'/authorization-code/callback',
        defaultRedirect: '/admin'
      }
    }
});

app.use(oidc.router);
app.use(cors());
app.use(bodyParser.json());

apiUser(app, oidc.ensureAuthenticated(), User)

app.get('/home', (req, res) => {
   res.send('<h1>Welcome</div><a href="/login">Login</a></h1>');
});

app.get('/admin', oidc.ensureAuthenticated(),(req, res) =>{
 res.send('Admin page');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/home')
});

app.get('/', (req, res) => {
   res.redirect('/home');
});

oidc.on('ready', () => {
  app.listen(3000, () => console.log(`Started!`));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});
