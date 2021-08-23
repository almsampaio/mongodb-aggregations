db.movies.aggregate([
  {
    $addFields: {
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $addFields: {
      title_length: { $size: "$title_split" },
    },
  },
  {
    $match: {
      title_length: 1,
    },
  },
  {
    $sort: { title: 1 },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
]);
