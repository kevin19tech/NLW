const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")



//configurar pasta publica
//deixar a pasta styles como public
server.use(express.static("public"))

//habilitar o uso do 

server.use(express.urlencoded({  extended: true}))

//Mais inteligente

//utilizando template engine

const nunjucks = require(("nunjucks"))
nunjucks.configure("src/views",{
    express: server,
    
    noCache: true
    //Não devolver a versão velha p evitar bugs
})

// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res:Resposta

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})  //Usar isso tornaria a aplicação mais dinâmica. Isso poderia ser usado ao trabalhar com banco de dados
})
//Renderizar

//Chamando rotas
server.get("/create-point", (req, res) => {
   //console.log(req.query)

    return res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {
    //req.ody
    //console.log(req.body)


    //Inserir dados

 // 2 -Inserir dados na tabela
     
    const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
        ` 

        const values = [
            
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items

    ]

    function afterInsertData(err){
        if(err) {
           console.log(err)
           return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")

        console.log(this) // com this não pode usar arrow function

        return res.render("create-point.html", { saved : true})
    }

    db.run(query,values, afterInsertData)//callback

    

    
})




server.get("/search", (req, res) => {


        const search = req.query.search

        if(search == "") {
            //pesquisa
            return res.render("search-results.html", {  total: 0})
        }
    // pegar os dados do banco de dados

      db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
          if(err) {
              return console.log(err)
          }

          //console.log("Aqui estão os seus registros: ")
          //console.log(rows)

          const total = rows.length

          //mostrar a página html com os bancos de dados
          return res.render("search-results.html", { places: rows, total: total})
     })


    
})
//ligar o servidor
server.listen(3000)