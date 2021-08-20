db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
    },
  },
  {
    $addFields: {
      timeDifference: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: {
      _id: null,
      minutesAvg: { $avg: "$timeDifference" },
    },
  },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$minutesAvg" } } },
]);
