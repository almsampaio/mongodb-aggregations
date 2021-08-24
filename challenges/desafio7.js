db.movies.aggregate([
  {
    $match: {
      cast: { $exists: true },
      languages: "English",
    },
    // filtro onde o cast existe
  },
  { $unwind: "$cast" },
  // separo o array cast em varios objetos/documentos
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
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
