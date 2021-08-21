db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      title: 1,
      "tomatoes.viewer.rating": 1,
      cast: 1,
      favs_list: {
        $setIntersection: [["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"], "$cast"],
      },
    },
  },
  {
    $project: {
      title: 1,
      "tomatoes.viewer.rating": 1,
      num_favs: {
        $cond: { if: { $isArray: "$favs_list" }, then: { $size: "$favs_list" }, else: 0 },
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

// Referencias: uso do $size na aggregation consultado na doc do MONGODB:
// Link: https://docs.mongodb.com/manual/reference/operator/aggregation/size/
