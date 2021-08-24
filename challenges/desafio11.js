db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      qtn: { $count: {} },
    },
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$qtn",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
