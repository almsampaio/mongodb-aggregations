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
      _id: "$dayOfWeek",
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
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$countTrip",
    },
  },
]);
