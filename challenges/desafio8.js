db.air_routes.aggregate([{
  $match: { airplane: { $in: ["747", "380"] } },
},
{ $group:
    { _id: "$airline.name",
      totalRotas: { $sum: 1 },
    },
},
{ $lookup: {
  from: "air_alliances",
  localField: "_id",
  foreignField: "airlines",
  as: "alianca",
},
},
{ $group:
    { _id: "$alianca.name",
      totalRotas: { $sum: "$totalRotas" } },
},
{ $unwind: "$_id" },
{ $sort: { totalRotas: -1 } },
{ $limit: 1 },
]);
