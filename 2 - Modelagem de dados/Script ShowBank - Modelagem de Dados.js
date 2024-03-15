//----------------------------- MODELAGEM DE DADOS MONGODB -----------------------------//

// Aprender a modelar os dados pode ser uma das maiores dificuldades para quem vai começar a trabalhar com banco de dados, principalmente quando são do tipo NoSQL, já que não existem regras a serem seguidas para a padronização dos dados.

// Para modelar um banco de dados relacional, temos os diagramas, modelos de dados, normalização de dados, formas normais, entre outros conceitos e padrões que podemos aplicar para modelar os nossos dados.

// Ao se trabalhar em um projeto para modelar um banco de dados não relacional, nenhum desses conceitos ou padronizações se aplicam. Para cada projeto de banco de dados, podemos modelar os nossos dados de formas diferentes.

// Por este motivo, é muito importante entendermos as necessidades da nossa aplicação e como ela utilizará o banco de dados, para que o projeto seja desenvolvido e atenda a todos os objetivos da aplicação.

//----------------------------- MODELAGEM 1 -----------------------------//

//use modelagem

db.createCollection("clientes",
{
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["Nome", "CPF","Status_Civil","Data_Nascimento","Endereco", "Genero", "Profissao", "Contas"],
            properties:{
                Nome:{
                bsonType: "string",
                maxLength:150,
                description: "informe corretamente o nome do cliente"
                },
                CPF:{
                bsonType: "string",
                minLength:14,
                maxLength:14,
                description: "informe corretamente o cpf do cliente" 
                },
                Status_Civil:{
                bsonType: "string",
                enum:["Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"],
                description: "informe corretamente o status civil do cliente" 
                },
                Data_Nascimento:{
                bsonType: ["string", "null"],
                description: "informe corretamente a data de nascimento do cliente"  
                },
                Endereco:{
                    bsonType: "object",
                    required:["Rua","Numero","Bairro","Cidade","Estado","CEP"],
                    properties:{
                        Rua:{
                            bsonType: "string"},
                        Numero:{
                            bsonType: "int"},    
                        Bairro:{
                            bsonType: "string"},  
                        Cidade:{
                            bsonType: "string"}, 
                        Estado:{
                            bsonType: "string"},    
                        CEP:{
                            bsonType: "string"} 
                    }
                },
                Genero:{
                bsonType: "string",
                description: "informe corretamente o genero do cliente" 
                },
                Profissao:{
                bsonType: "string",
                description: "informe corretamente o profissão do cliente"},
                Contas:{
                    bsonType:"object",
                    required:["Numero_Conta", "Tipo", "CPF", "Valor","Agência"],
                    properties:{
                        Numero_Conta:{
                            bsonType: "string"  
                        },
                        Tipo:{
                            bsonType: "string",
                            enum:["Conta corrente", "Conta poupança", "Conta salário"]  
                        },
                        CPF:{
                            bsonType: "string",
                            minLength:14,
                            maxLength:14 
                        },
                        Valor:{
                            bsonType: "double"  
                        },
                        Agência:{
                            bsonType: "string"     
                        }
                    }
                }
            }     
        }

    }
})

db.clientes.insertOne({
"_id":1,
"Nome": "Cauê Luan da Paz",
 "CPF": "426.239.760-23",
 "Data_Nascimento": "16/02/1967",
 "Genero": "Masculino", 
 "Profissao": "Vendedor em comércio atacadista", 
 "Endereco": {
   "Rua":"Vinte e Quatro", 
   "Numero": 121, 
   "Bairro": "Três Vendas", 
   "Cidade":"Pelotas", 
   "Estado":"RS", 
   "CEP": "96071-380"},
 "Contas":{
   "Numero_Conta": "0265177-7", 
   "Agência": "5575", 
   "Tipo": "Conta salário", 
   "CPF": "426.239.760-23", 
   "Valor": 1.411
 },
 "Status_Civil": "Casado(a)"
 })
 
 db.clientes.insertOne( {
 "_id":2,
 "Nome": "Allana Esther Lara Monteiro",
 "CPF": "207.588.703-96", 
 "Data_Nascimento": "15/03/1962",
 "Genero": "Feminino", 
 "Profissao": "Servente de obras",
 "Endereco": {
   "Rua":"Deputado João Moura Santos", 
   "Numero": 155, 
   "Bairro": "Matadouro", 
   "Cidade":"Teresina", 
   "Estado":"PI", 
   "CEP": "64004-340"}, 
 "Contas":{
   "Numero_Conta": "04938-1",
   "Agência": "5575", 
   "Tipo": "Conta salário",
   "CPF": "207.588.703-96", 
   "Valor": 3.080
 },
  "Status_Civil": "Divorciado(a)"}
)

 db.clientes.insertOne( {
 "_id":3,
 "Nome": "Emanuelly Raquel Peixoto", 
 "CPF": "587.179.508-05", 
 "Data_Nascimento": "24/05/1966", 
 "Genero": "Feminino", 
 "Profissao": "Gerente de loja",
 "Endereco": {
  "Rua": "São Bento Abade",
  "Numero": 833, 
  "Bairro":"Jardim Marilena", 
  "Cidade": "Guarulhos", 
  "Estado":"SP", 
  "CEP":"07140-450"}, 
 "Contas":{
  "Numero_Conta": "1786128-P", 
  "Agência": "5575", 
  "Tipo": "Conta salário", 
  "CPF": "587.179.508-05", 
  "Valor": 3.041 
 },
 "Status_Civil": "Viúvo(a)"
 })

