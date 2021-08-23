const MINUTE_IN_MILLISECONDS = 1000 * 60;
db.trips.aggregate([
  { $addFields: {
    tripDurationInMinutes: {
      $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        MINUTE_IN_MILLISECONDS,
      ],
    },
  } },
  { $group: {
    _id: "$bikeid",
    duracaoMedia: {
      $avg: "$tripDurationInMinutes",
    },
  } },
  { $project: {
    _id: 0,
    bikeid: "$_id",
    duracaoMedia: { $ceil: "$duracaoMedia" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
