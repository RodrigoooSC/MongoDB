/*
O Docker é uma ferramenta que permite empacotar e executar aplicativos de forma isolada em contêineres. Esses contêineres são como caixinhas que contêm tudo o que um aplicativo precisa para funcionar corretamente, como o código, as bibliotecas e as configurações necessárias.

O Docker torna mais fácil e rápido implantar e executar aplicativos em diferentes ambientes, garantindo que eles funcionem da mesma maneira em qualquer lugar. É como colocar um aplicativo dentro de uma caixa para que ele possa ser movido facilmente de um lugar para outro.
*/

//Criando o servidor de configuração

docker network create mongoNet


docker run --name mongo-config1 --net mongoNet -d mongo mongod --configsvr --replSet serverConfig --port 27018

docker run --name mongo-config2 --net mongoNet -d mongo mongod --configsvr --replSet serverConfig --port 27018

docker run --name mongo-config3 --net mongoNet -d mongo mongod --configsvr --replSet serverConfig --port 27018


docker exec -it mongo-config1 mongosh --port 27018


rs.initiate({
    _id: "serverConfig",
    configsvr: true,
    members: [
        { _id: 0, host: "mongo-config1:27018" },
        { _id: 1, host: "mongo-config2:27018" },
        { _id: 2, host: "mongo-config3:27018" }
    ]
});


// Criando Fragmentos ou Shards

//1 fragmento

docker run --name mongo-shard1a --net mongoNet -d mongo mongod --shardsvr --replSet shard1 --port 27019
docker run --name mongo-shard1b --net mongoNet -d mongo mongod --shardsvr --replSet shard1 --port 27019
docker run --name mongo-shard1c --net mongoNet -d mongo mongod --shardsvr --replSet shard1 --port 27019


//2 fragmento

docker run --name mongo-shard2a --net mongoNet -d mongo mongod --shardsvr --replSet shard2 --port 27020
docker run --name mongo-shard2b --net mongoNet -d mongo mongod --shardsvr --replSet shard2 --port 27020
docker run --name mongo-shard2c --net mongoNet -d mongo mongod --shardsvr --replSet shard2 --port 27020

docker exec -it mongo-shard1a mongosh --port 27019

docker exec -it mongo-shard2a mongosh --port 27020


docker exec -it mongo-shard1a mongosh --port 27019

rs.initiate({
    _id: "serverConfig",
    configsvr: true,
    members: [
        { _id: 0, host: "mongo-shardia:27018" },
        { _id: 1, host: "mongo-shardib:27018" },
        { _id: 2, host: "mongo-shardic:27018" }
    ]
});

rs.initiate({
    _id: "serverConfig",
    configsvr: true,
    members: [
        { _id: 0, host: "mongo-shard2a:27018" },
        { _id: 1, host: "mongo-shard2b:27018" },
        { _id: 2, host: "mongo-shard2c:27018" }
    ]
});

// Criando o servidor de roteamento

docker run -p 27021:27021 --name mongo-router --net mongoNet -d mongo mongos port 27021 --configdb serverConfig/mongo-config1:27018, mongo-config2:27018,mongo-config3:27018 --bind_ip_all


docker exec-it mongo-router mongosh-port 27021


sh.addShard("shard1/mongo-shard1a:27019") 
sh.addShard("shard1/mongo-shard1b:27019") 
sh.addShard("shard1/mongo-shardic:27019")


sh.addShard("shard2/mongo-shard2a:27020","shard2/mongo-shard2b:27020" "shard2/mongo-shard2c:27020")


sh.status()

/*
Um cluster fragmentado no MongoDB, possui 3 componentes: servidor de configuração, fragmentos ou shards e o roteador. Então, vamos relembrar, os comandos executados nesta aula para criar o nosso cluster fragmentado:

Componentes de um cluster:
Config Servers (Servidores de Configuração):

São responsáveis por armazenar os metadados do cluster, como informações sobre as coleções e seus fragmentos. Geralmente, é usado um conjunto de réplicas de servidores de configuração para garantir alta disponibilidade.

Fragmentos (Shards):

São conjuntos de réplicas que armazenam os dados do cluster. Cada fragmento contém apenas uma parte dos dados, com base em critérios de fragmentação específicos.Cada fragmento (shard) é implementado como um conjunto de réplicas (replica set).

Roteadores (Mongos):

São responsáveis pelo roteamento de consultas dos clientes para os shards corretos no cluster fragmentado. Atuam como uma camada de acesso ao cluster fragmentado, direcionando as operações para os shards apropriados com base nas regras de fragmentação configuradas.

Comandos executados:
mongod --configsvr: Inicia um servidor de configuração.

mongod --shardsvr: Inicia um servidor de fragmento (shard).

mongos: Inicia um roteador.

--replSet: Inicia um servidor MongoDB como parte de um conjunto de réplicas (replica set).

--configdb: Utilizado ao iniciar um roteador (mongos) para especificar a conexão com os servidores de configuração.

sh.addShard: É usado para adicionar um shard (fragmento) ao cluster fragmentado. Ele define um novo servidor MongoDB como um shard e o integra ao cluster existente.

sh.status: Exibe o status atual do cluster fragmentado. Ele fornece informações sobre os shards, bancos de dados, coleções e sua distribuição.

Esses comandos desempenham um papel fundamental na criação, configuração e gerenciamento de um cluster fragmentado no MongoDB. Cada um tem uma finalidade específica e é essencial para o funcionamento adequado do cluster.
*/

