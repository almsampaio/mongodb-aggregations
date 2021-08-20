db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      totalTrips: { $sum: 1 },
    },
  },
  { $project: { _id: 0, diaDaSemana: "$_id", total: "$totalTrips" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
