### Instalação de Pacotes

Para executar o projeto pela primeira vez, é necessária rodar o seguinte comando:

`npm install`

O comando acima, fará a instalação de todos os pacotes necessários para funcionamento correto da ferramenta. Sendo que os pacotes e suas versões estão definidos no arquivo `package.json`

### Configuração

O banco de dados está configurado no arquivo `config/config.json`

    "username": "postgres",
    "password": "postgres",
    "database": "saipos",
    "host": "127.0.0.1",
    "dialect": "postgres"

Para realizar a migração e criação da(s) tabela(s) necessária(s), rodar o seguinte comando de migração do banco de dados:

`npx sequelize db:migrate`

### Execução

Após seguir os passos acima, o projeto já pode ser executado e testado. Para tanto, deve-se rodar o seguinte comando:

`nodemon`

Esse comando deverá levantar o servidor do Node.js na porta **3000**.

Com o servidor rodando, utilize um browser para acessar o link local:

`localhost:3000/`(Se a porta foi alterada, deve ser alterada também nesse link)



	
