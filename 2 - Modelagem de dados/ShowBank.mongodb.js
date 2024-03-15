use("modelagem_02")

original_id = ObjectId()

db.clientes.insertOne({
    "_id": original_id,
    "Nome": "Manoel Carlos Eduardo Kauê Costa", 
    "CPF": "369.584.289-00", 
    "Data_Nascimento": "23/04/1972",  
    "Genero": "Masculino", 
    "Profissao": "Supervisor administrativo", 
    "Status_Civil": "Separado(a)"})

db.contas.insertOne({
    "_id": ObjectId(),
    "id_clientes":original_id,     
    "Numero_Conta": "48948530-6", 
    "Agência": "5575", 
    "Tipo": "Conta corrente", 
    "CPF": "369.584.289-00", 
    "Valor": 6.874})

db.endereco.insertOne({
    "_id": ObjectId(),
    "id_clientes":original_id, 
    "Rua": "Santa Justina Sartori", 
    "Numero": 945,
    "Bairro":"Jardim Porto Alegre", 
    "Cidade":"Toledo", 
    "Estado":"PR", 
    "CEP":"85906-310"})



    use("modelagem_02")
    db.clientes.find({})

    use("modelagem_02")
    db.contas.find({})

    use("modelagem_02")
    db.endereco.find({})

// -------------------------------------------------------------------------------------------- //

    const database = "Livraria";
    
    // Create a new database.
    use(database);   
  

    db.createCollection("Livros",   { 
        validator:  {
            $jsonSchema:   {
             bsonType: "object",
                  required:[ "ID", "id_editora", "id_autor", "Título","Páginas","Gênero","Preço"],
                  properties:  {
                    ID:
                        {bsonType: "int"},
                    id_editora:
                        {bsonType: "int"}, 
                    id_autor:
                        {bsonType: "int"}, 
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

    use(database);

    db.Livros

    db.createCollection("Editora",  { 
        validator:   {
            $jsonSchema:     {
             bsonType: "object",
                  required:[ "ID", "Nome","Telefone"],
                  properties:  {
                    ID:
                        {bsonType: "int"},
                    Nome:
                        {bsonType: "string"},
                    Telefone:
                        {bsonType: "string"}
                  }
            }  
        }          
    })

    db.createCollection("Autor",  { 
        validator:  {
            $jsonSchema:     {
             bsonType: "object",
                  required:[ "ID", "Nome","Data_Nascimento","Email","Telefone"],
                  properties:   {
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
                  }
            }  
        }          
    })

// -------------------------------------------------------------------------------------------- //


