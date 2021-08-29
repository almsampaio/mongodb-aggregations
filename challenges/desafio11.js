db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      totalOfDays: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      diaDaSemana: "$_id",
      total: "$totalOfDays",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
