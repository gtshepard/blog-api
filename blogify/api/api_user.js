module.exports = (app, auth, user) => {
  
  app.get('/users', auth , (req, res) => { 
    user.findAll().then((result) => res.json(result))
   });
  
  app.get('/user/:id', auth, (req, res) => {
    user.findById(req.params.id).then((result) => res.json(result)) 
  });

  app.post('user/', auth, (req, res) => {
    user.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordHash: req.body.passwordHash
     }).then((result) => res.json(result))
  });
}
