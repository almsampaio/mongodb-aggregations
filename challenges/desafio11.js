db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      count: { $sum: 1 },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$count",
    },
  },
  { $limit: 1 },
]);
