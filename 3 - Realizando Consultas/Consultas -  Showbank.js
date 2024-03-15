use showbank_02

db.version()

db.hostInfo()

db.getName()

db.stats()

db.listCommands()

db.help()


// Importar Banco de Dados com o Mongo Import

/*
Cada parâmetro especificado no comando tem um objetivo.

--db: Para identificar o banco de dados.
--collection: Para identificar em qual coleção o arquivo será importado.
--type: Para informar o tipo do arquivo.
--headerline: Para indicar que a primeira linha do arquivo CSV é cabeçalho, ou seja, os nomes das colunas.
--file: Para informar o local onde o arquivo está salvo em seu ambiente.
--jsonArray: Para indicar que no arquivo existe um array.
*/

// mongoimport.exe --db=showbank_02 --collection=contas --type=csv --headerline --file="C:\Users\rodrigo.s.costa\Desktop\TRAINNING\ALURA\MongoDB\3 - Realizando Consultas\Material de Apoio\contas.csv"
// mongoimport.exe --db=showbank_02 --collection=endereco --type=csv --headerline --file="C:\Users\rodrigo.s.costa\Desktop\TRAINNING\ALURA\MongoDB\3 - Realizando Consultas\Material de Apoio\endereco.csv"
// mongoimport.exe --db=showbank_02 --collection=clientes --file="C:\Users\rodrigo.s.costa\Desktop\TRAINNING\ALURA\MongoDB\3 - Realizando Consultas\Material de Apoio\clientes.json" --jsonArray


db.clientes.find() // Retorna todos os clientes

db.clientes.findOne() // Retorna o primeiro cliente da coleção

db.contas.find() // Retorna todos as contas

db.enderecos.find()  // Retorna todos os endereços

db.endereco.renameCollection("enderecos") // Renomear a coleção

// Operadores de comparação

/* $eq $gt $gte $lt $lte

O operador "igual a" equivale ao termo $eq;

O operador "maior que" equivale ao termo $gt;

O operador "maior ou igual a" equivale ao termo $gte;

O operador "menor que" equivale ao termo $lt;

O operador "menor ou igual a" equivale ao termo $lte.

*/

db.clientes.find()

db.clientes.find({ genero:"Masculino" })

db.clientes.find({genero:{$eq:"Masculino"}})

db.contas.find()

db.contas.find({valor:{$gt:9000}})

db.contas.find({valor:{$lt:1000}})

db.clientes.find()

db.clientes.find({status_civil:{$in:["Viúvo(a)","Casado(a)"]}})

db.clientes.find({ genero:"Masculino" })

db.clientes.find({genero:{$eq:"Masculino"}})

db.contas.find()

db.contas.find({valor:{$gt:9000}})

db.contas.find({valor:{$lt:1000}})


// Operadores de lógicos

db.contas.find()

db.contas.find({$and:[{tipo:{$eq:"Conta salário"}}]})

db.contas.find({$and:[{tipo:{$eq:"Conta salário"}},{$gt:9000}}])

db.contas.find({$or:[{tipo:{$eq:"Conta salário"}},{$gt:9000}}])

db.enderecos.find()

db.enderecos.find({estado:{$not:{$eq:"SP"}}})

db.clientes.find()

db.clientes.find({dependentes:{$exists:false}})

db.clientes.find({dependentes:{$exists:true}})

db.clientes.find({seguros:{$exists:true}})

db.clientes.find({seguros:{$exists:true}})

db.clientes.find({seguros:{$type:2}})


// Operadores de matriz

db.clientes.find()

db.clientes.find({seguros:{$exists:true}})

db.clientes.find({dependentes:{$exists:true}})

db.clientes.find({seguros:{$all:["seguro de vida", "seguro para carro"]}})

db.clientes.find({dependentes:{$size:2}})

db.clientes.find({dependentes:{$size:2}})

db.clientes.find({dependentes:{$size:2}},{dependentes:{$slice:1}})

