db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: {
        $sum: 1,
      },
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
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total", // help me to ordered : https://stackoverflow.com/questions/35254128/is-it-possible-to-get-the-fields-in-the-order-of-projection-in-aggregation-frame
    },
  },
]);
