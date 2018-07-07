const router = require('express').Router();
const templates = require('utils/load-templates')(__dirname);
const { User } = require('models');

router.get('/', (req, res) => {
  res.send(templates.home({
    messages: [{
      type: 'error',
      text: 'This is a test error message.',
    }, {
      type: 'warning',
      text: 'This is a test warning message.',
    }, {
      type: 'success',
      text: 'This is a test success message.',
    }],
  }));
});

router.route('/login')
  .get((req, res) => {
    res.send(templates.login());
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.where({ email }).fetch();

    console.log(user);

    if (user) {
      console.log('user exists');

      try {
        await user.authenticate(password);

        res.redirect('/');
      } catch (err) {
        return res.send(templates.login({
          messages: [{
            type: 'error',
            text: 'Wrong password.',
          }],
        }));
      }
    } else {
      console.log('user doesnt exist');
      return res.send(templates.login({
        messages: [{
          type: 'error',
          text: 'User not found.'
        }],
      }));
    }
  });

module.exports = router;
