db.trips.aggregate([
  {
    $set: {
      _id: "$usertype",
      timeHour: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000 * 60,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$_id",
      duration: { $avg: "$timeHour" },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duration", 2] },
      _id: 0,
    },
  },
]);

/* Referências:
  Como calcular a diferença entre as datas para encontrar o tempo de duração:
        https://stackoverflow.com/questions/56101773/how-to-find-the-hours-difference-between-two-dates-in-mongodb
*/
