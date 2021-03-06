var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apirouter = require('./routes/apirouter');
var serviceupdateportadas = require('./routes/updateportadas');
var serviceupdatefotoprincipal = require('./routes/updatefotoprincipal');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/v1.0/api', apirouter);
app.use('/v1.0/api', serviceupdateportadas);
app.use('/v1.0/api', serviceupdatefotoprincipal);

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.render('error');
});

const port = 8000;
app.listen(port, () => {
console.log("running in " + port);
});

module.exports = app;