const app = require('./server/server');

// PORT will be set by Heroku if app is in Production
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
