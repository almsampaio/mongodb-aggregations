db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      tempoMedioVoo:
      { $avg:
        { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
      },
    },
  },
  { $project:
    {
      tipo: "$_id",
      duracaoMedia: { $round: ["$tempoMedioVoo", 2] },
      _id: 0,
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
