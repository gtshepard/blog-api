module.exports = (app, auth, post) => {
  app.get("/posts", auth,(req, res) => 
    post.findAll().then((result) 
      => res.json(result) 
    )
  );
  
  app.get("/post/:id", auth, (req, res) => 
    post.findById(req.params.id).then((result) 
      => res.json(result))
  );
  
  app.post("/post", auth, (req, res) => 
    post.create({})
     .then((result) => res.json(result))
  );

 app.delete("/post/:id", auth, (req, res) => 
   post.destroy({
    where: {
      id: req.params.id
    }
   }).then((result => res.json(result)) )
  );
 }
