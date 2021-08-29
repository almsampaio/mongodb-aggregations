const convertHours = 3600000;
db.trips.aggregate([{ $group: { _id: "$usertype",
  duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
{ $project: {
  _id: 0,
  tipo: "$_id",
  duracaoMedia: {
    $round: [{ $divide: ["$duracaoMedia", convertHours] }, 2],
  },
} },
{ $sort: { duracaoMedia: 1 } }]);
