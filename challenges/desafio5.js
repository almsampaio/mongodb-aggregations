const favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": {
        $gte: 3,
      },
      cast: {
        $in: favorites,
      },
    },
  },
  {
    $addFields: {
      num_fav: {
        $size: {
          $setIntersection: [favorites, "$cast"],
        },
      },
    },
  },
  {
    $sort: {
      num_fav: -1,
      "tomatoes.viewer.rating": -1,
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
      _id: 0,
    },
  },
]);
