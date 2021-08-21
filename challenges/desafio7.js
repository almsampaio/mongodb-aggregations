db.movies.aggregate([{
  $match: { languages: "English" } },
{ $project: { _id: 0, "imdb.rating": 1, cast: 1 } },
{ $unwind: "$cast" },
{ $group: {
  _id: "$cast",
  numeroFilmes: { $sum: 1 },
  mediaIMDB: { $avg: "$imdb.rating" },
} },
{ $project: { numeroFilmes: 1, mediaIMDB: { $round: ["$mediaIMDB", 1] } } },
{ $sort: { numeroFilmes: -1, _id: -1 } }]);