db.clientes.renameCollection("clientes")

db.contas.renameCollection("contas")

db.enderecos.renameCollection("enderecos")

db.clientes.find({ idade: { $gt: 26 } }, { nome: 1, email: 1, _id: 0 });


// Cursores de modificação

db.contas.find()

db.contas.find().limit(5)

db.contas.find().skip(200)

db.contas.find().limit(5).skip(200)

db.clientes.find().sort({nome:1})

db.clientes.find().sort({nome:-1})

db.clientes.find().count()

db.clientes.count()

db.contas.distinct("tipo")

db.clientes.find({ status_civil:"Separado(a)" })

db.clientes.find({status_civil:{$eq:"Separado(a)"}})

db.contas.find({valor:{$exists:false}})

db.clientes.find({dependentes:{$size:1}}).limit(5)

db.contas.find({$or:[{tipo:{$in:["Conta salário","Conta poupança"]}},{valor:{$gte:8500}}]})

db.clientes.find({$and:[{status_civil:{$eq:"Solteiro(a)"}},{seguros:{$exists:true}}]}).sort( { nome: 1 } )

/*MapReduce é um modelo de programação e um método de processamento de dados distribuído. Usado para realizar consultas em grandes conjuntos de dados, como os encontrados em bancos de dados NoSQL no MongoDB. O MapReduce divide a consulta em tarefas menores que são executadas em paralelo em vários nós de processamento, o que torna a consulta mais rápida e escalável.

O processo do MapReduce consiste em duas fases:

Map: Nesta fase a consulta é dividida em tarefas menores, cada uma delas sendo aplicada a um subconjunto dos dados.
Reduce: Nesta fase os resultados parciais são combinados para produzir o resultado final da consulta.
No MongoDB, o MapReduce é usado para realizar consultas em coleções existentes. Como já estudamos anteriormente, cada coleção pode ter documentos com estruturas diferentes, ou seja, não há um esquema rígido que precise ser seguido ao inserir dados em uma coleção. Como resultado, as consultas em coleções podem ser complexas e o MapReduce é uma maneira eficaz de lidar com essas consultas.

Nessa perspectiva, o MapReduce no MongoDB é executado em três etapas. Observe a seguir as características de cada uma:

Map: A primeira etapa é a fase de map, que divide a consulta em tarefas menores. Cada tarefa é executada em um nó do cluster e produz um conjunto de resultados parciais.
Reduce: Na segunda etapa, a fase de reduce, os resultados parciais são combinados em um único resultado final. Isso é feito por meio de uma função de redução que agrega os resultados parciais.
Finalize: Na terceira etapa, a fase de finalização, uma função opcional é aplicada ao resultado final para fazer uma limpeza ou processamento adicional.
Embora o MapReduce esteja obsoleto a partir da versão 5.0 do MongoDB, temos a possibilidade de usar no seu lugar a pipeline de agregação. Sendo esta um ou mais estágios que processam documentos, fornecendo melhor desempenho e uma maior usabilidade.*/


// ------------ Estágios de agregação ------------ //


// Estágio Count

db.clientes.find().count()

db.clientes.count()

db.clientes.aggregate()

db.clientes.aggregate({})

db.clientes.aggregate({$count:"contagem de clientes"})

// Estágio Group

db.contas.aggregate({$group:})

db.contas.aggregate({$group:{_id:"$tipo"}})

db.contas.aggregate({$group:{_id:"$tipo", contagem:{$count:{}}}})

db.vendas.aggregate([{    
    $group: {
        _id : "$id_cliente",
        quantidade: { $count:{} }    } }])
        
    
// Outros Estágios

db.contas.find().limit()

db.contas.find().limit(10)

db.contas.aggregate({$limit:5})

db.contas.find().skip(10)

db.contas.aggregate({$limit:5})

db.contas.find().sort({valor:1})

db.contas.aggregate([{$sort:{valor:-1}}])

db.contas.aggregate([{$limit:5}, {$skip:5}])

