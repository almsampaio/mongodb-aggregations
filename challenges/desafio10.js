const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia: {
      $avg: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          HOUR_IN_MILLISECONDS,
        ],
      } },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);
