// use("aggregations");
db.movies.aggregate([
  { $project:
    {
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
    $sort: {
      title_split: 1,
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
