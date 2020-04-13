const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;
  return (
    `<a href="#${name.toLowerCase().split(` `, 1)}" class="main-navigation__item
    ${isActive ? `main-navigation__item--active` : ``}">
    ${name} ${isActive ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

export const createNavigationTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

