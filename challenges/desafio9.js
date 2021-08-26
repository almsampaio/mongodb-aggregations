// use("aggregations")
// db.trips.find({ birthYear: { $ne: "", $exists: true } });

// Fazer os seguintes pontos:
// 1. Fazer um $match onde birthYear -> $ne: "" e $exists: true
// 2. Fazer um $group de todos com _id: null
// 3. Verificar o maior ano de nascimento com $max e $toInt
// 4. Verificar o menor ano de nascimento com $min e $toInt
// 5. Fazer um $project do maior e menor ano

// método $toInt encontrado no link:
// https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/

db.trips.aggregate([
  { $match: {
    birthYear: { $exists: true, $ne: "" },
  } },
  { $group: {
    _id: null,
    maiorAnoNascimento: {
      $max: {
        $toInt: "$birthYear",
      },
    },
    menorAnoNascimento: {
      $min: {
        $toInt: "$birthYear",
      },
    },
  } },
  { $project: {
    _id: 0,
  } },
]);
