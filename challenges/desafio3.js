db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: [/short/i, /horror/i] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: [/english/i, /spanish/i] },
    },
  },
  {
    $project: {
      titulo: "$title", avaliado: "$rated", notaIMDB: "$imdb.rating", votosIMDB: "$imdb.votes", ano: "$year", _id: 0,
    },
  },
  {
    $sort: {
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
]);
