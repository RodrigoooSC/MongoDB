db.Pedidos.find()

/*
A monitorização de um banco de dados é de extrema importância, pois fornece informações valiosas sobre o desempenho, a disponibilidade e a saúde do sistema. Aqui estão alguns pontos que destacam a importância da monitorização de um banco de dados:

Desempenho: Monitorar um banco de dados permite identificar gargalos de desempenho, consultas lentas, uso excessivo de recursos e outros problemas que podem impactar negativamente a eficiência do sistema. Com as informações coletadas, é possível otimizar consultas, ajustar configurações e melhorar a capacidade de resposta do banco de dados.

Disponibilidade: A monitorização ajuda a identificar falhas e problemas de disponibilidade, como quedas de conexão, tempos de inatividade e erros de conexão. Essas informações permitem a detecção precoce de problemas e a implementação de medidas corretivas para minimizar a interrupção do serviço.

Capacidade e dimensionamento: Monitorar o uso de recursos, como CPU, memória e armazenamento, ajuda a entender a capacidade atual do banco de dados e a prever as necessidades futuras de escalabilidade. Isso permite um planejamento adequado para dimensionar o sistema de acordo com o crescimento do volume de dados e a demanda do aplicativo.

Segurança: A monitorização ajuda a identificar atividades suspeitas, como acessos não autorizados, tentativas de invasão e comportamentos anômalos. Isso possibilita uma resposta rápida e eficaz para proteger o banco de dados e os dados armazenados contra ameaças de segurança.

Otimização de recursos: A monitorização permite identificar o uso inadequado de recursos, como consultas ineficientes, índices desnecessários ou configurações incorretas. Ao otimizar o uso de recursos, é possível reduzir custos, melhorar a eficiência energética e maximizar a utilização dos recursos disponíveis.

Em resumo, a monitorização de um banco de dados é fundamental para garantir o desempenho, a disponibilidade, a segurança e a escalabilidade do sistema. Ela fornece insights valiosos para tomar decisões informadas, solucionar problemas e melhorar continuamente a eficiência do banco de dados.
*/

//Monitora por 30 segundos
mongostat  --rowcount=30

//Monitora por 0 segundos e salva no arquivo.txt
mongostat --rowcount=20 > arquivo

db.serverStatus()

db.Pedidos.stats()

//Veririca processos correntes no MongoDB
db.currentOp()

//Matar processo
db.killOp('opid')

/*
O desempenho de um banco de dados refere-se à capacidade do sistema de processar e responder às solicitações de maneira eficiente e eficaz. Ele está diretamente relacionado à velocidade, capacidade de resposta e escalabilidade do banco de dados.

Para alcançar um bom desempenho, é necessário otimizar diversos aspectos, como a modelagem de dados, a indexação, o uso adequado de consultas e transações, a configuração adequada do hardware e do sistema operacional, entre outros.

Um banco de dados com bom desempenho permite uma rápida recuperação e atualização de dados, minimiza o tempo de resposta das consultas e garante a disponibilidade e a confiabilidade do sistema, mesmo em condições de carga elevada.

Em resumo, atentar-se para um monitoramento regular do desempenho e a adoção de práticas de otimização são fundamentais para garantir um banco de dados com alta performance.

No MongoDB existem várias ferramentas e recursos relacionados ao monitoramento e gerenciamento do banco de dados. Vamos relembrar brevemente as ferramentas estudadas durante esta aula?

Mongostate: É uma ferramenta utilizada para monitorar e coletar informações sobre o estado e o desempenho no MongoDB. Ele fornece estatísticas em tempo real sobre a replicação, uso de recursos, latência de operações e outros dados relevantes para o monitoramento do ambiente.
Mongostop: Permite monitorar e analisar a atividade de leitura e gravação de um servidor MongoDB em tempo real. Ele fornece informações valiosas sobre as operações que estão consumindo mais recursos do banco de dados, como leituras e gravações em coleções específicas.
serverStatus(): O comando serverStatus é utilizado para obter informações sobre o estado atual de um servidor MongoDB. Ele fornece estatísticas detalhadas, como uso de recursos (CPU, memória, E/S), contadores de operações, informações sobre cache e muito mais. É um comando fundamental para o monitoramento do estado do servidor.
Stats: Refere-se a estatísticas relacionadas a um banco de dados, como o número de coleções, índices, tamanho do armazenamento e outros dados que ajudam a avaliar o desempenho e a utilização do banco de dados.
destination: Refere-se ao local de destino ou destino final de uma operação, como um arquivo ou uma coleção específica. No contexto do MongoDB, a "destination" pode ser utilizada para especificar onde os resultados de uma operação devem ser direcionados ou armazenados.
logAppend: Utilizado para indicar que os logs do MongoDB devem ser anexados a um arquivo existente, ao invés de substituírem o arquivo existente. Essa configuração permite acumular registros em um único arquivo de log, preservando o histórico das informações registradas.
path: Refere-se ao caminho ou diretório em que um arquivo ou recurso está localizado. No contexto do MongoDB, "path" pode ser utilizado para especificar o caminho ou diretório onde os arquivos de dados, logs ou outros componentes do MongoDB estão armazenados.
*/


