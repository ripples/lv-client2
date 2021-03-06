var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bb = require('express-busboy');
var session = require('express-session');
var passport = require('passport')
var lti = require('ims-lti')
var CustomStrategy = require('passport-custom')
const fs = require('fs')

var public = require('./routes/public');
var api = require('./routes/api');
var upload = require('./routes/upload')
var entry = require('./routes/entry')

var app = express();
app.use(cookieParser())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/* Use this for very verbose logging
var morgan = require('morgan')
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'appAccess.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))
*/

bb.extend(app, {
    upload: true,
    path: './uploads',
    allowedPath: /./
});

app.use(session({secret: process.env.COOKIE_SECRET}))

//Passport
passport.use('lti-strategy', new CustomStrategy(
	function(req, callback) {
		var val = (req.body) ? req.body : req.user
		try{
			var provider = new lti.Provider(val , process.env.LTI_SECRET)
			if(req.user){
				callback(null, val)
			}
			else{
				provider.valid_request(req, function(err, isValid) {
					if(err){
						console.log("LTI Error", err, isValid)
					}
					callback(err, val)
				});
			}
		}
		catch(err){
			console.log("Authenication error", err)
			callback(err, null)
		}
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
  });

  passport.deserializeUser(function(user, done) {
	done(null, user);
  });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', upload)
app.use('/', public);

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('lti-strategy', {failureFlash: true}));

app.use('/', entry)
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
