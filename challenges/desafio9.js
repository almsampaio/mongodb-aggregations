// 9. A partir da coleção trips, determine o menor e o maior ano de nascimento.

db.trips.aggregate([
  { $match: { $and: [{ birthYear: { $exists: true } }, { birthYear: { $ne: "" } }] } },
  { $addFields: {
    convertYear: { $toInt: "$birthYear" },
  } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$convertYear" },
    menorAnoNascimento: { $min: "$convertYear" },
  } },
  { $project: {
    maiorAnoNascimento: 1,
    menorAnoNascimento: 1,
    _id: 0,
  } },
]);

// Source:
// https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/
