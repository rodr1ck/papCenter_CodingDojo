// inside of user.routes.js
const UserController = require('../controllers/user.controller');
const authenticate = require('../config/authenticate');
const {newReview} = require('../controllers/review.controller');
const {newPatient} = require('../controllers/patient.controller');
const { newMovie } = require('../controllers/movie.controller');

module.exports = function(app) {
  app.post("/api/register", UserController.Register);
  app.post("/api/login", UserController.Login);
  app.post("/api/logout", UserController.Logout);
  app.get("/api/user/:id", authenticate, UserController.getUser);
  //app.post("/api/review", newReview);
  app.post("/api/patient", newPatient);
  app.post("/api/movie", newMovie);

  // this route now has to be authenticated
  //app.get("/api/users", authenticate, UserController.getAll);
}
