db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      sum: { $sum: 1 },
    },
  },
  { $sort: { sum: -1 } },
  { $limit: 1 },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$sum",
      _id: 0,
    },
  },
]);

/* Referencias:
  Como usar o dayOfWeek: https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/
*/
