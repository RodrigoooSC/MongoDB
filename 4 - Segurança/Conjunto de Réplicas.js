/*
O que é replicação?
Para garantir a disponibilidade dos dados em todos os momentos, o MongoDB disponibiliza um recurso chamado conjunto de réplicas. De forma resumida e simplificada, o conjunto de réplicas são os nossos dados espelhados em mais de um servidor.

Então, temos um servidor principal, contendo o conjunto de dados, onde iremos inserir e consultar informações, e esses dados seriam duplicados por meio do oplog em servidores secundários, contendo a cópia do conjunto de dados.

Nesse caso, haverá uma redundância, uma duplicação de informações, mas, ao mesmo tempo, iremos garantir a alta disponibilidade.

Os servidores do conjunto de réplicas se comunicam entre si. Dito isso, sempre teremos nosso servidor primário, que vai receber todos os comandos de escrita e a questão da leitura, e ele passará isso para os servidores secundários.

Dessa forma, sempre haverá um servidor contendo uma cópia das informações. Então, caso o servidor primário fique inativo por cerca de 10 segundos, teremos outro servidor para ocupar seu lugar e passar a receber tanto escrita quanto leitura das nossas operações.

Configuração mínima
Visto que teremos mais de um servidor, qual seria a estrutura mínima?

O MongoDB indica que seja criado um conjunto de réplicas com, no mínimo, 3 servidores, isto é, 3 nós, pois caso o nó principal falhe, precisaremos eleger um secundário. Nesse cenário, ocorre justamente uma eleição, e para que ela ocorra, precisamos de pelo menos 2 nós restantes.

Supondo que o nó primário esteja inativo por alguma razão, o que acontece quando ele volta à execução normal? Ele passa a ocupar novamente o lugar do secundário que o substituiu.

Porém, nem sempre precisamos ter 3 nós contendo um conjunto de dados. Às vezes, a empresa tem dados em quantidades menores, como a ShowBank, então não são necessários 3 nós para armazenar os dados. Nesse caso, como podemos trabalhar com um conjunto de réplicas de configuração mínima?

Poderíamos utilizar outro tipo de nó: o nó arbitrário. Esse nó estará presente no conjunto de réplicas, mas não terá informações do nosso conjunto de dados. Ou seja, ele estará no conjunto apenas para participar da eleição e eleger um nó primário, caso haja necessidade.

Dessa forma, evitamos problemas em relação à eleição.

Com essa solução, gastamos menos recursos e menos em processamento de dados, o que aconteceria se usássemos um terceiro nó. Além disso, existem outros sentidos financeiros, pois não precisamos aumentar a questão do armazenamento dos nossos dados.


Em um conjunto de réplicas no MongoDB, a redundância e a disponibilidade de dados são garantidas por meio da replicação dos dados entre os membros do conjunto. Esses recursos são fundamentais para proteger os dados contra falhas de hardware, aumentar a disponibilidade do sistema e permitir operações contínuas mesmo em casos de interrupções.

A replicação no MongoDB funciona ao manter cópias idênticas dos dados em vários membros do conjunto de réplicas. Quando ocorre uma gravação no membro primário, essa operação é registrada no log de operações e replicada para os membros secundários. Dessa forma, cada membro secundário é capaz de aplicar as mesmas gravações e manter uma cópia atualizada dos dados.

A redundância dos dados proporciona uma camada de proteção contra falhas. Se um membro primário falhar, um novo membro primário é eleito a partir dos membros secundários restantes, garantindo a continuidade das operações de gravação e leitura. Os membros secundários podem ser usados para consultas de leitura, distribuindo a carga e melhorando o desempenho geral do sistema.

Além disso, a replicação também desempenha um papel importante na disponibilidade dos dados. Se um membro primário ficar indisponível por qualquer motivo, os clientes ainda podem se conectar aos membros secundários para realizar operações de leitura. Isso permite que o sistema continue funcionando, mesmo durante manutenções planejadas, atualizações de software ou falhas inesperadas.

Em resumo, a redundância e a disponibilidade de dados em um conjunto de réplicas no MongoDB são alcançadas por meio da replicação síncrona ou assíncrona dos dados entre os membros. Isso garante a preservação dos dados, a tolerância a falhas e a disponibilidade contínua do sistema, permitindo que os aplicativos acessem os dados de maneira confiável e eficiente.

*/



