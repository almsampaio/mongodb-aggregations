db.movies.aggregate([
  {
    $addFields: {
      title_split: {
        $split: ["$title", " "],
      },
    },
  },
  {
    $match: {
      title_split: {
        $size: 1,
      },
    },
  },
  {
    $project: {
      title_split: 1,
      _id: 0,
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
]);
