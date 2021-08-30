db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      soma: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$soma",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
