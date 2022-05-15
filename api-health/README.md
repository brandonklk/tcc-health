# Back-end

## Tecnologias

##### Utilizado

  - Node
  - Knex
  - Typescript
  - Express
  - Node-Cache
  - Celebrate middleware
  - Nodemailer

## Como rodar

- Realizar o download do Node
- Rodar `npm install` e `npm run dev` ou `yarn` e `yarn dev`

## Novas migrations/tabela
- `npx knex migrate:make nomeDaTabela`

## Criar banco com tabelas ou incluir uma nova tabela
- `npx knex migrate:latest` ou
- `npm run knex:migrate` ou
- `yarn knex:migrate`

## Rollback na ultima tabela(migrate) criada
- `npx knex migrate:rollback`

## Criar novo arquivo de seed
- `npx knex seed:make nome_seed`

## Colocar os dados em base
- `npx knex seed:run`