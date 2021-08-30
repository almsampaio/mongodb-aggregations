// use("aggregations");
db.movies.aggregate([
  {
    $match: {
      cast: {
        $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
      },
    },
  },
  {
    $match:
      { $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ] },
  },
  {
    $group: {
      _id: { title: "$title",
        tvr: "$tomatoes.viewer.rating",
      },
      num_favs: { $sum: 1 },
    },
  },
  {
    $sort: {
      num_favs: -1, "_id.tvr": -1, "_id.title": -1,
    },
  },
  {
    $skip: 20,
  },
  {
    $project: {
      _id: 0,
      title: "$_id.title",
    },
  },
  {
    $limit: 1,
  },
]);