db.clientes.find({})

//----------------------------- MODELAGEM 2 -----------------------------//


//use modelagem_02

db.createCollection("clientes",
{
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["Nome", "CPF", "Status_Civil", "Data_Nascimento", "Genero", "Profissao"],
            properties:{
                Nome:{
                bsonType: "string",
                maxLength:150,
                description: "informe corretamente o nome do cliente"
                },
                CPF:{
                bsonType: "string",
                minLength:14,
                maxLength:14,
                description: "informe corretamente o cpf do cliente"
                },
                Status_Civil:{
                bsonType: "string",
                enum:["Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"],
                description: "informe corretamente o status civil do cliente"
                },
                Data_Nascimento:{
                bsonType: ["string", "null"],
                description: "informe corretamente a data de nascimento do cliente" 
                },
                Genero:{
                bsonType: "string",
                description: "informe corretamente o genero do cliente"
                },
                Profissao: {
                bsonType: "string",
                description: "informe corretamente a profissao do cliente"}
            }
        }
    }
})

db.createCollection("contas",
{
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["Numero_Conta", "Tipo", "CPF", "Valor", "Agência"],
            properties:{
                Numero_Conta:{
                bsonType: "string",
                description: "informe corretamente o numero da conta"
                },
                Tipo:{
                bsonType: "string",
                enum: ["Conta corrente", "Conta poupança", "Conta salário"],
                description: "informe corretamente o tipo da conta"
                },
                CPF:{
                bsonType: "string",
                minLength:14,
                maxLength:14,
                description: "informe corretamente o cpf do cliente na conta"
                },
                Valor:{
                bsonType: "double",
                description: "informe corretamente o valor da conta"
                },
                Agência:{
                bsonType: ["string", "null"],
                description: "informe corretamente a Agência"}
            }
        }
    }
})

db.createCollection("endereco",
{
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["Rua", "Numero", "Bairro", "Cidade", "Estado", "CEP"],
            properties:{
                Rua:{
                    bsonType: "string"},
                Numero:{
                    bsonType: "int"},
                Bairro:{
                    bsonType: "string"},
                Cidade:{
                    bsonType: "string"},
                Estado:{
                    bsonType: "string"},
                CEP:{
                    bsonType: "string"},
            }
        }
    }
})

db.clientes.insertOne({
"_id":1,
"Nome": "Flávia Carla Rocha",
"CPF": "063.668.976-03",
"Data_Nascimento": "12/07/1944",
"Genero": "Feminino", 
"Profissao": "Auxiliar de enfermagem",
"Status_Civil": "Casado(a)"
})

db.contas.insertOne({
"_id": 4,
"id_clientes": 1,
"Numero_Conta": "1044626-5", 
"Agência": "5575", 
"Tipo": "Conta salário", 
"CPF": "063.668.976-03", 
"Valor": 5.368
})

db.endereco.insertOne({
"_id": 3,
"id_clientes": 1,
"Rua":"Escoteiro Fernando César", 
"Numero": 646, 
"Bairro": "Nova Era", 
"Cidade":"Juiz de Fora", 
"Estado":"MG", 
"CEP": "36087-380"
})

db.clientes.find({})

db.contas.find({})

db.endereco.find({})

//----------------------------- RELACIONAMENTOS -----------------------------// 

use modelagem


