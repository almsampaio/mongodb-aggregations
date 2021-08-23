// 8.Liste todas as parcerias da coleção air_alliances, que voam rotas com um Boing 747
// ou um Airbus A380,
// para descobrir qual delas tem o maior número de rotas com esses aviões.

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: { // equivale ao join do SQL
    from: "air_routes", // "tabela"/"collection" que tá sendo comparada na subquery
    localField: "airlines", // "'primary key' da 'tabela 1'/collection 1"
    foreignField: "airline.name", // "'foreign key' da 'tabela 2'/collection 2"
    as: "airlines_comparison", // alias da nova 'coluna'/campo
  } },
  { $unwind: "$airlines_comparison" },
  { $match: { $or: [{ "airlines_comparison.airplane": "380" }, { "airlines_comparison.airplane": "747" }] } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
