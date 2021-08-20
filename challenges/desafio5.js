const actors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: actors },
    },
  },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: [actors, "$cast"] } },
    },
  },
  // AddFields cria novo campo, que será o num_favs;
  // $size conta e retorna o numero de items em um array
  // (contará o setIntersection)
  // setIntersection retorna quantos nomes da variavel actors foram
  // encontrados no match (que representa os filmes filtrados no banco de dados)
  // resultado: conta-se quantos atores da lista de favoritos participaram
  // dos filmes buscados.
  // Ref: https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/20/files
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: { title: 1, _id: 0 },
  },
]);
