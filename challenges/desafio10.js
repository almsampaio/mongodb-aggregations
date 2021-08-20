db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } },
  } },
  { $project: {
    tipo: "$_id",
    duracaoMedia: {
      $round: ["$duracaoMedia", 2],
    },
    _id: 0,
  } },
]);

// Source:
// https://stackoverflow.com/questions/41138877/how-to-calculate-timestamp-difference-in-mongodb-in-hours
