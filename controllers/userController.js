const User = require('../models/userModel');

let users = [];

async function getUsers(req, res){
    users = await User.listarUser();
    res.render('users', { users });
}

function login(req, res){
    res.render('login');
}

async function autenticar(req, res){
    const resp = await User.autenticar(req.body.email, req.body.senha);
    if(resp && resp.lenght > 0){
        req.session.user = resp[0];
        res.redirect('/tarefas');
    } else{
        res.redirect('/login')  
    }
}

async function logout(req, res){
    delete req.session.user;
    res.redirect('/')
}


module.exports = { getUsers, login, autenticar, logout }