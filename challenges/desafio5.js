db.movies.aggregate([
  { $match: { countries: "USA" } },
  { $match: { "tomatoes.viewer.rating": { $gte: 3 } } },
  { $match: { cast: { $exists: true } } },
  { $addFields: { num_favs: { $size: { $setIntersection: ["$cast",
    ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]] } } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $limit: 25 },
  { $sort: { num_favs: 1, "tomatoes.viewer.rating": 1, title: 1 } },
  { $limit: 1 },
  { $project: { _id: 0, title: 1 } },
]);
