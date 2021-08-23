// use("aggregations")

// Fazer $sort dos seguintes pontos
// ano: -1
// notaIMDB: -1
// titulo: 1

db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    genres: { $nin: ["Crime", "Horror"] },
    rated: { $in: ["PG", "G"] },
    languages: { $all: ["English", "Spanish"] },
  } },
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