db.contas.aggregate([{$limit:10}, {$skip:5}])

db.contas.aggregate([{$skip:15}, {$limit:10}])

db.contas.aggregate([{$skip:15}, {$limit:10}],{$sort:{valor:-1}})

// Matrizes e Filtros

db.clientes.find({seguros:{$exists:true}})

db.clientes.aggregate([{$unwind:"$seguros"}])

db.clientes.aggregate([{$unwind:"$seguros"}, {$sortByCount:"$genero"}])

db.enderecos.aggregate([{$match:{cidade:"Recife"}}])

db.contas.aggregate([
    {$match:{$and:[{tipo:{$eq:"Conta salário"}}, {valor:{$gt: 3500}}]}}
    ])
    
db.contas.aggregate([
    {$match:{$and:[{tipo:{$eq:"Conta salário"}}, {valor:{$gt: 8500}}]}}
    ])
    
db.contas.aggregate([
    {$match:{$and:[{tipo:{$eq:"Conta salário"}}, {valor:{$gt: 8500}}]}},
    {$group:{_id:"$tipo",contagem:{$count:{}}}}
    ])
    
db.contas.aggregate([
    {$match:{$and:[{tipo:{$eq:"Conta salário"}}, {valor:{$gt: 8500}}]}},
    {$group:{_id:"$tipo",contagem:{$count:{}}}}
    ])
    
    
// Lookup

db.clientes.find()

db.contas.find()

db.clientes.aggregate([{
    $lookup:{
        from:"contas",
        localField:"cpf",
        foreignField:"cpf",
        as:"clientes_contas"
    }
}])

db.clientes.aggregate([{
    $lookup:{
        from:"contas",
        localField:"cpf",
        foreignField:"cpf",
        as:"clientes_contas"
    }},
    {$project:{_id:0, data_nascimento:0, genero:0, profissao:0}},
    {$limit:5}
    ])



db.coleção.aggregate( [
   { $project: { _id: 0 } },
   { $unionWith: {""} }
])

db.enderecos.aggregate({ 
    $match: { cidade:{ $eq:"Aracaju"}} 
})

db.contas.aggregate([ 
    { $match: { tipo:{ $eq:"Conta corrente"}} },
    {$limit:5}
])

db.clientes.aggregate( [
  { $match: { profissao:{ $eq:"Analista de sistemas"}} },
  {$group:{_id:"$profissao",contagem:{$count:{}}}}
] )

db.clientes.aggregate([ 
    {$match:{status_civil:"Solteiro(a)"}}, 
    {$limit:5}, 
    {$sort:{nome:1}}, 
    {$project:{_id:0, nome:1, status_civil:1}},
])

db.contas.aggregate( [
  { $match: { $or: [ { tipo: { $eq:"Conta salário" } }, { valor: { $lt: 2000 } } ] } },
  {$project:{_id:0, cpf:1, tipo:1, valor:1}},
  {$sort:{valor:1}}
] )

// Operadores aritméticas

db.clientes.aggregate({
    $project:
        {
         valor: $rand:{}
        }
})

db.clientes.aggregate({
    $project:
        {
            _id:0,
         valor: $rand:{}
        }
})

db.clientes.aggregate({
    $project:
        {
            _id:0,
         valorRound: 
         {
              $round:{
                 $rand:{}
                    }
          }
         }
})


db.clientes.aggregate({
    $project:
        {
            _id:0,
         valorRound: 
         {
              $round:[{
                 $rand:{}
                    },3]
          }
         }
})


db.clientes.aggregate({
    $project:
        {
            _id:0,
         valorTrunc: 
         {
              $trunc:[{
                 $rand:{}
                    },3]
          }
         }
})


db.contas.aggregate([{
   $project:{
          _id:0
                valor:1,
      }
}])


db.contas.aggregate([{
   $project:{
        _id:0,
        valor:1,
        dividido:{
            $divide:["$valor",2]
        }
    }
}])


