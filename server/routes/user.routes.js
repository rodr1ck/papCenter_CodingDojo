const UserController = require('../controllers/user.controller');
const authenticate = require('../config/authenticate');
const {newPatient, getAllPatients, getOnePatient} = require('../controllers/patient.controller');
const { newPap, getAllPaps, deletePap, editPap, getOnePap} = require('../controllers/pap.controller');

module.exports = function(app) {
  app.post("/api/register", UserController.Register);
  app.post("/api/login", UserController.Login);
  app.post("/api/logout", UserController.Logout);
  app.get("/api/user/:id", authenticate, UserController.getUser);
  app.get('/api/patients', getAllPatients)
  app.post("/api/patient", newPatient);
  app.post("/api/pap", newPap);
  app.get('/api/paps/:id', getAllPaps)
  app.get('/api/patient/:id', getOnePatient)
  app.get('/api/pap/:id', getOnePap)
  app.delete('/api/paps/:id', deletePap)
  app.put('/api/paps/:id', editPap)

}
