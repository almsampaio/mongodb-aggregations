db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $not: { $in: ["Crime", "Horror"] } } } },
  { $match: { languages: { $all: ["English", "Spanish"] } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
  { $project: {
    _id: 0,
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year",
  } },
  { $sort: {
    ano: -1,
    notaIMDB: -1,
    titulo: 1,
  } },
]);
