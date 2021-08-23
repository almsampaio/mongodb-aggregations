db.trips.aggregate([
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
      total: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      total: -1,
      diaDaSemana: 1,
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: {
        $max: "$total",
      },
    },
  },
  {
    $limit: 1,
  },
]);
