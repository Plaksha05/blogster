const express= require('express')
const expressLayouts = require('express-ejs-layouts');
const ejs=require('ejs');
const mongoose= require('mongoose');
const flash= require('connect-flash');
const session= require('express-session');
const passport= require('passport');
require('dotenv/config');

const app= express();
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store')
//   next()
// })
require('./config/passport')(passport);

// EJS Middleware
app.use(expressLayouts);
app.set('view engine','ejs');

// Body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: false
  }));

  // Express session middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use( express.static( 'public' ) );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// COnnect Flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

mongoose.connect(process.env.DB_CONNECTION,
  {   useUnifiedTopology: true,useNewUrlParser: true  },
      ()=>console.log('Connected to db')
  );

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on ${port}`));