db.movies.aggregate(
  [
    {
      $addFields: {
        favs: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
      },
    },
    {
      $addFields: {
        intersect: { $setIntersection: ["$cast", "$favs"] },
      },
    },
    {
      $match: {
        intersect: { $ne: null },
      },
    },
    {
      $addFields: {
        num_favs: { $size: "$intersect" },
      },
    },
    {
      $match: {
        $and: [
          { countries: "USA" },
          { "tomatoes.viewer.rating": { $gte: 3 } },
        ],
      },
    },
    { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
    {
      $skip: 24,
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        title: 1,
      },
    },
  ],
);
