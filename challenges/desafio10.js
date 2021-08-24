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
        { $divide: ["$contador", 60 * 60 * 1000] }, 2],
    },
    _id: 0,
  } },
]);
