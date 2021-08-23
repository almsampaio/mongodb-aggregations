const START_DAY = "2016-03-10T00:00:00.0Z";
const END_DAY = "2016-03-11T00:00:00.0Z";

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate(START_DAY),
        $lt: ISODate(END_DAY),
      },
    },
  },
  {
    $group: {
      _id: null,
      tripAvgTime: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            60 * 1000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$tripAvgTime" },
    },
  },
]);
