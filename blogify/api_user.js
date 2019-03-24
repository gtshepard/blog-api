module.exports = (app, db) => {
  app.get("/user/:id", (req, res) => 
    db.user.findById(req.params.id).then((result) 
      => res.json(result))
  );



}
