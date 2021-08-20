db.movies.aggregate([
  { $match: { $and: [
    { "imdb.rating": { $gte: 7 } },
    { genres: { $ne: "Crime" } },
    { genres: { $ne: "Horror" } },
    { $or: [{ rated: { $eq: "PG" } }, { rated: { $eq: "G" } }] },
    { $and: [{ languages: { $eq: "English" } }, { languages: { $eq: "Spanish" } }] },
  ] } },
]).pretty();
