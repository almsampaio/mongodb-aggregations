// A partir da coleção trips, determine o menor e o maior ano de nascimento.
// Guarde essa informação, você precisará dela mais tarde.

// Não considere documentos com valores vazios ("") e em que o campo não
// existe!

// Para este desafio utilize o operador $toInt para converter de string
// para valor inteiro.

// O resultado da sua query deve ter exatamente o seguinte formato
// (incluindo a ordem dos campos):

// { "maiorAnoNascimento" : <ano>, "menorAnoNascimento" : <ano> }
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
