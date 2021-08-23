const MINUTE_IN_MILLISECONDS = 1000 * 60;
db.trips.aggregate([
  { $match: { startTime: {
    $gte: ISODate("2016-03-10T00:00:00Z"),
    $lt: ISODate("2016-03-10T23:59:59Z"),
  } } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: {
      $avg: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          MINUTE_IN_MILLISECONDS,
        ],
      } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
  } },
]);