db.contas.aggregate([{
   $project:{
        _id:0,
        valor:1,
        multiplicado:{
            $multiply:["$valor",2]
        }
    }
}])


// Operadores String

db.clientes.aggregate([{

}])

db.clientes.aggregate([{

}])

db.clientes.find().limit(1)

db.clientes.aggregate([{
    $project:{
            descriçao:{
            $concat:["$nome"," - ", "$cpf"]
        }
    }
}])

db.clientes.find().limit(1)

db.clientes.aggregate([{
    $project:{
            descriçao:{
                $split:["$nome"," "]
                }
        }
}])

db.clientes.aggregate([{
    $project:{
            descriçao:{
                $toLower:"$nome"
                }
        }
}])

db.clientes.aggregate([{
    $project:{
            descriçao:{
                $toUpper:"$nome"
                }
        }
}])

db.contas.find()

db.contas.aggregate({
   $project:{
         valor:{
                 $toString:"$valor"
             }
      }
})

db.contas.aggregate({
    $project:{
            descrição:{
                    $concat:[
                             "O cliente de CPF ", "$cpf", " possui o valor de ", {$toString:"$valor"}, " na ", "$tipo"
                                 
                                ]
                }
      }
})

db.produto.aggregate({
    $project:{
        descrição:{
            $toLower:{
                $concat:[
                    "O produto ", "$descrição_produto", " possui o valor de ", {$toString:"$valor"}
                ]
            }
        }
    }
})

// Operadores de Data

use data

db.clientes.find()

db.getCollection("clientes").insert({
    "nome": "Calebe Danilo Roberto Figueiredo", 
        "cpf": "028.796.232-60",
        "data_nascimento": ISODate("1986-10-01T18:00:00.000-03:00"),
        "genero": "Masculino",
        "profissao": "Supervisor de vendas comercial",
        "status_civil": "Viúvo(a)"
})

db.clientes.insertOne({
    "nome": "Calebe Danilo Roberto Figueiredo", 
        "cpf": "028.796.232-60",
        "data_nascimento": ISODate("1986-10-01T18:00:00.000-03:00"),
        "genero": "Masculino",
        "profissao": "Supervisor de vendas comercial",
        "status_civil": "Viúvo(a)"
})

db.clientes.insertOne({
    "nome": "Calebe Danilo Roberto Figueiredo", 
        "cpf": "028.796.232-60",
        "data_nascimento": ISODate("1986-10-01"),
        "genero": "Masculino",
        "profissao": "Supervisor de vendas comercial",
        "status_civil": "Viúvo(a)"
})

db.clientes.find()

db.clientes.insertOne({
    "nome": "Calebe Danilo Roberto Figueiredo", 
        "cpf": "028.796.232-60",
        "data_nascimento": ISODate("1986-10-01T18:00:00.000-03:00"),
        "genero": "Masculino",
        "profissao": "Supervisor de vendas comercial",
        "status_civil": "Viúvo(a)"
})

db.clientes.find()

db.clientes.insertOne({
    "nome": "Calebe Danilo Roberto Figueiredo", 
        "cpf": "028.796.232-60",
        "data_nascimento": new Date(),
        "genero": "Masculino",
        "profissao": "Supervisor de vendas comercial",
        "status_civil": "Viúvo(a)"
})

db.clientes.find()

db.clientes.aggregate([{
    $project:{
            ano:{
                    $year:"$data_nascimento"
                }
        }
}])

db.clientes.aggregate([{
    $project:{
            nome:1,
            ano_nascimento:{
                    $year:"$data_nascimento"
                }
        }
}])

db.clientes.aggregate([{
    $project:{
            nome:1,
            mes_nascimento:{
                    $month:"$data_nascimento"
                }
        }
}])

db.clientes.aggregate([{
    $project:{
            nome:1,
            diasemana:{
                    $dayOfWeek:"$data_nascimento"
                }
        }
}])

