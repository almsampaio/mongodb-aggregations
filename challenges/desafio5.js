/* Desafio 5 - Temos outra noite de filme aqui na Trybe e, desta vez, nós perguntamos
à equipe quais são suas pessoas preferidas como atores e/ou atrizes. Aqui está o resultado:

1. Sandra Bullock
2. Tom Hanks
3. Julia Roberts
4. Kevin Spacey
5. George Clooney

Considerando esta lista, crie uma pipeline que retorne o title do vigésimo quinto filme
da agregação que satisfaz as seguintes condições:

1. countries é Estados unidos no banco estará classificado como "USA";
2. "tomatoes.viewer.rating" maior ou igual a 3;
3. Crie um novo campo chamado "num_favs", que represente quantos atores ou atrizes da nossa
lista de favoritos aparecem no elenco (informação do campo cast no banco) do filme,
caso ele possua favoritos.
4. Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.

Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore operadores
como $size e $setIntersection. */
const favActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $in: favActors } },
  },
  { $addFields: { num_favs: { $size: { $setIntersection: ["$cast", favActors] } } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: false, title: true, num_favs: true } },
  { $skip: 24 },
  { $limit: 1 },
]);
