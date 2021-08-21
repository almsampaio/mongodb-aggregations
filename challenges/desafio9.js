db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  { $addFields: { convertedBirthYear: { $toInt: "$birthYear" } } },
  {
    $group: {
      _id: null,
      max: { $max: "$convertedBirthYear" },
      min: { $min: "$convertedBirthYear" },
    },
  },
  { $project: { _id: 0, maiorAnoNascimento: "$max", menorAnoNascimento: "$min" } },
]);
