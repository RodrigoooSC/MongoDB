// SCRIPT DE MODELAGEM E VALIDAÇÃO DE BANCO E COLEÇÕES NO MONGODB

use showbank

// Coleção Clientes
// Nome: String 
// Cpf: String
// Data de nascimento: String
// Genero: String
// Profissão: String
// Endereço: String 
// Status cívil: String


// Coleção Contas
// Numero conta: String
// Agência: String
// Cpf: String 
// Tipo: String 
// Valor: Double 


//------------------------------------- CRIANDO COLEÇÕES -------------------------------------//

db.createCollection("Clientes", 
    {
        validator: {
            $jsonSchema:{
                bsonType: "object",
                required:["nome", "cpf", "status_civil", "data_nascimento", "endereco"],
                properties:{
                    nome:{
                        bsonType: "string",
                        description: "Informe corretamente o nome do cliente"
                    },
                    cpf:{
                        bsonType: "string",
                        description: "Informe corretamente o cpf do cliente"
                    },
                    status_civil:{
                        bsonType: "string",
                        enum:["Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"],
                        description: "Informe corretamente o status cívil do cliente"
                    },
                    data_nascimento:{
                        bsonType: "string",
                        description: "Informe corretamente a data de nascimento do cliente"
                    },
                    endereco:{
                        bsonType: "string",
                        description: "Informe corretamente o endereço do cliente"
                    }
                }
            }
        }
    }
)

db.createCollection("Produtos",
    { 
        validator:
        {
            $jsonSchema:
            {
             bsonType: "object",
                  required:[ "ID", "Descrição","Embalagem","Quantidade","Preço"],
                  properties:
                  {
                    ID:
                        {bsonType: "int"},
                    Descrição:
                        {bsonType: "string"},
             Embalagem:
                        {bsonType: "string"},
                    Quantidade:
                        {bsonType: "int"},
                    Preço:
                        {bsonType: "double"}
                  }
            }  
        }          
    }
)

db.createCollection("Contas", 
    {
        validator: {
            $jsonSchema:{
                bsonType: "object",
                required:["Numero_conta", "CPF", "Tipo"],
                properties:{
                    Numero_conta:{
                        bsonType: "string",
                        description: "Informe corretamente o numero da conta do cliente"
                    },
                    CPF:{
                        bsonType: "string",
                        description: "Informe corretamente o cpf do cliente na conta"
                    },
                    Tipo:{
                        bsonType: "string",
                        enum:["Conta corrente", "Conta poupança", "Conta salário"],
                        description: "Informe corretamente o tipo de conta do cliente"
                    }
                }
            }
        }
    }
)

//------------------------------------- INSERINDO DOCUMENTOS NAS COLEÇÕES -------------------------------------//

db.Clientes.insertOne({
    "nome": "Allana Esther Lara Monteiro",
    "cpf": "207.596.236-89",
    "data_nascimento": "15/03/2000",
    "genero": "Feminino",
    "profissão": "Desenvolvedora",
    "endereco": "Rua Caldas Novas 2356, Alvorada, São Paulo - SP, CEP: 056897-566",
    "status_civil": "Solteiro(a)"
})

db.Clientes.find()

db.Contas.insertOne({
    "Numero_conta":"04938-1",
    "Agência":"5575",
    "CPF": "207.596.236-89",
    "Tipo":"Conta salário",
    "Valor": 350
})

db.Contas.find()

db.Clientes.insertOne({
    "nome": "Luan Caio da Silva", 
    "cpf": "520.233.763-94", 
    "data_nascimento": "14/10/1949", 
    "gênero": "Masculino", 
    "profissão": "Atendente de farmácia", 
    "endereco": "Rua João Alberto, número 224, Santa Clara, São Luís, MA, 65058-623", 
    "status_civil": "Viúvo(a)"
})

db.Clientes.find()

db.Contas.insertOne({
    "Numero_conta": "67314-4", 
    "Agência": "7147", 
    "Tipo": "Conta poupança", 
    "CPF": "520.233.763-94"
})

db.Contas.find()

//------------------------------------- MODIFICANDO AS REGRAS DE VALIDAÇÕES -------------------------------------//

// Verificar as regras de validação

db.getCollectionInfos({name: "Clientes"})

db.getCollectionInfos({name: "Contas"})

db.runCommand({listCollections: 2})

db.runCommand({listCollections: 1, filter:{name: "Contas"}})

