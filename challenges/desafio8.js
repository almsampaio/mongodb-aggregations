// challenge 8;

// db.air_alliances.aggregate(
//   [
//     { $unwind: "$airlines" },
//     { $lookup: {
//       from: "air_routes",
//       localField: "airlines",
//       foreignField: "airline.name",
//       as: "rotas",
//     } },
//     { $limit: 1 },
//   ],
// );
