db.trips.aggregate([
  {
    $addFields: {
      weekDay: { $dayOfWeek: "$startTime" }
    }
  },
  {
    $group: {
      _id: "$weekDay",
      total: { $sum: 1 }
    }
  },
  {
    $sort: {
      total: -1
    }
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: 1,
    }
  },
  { $limit: 1 }
]);