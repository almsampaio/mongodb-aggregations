db.movies.aggregate([
  { $match: {
    languages: "English",
    cast: { $exists: 1 },
  },
  },
  {
    $group: {
      _id: "$cast",
      mediaIMDB: { $avg: "$imdb.rating" },
      numeroFilmes: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
