db.trips.aggregate([
  {
    $addFields: {
      duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      media: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$media", 2] },
      _id: 0,
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);

// crio um capo para fazer o calculo da duração da viagem, depois uso esse campo para tirar a media
// https://stackoverflow.com/questions/41138877/how-to-calculate-timestamp-difference-in-mongodb-in-hours
