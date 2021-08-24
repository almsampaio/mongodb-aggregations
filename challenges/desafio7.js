// Consultas a :
// https://docs.mongodb.com/manual/reference/operator/aggregation/group/;
// https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/
db.movies.aggregate([
  { $match: { languages: { $in: ["English"] } } },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $count: {} },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
      numeroFilmes: 1,
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
