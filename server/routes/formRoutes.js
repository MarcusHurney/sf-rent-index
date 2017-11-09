const AuthService = require('../services/auth_service');
const PropertyService = require('../services/property_service');

module.exports = app => {
  app.post('/api/submit_form', (req, res) => {
    const { email, property_data } = req.body;

    return AuthService.signupWithoutPassword({ email, req })
      .then(user => {
        return PropertyService.sayHowdy(property_data, user.id);
      })
      .then(property => res.send(property))
      .catch(error => {
        res.status(500).send('Could not create new account.');
      });
  });
};
