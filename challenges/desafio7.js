db.movies.aggregate([
  { $unwind: "$cast" },
  { $match: { languages: "English" } },
  { $group: { _id: "$cast", numeroFilmes: { $sum: 1 }, mediaIMDB: { $avg: "$imdb.rating" } } },
  { $addFields: { mediaIMDB: { $round: ["$mediaIMDB", 1] } } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
