db.movies.aggregate([
  { $match: { countries: "USA" } },
  { $match: { "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $exists: true } } },
  { $project: {
    _id: 0,
    title: 1,
    cast: 1,
    "tomatoes.viewer.rating": 1,
    favs: { $setIntersection: [
      "$cast",
      ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
    ] } } },
  { $project: { title: 1,
    "tomatoes.viewer.rating": 1,
    num_favs: { $cond: { if: { $isArray: "$favs" }, then: { $size: "$favs" }, else: 0 } },
  } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { title: 1 } },
  { $limit: 1 },
  { $skip: 24 },
]);