//mongod --replSet rs0 --port 27018 --dbpath \Curso\mongodb\rs1

//mongod --replSet rs0 --port 27019 --dbpath \Curso\mongodb\rs2

//mongod --replSet rs0 --port 27020 --dbpath \Curso\mongodb\rs3

//mongod --replSet rs0 --port 27021 --dbpath \Curso\mongodb\arb

//mongosh --port 27018

rs.initiate()

rs.status()

rs.add({host:"localhost:27019"})

rs.add({host:"localhost:27020"})

/*
Em um conjunto de réplicas do MongoDB, vários membros trabalham juntos para fornecer redundância e alta disponibilidade para seus dados. Esses membros podem ser configurados de diferentes maneiras para atender às necessidades específicas do sistema.

Membros Primários (Primary Members): O membro primário é o coração do conjunto de réplicas. Ele recebe todas as operações de gravação e leitura padrão. Todas as gravações são replicadas para os membros secundários. Em caso de falha do membro primário, um novo membro primário é eleito a partir dos membros secundários restantes.
Membros Secundários (Secondary Members): Os membros secundários replicam os dados do membro primário. Eles podem ser usados para consultas de leitura secundária, balanceando a carga de leitura e fornecendo maior disponibilidade de leitura. Os membros secundários podem ser configurados para permitir leituras assíncronas, proporcionando escalabilidade adicional para operações de leitura.
Árbitros (Arbiters): Os árbitros são membros especiais que não armazenam dados do conjunto de réplicas. Eles participam das eleições para determinar um novo membro primário quando necessário. Os árbitros ajudam a manter um número ímpar de votos no conjunto de réplicas para evitar impasses nas eleições. Eles são úteis para garantir a disponibilidade do conjunto de réplicas sem a necessidade de aumentar a capacidade de armazenamento.
Membros Ocultos (Hidden Members): Os membros ocultos são membros secundários que não são elegíveis para se tornarem membros primários. Eles participam do processo de eleição, mas não são visíveis para os clientes. Os membros ocultos podem ser usados para fins de backup, análise de dados ou outros processos, sem afetar a disponibilidade do conjunto de réplicas. Eles recebem todas as operações de gravação e atualização do membro primário.
Membros Atrasados (Delayed Members): Os membros atrasados são membros secundários que replicam os dados com um atraso intencional em relação ao membro primário. Eles são configurados com um atraso de tempo especificado, após o qual alcançam o estado atual dos dados do membro primário. Os membros atrasados são úteis para ter uma janela de tempo para recuperação em caso de exclusões ou atualizações acidentais nos dados.
A configuração de um conjunto de réplicas pode variar dependendo dos requisitos específicos do sistema. Pode incluir um único membro primário, vários membros secundários para leitura e redundância, árbitros para eleições e garantia de disponibilidade, membros ocultos para backup ou análise de dados e membros atrasados para recuperação em caso de alterações indesejadas.

*/

//Conexão com nó primário
mongodb://localhost:27018,localhost:27019,localhost:27020/?replicaSet=rs0

use showbank

db.createCollection("clientes")

db.clientes.insertOne({nome:"Danielle", idade:25})

db.clientes.insertOne({nome:"João", idade:21})

db.clientes.find()

//Indicar que a leitura será feita a partir do nó secundário
db.getMongo().setReadPref("secondary")

