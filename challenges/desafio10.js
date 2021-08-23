// use("aggregations");
// db.trips.find();

// use("aggregations");

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $subtract: [
            "$stopTime",
            "$startTime",
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          { $divide: ["$duracaoMedia", 3.6e+6] }, 2,
        ],
      },
    },
  },
]);

// result:
// [
//   {
//     "tipo": "Subscriber",
//     "duracaoMedia": 0.22
//   },
//   {
//     "tipo": "Customer",
//     "duracaoMedia": 0.71
//   }
// ]
