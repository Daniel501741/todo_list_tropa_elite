const express = require('express');
const path = require('path');
const tarefaController = require('./controllers/tarefaController');
const userController = require('./controllers/userController')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
require('dotenv').config();


const app = express(); 
const port = 5000

app.use(session({secret: 'i1n2f3o4'}))

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts)
app.set('layout', './layouts/default/index.ejs')

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if(!req.session.user){
        if(req.originalUrl == '/login' || req.originalUrl == '/autenticar'){
            app.set()
            next();
        } else{
            res.redirect('/login')
        }
    } else{
        app.set('layout', './layouts/default/index');
        res.locals.layoutVariables = {
            url: process.env.URL,
            img: '/img/',
            style: '/css/',
            title: 'Tarefas',
            user: req.session.user,
        };
        if(req.session.msg){
            res.locals.layoutVariables.msg = req.session.msg;
            delete req.session.msg;
        }
        next();
    }
})

// ROTAS
app.get('/', (req, res) => {res.send("<h1>Tarefas</h1>")})
app.get('/login', (req, res) => {
    app.set('layout', './layouts/default/login.ejs')
    userController.login (req, res)
});

app.post('/login', (req, res) => {
    userController.autenticar (req, res)
})

app.get('/logout', (req, res) => {
    userController.logout(req, res);
})

app.get('/tarefas', tarefaController.getTarefas); 
app.post('/tarefas', tarefaController.addTarefa);
app.delete('/tarefa/delete/:id_tarefa', tarefaController.deleteTarefa);
// app.put('/tarefa', tarefaController.updateTarefa);
// app.get('/tarefa/edit', tarefaController.editTarefa);
// app.get('/tarefa/:id', tarefaController.searchTarefa);


app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});