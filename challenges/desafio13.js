db.trips.aggregate([
  { $match: { startTime: { $gte: ISODate("2016-03-10T00:00:00Z") } } },

  {
    $addFields: {
      minutes: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
      },
    },
  },

  {
    $group: {
      _id: null,
      minutes: { $avg: "$minutes" },
    },
  },

  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$minutes" },
    },
  },
]);
