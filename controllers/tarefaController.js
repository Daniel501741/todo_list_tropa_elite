const Tarefa = require('../models/tarefaModel'); 

let tarefas = [];

async function getTarefas(req, res) { 
    tarefas = await Tarefa.listarTarefas();

    res.render('tarefas', { tarefas });
} 

function addTarefa(req, res) { 

    const { title } = req.body; 


    const tarefa = new Tarefa(null, title, null);
    tarefa.save();
    res.redirect('/tarefas'); 
} 

async function deleteTarefa(req, res){
    if(await Tarefa.deleteTarefa(req.params.id_tarefa)){
        msg = {
            class: "alert-success",
            msg: "Tarefa excluida com sucesso!"
        }
        req.session.msg = msg;
        res.redirect('/tarefas');
    } else{
        msg = {
            class: "alert-danger",
            msg: "Erro ao tentar excluir tarefa!!"
        }
        req.session.msg = msg;
        res.redirect('/tarefas')
    }
}

module.exports = { getTarefas, addTarefa, deleteTarefa };
