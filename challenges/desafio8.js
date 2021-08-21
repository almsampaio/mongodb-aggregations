db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { parceira: "$airlines" },
      pipeline: [
        { $match: { $expr: { $eq: ["$airline.name", "$$parceira"] } } },
        {
          $match: { airplane: { $in: ["747", "380"] } },
        },
      ],
      as: "voosCom747ou380",
    },
  },
  // Linha removida com créditos ao Murilo
  // GitHub Murilo: https://github.com/MuriloGon
  // { $match: { "voosCom747ou380.0": { $exists: true } } },
  { $unwind: "$voosCom747ou380" },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

// Código alternativo desenvolvido com créditos ao Murilo:
// https://github.com/MuriloGon
// db.air_alliances.aggregate([
//   {
//     $lookup: {
//       from: 'air_routes',
//       localField: 'airlines',
//       foreignField: 'airline.name',
//       as: 'airs'
//     }
//   },
//   { $unwind: '$airs' },
//   { $match: { 'airs.airplane': /^747$|^380$/ } },
//   { $group: { _id: '$name', total: { $sum: 1 } } },
//   { $sort: { total: -1 } },
//   { $limit: 1 }
// ]);
