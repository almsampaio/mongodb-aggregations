// Solução encontrada com ajuda do Anderson Silva - Turma 10-A
// https://docs.mongodb.com/v4.2/reference/operator/aggregation/dateToString/
db.trips.aggregate(
  {
    $addFields: {
      dateString: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$startTime",
        },
      },
    },
  },
  {
    $match: {
      dateString: "2016-03-10",
    },
  },
  {
    $addFields: {
      travelMinutes: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] }, 60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      avgTravels: {
        $avg: "$travelMinutes",
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: {
        $ceil: "$avgTravels",
      },
      _id: 0,
    },
  },
);
