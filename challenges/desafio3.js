// Desafio 3
/* use("aggregations"); */
db.movies.aggregate([
  {
    $match: {
      $and: [
        {
          "imdb.rating": { $gte: 7 }, /* maior ou igual */
        },
        {
          genres: { $nin: ["Crime", "Horror"] }, /* não deve conter  */
        },
        {
          rated: { $in: ["PG", "G"] }, /* deve ser igual */
        },
        {
          languages: { $all: ["English", "Spanish"] }, /* Todos que contém */
        },
      ],
    },
  },
  {
    $project: { /* Efetuando projeção */
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  { $sort: { ano: -1, notaIMDB: -1 } }, /* Efetua ordenação usando DESC usando paramento (-1) */
]);