db.clientes.insertOne({
"_id": 3,
"Nome": "Luan Caio da Silva",
"CPF": "520.233.763-94",
"Data_Nascimento": "14/10/1949",
"Genero": "Masculino",
"Profissao": "Atendente de farmácia",
"Endereco": {
    "Rua": "João Alberto",
    "Numero": 224,
    "Bairro": "Santa Clara",
    "Cidade": "São Luís",
    "Estado": "MA",
    "CEP": "65058-623"
    },
    "Rua": "Rua das Camelias",
    "Numero": 333,
    "Bairro": "Santa Tereza",
    "Cidade": "São Luís",
    "Estado": "MA",
    "CEP": "65058-623"
    },
"Contas": {
    "Numero_Conta": "67314-4",
    "Agência": "5575",
    "Tipo": "Conta poupança",
    "CPF": "520.233.763-94",
    "Valor": 2.860
    },
"Status_Civil": "Viúvo(a)"
})



db.runCommand({collMod: "clientes",
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["Nome", "CPF","Status_Civil","Data_Nascimento","Endereco", "Genero", "Profissao", "Contas"],
            properties:{
                Nome:{
                bsonType: "string",
                maxLength:150,
                description: "informe corretamente o nome do cliente"
                },
                CPF:{
                bsonType: "string",
                minLength:14,
                maxLength:14,
                description: "informe corretamente o cpf do cliente" 
                },
                Status_Civil:{
                bsonType: "string",
                enum:["Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"],
                description: "informe corretamente o status civil do cliente" 
                },
                Data_Nascimento:{
                bsonType: ["string", "null"],
                description: "informe corretamente a data de nascimento do cliente"  
                },
                Endereco:{
                    bsonType: "array",
                    required:["Rua","Numero","Bairro","Cidade","Estado","CEP"],
                    properties:{
                        Rua:{
                            bsonType: "string"},
                        Numero:{
                            bsonType: "int"},    
                        Bairro:{
                            bsonType: "string"},  
                        Cidade:{
                            bsonType: "string"}, 
                        Estado:{
                            bsonType: "string"},    
                        CEP:{
                            bsonType: "string"} 
                    }
                },
                Genero:{
                bsonType: "string",
                description: "informe corretamente o genero do cliente" 
                },
                Profissao:{
                bsonType: "string",
                description: "informe corretamente o profissão do cliente"},
                Contas:{
                    bsonType:"object",
                    required:["Numero_Conta", "Tipo", "CPF", "Valor","Agência"],
                    properties:{
                        Numero_Conta:{
                            bsonType: "string"  
                        },
                        Tipo:{
                            bsonType: "string",
                            enum:["Conta corrente", "Conta poupança", "Conta salário"]  
                        },
                        CPF:{
                            bsonType: "string",
                            minLength:14,
                            maxLength:14 
                        },
                        Valor:{
                            bsonType: "double"  
                        },
                        Agência:{
                            bsonType: "string"     
                        }
                    }
                }
            }     
        }

    }
})


db.clientes.insertOne({
"_id": 3,
"Nome": "Luan Caio da Silva",
"CPF": "520.233.763-94",
"Data_Nascimento": "14/10/1949",
"Genero": "Masculino",
"Profissao": "Atendente de farmácia",
"Endereco": {
    "Rua": "João Alberto",
    "Numero": 224,
    "Bairro": "Santa Clara",
    "Cidade": "São Luís",
    "Estado": "MA",
    "CEP": "65058-623"
    },
    "Rua": "Rua das Camelias",
    "Numero": 333,
    "Bairro": "Santa Tereza",
    "Cidade": "São Luís",
    "Estado": "MA",
    "CEP": "65058-623"
    },
"Contas": {
    "Numero_Conta": "67314-4",
    "Agência": "5575",
    "Tipo": "Conta poupança",
    "CPF": "520.233.763-94",
    "Valor": 2.860
    },
"Status_Civil": "Viúvo(a)"
})

db.clientes.find({})


use modelagem_02

db.clientes. insertOne({
    "_id": 3,
    "Nome": "Marcos Benedito Rodrigues",
    "CPF": "099.632.834-38",
    "Data Nascimento": "18/10/1972",
    "Genero": "Masculino",
    "Profissao": "Professor do EJA ensino fundamental",
    "Status Civil": "Divorciado(a)"
})

