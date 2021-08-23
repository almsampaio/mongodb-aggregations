db.movies.aggregate([
  {
    $match: {
      cast: { $exists: 1 },
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      _id: 0,
      num_favs: {
        $let: {
          vars: {
            fav_actors: {
              $setIntersection: [
                ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
                "$cast",
              ],
            },
          },
          in: {
            $size: "$$fav_actors",
          },
        },
      },
      "tomatoes.viewer.rating": -1,
      title: 1,
    },
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
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
