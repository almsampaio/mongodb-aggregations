db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
  } },
  { $project: {
    bikeid: "$_id",
    duracaoMedia: { $ceil: "$duracaoMedia" },
    _id: 0,
  } },
  { $sort: {
    duracaoMedia: -1,
  } },
  { $limit: 5 },
]);

// Source:
// https://stackoverflow.com/questions/49211564/mongodb-pymongo-calculate-difference-of-two-times-in-minutes/49214308
// https://docs.mongodb.com/manual/reference/operator/aggregation/ceil/
