db.movies.aggregate([
  {
    $addFields: {
      title_split: {
        $split: ["$title", " "],
      },
    },
  },
  {
    $sort: {
      title: 1,
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
  {
    $limit: 8068,
  },
]);
