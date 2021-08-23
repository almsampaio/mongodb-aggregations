// https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/#mongodb-expression-exp.-setIntersection

const atoresFav = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
db.movies.aggregate([
  { $match: { countries: "USA", "tomatoes.viewer.rating": { $gte: 3 }, cast: { $exists: 1 } } },
  { $addFields: { num_favs: { $size: { $setIntersection: ["$cast", atoresFav] } } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
]);
