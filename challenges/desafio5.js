db.movies.aggregate([
  {
    $match: {
      countries: "USA",
    },
  },
  {
    $match: {
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $match: {
      cast: {
        $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
      },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: ["$cast", ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]] },

      } },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $project: {
      title: 1,
      _id: 0,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
