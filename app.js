var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var apiLogger = require('./Middleware/ApiLogger');
var session = require('express-session');
var passport = require('passport');
var dotenv = require('dotenv');

// Load env vars FIRST before anything else
dotenv.config();

require('./passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var visiterRouter = require('./routes/Visiter');
var productRouter = require('./routes/product');
var todosRouter = require('./routes/Todos');
var movieRouter = require('./routes/Movie');
var requestRouter = require('./routes/request');
var contactRouter = require('./routes/contact');
var adminRouter = require('./routes/admin');
var authRouter = require('./routes/Auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.log("❌ DB connection error:", err));

// middlewares
app.use(apiLogger);
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS — allow multiple origins for local development and live site
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://restjson.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Session — uses SESSION_SECRET from env
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true on live (HTTPS), false locally
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/visiter', visiterRouter);
app.use('/product', productRouter);
app.use('/todos', todosRouter);
app.use('/movie', movieRouter);
app.use('/request', requestRouter);
app.use('/contact', contactRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const isDev = process.env.NODE_ENV !== 'production';
  res.status(err.status || 500);

  if (req.accepts('json')) {
    return res.json({
      message: err.message,
      ...(isDev && { stack: err.stack })
    });
  }

  res.locals.message = err.message;
  res.locals.error = isDev ? err : {};
  res.render('error');
});

module.exports = app;
