// Conexões MONGODB

db.system.users.find()

// Executar em linha de comando
db.createUser({
    user: "admin",
    pwd: "admin123"
})

db.createUser({
    user: "admin",
    pwd: passwordPrompt()
})

db.createUser({
    user: "rodrigo",
    pwd: "rodrigo",
    roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        { role: "readWriteAnyDatabase", db: "admin" }
    ]
})


// mongosh --authenticationDatabase "admin" -u "admin" -p

db.auth("admin", "admin123")


db.createUser({
    user: "ana",
    pwd: "ana123",
    roles: []
})


// mongosh --authenticationDatabase "admin" -u "ana" -p

// mongosh --authenticationDatabase "showbank" -u "ana" -p


db.createUser( {
    user: "rodrigo", 
    pwd: "rodrigo",
    roles: [ 
      { role:"readWrite", db: "showbank" }
    ]  })
    
// MongoDb Roles

db.grantRolesToUser("rodrigo", [{role: "readWrite", db: "showbanck_02"}]) // Permissões de usuário

mongosh --authenticationDatabase "admin" -u "admin" -p

db.getUser("rodrigo")

//mongod --auth


db.adminCommand({shutdown: 1}) // Parar serviço do MongoDB


//Regra de banco
db.createRole({
  role: "RegrasBanco",
  privileges: [
       {resource: {db:showbank, collection: "Clientes"}, actions:{"find", "insert"]}
    ]
roles:[]
})


// Cria  usuario agregado a um regra de banco
db.createUser({
    user: "Paulo",
    pwd: passwordPrompt(),
    customData: {nomecompleto:"José Paulo dos Santos", identificador: 3},
    roles: ["RegrasColecao"]
})


db.changeUserPassword("admin123","123admin")


db.updateUser(
    "Paulo",
    {
        pwd: "paulo123",
     
    })
    
    
db.updateUser(
"Paulo",
{
    pwd: "paulo123",
    customData: {nomecompleto:"José Paulo dos Santos Silva", identificador: 3},
 
})


db.grantRolesToUser(
   "Danielle",
   [
     { role: "readWrite", db: "showbank" }
   ]
)

db.runCommand({
   grantRolesToUser: "Danielle",
   roles: [
      { role: "read", db: "showbank" }
   ]
})

db.createRole(
   {
     role: "RegrasColeção", 
     privileges: [
       { resource: { db: "showbank", collection: "clientes" }, actions: [ "find","insert"] }
     ],
     roles: []
   })











