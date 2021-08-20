db.movies.aggregate([
  { $match: { $and: [
    { "imdb.rating": { $gte: 7 } },
    { genres: { $ne: "Crime" } },
    { genres: { $ne: "Horror" } },
    { $or: [{ rated: { $eq: "PG" } }, { rated: { $eq: "G" } }] },
    { languages: { $all: ["English", "Spanish"] } }] } },
  { $sort: { year: -1, "imdb.rating": -1, titulo: 1 } },
  { $project: { _id: 0,
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year" } },
]).pretty();
