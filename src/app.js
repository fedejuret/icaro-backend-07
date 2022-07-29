const express = require('express');
const session = require('express-session');
const cookie = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();

const hash = "$2b$10$yKZNxUIRdckyutdS3KnYmusTj1T1uDcrKnBcsuYeSRufoErDZTLFG";

app.use(session({
    secret: '123456789', // Pueden poner cualquier cosa
    cookie: {
        expires: false
    },
    saveUninitialized: true,
    resave: false
}));
app.use(cookie());


app.get('/cookies', (req, res) => {

    return res.json({
        cookies: req.cookies
    })

});

app.get('/set-cookie', (req, res) => {

    const { cookie } = req.query;

    res.cookie('30-seconds-cookie', cookie, {
        maxAge: 1000 * 30
    });

    return res.send(cookie);

});

app.get('/sessions', (req, res) => {

    return res.json({
        sessions: req.session
    })

});

app.get('/set-session', (req, res) => {

    const { session } = req.query;

    req.session.hola = session;

    return res.send(session);

});


app.get('/hash-password', (req, res) => {

    const { password } = req.query;

    const passwordHashed = bcrypt.hashSync(password, 10);

    return res.send(passwordHashed);

});

app.get('/validate-password', (req, res) => {

    const { password } = req.query;

    const isValid = bcrypt.compareSync(password, hash);

    return res.send(isValid);

})


app.listen(3000, () => console.log('Servidor en el puerto 3000'));
