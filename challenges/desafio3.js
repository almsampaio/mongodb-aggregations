db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    $and: [{ languages: { $in: ["English"] } }, { languages: { $in: ["Spanish"] } }],
    $or: [{ rated: "G" }, { rated: "PG" }],
    $nor: [{ genres: "Crime" }, { genres: "Horror" }],

  } },
  { $project: { titulo: "$title", avaliado: "$rated", notaIMDB: "$imdb.rating", votosIMDB: "$imdb.votes", ano: "$year", _id: 0 } },
  { $sort: { ano: -1, notaIMDB: -1, titulo: 1 } },
]);
