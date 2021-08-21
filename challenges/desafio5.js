const arr = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
use("aggregations");
db.movies.aggregate([{ $match: {
  countries: { $all: ["USA"] },
  cast: { $exists: true },
  "tomatoes.viewer.rating": { $gte: 3 } } },
{ $project: {
  _id: 0,
  title: 1,
  "tomatoes.viewer.rating": 1,
  num_favs: { $setIntersection: ["$cast", arr] } } },
{ $match: { num_favs: { $not: { $size: 0 } } } },
{ $project: { num_favs: { $size: "$num_favs" }, title: 1, "tomatoes.viewer.rating": 1 } },
{ $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
{ $limit: 25 },
{ $sort: { num_favs: 1, "tomatoes.viewer.rating": 1, title: 1 } },
{ $limit: 1 },
{ $project: { title: 1 } }]);
