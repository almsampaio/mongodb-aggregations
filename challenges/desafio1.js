db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
    },
  },
  {
    $match: {
      genres: { $nin: [
        "Crime",
        "Horror",
      ] },
    },
  },
  {
    $match: {
      rated: {
        $in: [
          "PG",
          "G",
        ],
      },
    },
  },
  {
    $match: {
      $and: [
        { languages: "English" },
        { languages: "Spanish" },
      ],
    },
  },
  // {
  //   $count: "numberOfDocuments",
  // },
]);
