db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  { $group: { _id: { day: "$dayOfWeek", startStation: "$startStationName" }, total: { $count: {} } } },
  { $project: { nomeEstacao: "$_id.startStation", total: "$total", _id: 0 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
