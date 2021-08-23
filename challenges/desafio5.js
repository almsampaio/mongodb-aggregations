const collection = db.movies;
const actorsAndActresses = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

const conditions = {
  countries: "USA",
  "tomatoes.viewer.rating": { $gte: 3 },
  cast: { $in: actorsAndActresses },
};

const numFavs = { $size: { $setIntersection: ["$cast", actorsAndActresses] } };

const sort = {
  num_favs: -1,
  "tomatoes.viewer.rating": -1,
  title: -1,
};

collection.aggregate([
  { $match: conditions },
  { $addFields: { num_favs: numFavs } },
  { $sort: sort },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { _id: 0, title: 1 } },
]);
