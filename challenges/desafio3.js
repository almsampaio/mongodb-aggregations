// https://docs.mongodb.com/manual/reference/operator/aggregation/sort/
// utilização do operador sort do aggregation

db.movies.aggregate([
  { $match: {
    $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $nin: ["Crime", "Horror"] } },
      { rated: { $in: ["PG", "G"] } },
      { languages: { $all: ["English", "Spanish"] } },
    ],
  },
  },
  {
    $sort: {
      year: -1,
      "imdb.rating": -1,
      title: 1,
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
]);
