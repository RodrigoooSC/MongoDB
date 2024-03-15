/*
Uma chave de fragmentação, também conhecida como chave de shard, é um campo ou conjunto de campos em uma coleção no MongoDB que é usado para dividir e distribuir os dados entre os shards em um cluster fragmentado. A escolha adequada da chave de fragmentação é fundamental para obter um desempenho e uma distribuição de dados eficientes no ambiente fragmentado.

Ao selecionar a chave de fragmentação, é importante considerar alguns cuidados:

Cardinalidade: A chave de fragmentação deve ter uma alta cardinalidade, ou seja, um número grande e diversificado de valores possíveis. Isso garante uma distribuição equilibrada dos dados entre os shards. Se a chave tiver uma baixa cardinalidade, como um campo booleano com apenas dois valores possíveis, a fragmentação pode não ser eficiente, levando a um desequilíbrio na distribuição dos dados.

Distribuição uniforme: A chave de fragmentação deve ser escolhida de forma a garantir que os valores sejam distribuídos de maneira uniforme ao longo dos shards. Evite escolher uma chave que tenha uma distribuição desigual dos valores, pois isso pode resultar em hotspots, onde um shard recebe uma carga desproporcional de dados e pode afetar o desempenho do sistema.

Consultas frequentes: Considere as consultas mais frequentes que serão realizadas na coleção. A escolha da chave de fragmentação deve levar em conta os campos que são comumente usados como critérios de consulta. Isso ajuda a melhorar o desempenho, pois as consultas podem ser direcionadas para o shard relevante com base nos valores da chave de fragmentação.

Escalabilidade futura: Pense na escalabilidade do sistema no futuro. A chave de fragmentação escolhida deve permitir a inclusão de novos shards e a expansão do cluster sem exigir grandes alterações na estratégia de fragmentação. Considere as necessidades de crescimento do sistema e escolha uma chave que seja flexível o suficiente para acomodar essa escalabilidade.

Alterações na chave de fragmentação: Tenha cuidado ao alterar a chave de fragmentação após a fragmentação inicial. Mudanças na chave podem exigir um processo de redistribuição de dados, o que pode ser custoso em termos de recursos e tempo. Portanto, é recomendável planejar cuidadosamente a escolha da chave de fragmentação inicialmente para evitar alterações frequentes.

Ao escolher a chave de fragmentação, é importante avaliar esses cuidados para garantir uma fragmentação eficiente e equilibrada dos dados, bem como um desempenho adequado do cluster fragmentado no MongoDB.
*/

use showbank

db.createCollection("clientes")

db.clientes.insertOne({nome:"Danielle", idade:25})


use showbank

db.createCollection("clientes")

sh.shardCollection("showbank.clientes",{_id:1})

/*

   }
  }
 },
 {
  database: {
   _id: 'showbank',
    primary: 'shard2',
    partitioned: false,
    version: {
    uuid: UUID("2192c8c5-8b3f-47b7-9341-2c6646749da8"),
    timestamp: Timestamp({ t: 1684236329, i: 1 }),
    lastMod: 1
    }
 },
 collections: {
   'showbank.clientes': {
    shardKey: { _id: 1 }, 
    unique: false,
        balancing: true,
    chunkMetadata: [{ shard: 'shard2', nChunks: 1 }], 
        chunks: [
      {min: { id: MinKey() }, max: { _id: MaxKey() }, 'on shard': 'shard2', 'last modified': Timestamp({ t: 1, i: 0 }) }
        ],
    tags: []
     }
    }
 }
]
[direct: mongos] test>
*/


use showbank

db.createCollection("clientes")

sh.shardCollection("showbank.clientes",{_id:1})



db.createCollection("contas")



db.createCollection("enderecos")

use showbank

db.createCollection("clientes")

sh.shardCollection("showbank.clientes",{_id:1})



db.createCollection("contas")
sh.shardCollection("showbank.contas",{_id:1})


db.createCollection("enderecos")

/*
// código omitido. 

},
collections: {
  'showbank.clientes': {
   shardKey: (_id: 1 },
   unique: false, 
     balancing: true,
   chunkMetadata: { shard: 'shard2', nChunks: 1 }],
   chunks: [
     {min: { _id: MinKey() }, max: { _id: Maxkey() }, 'on shard': 'shard2', 'last modified': Timestamp({ t: 1, i: 0 }) }
    ],
  tags: []
 },
 'showbank.contas': {
  shardKey: { _id: 1 },
  unique: false,
  balancing: true,
  chunkMetadata:[ { shard: 'shard2', nChunks: 1 }],
  chunks: [
    { min: { _id: MinKey() }, max: { _id: MaxKey() }, 'on shard': 'shard2', last modified': Timestamp({ t: 1, i: 0 }) }
    ],
    tags: []
     }
  }
 }
]



/*
Uma zona é um subconjunto de nós dentro do cluster que compartilham características semelhantes ou têm propriedades específicas e permitem distribuir os recursos de forma mais eficiente e melhorar a resiliência do cluster.

As zonas são utilizadas para organizar os nós em grupos lógicos com características semelhantes, como localização geográfica, capacidades de hardware ou políticas de segurança. As zonas permitem que você distribua e gerencie recursos de forma mais eficiente dentro de um cluster fragmentado, garantindo a otimização dos recursos disponíveis.

O balanceamento é o processo em que o MongoDB redistribui os dados entre os shards do cluster fragmentado, visando alcançar uma distribuição equilibrada e otimizar o desempenho. Durante o balanceamento, o MongoDB move os dados automaticamente entre os shards, considerando as configurações das zonas, a carga de trabalho e a capacidade de armazenamento de cada nó.

O balanceamento em um cluster fragmentado pode ser controlado e configurado pelo administrador do banco de dados. É possível definir políticas de balanceamento para especificar quando e como os dados devem ser movidos entre os shards. Essas políticas podem levar em consideração fatores como a utilização do hardware, latência da rede ou horários de pico de tráfego.

Em resumo, as zonas em um cluster fragmentado no MongoDB permitem organizar os nós em grupos lógicos, enquanto o balanceamento é responsável por redistribuir os dados entre os shards do cluster para garantir uma distribuição equilibrada e otimizar o desempenho. Esses recursos ajudam a melhorar a eficiência, resiliência e escalabilidade do sistema.
*/


