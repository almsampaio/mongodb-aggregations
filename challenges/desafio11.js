// use("aggregations");
// db.trips.find();

// use("aggregations");

db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  { $limit: 1 },
]);

// result:
// [
//   {
//     "diaDaSemana": 5,
//     "total": 357594
//   }
// ]
