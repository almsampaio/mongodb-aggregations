db.movies.aggregate([
  { match: { languages: "English" } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    media: { $avg: "imdb.rating" },
    numeroFilmes: { $sum: 1 },
  } },
  { $project: {
    numeroFilmes: 1,
    mediaIMDB: { $round: "$media" },
  } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
