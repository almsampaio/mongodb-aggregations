// 3 - Agora que você tem os campos essenciais, retorne esses
// filmes ordenados por ano e nota IMDB de forma decrescente e
// por ordem alfabética.
// use("aggregations");
db.movies.aggregate( // 5
  [
    {
      $match: {
        "imdb.rating": { $gte: 7 }, // 1
        genres: { $nin: ["Crime", "Horror"] }, // 2
        rated: { $in: ["PG", "G"] }, // 3
        languages: { $all: ["English", "Spanish"] }, // 4
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
  ],
);
