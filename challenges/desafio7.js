db.movies.aggregate([
  {
    $match: { languages: "English" },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      media_rating: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$media_rating", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
