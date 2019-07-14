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

const app = express();
const dev = app.get('env') !== 'production';

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
    secret: 'my_secret_key',
    resave: true, 
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.loggedIn = false
  if (req.session.passport && typeof req.session.passport.user !== undefined) {
    res.locals.loggedIn = true
  };
  next()
})


// Production
if (!dev) {
  app.disable('x-powered-by');
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
};

const myVars = {
  domain: 'group-buy.auth0.com',
  clientID: 'ijNg5hWpjHo72YCjrOj4uwknHzjq0aZv',
  clientSecret: 'cN9AoqWcGGBwH1ZlZ2jIX6645ZqxQ3tq5oIO9TXMDnauQN17-TLhdWVUkdcY-7GQ',
  callbackURL: 'http://localhost:3000/callback'
}

const strategy = new Auth0Strategy(
  {
    domain: myVars.domain,
    clientID: myVars.clientID,
    clientSecret: myVars.clientSecret,
    callbackURL: myVars.callbackURL
  },
  (accessToken, refreshToken, extraParam, profile, done) => {
    return done(null, profile)
  }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/login', passport.authenticate('auth0', {
    clientID: myVars.clientID,
    domain: myVars.domain,
    redirectUri: myVars.callbackURL,
    responseType: 'code',
    audience: 'https://group-buy.auth0.com/userinfo',
    scope: 'openid profile'
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
  
  app.get('/user', (req, res, next) => {
    res.json({user: req.user})
  });

module.exports = app;