/*
Ao realizar operações de leitura em um conjunto de réplicas, você pode especificar a preferência de leitura utilizando a opção readPreference. Essa opção permite controlar de qual membro você deseja ler os dados. Existem diferentes modos de preferência de leitura disponíveis:

Primary (Padrão): A leitura é feita apenas no membro primário. Essa é a opção padrão e garante a leitura dos dados mais recentes, mas pode causar sobrecarga no membro primário em cenários de alto tráfego.

PrimaryPreferred: A leitura é feita no membro primário, a menos que esteja indisponível. Se o primário estiver inacessível, a leitura é redirecionada para um membro secundário disponível.

Secondary: A leitura é feita apenas em membros secundários. Isso pode ser útil para distribuir a carga de leitura e aliviar o membro primário, mas as leituras podem retornar dados ligeiramente desatualizados em relação ao primário.

SecondaryPreferred: A leitura é feita em membros secundários, se disponíveis. Se nenhum membro secundário estiver disponível, a leitura é redirecionada para o membro primário.

Nearest: A leitura é feita no membro mais próximo geograficamente, com base no tempo de resposta da rede. Isso pode ser útil para minimizar a latência de leitura, mas os dados podem estar um pouco desatualizados em relação ao primário.

Lembre-se de que a configuração específica do seu conjunto de réplicas, como o número de membros secundários e suas capacidades de leitura, pode afetar o comportamento e a disponibilidade da preferência de leitura escolhida.

É importante considerar cuidadosamente a escolha da preferência de leitura com base nas necessidades do seu aplicativo, requisitos de consistência dos dados e disponibilidade dos membros no conjunto de réplicas.
*/

//Criando nó arbritário

rs.addArb("localhost:27021")

mongodb://localhost:27019,localhost:27018,localhost:27020/?replicaSet=rs0

db.adminCommand({getDefaultRWConcern: 1})

db.adminCommand({
    setDefaultRWConcern: 1,
    defaultReadConcern: {level: "local"},
    defaultWriteConcern: {w: 1, wtimeout: 0}
})

rs.status()

rs.remove("localhost:27020")
/*
O MongoDB oferece vários comandos e configurações relacionadas a um conjunto de réplicas (replica sets) que são essenciais para gerenciar e utilizar efetivamente esses ambientes de alta disponibilidade. Então, vamos relembrar, os comandos executados nesta aula para criar e manipular um conjunto de réplicas:

replSet: É uma configuração utilizada para definir o nome e as configurações de um conjunto de réplicas no MongoDB. Ela é especificada no arquivo de configuração do MongoDB (mongod.conf) ou pode ser passada como um argumento de linha de comando (mongod --replSet).

rs.initiate(): Esse comando é utilizado para iniciar a configuração de um conjunto de réplicas ou reconfigurar um conjunto de réplicas existente. Ele é executado no membro primário e estabelece a configuração inicial para o conjunto de réplicas.

rs.add(): Esse comando é utilizado para adicionar um membro secundário ao conjunto de réplicas existente. Ele deve ser executado no membro primário e requer que o membro secundário esteja em execução e acessível. O comando rs.add() permite expandir o conjunto de réplicas, aumentando a capacidade de leitura e a redundância de dados.

rs.status(): Esse comando é utilizado para obter o status atual do conjunto de réplicas. Ele retorna informações sobre o estado de cada membro do conjunto de réplicas, incluindo se é um primário, secundário ou inativo. Além disso, fornece detalhes sobre a latência de replicação, atrasos e outras métricas relevantes.

rs.addArb(): Esse comando é utilizado para adicionar um árbitro ao conjunto de réplicas. Um árbitro é um membro especial que não armazena dados, mas participa nas eleições de primário e ajuda a evitar empates. O comando rs.addArb() é executado no membro primário e requer um conjunto de réplicas com pelo menos três membros.

ReadPref(): É uma configuração que define a preferência de leitura para consultas no conjunto de réplicas. Ela permite especificar se as consultas devem ser direcionadas ao primário (primary), aos secundários (secondary) ou a qualquer membro disponível (nearest).

rs.remove(): Esse comando é utilizado para remover um membro do conjunto de réplicas. Ele pode ser executado no membro primário ou secundário e permite remover permanentemente ou temporariamente um membro do conjunto de réplicas. A remoção temporária é útil para realizar manutenção ou upgrades no membro sem perder dados.

Esses comandos e configurações desempenham papéis fundamentais na criação, configuração e gerenciamento de conjuntos de réplicas no MongoDB. Eles permitem adicionar, remover e monitorar membros, além de controlar a preferência de leitura e garantir alta disponibilidade dos dados.
*/



























