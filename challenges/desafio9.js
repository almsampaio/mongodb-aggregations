db.trips.aggregate([
  { $match: {
    $and: [
      { birthYear: { $exists: true } },
      { birthYear: { $ne: "" } },
    ],
  } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
    menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
  } },
  { $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 } },
]);

// primeiro faço um filtro com o and, para utilizar duas condições
// a primeira, o campo birthYear tem que existir, e a segunda
// o campo birthYear tem que ser diferente de uma string vazia
// depois, agrupo todos os documentos passando o group com o id sendo null
// crio dois campos filtrando pelo max e min, utilizando o toInt, para transformar
// os valores em inteiros.

// a lógica do group foi a mesma utilizada no requisito 6.

// fonte utilizada para consulta do toInt:
// https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/
