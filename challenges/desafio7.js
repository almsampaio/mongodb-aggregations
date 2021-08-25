// Conte quantos filmes cada um dos atores e atrizes do elenco (cast no banco)
// já participou e obtenha uma média do campo imdb.rating para cada um desses
// atores e atrizes.
// use("aggregations");
db.movies.aggregate([
  {
    $match: { languages: "English" },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      count: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: "$count",
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
