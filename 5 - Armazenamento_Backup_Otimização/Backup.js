
/*
C:\Users> cd ..
C:\>cd "Program Files"
C:\Program Files>cd MongoDB
C:\Program Files\MongoDB>cd Tools
C:\Program Files\MongoDB\Tools>cd bin
C:\Program Files\MongoDB\Tools\bin
*/

// Fazer backup da coleção
//mongodump --collection=Pedidos --db=Vendas --out=C:\Curso

// Fazer backup do db excluindo coleção
//mongodump --db=Vendas --excludeCollection=Pedidos --out=C:\Curso

// Fazer backup zip
//mongodump --gzip --db=Vendas --out=C:\Curso

// Restaurar db
//mongorestore --db=Vendas C:\Curso\Vendas

/*
No MongoDB, a realização de backups é essencial para garantir a segurança e a disponibilidade dos dados. Existem diferentes tipos de backups disponíveis para atender às necessidades específicas dos usuários.Então, vamos conhecer os principais tipos de backups no MongoDB:

Backup com Atlas: O MongoDB Atlas é um serviço de banco de dados gerenciado na nuvem fornecido pela MongoDB Inc. O Atlas oferece recursos de backup integrados que permitem criar backups automatizados e agendados dos bancos de dados. Ele permite restaurações ponto a ponto e garante a durabilidade dos dados por meio do armazenamento em nuvem.

Backup com MongoDB Cloud Manager: O MongoDB Cloud Manager é uma plataforma de gerenciamento e monitoramento do MongoDB. Ele oferece recursos avançados de backup, permitindo a criação de backups programados, a definição de políticas de retenção e a realização de backups incrementais. O Cloud Manager também permite automatizar tarefas de backup e recuperação, simplificando o processo de proteção dos dados.

Backup copiando arquivos de dados subjacentes: Essa abordagem envolve a cópia direta dos arquivos de dados subjacentes do MongoDB, que armazenam os dados do banco de dados. Esse método requer a interrupção do serviço do MongoDB durante o processo de cópia dos arquivos. Embora seja possível realizar backups dessa forma, é uma abordagem menos automatizada e pode ter impacto na disponibilidade dos dados durante o processo de cópia.

Backup com mongodump: O "mongodump" é um utilitário nativo do MongoDB que permite fazer backups do banco de dados. Ele cria um snapshot completo dos dados e metadados, gerando arquivos em formato BSON. O "mongodump" é altamente flexível, permitindo a seleção de bancos de dados, coleções ou consultas específicas para backup. Porém, requer a configuração manual de agendamento e gerenciamento dos backups.

Cada opção de backup no MongoDB oferece benefícios e considerações específicas, como a automação, a flexibilidade, a disponibilidade e a escalabilidade. É importante escolher o tipo de backup adequado com base nas necessidades específicas do ambiente e considerar fatores como tempo de recuperação, capacidade de armazenamento, complexidade de configuração e recursos disponíveis.

*/

