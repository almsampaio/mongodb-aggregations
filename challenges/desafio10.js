db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $dateDiff: {
            startDate: "$startTime",
            endDate: "$stopTime",
            unit: "hour",
          },
        },
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracaoMedia", 2],
      },
    },
  },
]);
// obg documentação: https://docs.mongodb.com/manual/reference/operator/aggregation/dateDiff/
