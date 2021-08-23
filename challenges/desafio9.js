/** Source: https://github.com/tryber/sd-09-mongodb-aggregations/tree/hannibal1207-mongodb-aggregations */
db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  { $group: { _id: 1, maiorAnoNascimento: { $max: { $toInt: "$birthYear" } }, menorAnoNascimento: { $min: { $toInt: "$birthYear" } } } },
  { $project: { _id: 0 } },
]);
