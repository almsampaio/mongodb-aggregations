const oneHour = 3600000;

db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    contador: {
      $avg: {
        $subtract: ["$stopTime", "$startTime"] } },
  } },
  { $sort: {
    contador: 1,
  } },
  { $project: {
    tipo: "$_id",
    duracaoMedia: {
      $round: [
        { $divide: ["$contador", oneHour] }, 2],
    },
    _id: 0,
  } },
]);
