db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { genres: { $nin: ["Crime", "Horror"] } },
        { rated: { $in: ["PG", "G"] } },
        { $and: [
          { languages: { $eq: "English" } },
          { languages: { $eq: "Spanish" } },
        ] },
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
      _id: false,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
]);
