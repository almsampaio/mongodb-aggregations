db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "airRoute",
  } },
  { $unwind: "$airRoute" },
  { $match: {
    "airRoute.airplane": { $in: ["747", "380"] },
  } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

// primeiro, eu espalho os valores do array em airlines,
// depois, com o lookup, junto dentro do campo airRoute, os valores em que o airline.name
// seja igual ao valor de airlines (que agora não é mais um array, por causa do unwind).
// agora o campo criado pelo lookup virou um array com os resultados do filtro
// utilizo de novo o unwind para separar esses valores.
// tendo separado eles, faço um novo filtro para retornar apenas os objetos que tenham
// o airplane igual a 747 ou 380.
// após o filtro, eu agrupo o resultado pelo nome da aliança, e crio o campo totalRotas
// que vai ter como valor, a soma das rotas dentro de cada aliança.
// por ultimo ordeno do maior para o menor, e limito a um resultado
// tendo assim a parceria com o maior numero de rotas.

// db.air_alliances.aggregate([
//   { $unwind: "$airlines" },
//   { $lookup: {
//     from: "air_routes",
//     localField: "airlines",
//     foreignField: "airline.name",
//     as: "airRoute",
//   } },
//   { $match: {
//     "airRoute.airplane": { $in: ["747", "380"] },
//   } },
//   { $limit: 1 },
// ]).pretty;
