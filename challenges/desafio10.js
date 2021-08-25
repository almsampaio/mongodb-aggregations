db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $subtract: [
            "$stopTime", "$startTime",
          ],
        },
      },
    },
  }, {
    $project: {
      _id: false,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          {
            $divide: [
              "$duracaoMedia", 3600000, // https://stackoverflow.com/questions/41138877/how-to-calculate-timestamp-difference-in-mongodb-in-hours
            ],
          }, 2,
        ],
      },
    },
  },
]);

// passando no teste local mas não passa no remoto
