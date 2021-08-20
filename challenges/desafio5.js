db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $match: {
      cast: { $in: [
        "Sandra Bullock",
        "Tom Hanks",
        "Julia Roberts",
        "Kevin Spacey",
        "George Clooney",
      ] },
    },
  },
  {
    $group: {
      _id: "$title",
      num_fav: { $sum: 1 },
      rating: { $sum: "$tomatoes.viewer.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      title: "$_id",
      rating: { $divide: ["$rating", "$num_fav"] },
      num_fav: 1,
    },
  },
  {
    $sort: {
      num_fav: -1,
      rating: -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      title: 1,
    },
  },
]);
