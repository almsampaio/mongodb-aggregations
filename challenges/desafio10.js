db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    horas: { $avg: {
      $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        60 * 60 * 1000,
      ],
    } },
  } },
  { $project: {
    tipo: "$_id",
    duracaoMedia: { $round: ["$horas", 2] },
    _id: 0,
  } },
]);
