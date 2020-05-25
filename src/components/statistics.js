import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {FilterType} from "../const.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {transformDuration} from "../utils/common";

const NUMBER_BEST_GENRE = 0;

const StaticticsTimeInterval = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

const Day = {
  ONE_DAY: 1,
  ONE_MONTH: 1,
  ONE_WEEK: 7,
  ONE_YEAR: 1,
};

const GENRES = [`Action`, `Sci-Fi`, `Adventure`, `Comedy`, `Animation`, `Thriller`, `Horror`, `Drama`, `Family`];

const getDateFrom = (activeIntervalType) => {
  let dateFrom = new Date(0);
  const dateTo = new Date();

  switch (activeIntervalType) {
    case StaticticsTimeInterval.ALL:
      dateFrom = new Date(0);
      break;
    case StaticticsTimeInterval.MONTH:
      dateFrom = dateTo.setMonth(dateTo.getMonth() - Day.ONE_MONTH);
      break;
    case StaticticsTimeInterval.TODAY:
      dateFrom = dateTo.setDate(dateTo.getDate() - Day.ONE_DAY);
      break;
    case StaticticsTimeInterval.WEEK:
      dateFrom = dateTo.setDate(dateTo.getDate() - Day.ONE_WEEK);
      break;
    case StaticticsTimeInterval.YEAR:
      dateFrom = dateTo.setFullYear(dateTo.getFullYear() - Day.ONE_YEAR);
      break;
  }
  return dateFrom;
};

const getTimeWatchedMovies = (films) => {
  return films.reduce((accumulator, current) => {
    accumulator = accumulator + current.duration;
    return accumulator;
  }, 0);
};

const getCountGenre = (films, genreItem) => {
  return films.reduce((accumulator, current) => {
    accumulator = accumulator + current.genre.some((genreFilm) => genreFilm === genreItem);
    return accumulator;
  }, 0);

};

const rankMovies = (watchedMovies) => GENRES.map((genre) => {
  return {
    genreName: genre,
    count: getCountGenre(watchedMovies, genre),
  };
});

const sortMovies = (rankedMovies) => rankedMovies.sort((a, b) => b.count - a.count);

const getFilmByTime = (films, dateFrom) => {
  return films.filter((film) => film.watchingDate >= new Date(dateFrom));
};


const renderDaysChart = (statisticCtx, sortedFilms) => {
  const BAR_HEIGHT = 50;

  const nameSortedRankedMovies = sortedFilms.map((sortedRankedMovie) => sortedRankedMovie.genreName);
  const countSortedRankedMovies = sortedFilms.map((sortedRankedMovie) => sortedRankedMovie.count);

  statisticCtx.height = BAR_HEIGHT * sortedFilms.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: nameSortedRankedMovies,
      datasets: [{
        data: countSortedRankedMovies,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsMarkup = (timeInterval, isChecked) => {
  const timeIntervalMarkup = timeInterval.toLowerCase().replace(/-/g, ` `);
  const timeIntervalLabel = timeIntervalMarkup[0].toUpperCase() + timeInterval.slice(1);

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${timeInterval}" value="${timeInterval}" ${isChecked ? `checked` : ``}>
        <label for="statistic-${timeInterval}" class="statistic__filters-label">${timeIntervalLabel}</label>`
  );
};

const createStatisticsTemplate = (films, activeIntervalType, topGenreName, profileRating) => {
  const statisticsMarkup = Object.values(StaticticsTimeInterval).map((timeInterval) => createStatisticsMarkup(timeInterval, timeInterval === activeIntervalType)).join(`\n`);
  const timeWatchedMovies = getTimeWatchedMovies(films);
  const [hours, minutes] = transformDuration(timeWatchedMovies);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${profileRating}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${statisticsMarkup}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenreName}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel, profileRating) {
    super();

    this._filmsModel = filmsModel;
    this._profileRating = profileRating;

    this._dateFrom = new Date(0);
    this._films = this._filmsModel.getFilmsAll();

    this._statisticChart = null;
    this._topGenreName = ``;
    this._activeIntervalType = StaticticsTimeInterval.ALL;

    this.show();

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createStatisticsTemplate(this._films, this._activeIntervalType, this._topGenreName, this._profileRating);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._renderCharts();
  }

  show() {
    super.show();

    this._films = this._filmsModel.getFilmsAll();
    this._films = getFilmsByFilter(this._films, FilterType.HISTORY);
    this._films = getFilmByTime(this._films, this._dateFrom);
    if (this._films.length === 0) {
      this._topGenreName = ``;
      this._sortedRankedMoviesExisting = null;
      this._resetCharts();
    } else {
      const rankedMovies = rankMovies(this._films);
      const sortedRankedMovies = sortMovies(rankedMovies);
      this._sortedRankedMoviesExisting = sortedRankedMovies.filter((sortedRankedMovie) => sortedRankedMovie.count > 0);
      this._topGenreName = sortedRankedMovies[NUMBER_BEST_GENRE].genreName;
    }

    this.rerender();
  }

  _renderCharts() {
    if (this._sortedRankedMoviesExisting) {
      const element = this.getElement();
      const statisticCtx = element.querySelector(`.statistic__chart`);
      this._statisticChart = renderDaysChart(statisticCtx, this._sortedRankedMoviesExisting);
    }
  }

  _resetCharts() {
    if (this._statisticChart) {
      this._statisticChart.destroy();
      this._statisticChart = null;
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const STATISTISTIC_ID_PREFIX = `statistic-`;

    const getFilterNameById = (id) => {
      return id.substring(STATISTISTIC_ID_PREFIX.length);
    };

    element.querySelector(`.statistic__filters`).addEventListener(`click`, (evt) => {
      const target = evt.target;
      if (target && target.id) {
        this._activeIntervalType = getFilterNameById(target.id);
        this._dateFrom = getDateFrom(this._activeIntervalType);

        this.show();
      }
    });
  }


}