db.runCommand(({collMod: "Clientes",
    validator: {
            $jsonSchema:{
                bsonType: "object",
                "additionalProperties": false,
                required:["_id", "nome", "cpf", "status_civil", "data_nascimento", "endereco", "gênero", "profissão"],
                properties:{
                    _id:{
                        bsonType: "objectId",
                        description: "Informe corretamente o _id do cliente"
                    },
                    nome:{
                        bsonType: "string",
                        maxLength:150,
                        description: "Informe corretamente o nome do cliente"
                    },
                    cpf:{
                        bsonType: "string",
                        minLength: 14,
                        maxLength:14,
                        description: "Informe corretamente o cpf do cliente"
                    },
                    status_civil:{
                        bsonType: "string",
                        enum:["Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"],
                        description: "Informe corretamente o status cívil do cliente"
                    },
                    data_nascimento:{
                        bsonType: ["string", "null"],
                        description: "Informe corretamente a data de nascimento do cliente"
                    },
                    endereco:{
                        bsonType: "string",
                        description: "Informe corretamente o endereço do cliente"
                    },
                    gênero:{
                        bsonType: "string",
                        description: "Informe corretamente o gênero do cliente"
                    },
                    profissão:{
                        bsonType: "string",
                        description: "Informe corretamente a profissão do cliente"
                    }
                }
            }
        }
}))

db.runCommand(({collMod: "Contas",
    validator: {
            $jsonSchema:{
                bsonType: "object",
                "additionalProperties": false,
                required:["_id", "Numero_conta", "CPF", "Tipo", "Valor", "Agência"],
                properties:{
                    _id:{
                        bsonType: "objectId",
                        description: "Informe corretamente o _id da conta do cliente"
                    },
                    Numero_conta:{
                        bsonType: "string",
                        description: "Informe corretamente o numero da conta do cliente"
                    },
                    CPF:{
                        bsonType: "string",
                        minLength: 14,
                        maxLength:14,
                        description: "Informe corretamente o cpf do cliente na conta"
                    },
                    Tipo:{
                        bsonType: "string",
                        enum:["Conta corrente", "Conta poupança", "Conta salário"],
                        description: "Informe corretamente o tipo de conta do cliente"
                    },
                    Valor:{
                        bsonType: "double",
                        description: "Informe corretamente o valor da conta do cliente"
                    },

                    Agência:{
                       bsonType: "string",
                       description: "informe corretamente a agência da conta do cliente"
                        
                    }
                }
            }
        }
}))

//--------------------------- MODIFICANDO AS REGRAS DE VALIDAÇÕES DE DOCUMENTOS EXISTENTES ---------------------------//

db.runCommand({listCollections: 1, filter:{name: "Contas"}})

db.Contas.find()

db.Contas.updateOne({"CPF": "520.233.763-94"}, {$set:{"Valor": 14411}})

db.runCommand(({collMod: "Contas",
    validator: {
            $jsonSchema:{
                bsonType: "object",
                "additionalProperties": false,
                required:["_id", "Numero_conta", "CPF", "Tipo", "Valor", "Agência"],
                properties:{
                    _id:{
                        bsonType: "objectId",
                        description: "Informe corretamente o _id da conta do cliente"
                    },
                    Numero_conta:{
                        bsonType: "string",
                        description: "Informe corretamente o numero da conta do cliente"
                    },
                    CPF:{
                        bsonType: "string",
                        minLength: 14,
                        maxLength:14,
                        description: "Informe corretamente o cpf do cliente na conta"
                    },
                    Tipo:{
                        bsonType: "string",
                        enum:["Conta corrente", "Conta poupança", "Conta salário"],
                        description: "Informe corretamente o tipo de conta do cliente"
                    },
                    Valor:{
                        bsonType: "double",
                        description: "Informe corretamente o valor da conta do cliente"
                    },

                    Agência:{
                       bsonType: "string",
                       description: "informe corretamente a agência da conta do cliente"
                        
                    }
                }
            }
        },
        validationLevel: "moderate"
}))

//--------------------------- TRATANDO DOCUMENTOS INVÁLIDOS ---------------------------//

db.getCollectionInfos({name: "Contas"})

db.getCollectionInfos({name: "Clientes"})

db.runCommand(({collMod: "Contas",
    validator: {
            $jsonSchema:{
                bsonType: "object",
                "additionalProperties": false,
                required:["_id", "Numero_conta", "CPF", "Tipo", "Valor", "Agência"],
                properties:{
                    _id:{
                        bsonType: "objectId",
                        description: "Informe corretamente o _id da conta do cliente"
                    },
                    Numero_conta:{
                        bsonType: "string",
                        description: "Informe corretamente o numero da conta do cliente"
                    },
                    CPF:{
                        bsonType: "string",
                        minLength: 14,
                        maxLength:14,
                        description: "Informe corretamente o cpf do cliente na conta"
                    },
                    Tipo:{
                        bsonType: "string",
                        enum:["Conta corrente", "Conta poupança", "Conta salário"],
                        description: "Informe corretamente o tipo de conta do cliente"
                    },
                    Valor:{
                        bsonType: "double",
                        description: "Informe corretamente o valor da conta do cliente"
                    },

                    Agência:{
                       bsonType: "string",
                       description: "informe corretamente a agência da conta do cliente"
                        
                    }
                }
            }
        },
        validationAction: "warn"
}))

