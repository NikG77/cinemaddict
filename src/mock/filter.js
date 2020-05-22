const getFilter = (films) => {
  return films.reduce((accumulator, current) => {
    if (!accumulator[`All movies`]) {
      accumulator[`All movies`] = 0;
    }

    if (!accumulator.Watchlist) {
      accumulator.Watchlist = 0;
    }

    if (!accumulator.History) {
      accumulator.History = 0;
    }

    if (!accumulator.Favorities) {
      accumulator.Favorities = 0;
    }

    accumulator.Watchlist = accumulator.Watchlist + current.watchlist;
    accumulator.History = accumulator.History + current.alreadyWatched;
    accumulator.Favorities = accumulator.Favorities + current.favorite;

    return accumulator;
  }, {});
};

// const filterNames = [
//   `All movies`, `Watchlist `, `History `, `Favorites `];

const generateFilters = (films) => {
  const filterNames = Object.entries(getFilter(films));

  return filterNames.map((it) => {
    return {
      name: it[0],
      count: it[1],
    };
  });
};

export {generateFilters};
