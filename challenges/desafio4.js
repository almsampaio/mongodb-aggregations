db.movies.aggregate([
  {
    $project: {
      _id: 0,
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $sort: { title_split: 1 },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
]);