db.runCommand(({collMod: "Clientes",
    validator: {
            $jsonSchema:{
                bsonType: "object",
                "additionalProperties": false,
                required:["_id", "nome", "cpf", "status_civil", "data_nascimento", "endereco", "gênero", "profissão"],
                properties:{
                    _id:{
                        bsonType: "objectId",
                        description: "Informe corretamente o _id do cliente"
                    },
                    nome:{
                        bsonType: "string",
                        maxLength:150,
                        description: "Informe corretamente o nome do cliente"
                    },
                    cpf:{
                        bsonType: "string",
                        minLength: 14,
                        maxLength:14,
                        description: "Informe corretamente o cpf do cliente"
                    },
                    status_civil:{
                        bsonType: "string",
                        enum:["Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"],
                        description: "Informe corretamente o status cívil do cliente"
                    },
                    data_nascimento:{
                        bsonType: ["string", "null"],
                        description: "Informe corretamente a data de nascimento do cliente"
                    },
                    endereco:{
                        bsonType: "string",
                        description: "Informe corretamente o endereço do cliente"
                    },
                    gênero:{
                        bsonType: "string",
                        description: "Informe corretamente o gênero do cliente"
                    },
                    profissão:{
                        bsonType: "string",
                        description: "Informe corretamente a profissão do cliente"
                    }
                }
            }
        },
        validationAction: "warn"
}))

//--------------------------- CONSULTANDO DOCUMENTOS ---------------------------//

// Para localizar e modificar documentos inválidos armazenados nas coleções, podemos utilizar o operador $jsonSchema e realizar a busca com base em um esquema.
// O primeiro passo é definir um objeto de esquema e armazená-lo em uma variável.
// Para criar uma variável, você pode utilizar o comando let

let clientes = {
     $jsonSchema:{
                bsonType: "object",
                "additionalProperties": false,
                required:["_id", "nome", "cpf", "status_civil", "data_nascimento", "endereco", "gênero", "profissão"],
                properties:{
                    _id:{
                        bsonType: "objectId",
                        description: "Informe corretamente o _id do cliente"
                    },
                    nome:{
                        bsonType: "string",
                        maxLength:150,
                        description: "Informe corretamente o nome do cliente"
                    },
                    cpf:{
                        bsonType: "string",
                        minLength: 14,
                        maxLength:14,
                        description: "Informe corretamente o cpf do cliente"
                    },
                    status_civil:{
                        bsonType: "string",
                        enum:["Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"],
                        description: "Informe corretamente o status cívil do cliente"
                    },
                    data_nascimento:{
                        bsonType: ["string", "null"],
                        description: "Informe corretamente a data de nascimento do cliente"
                    },
                    endereco:{
                        bsonType: "string",
                        description: "Informe corretamente o endereço do cliente"
                    },
                    gênero:{
                        bsonType: "string",
                        description: "Informe corretamente o gênero do cliente"
                    },
                    profissão:{
                        bsonType: "string",
                        description: "Informe corretamente a profissão do cliente"
                    }
                }
            }
}

// Após executar o comando e criar a variável, você pode utilizá-la como um filtro para buscar, modificar e remover documentos das coleções.

// Buscando documentos que correspondem ao esquema de validação

db.clientes.find(clientes)

// Buscando documentos que não correspondem ao esquema de validação.

db.clientes.find({$nor:[clientes]})


//--------------------------- IGNORANDO REGRAS DE VALIDAÇÃO DE DOCUMENTOS ---------------------------//

db.runCommand({insert: "Contas",
    
    documents:[
        {
        "Numero_conta": "87564-4", 
        "Agência": "8967", 
        "Tipo": "Conta corrente", 
        "CPF": "123.654.789-12",
        "Valor": 2659
        }
    ],
    bypassDocumentValidation: true
})

db.Contas.find()

db.runCommand({insert: "Clientes",
    
    documents:[
        {
        "nome": "Ernesto da Silva", 
        "cpf": "123.654.789-12", 
        "data_nascimento": "14/10/1949", 
        "gênero": "Masculino", 
        "profissão": "Atendente de farmácia", 
        "endereco": "Rua João Alberto, número 224, Santa Clara, São Luís, MA, 65058-623", 
        "status_civil": "Viúvo(a)"
        }
    ],
    bypassDocumentValidation: true
})

db.Clientes.find()
