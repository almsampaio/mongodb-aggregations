db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: { day: "$dayOfWeek", startStationName: "$startStationName" },
      countTrip: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      countTrip: -1,
    },
  },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$countTrip",
    },
  },
]);
