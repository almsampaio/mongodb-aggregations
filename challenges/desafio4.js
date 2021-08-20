db.movies.aggregate([
  { $project:
      { title_split: { $split: ["$title", " "] } },
  },
  { $match:
    { title_split: { $size: 1 } },
  },
  { $sort: { title_split: 1 },
  },
  { $project: {
    _id: 0 },
  },
]);

// Contribuição de Iago Ferreira para a resolução do requisito.
// Link PR: https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/46/files
