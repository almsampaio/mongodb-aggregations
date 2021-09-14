db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10") },
  } },
  { $group: {
    _id: null,
    travelTime: {
      $avg: {
        $dateDiff: {
          startDate: "$startTime",
          endDate: "$stopTime",
          unit: "minute",
        },
      } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$travelTime" },
  } },
]);

// Referências:
// DateDiff: https://docs.mongodb.com/manual/reference/operator/aggregation/dateDiff/#mongodb-expression-exp.-dateDiff
// ... "The $dateDiff expression returns a time difference expressed in integer units" ...
// ISODate: https://docs.mongodb.com/manual/reference/method/Date/
