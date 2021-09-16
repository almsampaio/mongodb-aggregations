db.trips.aggregate([
  {
    $addFields: {
      dataEmString: {
        $dateToString: { format: "%Y-%m-%d", date: "$startTime" },
      },
    },
  },
  {
    $match: { dataEmString: "2016-03-10" },
  },
  {
    $addFields: {
      viagemEmMinutos: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      mediaViagens: { $avg: "$viagemEmMinutos" },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: "$mediaViagens" },
      _id: 0,
    },
  },
]);
