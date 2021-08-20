db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$total",
      _id: 0,
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
