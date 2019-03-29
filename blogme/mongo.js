module.export = (app, auth) => {

  const {Database, Model} = require('mongorito')
  const db = new Database('localhost/', {reconnectTries: 5});

  db.connect()
  class Post extends Model{}
  db.register(Post);

app.post('/post/mongo', (req, res) => 
  Post({
  postId: req.params.id,
  userId: req.params.userId,
  title: req.params.title,
  content: req.params.content
  })).then((result) => res.json(result))

  const content = post.get('content');
  console.log(content);
}