/*
Dentro do ecossistema do MongoDB, existem diferentes mecanismos de armazenamento que atendem a diversas necessidades. Um desses mecanismos é o armazenamento in-memory, que tem um enfoque específico na velocidade e na latência de acesso aos dados. Agora, vamos conhecer um pouco mais sobre ele:

O mecanismo de armazenamento in-memory no MongoDB permite que os dados sejam armazenados inteiramente na memória do sistema, sem a necessidade de acesso a um armazenamento em disco.
Ao manter os dados em memória, esse mecanismo proporciona tempos de resposta extremamente rápidos, reduzindo a latência e aumentando o desempenho das operações de leitura e gravação.
É especialmente adequado para casos de uso que exigem alta velocidade e baixa latência, como aplicações que exigem respostas em tempo real ou cargas de trabalho intensivas em leitura.
É importante ressaltar que, por se tratar de um armazenamento volátil, em caso de falha de energia ou reinicializações do servidor, os dados armazenados in-memory podem ser perdidos permanentemente, já que eles não são persistidos em um meio físico como o armazenamento em disco.
A capacidade de armazenamento também é limitada pela quantidade de memória disponível no sistema. Portanto, é necessário monitorar e gerenciar cuidadosamente o uso da memória para evitar problemas de escassez.
O mecanismo de armazenamento in-memory é uma opção poderosa para cargas de trabalho que demandam altíssima velocidade e baixa latência. No entanto, é necessário considerar as limitações em termos de persistência dos dados e capacidade de armazenamento, garantindo que seja aplicado apenas em casos de uso apropriados e com uma estratégia de backup adequada para proteger os dados contra perdas inesperadas.



mongod --storageEngine wiredtiger/inMemory

mongod --storageEngine wiredtiger


# mongod.conf
# for documentation of all options, see:
    # http://docs.mongodb.org/manual/reference/configuration-options/
# Where and how to store data.
storage:
    dbPath: C:\Program Files\MongoDB\Server\6.0\data
    journal:
        enabled: true
# engine:
# wiredTiger:
# where to write logging data.
systemLog:
    destination: file
    logAppend: true
    path: C:\Program Files\MongoDB\Server\6.0\log\mongod.log
# network interfaces
net:
    port: 27017
    bindIp: 127.0.0.1
#processManagement:
#security:
#operationProfiling:
#replication:
#sharding:
## Enterprise-Only Options:
#auditLog:
#snmp:
*/

/*
WiredTiger é o mecanismo de armazenamento padrão utilizado pelo MongoDB desde a versão 3.2. Ele substituiu o mecanismo anterior, o MMAPv1, trazendo melhorias significativas em desempenho, eficiência e recursos avançados.

O WiredTiger foi desenvolvido com o objetivo de fornecer um mecanismo de armazenamento mais robusto, capaz de lidar com cargas de trabalho intensas e grandes volumes de dados. Sua estrutura interna foi projetada para otimizar o acesso aos dados e garantir a integridade e a consistência das operações.

A estrutura do WiredTiger, com base em B-trees e armazenamento em páginas, permite uma organização eficiente dos dados em disco, facilitando a busca e recuperação de informações de forma rápida e escalável. Além disso, recursos como compressão, transações ACID e controle de concorrência contribuem para o desempenho e a confiabilidade do mecanismo.

Portanto, o WiredTiger é fundamental para o funcionamento eficiente do MongoDB, oferecendo uma base sólida para o armazenamento e gerenciamento dos dados, bem como garantindo a consistência, a durabilidade e a escalabilidade necessárias em um banco de dados moderno.
*/

/*
O Journal é um recurso que pode ser utilizado em conjunto com o mecanismo de armazenamento para gerenciar os dados. Semelhante ao UPLog, isto é, as alterações feitas no banco de dados são armazenadas em um arquivo journal, como as inserções, as atualizações e as exclusões antes de serem gravadas efetivamente o armazenamento é feito em um arquivo journal.

O arquivo UPLog gerado por esse journal é distinto do log comum que geralmente é criado pelo MongoDB, tratando-se de duas entidades distintas.

O Journal é utilizado para garantir a durabilidade dos dados, pois em casos de falhas do banco de dados, podemos utilizá-lo em conjunto com os arquivos gerados pelo WiredTiger para recuperar informações perdidas, atuando como um backup.

No caso do Journal, é gerado um único arquivo que possui um tamanho limitado. Ao retornarmos para a pasta de data no computador, podemos observar arquivos que iniciam com "wiredtiger" e vão crescendo em numeração sequencial:

WiredTigertLog.0000000025
WiredTigerPreplog.0000000001
WiredTigerPreplog.0000000002
Os arquivos do Journal começam com "um" e, ao criar um novo arquivo, o número é incrementado. Os arquivos do Journal são mantidos em apenas um arquivo, e sempre que atingem 100MB, um novo arquivo é gerado. Isso para que as novas informações do banco de dados sejam armazenadas.

Dessa forma, se ocorrer uma falha no banco de dados durante essas atualizações, podemos utilizar o WiredTiger para realizar a recuperação. Em muitos casos, essa recuperação é feita automaticamente quando o MongoDB inicia novamente.

O MongoDB utiliza as informações do arquivo do Journal, localiza os dados no arquivo do WiredTiger e, ao juntar os arquivos, realiza a recuperação automática do banco de dados.

Caso isso não aconteça, é preciso intervir e efetuar a restauração.

Assim como o WiredTiger, podemos configurar o journal através do arquivo de configuração:

# mongod.conf
# for documentation of all options, see:
    # http://docs.mongodb.org/manual/reference/configuration-options/
# Where and how to store data.
storage:
    dbPath: C:\Program Files\MongoDB\Server\6.0\data
    journal:
        enabled: true
# engine:
# wiredTiger:
# where to write logging data.
systemLog:
    destination: file
    logAppend: true
    path: C:\Program Files\MongoDB\Server\6.0\log\mongod.log
# network interfaces
net:
    port: 27017
    bindIp: 127.0.0.1
#processManagement:
#security:
#operationProfiling:
#replication:
#sharding:
## Enterprise-Only Options:
#auditLog:
#snmp:
O journal está habilitado (enabled), o que significa que está ativo. Podemos utilizar diversos parâmetros, como a compactação dos arquivos e o intervalo de tempo para atualizações, entre outras configurações, para aprimorar o armazenamento e o gerenciamento dos dados.
*/