db.endereco.insertMany([
    {"_id": 1,
    "creator" : {
        "$ref": "clientes",
        "$id":3,
        "$db": "modelagem02"},
    "Rua": "Rua das Acácias",
    "Numero": 287,
    "Bairro":"Centro",
    "Cidade": "Parnamirim",
    "Estado":"RN",
    "CEP":"59140-030"
},{
    "_id": 2,
    "creator" : {
        "Sref": "clientes",
        "$id":3,
        "$db": "modelagem02"},
        "Rua": "Rua das Acácias",
    "Numero": 287,
    "Bairro":"Centro",
    "Cidade": "Parnamirim",
    "Estado": "RN",
    "CEP":"59140-030"
    }])

db.contas.insertOne({
    "_id": 1,
    "creator" : {
        "$ref": "clientes",
        "$id":3,
        "$db": "modelagem02"},
    "Numero_Conta": "1095052-4",
    "Agência": "5575",
    "Tipo": "Conta poupança",
    "CPF: 099.632.834-38",
    "Valor": 9.855
})

db.endereco.find({})



use("Livraria02")



db.createCollection("Livros",{ 
        validator:{
            $jsonSchema:{
                bsonType: "object",
                required:[ "ID", "Editora","Autor", "Título","Páginas","Gênero","Preço"],
                properties:{
                    ID:
                        {bsonType: "int"},
                    Editora:
                        {bsonType: "object",
                    required:[ "ID", "id_livro", "Nome","Telefone"],
                    properties:{
                        ID:
                            {bsonType: "int"},
                        Nome:
                            {bsonType: "string"},
                        Telefone:
                            {bsonType: "string"}
                    }}, 
                    Autor:
                        { bsonType: "object",
                    required:[ "ID", "Nome","Data_Nascimento","Email","Telefone"],
                    properties:{
                        ID:
                            {bsonType: "int"},
                        Nome:
                            {bsonType: "string"},
                        Data_Nascimento:
                            {bsonType: "string"},
                        Email:
                            {bsonType: "string"},
                        Telefone:
                            {bsonType: "string"}
                    }}, 
                    Título:
                        {bsonType: "string"},
                    Páginas:
                        {bsonType: "string"},
                    Gênero:
                        {bsonType: "string"},
                    Preço:
                        {bsonType: "double"}
                }
            }  
        }          
    })
    

//----------------------------- ESTRUTURAÇÃO DO DADOS DE FORMA HIERÁRQUICA -----------------------------// 

    
use modelagem_03

db.createCollection("Pai")

db.Pai.insertMany(
    [{
        _id: "Colaborador01", parent:"Supervisor02"
    },
    {
        _id: "Colaborador02", parent:"Supervisor02"
    },
    {
        _id: "Supervisor02", parent:"Gerente"
    },
    {
        _id: "Supervisor01", parent:"Gerente"
    },
    {
        _id: "Gerente", parent:"Gerente Geral"
    },
    {
        _id: "Gerente Geral", parent: null
    }
    ])
    
db.Pai.findOne({_id:"Supervisor02"}).parent



db.createCollection("Filho")

db.Filho.insertMany([
    {
        _id:"Colaborador01", children: []
    },
    {
        _id:"Colaborador02", children: []
    },
    {
        _id:"Supervisor01", children: []
    },
    {
        _id:"Supervisor02", children: ["Colaborador01", "Colaborador02"]
    },
    {
        _id:"Gerente", children: ["Supervisor01", "Supervisor02"]
    },
    {
        _id:"Gerente Geral", children: ["Gerente"]
    }
    ])
    
db.Filho.findOne({_id:"Gerente"}).children


db.createCollection("Ancestrais")

db.Ancestrais.insertMany(
    [{
        _id:"Colaborador01", ancestors:["Gerente Geral", "Gerente", "Supervisor02"], parent: "Supervisor02"
    },
    {
        _id:"Colaborador02", ancestors:["Gerente Geral", "Gerente", "Supervisor02"], parent: "Supervisor02"
    },
    {
        _id:"Supervisor02", ancestors:["Gerente Geral", "Gerente", "Supervisor02"], parent: "Gerente"
    },
    {
        _id:"Supervisor01", ancestors:["Gerente Geral", "Gerente"], parent: "Gerente"
    },
    {
        _id:"Gerente", ancestors:["Gerente Geral"], parent: "Gerente Geral"
    },
    {
        _id:"Gerente Geral", ancestors:[], parent: null
    }
    ])
    

db.Ancestrais.findOne({_id:"Supervisor01"}).ancestors

db.Ancestrais.findOne({_id:"Supervisor01"}).parent




db.createCollection("Materializados")

