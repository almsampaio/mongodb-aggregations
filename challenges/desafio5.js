// 5. Considerando esta lista, crie uma pipeline que retorne o title do vigésimo quinto filme
// da agregação que satisfaz as seguintes condições:
// --> countries é Estados unidos no banco estará classificado como USA
// --> tomatoes.viewer.rating maior ou igual a 3
// --> Crie um novo campo chamado num_favs, que represente quantos atores ou atrizes da nossa
// lista de favoritos aparecem no elenco (informação do campo cast no banco) do filme,
// caso ele possua favoritos.
// --> Ordene os resultados por num_favs, tomatoes.viewer.rating e title,
// todos em ordem decrescente.

const favoriteActorsList = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match: { $and:
  [{ cast: { $in: favoriteActorsList } },
    { countries: { $eq: "USA" } },
    { "tomatoes.viewer.rating": { $gte: 3 } },
  ] } }, { $sort: { "tomatoes.viewer.rating": -1, title: -1,
  } },
  { $addFields: { num_favs: { $size: { $setIntersection: ["$cast", favoriteActorsList] } },
  } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 }]);
