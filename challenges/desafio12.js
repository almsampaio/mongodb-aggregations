const day = db.trips.aggregate([
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
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
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
]).toArray();

db.trips.aggregate([
  {
    $group: {
      _id: {
        nomeEstacao: "$startStationName",
        day: {
          $dayOfWeek: "$startTime",
        },
      },
      total: {
        $sum: 1,
      },
    },
  },
  {
    $match: {
      "_id.day": day[0].diaDaSemana,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
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
