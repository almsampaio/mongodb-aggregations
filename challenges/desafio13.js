use("aggregations");

db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [
          { $dateToString: { format: "%d/%m/%Y", date: "$startTime" } },
          "10/03/2016",
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [
            {
              $subtract: ["$stopTime", "$startTime"],
            },
            60000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
