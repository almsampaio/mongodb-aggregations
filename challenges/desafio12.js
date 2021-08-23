// use("aggregations");
// db.trips.aggregate([
//   { 
//     $addFields: {
//       dayOfWeek: { $dayOfWeek: "$startTime" },
//     },
//   },
//   {
//     $group: { 
//       _id: "$dayOfWeek",
//       count: { $sum: 1 },
//     },
//   },
//   {
//     $group: { 

//     }
//   },
//   {
//     $project:{
//       _id: 0,
//       diaDaSemana: "$_id",
//       total: "$count",
//     },
//   },
//   {
//     $sort: { total: -1 },
//   },
//   {
//     $limit: 1,
//   },
// ]);