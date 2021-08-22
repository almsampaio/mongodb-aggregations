// https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
// https://docs.mongodb.com/manual/reference/operator/aggregation/split/

db.movies.aggregate([
  { $addFields: { title_split: { $split: ["$title", " "] } } },
  { $match: { title_split: { $size: 1 } } },
  { $sort: { title: 1 } },
  { $project: { title_split: 1, _id: 0 } },
]);
