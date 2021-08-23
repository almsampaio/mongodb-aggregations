const collection = db.movies;

collection.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    mediaIMDB: { $avg: "$imdb.rating" },
    numeroFilmes: { $sum: 1 },
  } },
  { $project: {
    mediaIMDB: { $round: ["$mediaIMDB", 1] },
    numeroFilmes: 1,
  } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
