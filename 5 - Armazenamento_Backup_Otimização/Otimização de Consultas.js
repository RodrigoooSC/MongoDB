db.NotasFiscais.find()

db.NotasFiscais.find({"valor venda": 500})

/*
A otimização de consultas visa melhorar a eficiência e reduzir o tempo de resposta das consultas, garantindo que elas sejam executadas de forma rápida e eficaz. Existem várias estratégias e práticas que podem ser adotadas para otimizar consultas, como:

Uso adequado de índices: Criar índices apropriados para as consultas mais frequentes pode acelerar significativamente a recuperação de dados. Índices bem projetados podem reduzir a quantidade de documentos a serem examinados, melhorando a velocidade das consultas.

Modelagem adequada de dados: Projetar uma estrutura de dados eficiente e adequada ao cenário de uso pode evitar consultas complexas e desnecessárias. Um bom design de esquema e relacionamento entre as coleções pode minimizar a necessidade de realizar junções e consultas complexas.

Uso de projeções: Utilizar projeções para retornar apenas os campos necessários em uma consulta pode reduzir o tamanho dos resultados e, consequentemente, o tempo de transferência de dados.

Evitar consultas custosas: Consultas que envolvem operações como ordenação, agrupamento e junção podem ser mais custosas em termos de desempenho. É importante avaliar se essas operações são realmente necessárias e considerar alternativas mais eficientes.

Análise do plano de execução: Analisar o plano de execução de uma consulta pode ajudar a identificar gargalos e possíveis melhorias. O entendimento do plano de execução permite ajustar a estratégia de indexação, utilizar dicas de consulta ou reestruturar a consulta para obter um melhor desempenho.

A otimização de consultas é crucial para garantir um banco de dados com alta performance, reduzindo a latência das consultas e melhorando a escalabilidade do sistema. Consultas otimizadas resultam em um processamento mais rápido das solicitações, permitindo uma melhor experiência do usuário, maior capacidade de processamento e economia de recursos do sistema. Portanto, investir tempo e esforço na otimização de consultas é fundamental para um desempenho eficiente e confiável do banco de dados.
*/

db.NotasFiscais.find({"_id": 500}).explain()

db.NotasFiscais.aggregate([{
    $lookup:{
        from:"Vendedores",
        localField:"id pedido",
        foreignField:"_id",
        as: "notas_vendedores"
    }}]).explain()
    
//Índice
db.NotasFiscais.createIndex({"valor vendas":1})

/*
No MongoDB, existem vários tipos de índices que podem ser criados para melhorar o desempenho das consultas e agilizar a recuperação de dados. Aqui estão os principais tipos de índices no MongoDB:

Índice Básico (Basic Index): É o tipo mais comum de índice no MongoDB. Ele cria uma estrutura de índice simples que armazena os valores de um campo específico e sua correspondente referência ao documento no qual ele está presente. Esse tipo de índice melhora o desempenho das consultas de igualdade em campos específicos.

Índice Multikey (Multikey Index): É usado para campos que contêm valores de matriz. O índice cria entradas separadas para cada valor no array, permitindo consultas eficientes em campos de matriz.

Índice de Texto (Text Index): É usado para realizar pesquisas de texto completo em campos de string. Esse tipo de índice suporta consultas de texto com recursos como pesquisa de palavras-chave, pesquisa de frases e pesquisa com base em relevância.

Índice de Geolocalização (Geospatial Index): É utilizado para consultas que envolvem dados de localização geográfica. Esse tipo de índice permite consultas espaciais, como encontrar documentos dentro de uma determinada área geográfica ou calcular a distância entre pontos.

Índice de Hash (Hashed Index): É usado para criar um índice hash a partir dos valores de um campo. Esse tipo de índice é útil para distribuir os documentos de forma aleatória em um cluster distribuído.

Índice Expirável (TTL Index): É usado para documentos que possuem um tempo de vida útil. Esse tipo de índice permite que os documentos sejam automaticamente removidos do banco de dados após um determinado período de tempo.

Cada tipo de índice possui características e utilizações específicas, e a escolha correta depende das necessidades do aplicativo e dos padrões de consulta. Ao utilizar os índices adequados, é possível otimizar o desempenho das consultas e melhorar a eficiência geral do banco de dados MongoDB.
*/


//Índice Composto

db.Pedidos.aggregate([
  { $match: {$and: [ {"quantidade": { $gt: 4 }},{"valor venda": {$gt:800}}] }},
  {$group: {_id: "$id produto", contagem: {$count:{}}}}
])

db.Pedidos.createIndex({"quantidade": 1, "valor venda": 1})

db.Pedidos.aggregate([
  { $match: {$and: [ {"quantidade": { $gt: 4 }},{"valor venda": {$gt:800}}] }},
  {$group: {_id: "$id produto", contagem: {$count:{}}}}
])




