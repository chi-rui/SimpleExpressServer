const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Express runs from the top to the bottom, always defined the mddileware on the most top if it has to be execute for every request comes in.
app.use(logger);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get()
app.get('/', (req, res) => {
  console.log('Home');
  // Test server connection
  // res.send('Hi');

  // res.sendStatus(500);
  // res.status(500).send('Hi');
  // res.status(200).json({message: 'success'});
  // res.download("server.js");
  // res.render('index');
  res.render('index', { message: 'A message from Express server!' });
  // res.render('index', { messageII: 'A message from Express server!' });
});

// app.get('/users', (req, res) => {
//   res.send('User list');
// });

// app.post()
// app.delete()


const userRouter = require('./routers/users');
app.use('/users', userRouter);

// Middleware always takes 'req', 'res' and 'next' as params
function logger(req, res, next) {
  console.log('Logger middleware from Server', req.originalUrl);
  next();
};

app.listen(3000);