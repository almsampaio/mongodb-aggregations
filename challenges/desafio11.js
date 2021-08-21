db.trips.aggregate([
  {
    $addFields: {
      weekdayOfStart: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$weekdayOfStart",
      totalRides: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$totalRides",
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

/**
 * Referencias:
 * Ordenação dos campos "diaDaSemana" e "total" inspirada por pesquisa ao StackOverflow:
 * "MongoDB by default return fields in order of their insertion. (...)"
 * Link: https://stackoverflow.com/questions/35254128/is-it-possible-to-get-the-fields-in-the-order-of-projection-in-aggregation-frame
 */
