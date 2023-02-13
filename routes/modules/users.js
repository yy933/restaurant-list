const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have logged out successfully.')
  res.redirect('/users/login')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.post(
  '/login',
  (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      req.flash('warning_msg', 'Please login with valid email and password.')
      return res.redirect('/users/login')
    }
    next()
  },
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword, termsOfService } = req.body
  console.log(req.body);
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'Please fill in all required fields!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Your password does not match the confirmed password.' })
  }
  if (termsOfService !== 'agree') {
    errors.push({
      message: "You must agree with our Terms of Service to continue.",
    });
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: 'This email has already been registered.' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      // if not registered, create a new account
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name: name || email.slice(0, email.indexOf("@")),
            email,
            password: hash,
          })
        )
        .then(() => res.redirect("/"))
        .catch((error) => {
          console.log(error);
          res.render("error", { error_message: error.message });
        });
    })
    .catch((err) => console.log(err))
})
module.exports = router
