require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const app = express();
const port = 3000;


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
    redirect_uri:' https://localhost:3000/authorization-code/callback',
    scope: 'openid profile',
    routes: {
        callback: {
            path: '/callback',
            defaultRedirect: '/admin'
        }
    }
});

app.use(oidc.router);
app.use(cors());
app.use(bodyParser.json());


app.get('/home', (req, res) => {
   res.send('<h1>Welcome  </div><a href="/login">Login</a></h1>');
});

app.get('/admin', (req, res) =>{
  res.send('Admin page');
});
app.listen(port, () => console.log(`My Blog App listening on port ${port}!`))
