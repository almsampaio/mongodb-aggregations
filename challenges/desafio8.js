// db.air_routes.aggregate([
//   {
//     $match: {
//       airplane: {
//         $in: [
//           "747",
//           "380",
//         ],
//       },
//     },
//   },
//   {
//     $group: {
//       _id: "$airline.name",
//       numero_de_sla: {
//         $sum: 1,
//       },
//     },
//   },
//   {
//     $sort: {
//       _id: 1,
//     },
//   },
// ]).pretty();

// db.air_alliances.aggregate([
//   {
//     $unwind: "$airlines",
//   },
//   {
//     $lookup:
//     {
//       from: "air_routes",
//       let: { airlines2: "$airlines", name2: "$name" },
//       pipeline: [
//         {
//           $match: {
//             airplane: {
//               $in: [
//                 "747",
//                 "380",
//               ],
//             },
//           },
//         },
//         {
//           $match: {
//             $expr: {
//               $eq: ["$airline.name", "$$airlines2"],
//             },
//           },
//         },
//         {
//           $group: {
//             _id: "$airline.name",
//             numero_de_sla: {
//               $sum: 1,
//             },
//           },
//         },
//         {
//           $group: {
//             _id: "$$name2",
//             count: { $sum: "$numero_de_sla" },
//           },
//         },
//         {
//           $match: {
//             _id: "SkyTeam",
//           },
//         },
//       ],
//       as: "teste",
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//     },
//   },
//   {
//     $sort: {
//       "teste.count": -1,
//     },
//   },
//   {
//     $limit: 1,
//   },
// ]);

// db.air_alliances.findOne();

// db.air_routes.findOne();

db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup:
    {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "teste",
    },
  },
  {
    $unwind: "$teste",
  },
  {
    $match: {
      "teste.airplane": {
        $in: [
          "747",
          "380",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      "teste.totalRotas": -1,
    },
  },
  {
    $limit: 1,
  },
]);
