// Solução encontrada com ajuda de Anderson Silva - Turma 10-A
db.trips.aggregate(
  {
    $addFields: {
      travelsMinutes: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] }, 60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      avgTravels: {
        $avg: "$travelsMinutes",
      },
    },
  },
  {
    $sort: {
      avgTravels: -1,
    },
  },
  {
    $project: {
      bikeid: "$_id",
      duracaoMedia: {
        $ceil: "$avgTravels",
      },
      _id: 0,
    },
  },
  {
    $limit: 5,
  },
);
