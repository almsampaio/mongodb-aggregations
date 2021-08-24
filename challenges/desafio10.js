db.trips.aggregate([{
  $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: { $abs: { $subtract: ["$startTime", "$stopTime"] } } },
  },
},
{ $project: { _id: false, tipo: "$_id", duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 1000 * 60 * 60] }, 2] } } },
{ $sort: { duracaoMedia: 1 } },
]);
