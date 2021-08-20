db.movies.aggregate([
  {
    $match: {
      $and:
      [
        { "imdb.rating": { $gte: 7 } },
        { genres: { $nin: ["Crime", "Horror"] } },
        { rated: { $in: ["PG", "G"] } },
        { languages: { $all: ["English", "Spanish"] } },
      ],
    },
  },
  {
    $addFields: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: {
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
  {
    $project: {
      titulo: 1,
      avaliado: 1,
      notaIMDB: 1,
      votosIMDB: 1,
      ano: 1,
      _id: 0,
    },
  },
]);
