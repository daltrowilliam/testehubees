# testehubees

=============================

Crie uma API em NodeJS utilizando Express que realize as operações simples de CRUD (Create, Read, Update e Delete) de um estabelecimento que vende bicicletas.
Uma bicicleta possui os seguintes atributos:
- Cor
- Número de marchas
- Marca
- Modelo
- Preço

Você deverá construir rotas que desempenhem as seguintes funções:
- Cadastrar uma bicicleta
- Vender uma bicicleta
- Alterar o preço de uma bicicleta
- Listar todos os produtos
- Listar os produtos filtrados por cor
- Listar os produtos filtrados por preço


Você pode utilizar um banco de dados local ou um arquivo de texto que sirva como banco de dados.
Opcional: Publique este serviço no Heroku

=============================

##Criação da Tabela

TABLE hubees_bikes(
id VARCHAR(255) NOT NULL PRIMARY KEY,
color VARCHAR(255) NOT NULL,
gears INT NOT NULL,
brand VARCHAR(255) NOT NULL,
model VARCHAR(255) NOT NULL,
price DECIMAL(15,2) NOT NULL
