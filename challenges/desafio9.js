// A partir da coleção trips, determine o menor e o maior ano de nascimento.
// Guarde essa informação, você precisará dela mais tarde.

// Não considere documentos com valores vazios ("") e em que o campo não
// existe!

// Para este desafio utilize o operador $toInt para converter de string
// para valor inteiro.

// Fontes: https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/,
// https://docs.mongodb.com/manual/reference/operator/aggregation/convert/#mongodb-expression-exp.-convert,
// https://pt.stackoverflow.com/questions/170863/retornar-o-valor-m%C3%A1ximo-das-somas-da-collection-com-mongodb,
// https://stackoverflow.com/questions/64575367/mongodb-failed-to-parse-objectid-in-convert-with-no-onerror-value-invalid

db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: true,
        $ne: "",
      },
    },
  },
  {
    $addFields: {
      convertedYear: { $convert: {
        input: "$birthYear",
        to: "int",
        onError: "",
        onNull: "",
      } },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$convertedYear" },
      menorAnoNascimento: { $min: "$convertedYear" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
