/**
 * Consultei o repositório do Diego para resolver essa parte.
 * Link: https://github.com/tryber/sd-09-mongodb-aggregations/tree/diego-vini-mongodb-aggregations
 */
db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  { $sort: { ano: -1, notaIMDB: -1, titulo: 1 } },
]);
