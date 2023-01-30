const express = require('express');
const router = express.Router();

router.use(logger);

// The url will try to match from the top to the bottom and run the first matched.
// Always remember to check the order of the rules.

router.get('/', (req, res) => {
  console.log('Query string with the get request', req.query);
  res.send('User list');
});

router.get('/new', (req, res) => {
  // res.send('User new form');
  res.render('users/new');
  // res.render('users/new', {userName: 'admin'});
});

router.post('/', (req, res) => {
  const userName = req.body.userName;
  const isValid = !!userName;
  // The attribute userName is matches to the name in the html body form 
  console.log('Post request to create user', userName);
  if (isValid) {
    dummyUsers.push({ name: userName });
    res.redirect(`/users/${dummyUsers.length-1}`)
  } else {
    console.log('Error. Invalid input for user name.');
    res.render('users/new', {userName: userName });
  }
  res.send('Create new user');
});

router
  .route('/:id')
  .get((req, res) => {
    console.log('Get user request handler', req.user);
    res.send(`Get the user with id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update the user with id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete the user with id ${req.params.id}`);
  });

// router.get('/:id', (req, res) => {
//   res.send(`Get the user with id ${req.params.id}`);
// });

// router.put('/:id', (req, res) => {
//   res.send(`Update the user with id ${req.params.id}`);
// });

// router.delete('/:id', (req, res) => {
//   res.send(`Delete the user with id ${req.params.id}`);
// });

const dummyUsers = [
  {name: 'Patrick'},
  {name: 'Carbon'},
  {name: 'Calvin'}
];

// router is kinda like a middleware, it will run first and go ahead with next called.
router.param('id', (req, res, next, id) => {
  console.log(`Router.param found id from the request: ${id}`);
  req.user = dummyUsers[id];
  next();
});

function logger(req, res, next) {
  console.log('Logger middleware from Router', req.originalUrl);
  next();
};

module.exports = router;
