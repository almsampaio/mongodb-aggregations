db.trips.aggregate([{
  $match: {
    startTime: {
      $gte: ISODate("2016-03-10T00:00:00.000Z"),
      $lt: ISODate("2016-03-11T00:00:00.000Z") } },
}, {
  $group: {
    _id: null,
    duracaoMediaEmMinutos: {
      $avg: {
        $dateDiff: {
          startDate: "$startTime",
          endDate: "$stopTime",
          unit: "minute" } } },
  },
}, {
  $project: { _id: 0, duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0] } } }]);
