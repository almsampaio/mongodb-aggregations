const collection = db.trips;

const conditions = {
  birthYear: {
    $exists: true,
    $ne: "",
  },
};

const fields = {
  _id: null,
  maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
  menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
};

collection.aggregate([
  { $match: conditions },
  { $group: fields },
  { $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 } },
]);
