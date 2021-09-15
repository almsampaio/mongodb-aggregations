db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $addFields: {
      durationToMinutes: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
      },
    },
  },
  {
    $group: {
      _id: null,
      averageDurationInMinutes: { $avg: "$durationToMinutes" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$averageDurationInMinutes",
      },
    },
  },
]);
