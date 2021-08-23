db.movies.aggregate([
  {
    $unwind: "$cast",
  },
  {
    $match: { languages: { $in: ["English"] } },
  },
  {
    $group: {
      _id: "$cast",
      count: { $sum: 1 },
      media: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: "$_id",
      numeroFilmes: "$count",
      mediaIMDB: { $round: ["$media", 1] },
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
