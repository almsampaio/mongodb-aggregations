db.movies.aggregate([
  {
    $match: {
      languages: { $in: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: {
        $addToSet: "$title",
      },
      media_imdb: {
        $avg: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: { $size: "$numeroFilmes" },
      media_imdb: { $round: ["$media_imdb", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
