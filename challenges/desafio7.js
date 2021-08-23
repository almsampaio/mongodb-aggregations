db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    mediaIMDB: { $avg: "$imdb.rating" },
    numeroFilmes: { $sum: 1 },
  } },
  { $project: {
    numeroFilmes: 1,
    mediaIMDB: { $round: ["$mediaIMDB", 1] },
  } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
