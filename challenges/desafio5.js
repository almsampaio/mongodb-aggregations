const favoritesList = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
/**
 * Consultei o repositório do LeonarDev para resolver essa parte.
 * Link: https://github.com/tryber/sd-09-mongodb-aggregations/tree/leonardev-mongodb-aggregations
 */
db.movies.aggregate([
  { $match: { countries: "USA", "tomatoes.viewer.rating": { $gte: 3 }, cast: { $exists: true } } },
  { $addFields: { actors: { $setIntersection: [favoritesList, "$cast"] } } },
  { $addFields: { num_favs: { $size: "$actors" } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: 0, title: 1 } },
  { $skip: 24 },
  { $limit: 1 },
]);
