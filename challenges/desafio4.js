db.movies.aggregate([
  { $addFields:
  { title_split: { $split: ["$title", " "] },
  } },
  { $addFields: { arrSize: { $size: "$title_split" } } },
  { $match: { arrSize: { $eq: 1 } } },
  { $sort: {
    title: 1,
  } },
  { $project: {
    title_split: 1,
    _id: 0,
  } },
]);

// Source: https://docs.mongodb.com/manual/reference/operator/aggregation/split/
