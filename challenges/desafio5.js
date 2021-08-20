// Sandra Bullock
// Tom Hanks
// Julia Roberts
// Kevin Spacey
// George Clooney

// Considerando esta lista, crie uma pipeline que retorne o title do vigésimo
// quinto filme da agregação que satisfaz as seguintes condições:
// countries é Estados unidos no banco estará classificado como USA
// tomatoes.viewer.rating maior ou igual a 3
// Crie um novo campo chamado num_favs, que represente quantos atores ou atrizes
// da nossa lista de favoritos aparecem no elenco (informação do campo cast no banco)
// do filme, caso ele possua favoritos.
// Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em
// ordem decrescente.
// Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore
// operadores como $size e $setIntersection.

const favoritesList = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: favoritesList },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          // Fonte: https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/
          $setIntersection: [
            "$cast",
            favoritesList,
          ],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
