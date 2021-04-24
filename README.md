# Grades-Control-API
Desafio do Módulo 2 do Bootcamp Fullstack Developer do [IGTI](https://igti.com.br).

## Sobre
Este aplicativo do Node usa o [Express JS](https://expressjs.com), um framework minimalista para criação de Web APIs.

Esta é uma API de controle de notas que trabalha com objetos da seguinte estrutura:

```
{
  "id": number,
  "student": string,
  "subject": string,
  "type": string,
  "value": number,
  "timestamp": string,
 }
 ```
 
 Um exemplo pode ser:
 
 ```JSON
 {
  "id": 50,
  "student": "Fred Flinston", 
  "subject": "Javascript",
  "type": "Final Exam",
  "value": 10,
  "timestamp": "2020-05-01T18:20:20.0000"
  }
```

Há rotas de `GET`, `POST`, `PUT` e `DELETE`. Para informações sobre as rotas, consulte o [grades.js](./routes/grades.js).

## Instruções
Clone o projeto com:
```git
git clone https://github.com/madsoncoelho/Grades-Control-API.git
```

Em seguida, faça a instalação das dependências:
```bash
cd Grades-Control-API
npm install
```

Por útlimo, execute a aplicação:
```bash
node index.js
```

Por padrão, a API pode ser acessada em `http://localhost:3000`. 
Para testar as rotas, pode-se usar um aplicativo cliente para APIs REST, como o [Insomnia](https://insomnia.rest/download) ou o [Postman](https://www.postman.com/).

## Tecnologias utilizadas
- Javascript
- [Express JS](https://expressjs.com)
- [Node.js](https://nodejs.org)
