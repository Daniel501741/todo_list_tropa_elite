class User{
    constructor(id, nome, email, senha){
        this.id = id;
        this.nome = nome;
        this.email= email;
        this.senha = senha;
    }

    static async autenticar(email, senha){
        const md5 = require('md5')
        const Database = require('./database');
        let sql = `SELECT * FROM user WHERE email='${email}' and senha='${md5(senha)}'`;
        console.log(sql)
        return await Database.query(sql);
    }

    static async listarUser(){
        const Database = require('./database');
        return await Database.query(sql);
    }

    async saveUser(){
        const Database = require('./database');
        let resp = await Database.query(`INSERT INTO user (nome, email, senha) VALUES ('${this.nome}', '${this.email}', '${this.senha}')`);

        this.id = resp.insertId;
    }
}

module.exports = User