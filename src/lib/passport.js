const  passport = require('passport');
const { Strategy } = require('passport-local');
const pool = require('../database');
const helpers = require ('../lib/helpers');


passport.use('local.login', new Strategy({
    usernameField: 'usuario',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, usuario, pass, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = pass == user.pass; // await helpers.mathPassword(pass, user.pass)
        if (validPassword) {
            console.log(user);
            done(null, user, req.flash('success', `Bienvenido `));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El correo electronico no existe.'));
    }
}));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id_usuario);
});


passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('select * from usuarios where id_usuario = ?', [id]);
    done(null, rows[0]);
});


module.export = passport;