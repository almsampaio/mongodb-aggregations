db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    genres: { $nin: ["Crime", "Horror"] },
    rated: { $in: ["PG", "G"] },
    languages: { $all: ["English", "Spanish"] },
  } },
  { $project: {
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.votes",
    ano: "$year",
    _id: 0,
  } },
]);
