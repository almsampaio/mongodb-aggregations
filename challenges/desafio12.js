// use("aggregations");
// db.trips.find();

// use("aggregations");

db.trips.aggregate([
  {
    $group: {
      _id: {
        nomeEstacao: "$startStationName",
        diaDaSemana: { $dayOfWeek: "$startTime" },
      },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
    },
  },
  { $limit: 1 },
]);

// result:
// [
//   {
//     "nomeEstacao": "Pershing Square North",
//     "total": 5391
//   }
// ]
