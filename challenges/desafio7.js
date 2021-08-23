// use("aggregations")

// Fazer um $project dos seguintes pontos:
// nome do ator/atriz
// número de filmes que participou
// média do imdb usando $round: [$valor, 1]
// os membros tem que estar em filmes com idioma em inglês "English"
// Fazer um $sort de numeroFilmes, _id: -1

db.movies.aggregate([
  { $match: {
    languages: "English",
  } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    media: { $avg: "$imdb.rating" },
  } },
  { $project: {
    numeroFilmes: 1,
    mediaIMDB: {
      $round: ["$media", 1],
    },
  } },
  { $sort: {
    numeroFilmes: -1,
    _id: -1,
  } },
]);
