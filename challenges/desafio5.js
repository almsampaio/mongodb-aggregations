const actoFav = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];
db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $exists: true },
  } },
  { $addFields: {
    num_fav: { $size: { $setIntersection: [actoFav, "$cast"] } },
  } },
  { $sort: {
    num_fav: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $project: { _id: 0, title: 1 } },
  { $skip: 24 },
  { $limit: 1 },
]);
