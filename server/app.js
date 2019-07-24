const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const routes = require('./routes');
const pool = require('./db');
require('dotenv').config();

const app = express();
const dev = app.get('env') !== 'production';
const strategy = new Auth0Strategy(
  {
    domain: process.env.domain,
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
  },
  (accessToken, refreshToken, extraParam, profile, done) => {
    return done(null, profile);
  }
);

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use('/', routes);
app.use((err, req, res, next) => {
  res.json(err);
});
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: true, 
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Production
if (!dev) {
  app.disable('x-powered-by');
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
};

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/login', passport.authenticate('auth0', {
  clientID: process.env.clientID,
  domain: process.env.domain,
  redirectUri: process.env.callbackURL,
  responseType: 'code',
  audience: 'https://group-buy.auth0.com/userinfo',
  scope: 'openid profile email'
  }),
  (req, res) => {
    res.redirect('/');
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/callback', passport.authenticate('auth0', {
    failureRedirect: '/failure'
  }), 
    (req, res) => {
      res.redirect('/user');
    });
  
  app.get('/user', (request, response, next) => {
      const email = request.user._json.email
      pool.query(
        `INSERT INTO users(email)
        VALUES($1)
        ON CONFLICT
        DO NOTHING
        RETURNING email;
        `,
         [email],
         (err, res) => {
           if (err) next(err);

           response.redirect(`api/user/${email}`);
         }
        );
  });

module.exports = app;