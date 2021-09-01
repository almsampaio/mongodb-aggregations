// challenge 13;
// https://imasters.com.br/banco-de-dados/trabalhando-com-datas-no-mongodb

db.trips.aggregate(
  [
    { $match: { startTime: { $gte: ISODate("2016-03-10") } } },
    { $group: { _id: null, duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } } } },
    { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } }],
);
