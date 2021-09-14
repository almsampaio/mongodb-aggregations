db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    travelTime: {
      $avg: {
        $dateDiff: {
          startDate: "$startTime",
          endDate: "$stopTime",
          unit: "minute",
        },
      } },
  } },
  { $sort: { travelTime: -1 } },
  { $limit: 5 },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$travelTime" },
  } },
]);

// Referências:
// DateDiff: https://docs.mongodb.com/manual/reference/operator/aggregation/dateDiff/#mongodb-expression-exp.-dateDiff
// ... "The $dateDiff expression returns a time difference expressed in integer units" ...
// ISODate: https://docs.mongodb.com/manual/reference/method/Date/
