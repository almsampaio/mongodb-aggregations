// challenge 3;

db.movies.aggregate(
  [
    { $match: { $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $nin: ["Crime", "Horror"] } },
      { rated: { $in: ["PG", "G"] } },
      { $and: [{ languages: { $in: ["English"] } }, { languages: { $in: ["Spanish"] } }] },
    ] } },
    { $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    } },
  ],
).sort({ year: -1 }, { "imdb.rating": -1 }, { title: 1 });
