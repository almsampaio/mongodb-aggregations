db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $project: {
    _id: 0,
    titulo: { $split: ["$title", " "] },
  } },
  { $limit: 1 },
]);
