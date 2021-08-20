db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
  } },
  { $set: { favs: [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney",
  ] } },
  { $set: { inter_favs: { $setIntersection: ["$favs", "$cast"] } } },
  { $set: { num_favs: {
    $cond: { if: { $isArray: "$inter_favs" }, then: { $size: "$inter_favs" }, else: 0 },
  } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $project: { title: 1, _id: 0 } },
  { $limit: 1 },
]);
