db.movies.aggregate([
  {
    $match: {
      title: { $not: / / },
    },
  },
  {
    $project: {
      title_split: { $split: ["$title", " "] },
      _id: 0,
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
  // {
  //   $skip: 1,
  // },
  // {
  //   $limit: 3,
  // },
  // {
  //   $count: "numberOfDocuments",
  // },
]);
