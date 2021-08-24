// https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/
db.trips.aggregate([
  { $match: { birthYear: { $ne: "" } } },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  { $project: { _id: 0 } },
]);
