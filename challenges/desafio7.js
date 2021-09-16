db.movies.aggregate([
  { $match: { cast: { $exists: true } } },
  { $unwind: "$cast" },
  { $project: { cast: 1 } },
]);
