const express = require('express');
const morgan = require ('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
require('./lib/passport');
const keys = require('./keys');
const flash = require('connect-flash');



//Iniciación
const app = express();

//Configuración
app.set('port', process.env. PORT || 4200);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs( {
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', 'hbs');

//Middlewares
app.use(session({
            secret: 'portalsession',
            resave: false,
            saveUninitialized: false,
            store: new MySQLStore(keys.database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded ({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req, res, next) => {
           app.locals.message = req.flash('message');
            app.locals.success = req.flash('success');
            app.locals.user = req.user;
            next();
});

//Rutas
app.use(require('./routes/authentication'));
app.use('/login',require('./routes/auth.route'));
app.use('/estudiante',require('./routes/estudiante.route'));


//Publico 
app.use(express.static(path.join(__dirname,'public')))

//Iniciador del server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});