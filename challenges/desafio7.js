db.movies.aggregate([
  { $match: { languages: { $eq: "English" } } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast", // para agrupar os documentos da coleção por ator/atriz
    numeroFilmes: { $sum: 1 },
    mediaIMDB: { $avg: "$imdb.rating" },
  },
  }, {
    $project: {
      _id: 1,
      numeroFilmes: 1,
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

// Source:
// https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/