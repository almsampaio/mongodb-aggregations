const favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Cloone",
];

db.movies.aggregate([
  {
    $match: {
      cast: { $in: favorites },
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: "USA",
    },
  },
  { $addFields: { num_favs: {
    $size: {
      $setIntersection: [favorites, "$cast"],
    } } },
  },
  {
    $project: {
      title: 1,
      _id: 0,
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 25 },
  { $limit: 1 },
]);
