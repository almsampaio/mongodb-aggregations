// Desafio 10
/* use("aggregations"); */
db.trips.aggregate([
  { $addFields: {
    horas: {
      $divide: [
        { $subtract: [
          "$stopTime",
          "$startTime",
        ] },
        3600000,
      ],
    },
  } },
  {
    $group: { _id: "$usertype", mediaHoras: { $avg: "$horas" } },
  },
  {
    $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$mediaHoras", 2] } },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
