class Tarefa{
    constructor(id, title, description){
        this.id = id;
        this.title = title;
        this.description = description;
    }

    static async listarTarefas(){
        const Database = require('./database')

        let tarefas = await Database.query("Select * from tarefas")
        return tarefas;
        
        // return tarefas == undefined ? [] : tarefas;
    }

    async save(){
        const Database = require('./database');

        let resp = await Database.query(`INSERT INTO tarefas (titulo, descricao) VALUES ('${this.title}', '${this.description}')`);
        console.log(resp);
        this.id = resp.insertId;
    }

    async deleteTarefa(id){
        // const Database = require('./database');
        // if(await Database.query('DELETE FROM tarefa WHERE id_tarefa = '+id)){
        //     return true;
        // } else{
        //     return false;
        // }
        const Database = require('./database');
        const resp = await Database.query("DELETE FROM tarefa WHERE id_tarefa = '+id")
        if(resp){
            if(resp.affectedRows > 0){
                return true;
            } else{
                return false;
            }
        } else{
            return false;
        }
    }
}

module.exports = Tarefa;