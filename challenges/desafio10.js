db.trips.aggregate([
  {
    $addFields: {
      DURACAO: {
        $subtract: [
          "$stopTime",
          "$startTime",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: "$DURACAO",
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
        $round: [
          {
            $divide: [
              "$duracaoMedia",
              3600000,
            ],
          },
          2,
        ],
      },
    },
  },
]);
