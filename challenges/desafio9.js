// use("aggregations");
// db.trips.find();

// use("aggregations");

db.trips.aggregate([
  { $match: { birthYear: { $exists: 1, $ne: "" } } },
  { $addFields: { yearToInt: { $toInt: "$birthYear" } } },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$yearToInt" },
      menorAnoNascimento: { $min: "$yearToInt" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
