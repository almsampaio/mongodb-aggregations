db.movies.aggregate([
  { $sort: { title: 1 } },
  { $project: {
    title_split: {
      $split: ["$title", " "],
    },
    _id: false,
  } },
  { $match: { title_split: { $size: 1 } } },
]);
