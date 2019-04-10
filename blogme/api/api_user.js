module.exports = (app, user) => {
  
  app.get('/users', (req, res) => { 
    user.findAll().then((result) => res.json(result))
   });
  
  app.get('/user/:id', (req, res) => {
    user.findById(req.params.id).then((result) => res.json(result)) 
  });

  app.post('/user', (req, res) => {
    console.log(req.body)
    user.create(req.body).then((result) => res.json(result))
  });

  app.put("/user/:id", (req, res) => 
    user.update({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: req.body.passwordHash
    },
      {where:{id: req.params.id}}
    ).then((result) => res.json(result))
  );

 app.delete("/user/:id", (req, res) => 
  user.destroy({
    where: {
      id: req.params.id
    }
  }).then((result) => res.json(result))
 );

}
