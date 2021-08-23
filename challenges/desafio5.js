db.movies.aggregate([
  { $match:
      { $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ] },
  },
  {
    $addFields: {
      atores: { $setIntersection: ["$cast", ["Sandra Bullock",
        "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]] },
    } },
  { $match: { $and: [{ atores: { $not: { $eq: [] } } }, { atores: { $not: { $eq: null } } }] } },
  { $addFields: { num_favs: { $size: "$atores" } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { title: true, _id: false } },
  { $skip: 24 },
  { $limit: 1 },
]);