/*
De que maneira o GRIDFS organiza os dados no MongoDB?
O GRIDFS cria duas coleções:

Chunks: armazena os blocos binários
Files: armazena os metadados do arquivo
Trata-se de uma estrutura assemelhada a um cluster fragmentado, onde múltiplos servidores são empregados. Ao inserir dados nesse cluster, eles são distribuídos e, ao consultar esses dados usando metadados, as informações dispersas são localizadas e apresentadas.

Assim, o GRIDFS possui uma estrutura bastante semelhante. Ele utiliza duas coleções com esse propósito, fragmentando o arquivo em pedaços de aproximadamente 275 KB. Além disso, agora temos o GRIDFS juntamente com os mecanismos de armazenamento WiredTiger e Journal.

Journal e GRIDFS
Qual a diferença entre Journal e GRIDFS?

No caso do Journal, ele é habilitado por padrão no arquivo de configuração (CFG). Por outro lado, o GRIDFS não exige que especifiquemos nenhum parâmetro ou configuração para utilizá-lo.

O Journal é utilizado para garantir a recuperação de dados em caso de falhas no sistema, garantindo maior segurança e integridade dos dados armazenados no MongoDB. Já o GRIDFS é específico para armazenar grandes documentos que ultrapassam o tamanho máximo suportado por uma coleção no MongoDB, permitindo armazenar grandes quantidades de dados de forma eficiente.

Essas são as principais distinções entre esses dois recursos que podem ser empregados em conjunto com o mecanismo de armazenamento WiredTiger ou In-Memory, conforme a versão do MongoDB utilizada.

Entenderemos na prática como utilizamos e executamos o GRIDFS.

Vamos fechar o arquivo de configuração, uma vez que não há necessidade de realizar alterações. Em seguida, vamos encontrar o diretório onde os executáveis ou utilitários foram salvos no nosso computador.

Navegamos para "MongoDB > Tools > bin". Dentro dele, temos mais que um:

dump
bsondump
mongodump
mongoexport
mongofiles
mengeimport
mongorestore
mongostat
mongotop
Já conhecemos o mongorestore, o mongodump e temos um chamado mongofiles. Este é responsável por trabalhar com os arquivos do GRIDFS. Portanto, iremos usá-lo agora para subir o arquivo de pedidos.

Então no meu computador voltarei para a pasta "Windows-SSD(C:) > Curso > Base", onde temos os seguintes arquivos:

Notas Fiscais.csv
Pedidos
Produtos.csv
Vendedores.csv
Observe que temos o arquivo chamado Pedidos. Vamos agora realizar o upload deste arquivo para o banco de dados de vendas utilizando o GRIDFS como estrutura de armazenamento.

Upload de Arquivo com GRIDFS no Banco de Vendas
No terminal, saímos do diretório de usuário com cd .. quantas vezes forem necessárias. Agora, acessamos o diretório do MongoDB com os seguintes comandos.

Para acessar o arquivo Program Files:

cd "Program Files"
Para acessar o arquivo MongoDB:

cd MongoDB
Para acessar o arquivo Tools:

cd Tools 
Para acessar o arquivo bin:

cd bin
Dessa forma, estamos dentro do diretório desejado.

Vou abrir o bloco de notas para organizar o comando de upload usando o GRIDFS. Para isso, usamos o mongofiles (o arquivo executável), informando o nome do banco de dados como "Vendas", podendo usar a opção --db ou -d Vendas.

Na sequência passamos -l para especificar o local do arquivo, e passamos C:\Curso\Base\Pedidos. Logo, adicionamos o parâmetro chamado put para especificar que o arquivo que desejamos realizar o upload também é o arquivo de Pedidos.csv.

mongofiles -d Vendas -l C:\Curso\Base\Pedidos put Pedidos.csv
Vou copiar esse comando e rodá-lo no terminal. Obtemos, como retorno:

O retorno abaixo foi parcialmente transcrito. Para conferi-lo na íntegra, execute o código na sua máquina.

2023-07-06T10:08:06.035-0300 added gridFile: Pedidos.csv

Agora, executamos o comando mongofiles -d Vendas list.

mongofiles -d Vendas list 
Com isso, temos a lista dos arquivos que subimos:

2023-07-06T10:08:31.709-0300 connected to: mongodb://localhost/
Pedidos.csv 6292059
Ele também armazena esse arquivo Pedidos em bytes. Dessa forma, temos o arquivo armazenado dentro da coleção de vendas no formato GRIDFS.

No SQL Booster, vamos atualizar as informações clicando com o botão direito em localhost do lado esquerdo e escolhendo a opção "Refresh". Ao abrirmos Vendas, temos outra coleção fs.file, sendo onde fica armazenado os metadados.

Expandindo fs.file temos a coleção de chunks no arquivo fs.chunks, sendo onde os dados são de fato armazenados. Ao expandir fs.chunks, encontramos o schema, o validador e os índices, todas as informações comuns que geralmente temos para outras coleções.

Também podemos manipular os dados das coleções abrindo a área de comandos no menu superior ao lado de "SQL", no ícone do terminal. Isso para saber as informações gerais, como nome do arquivo ou ID. Para isso, digitamos:

db.fs.files.find()
Clicamos no botão de play para rodar e obtemos:

filename	length	contentType	uploadDate	md5	metadata
Pedidos.csv	6.0MB	#	06/07/2023 10:08:06	#	{}
Clicando no campo de alteração do formato para "Tree" no canto superior direito, obtemos o ID do metadata, o uploadDate que é a data que aconteceu o upload, o metadata, o length que é o tamanho e o filename.

Também podemos pegar informações dentro da coleção Chunks usando o comando db.fs.chunks.find().

db.fs.chunks.find()
O retorno consiste em 25 documentos que correspondem aos pedaços, indicando que o arquivo de Pedidos foi dividido em 25 partes. Vamos alterar a visualização para "Table" no canto superior direito.

Nesse formato GRID, temos o ID que identifica o bloco, o número do bloco no chunks e também o ID que identifica o arquivo na coleção "files" (coluna files_id). A coluna "data" contém os dados, mas é importante notar que, ao utilizar esse formato, os dados não são armazenados da mesma maneira que em outras coleções; eles são armazenados em bytes.

Ao realizar a consulta, não temos acesso direto aos dados. Para acessar os dados armazenados em formato GRIDFS, seria necessário utilizar uma linguagem de programação ou alguma outra estrutura fornecida pelo próprio MongoDB que permita o acesso direto aos dados.

Dessa forma, conseguimos extrair os dados de dentro da coleção chunks e assim ter acesso aos dados.

Essa é a estrutura e a forma como trabalhamos com o GRIDFS.
*/