db.Materializados.insertMany(
    [{
        _id:"Gerente Geral", path: null
    },
    {
        _id:"Gerente", path:"Gerente Geral"
    },
    {
        _id:"Supervisor01", path: "Gerente Geral", "Gerente"
    },
    {
        _id:"Supervisor02", path: "Gerente Geral", "Gerente"
    },
    {
        _id:"Colaborador01", path: "Gerente Geral", "Gerente", "Supervisor02"
    },
    {
        _id:"Colaborador02", path: "Gerente Geral", "Gerente", "Supervisor02"
    }
    ])
    
    
    
db.Materializado.findOne({path:"Gerente Geral"})



db.createCollection("aninhados")


db.aninhados.insertMany( [
   { _id: "Gerente Geral", parent: 0, left: 1, right: 12 },
   { _id: "Gerente", parent: "Gerente Geral", left: 2, right: 11 },
   { _id: "Supervisor01", parent: "Gerente", left: 3, right: 4 },
   { _id: "Supervisor02", parent: "Gerente", left: 5, right: 10 },
   { _id: "Colaborador01", parent: "Supervisor02", left: 6, right: 7 },
   { _id: "Colaborador02", parent: "Supervisor02", left: 8, right: 9 }
] )



//----------------------------- CONTROLE DE VERSÃO DE SCHEMAS -----------------------------// 

use modelagem_02

db.clientes.insertOne({
    "_id": 6,
    "schema_version": "2",
    "Nome": "Catarina Sebastiana Baptista",
    "CPF": "138.934.992-61",
    "Data Nascimento": "14/07/2003",
    "Genero": "Feminino",
    "Profissao": "Atendente de lanchonete",
    "Status Civil": "Casado(a)",
    "Salario": 2.500})

db.endereco.insertOne({
    "_id": 5,
    "id_cliente": 6,
    "Rua": "João Aires Leitão",
    "Numero": 534,
    "Bairro":"Paraviana",
    "Cidade": "Boa Vista",
    "Estado":"RR",
    "CEP":"69307-370"})

db.contas.insertOne({
    "_id": 8,
    "id_cliente": 6,
    "Numero_Conta": "50453-8",
    "Agência": "5575",
    "Tipo": "Conta poupança",
    "CPF": "138.934.992-61",
    "Valor": 1.227})
    
    
db.clientes.find()


//----------------------------- OPERAÇÕES ATÔMICAS -----------------------------// 

use livraria03

db.livros.insertOne({
    _id: 1,
    titulo: "MongoDB: Construa novas aplicações com novas tecnologias",
    autor: ["Fernando Boaglio"],
    data_publicacao: ISODate("2015-01-24"),
    paginas: 244,
    linguagem: "Português",
    id_editora: "Casa do código",
    Estoque: 3,
    checkout: [{por: "David", data: ISODate("2022-10-15")}]
})

db.livros.find()

db.livros.updateOne(
    {_id: 1, Estoque: {$gt: 0}},
    {
        $inc: {Estoque: -1},
        $push: {checkout: {por: "Danielle", data: new Date() } }
    }
)

db.livros.find()

//----------------------------- REFERÊNCIA ESTENDIDA -----------------------------// 

use vendas

db.clientes.insertOne({
    "_id": 1,
    "Nome": "Melissa Joana Mendes",
    "cpf": "738.424.165-04",
    "Data Nascimento": "13/10/1957",
    "Genero": "Feminino",
    "Empresa": "Alimentos LTDa",
    "Profissao": "Assistente administrativo",
})

db.endereco.insertOne({
    "Rua": "Travessa João Passos",
    "Numero": 191,
    "Bairro":"Olaria",
    "Cidade": "Aracaju",
    "Estado":"SE",
    "CEP":"49092-200"
})


db.clientes.insertOne({
    "_id": 1,
    "Nome": "Melissa Joana Mendes",
    "cpf": "738.424.165-04",
    "Data Nascimento": "13/10/1957",
    "Genero": "Feminino",
    "Empresa": "Alimentos LTDa",
    "Profissao": "Assistente administrativo",
    "Endereco":{
            "Rua": "Travessa João Passos",
            "Numero": 191,
            "Bairro":"Olaria"
        }
})

db.endereco.insertOne({
    "Rua": "Travessa João Passos",
    "Numero": 191,
    "Bairro":"Olaria",
    "Cidade": "Aracaju",
    "Estado":"SE",
    "CEP":"49092-200"
})

db.clientes.find()