db.clientes.aggregate([{
    $project:{
                data:{
                    $dateToParts:{"$data_nascimento"}
                }
        }
}])

// Operadores Acumuladores

db.contas.aggregate({
    $group
})

db.contas.aggregate({
    $group:{
            _id:"$tipo",
})

db.contas.aggregate({
    $group:{
            _id:"$tipo",
                media:{
                    $avg:"$valor"
})

db.contas.aggregate({
    $group:{
            _id:"$tipo",
                valorMaximo:{
                    $max:"$valor"
                }
        }
})

db.contas.aggregate({
    $group:{
            _id:"$tipo",
                valorMinimo:{
                    $min:"$valor"
                }
        }
})

db.contas.aggregate({
    $group:{
            _id:"$tipo",
                contagem:{
                    $count:{}
                }
        }
})

db.contas.aggregate({
    $group:{
            _id:"$tipo",
                Total:{
                    $sum:"$valor"
                }
        }
})

db.contas.aggregate({
    $group:{
            _id:"$tipo",
                Total:{
                    $sum:"$valor"
                }, 
                Media:{
                    $avg:"$valor"
        }    
        }
})

db.contas.aggregate([
    {$match:{tipo:"Conta poupança"}}
   { $group:{
            _id:"$tipo",
                Total:{
                    $sum:"$valor"
                }, 
                Media:{
                    $avg:"$valor"
        }    
        }
])

db.produtos.aggregate([
    {$group:{
        _id:null,
        Soma:{$sum:"$valor"},
        Media:{$avg:"$valor"},
        Maximo:{$max:"$valor"},
        Minimo:{$min:"$valor"}
    }
},{
    $project: {
      _id: 0    }  }
])


db.produtos.aggregate([
    {$group:{
        _id:null,
        Soma:{$sum:"$valor"},
        Media:{$avg:"$valor"},
        Maximo:{$max:"$valor"},
        Minimo:{$min:"$valor"}
    }
},{
    $project: {
      _id: 0    }  }
])


// Operadores Condicionais

db.contas.aggregate([{
   $project:{
         cpf:1,
             tipo:1,
             valor:1,
             valores:{
                 $cond:[{$gte:["$valor",8000]}, "VERDADEIRO", "FALSO"]
             }
        }
}])


// Operador ifNull

db.contas.aggregate([{
    $project:{
            valor:{
                    $ifNull:["$valor", "Não Especificado"]
                }
       }
}])

// Operador switch

db.contas.aggregate([
    {
        $project: {
            valor: 1,
            condicao: {
                $switch: {
                    branches: [
                        {
                            case: { $lte: ["$valor", 3000] },
                            then: "valor abaixo do esperado"
                        },
                        {
                            case: {
                                $and: [
                                    { $gt: ["$valor", 3000] },
                                    { $lte: ["$valor", 6000] }
                                ]
                            },
                            then: "valor na media"
                        }
                    ],
                    default: "valor acima do esperado"
                }
            }
        }
    }
]);


/*

O método aggregate é uma poderosa ferramenta utilizada no MongoDB, pois através dela podemos realizar consultas complexas em dados armazenados em suas coleções. Esse método permite que sejam aplicados diversos operadores, incluindo operadores de comparação, lógicos e matriz, para filtrar, agrupar e analisar dados de uma coleção. Então, vamos conhecer um pouco mais sobre esses operadores.

Operadores de Comparação:
Os operadores de comparação, como $gt (maior que), $lt (menor que) e $eq(igual a), $ne (diferente de), são usados para comparar valores em documentos de uma coleção e retornar resultados que atendem a determinadas condições. Esses operadores são usados com frequência em conjunto com o operador $match, que é responsável por filtrar documentos que atendem às condições especificadas.

Operadores Lógicos:
Os operadores lógicos, como $and, $or e $not, são usados para combinar condições em consultas. O operador $and, por exemplo, permite que múltiplas condições sejam combinadas em uma única consulta. Já o operador $or permite que duas ou mais condições sejam combinadas em uma consulta, e o operador $not nega uma condição.

Operadores de Matriz:
Os operadores de matriz, como $zip e $size, são usados para trabalhar com campos de matriz em documentos de uma coleção. O operador $zip, por exemplo, é usado para mesclar dois arrays juntos. Já o operador $size é usado para retornar o número de elementos existentes em uma matriz.

Expressões Trigonométricas:
Os operadores de expressões trigonométricas, como $sin, $cos e $tan, são usados para executar cálculos trigonométricos em dados armazenados em uma coleção MongoDB. Esses operadores podem ser usados para calcular valores com base em informações baseadas em ângulos.

Operadores aritméticos:

$multiply: Realiza a multiplicação de valores.
$divide: Realiza a divisão de valores.
$round: Realiza o arredondamento de um número para um inteiro ou para uma casa decimal especificada na consulta.
Operadores de string:

$split: Divide uma string em substrings com base em um delimitador.
$toLower: Converte uma string para letras minúsculas.
$toUpper: Converte uma string para letras maiúsculas.
$concat: Realiza a concatenação de strings.
Operadores de datas:

$year: Retorna o ano de uma data.
$month: Retorna o mês de uma data.
$dayOfWeek: Retorna o dia da semana para uma data.
Operadores acumuladores:

$avg: Retorna a média de valores.
$max: Retorna o valor máximo de um campo.
$min: Retorna o valor mínimo de um campo.
$sum: Retorna uma soma de valores.
Operadores de condicional:

$cond: Realiza a avaliação de expressões booleanas.
$ifNull: Realiza a avaliação de expressões de entrada para valores nulos.
$switch: Avalia uma série de expressões case.
*/

// Método Update

db.clientes.find()

db.clientes.updateOne({"_id":1},{$push:{seguros:"seguro de vida"}})

db.clientes.updateMany({},{$rename:{"cpf":"CPF"}})

// Operador Inc

db.contas.updateOne({cpf:"410.436.439-82"},{$inc:{valor:-2000}})

db.contas.find({cpf:"410.436.439-82"})


// Método FindAndModify

db.contas.find({_id:34})

db.contas.updateOne({id:34},{$unset:{""}})

db.contas.findAndModify({query:{_id:34}, update:{$unset:{valor:""}}})

db.contas.findAndModify(
    {query:{_id:34}, 
    update:{$unset:{valor:2300}},
    new:true
})

db.contas.find({valor:{$lt:500}}).sort({valor:1})

db.contas.findAndModify({
    query:{valor:{$lt:500}},
    sort:{valor:1},
    update:{$inc:{valor:1000}},
    new:true
})

// Método FindOneAndUpdate

db.contas.find({_id:35})

db.contas.findOneAndUpdate(
    {_id:34},
    {$set:{valor:5149.86}},
    {returnNewDocument:true}
)

// Método FindOneAndReplace

db.clientes.find({_id:4})

db.clientes.findOneAndReplace(
    {_id:4},
    {"nome": "Geraldo Benedito Ian",
    "data_nascimento": ISODate("1977-06-02T18:00:00.000-03:00"),
    "genero": "Masculino",
    "profissao": "Operador",
    "status_civil": "Viúvo(a)",
    "CPF": "845.939.560-05"})
    
db.clientes.findOneAndReplace(
    {_id:4},
    {"nome": "Geraldo Benedito Ian",
    "data_nascimento": ISODate("1977-06-02T18:00:00.000-03:00"),
    "genero": "Masculino",
    "profissao": "Operador",
    "status_civil": "Viúvo(a)",
    "CPF": "845.939.560-05"},
    {projection:{nome:1, profissao:1},
    returnNewDocument:true
    })
    
// Método FindOneAndDelete

db.contas.find({valor:{$lt:500}}).sort({valor:1})

db.contas.findOneAndDelete({valor:{$lt:500}},{sort:{valor:1}})





































































