// use("aggregations")
// db.air_alliances.find()
// db.air_routes.find({ "airline.name": "Air Canada" });

// Seguir os seguintes pontos:
// 1. Fazer um $unwind do airlines em air_alliances
// 2. Unir air_alliances e air_routes com $lookup no nome da empresa
// 3. Criar um array com todas as rotas daquela empresa e fazer um $unwind novamente
// 4. Fazer um $match em airplane: $in: [747, 380]
// 5. Fazer um $group das alianças e contando a quantidade de voos
// 6. Fazer um $sort em totalRotas: -1
// 7. Pegar somente o maior valor com $limit: 1

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "routes",
  } },
  { $unwind: "$routes" },
  { $match: {
    "routes.airplane": {
      $in: ["747", "380"],
    },
  } },
  { $group: {
    _id: "$name",
    totalRotas: {
      $sum: 1,
    },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
