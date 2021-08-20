const favoriteActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      cast: {
        $in: favoriteActors,
      },
      countries: {
        $elemMatch: { $eq: "USA" },
      },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [favoriteActors, "$cast"],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $project: { _id: 0, title: 1 } },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
