import AbstractSmartComponent from "./abstract-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";
import {FilterType} from "../const.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {transformDuration} from "../utils/common";


const StaticticsTimeInterval = {
  ALL: `All time`,
  TODAY: `Today`,
  WEEK: `Week`,
  MONTH: `Month`,
  YEAR: `Year`,
};

// const GenreItems = [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`];
const GenreItems = [`Action`, `Sci-Fi`, `Adventure`, `Comedy`, `Animation`, `Thriller`, `Horror`, `Drama`, `Family`];

const rankMovies = (watchedMovies) => Object.values(GenreItems).map((genreItem) => {
  return {
    genreName: genreItem,
    count: getCountGenre(watchedMovies, genreItem),
  };
});

const sortMovies = (rankedMovies) => rankedMovies.sort((a, b) => b.count - a.count);


const renderDaysChart = (statisticCtx, films) => {
  const BAR_HEIGHT = 50;

  const watchedMovies = getFilmsByFilter(films, FilterType.HISTORY);
  const rankedMovies = rankMovies(watchedMovies);
  const sortedRankedMovies = sortMovies(rankedMovies);
  const nameSortedRankedMovies = sortedRankedMovies.map((sortedRankedMovie) => sortedRankedMovie.genreName);
  const countSortedRankedMovies = sortedRankedMovies.map((sortedRankedMovie) => sortedRankedMovie.count);

  statisticCtx.height = BAR_HEIGHT * sortedRankedMovies.length;

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

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${timeInterval.toLowerCase().replace(/ /g, `-`)}" value="${timeInterval.toLowerCase()}" ${isChecked ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">${timeInterval}</label>`
  );

};

const getTimeWatchedMovies = (films) => {
  return films.reduce((accumulator, current) => {
    accumulator = +accumulator + +current.film_info.runtime;
    return accumulator;
  }, 0);
};

const getCountGenre = (films, genreItem) => {
  return films.reduce((accumulator, current) => {
    accumulator = accumulator + current.film_info.genre.some((genreFilm) => genreFilm === genreItem);
    return accumulator;
  }, 0);

};

const createStatisticsTemplate = ({films}, activeIntervalType) => {
  const statisticsMarkup = Object.values(StaticticsTimeInterval).map((timeInterval) => createStatisticsMarkup(timeInterval, timeInterval === activeIntervalType)).join(`\n`);
  const watchedMovies = getFilmsByFilter(films, FilterType.HISTORY);
  const timeWatchedMovies = getTimeWatchedMovies(watchedMovies);
  const [hours, minutes] = transformDuration(timeWatchedMovies);
  const rankedMovies = rankMovies(watchedMovies);
  const sortedRankedMovies = sortMovies(rankedMovies);
  const topGenreName = sortedRankedMovies[0].genreName;

  // const createStatisticsTemplate = ({tasks, dateFrom, dateTo}) => {
  //   const placeholder = createPlaceholder(dateFrom, dateTo);
  //   const tasksCount = getTasksByDateRange(tasks, dateFrom, dateTo).length;
  // поменял

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${statisticsMarkup}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedMovies.length} <span class="statistic__item-description">movies</span></p>
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
  constructor({films}) {
    super();

    this._films = films;
    // this._dateFrom = dateFrom;
    // this._dateTo = dateTo;

    this._statisticChart = null;
    // this._colorsChart = null;


    this._activeIntervalType = StaticticsTimeInterval.ALL;


    this._renderCharts();
  }
  // constructor({tasks, dateFrom, dateTo}) {
  //   super();

  //   this._tasks = tasks;
  //   this._dateFrom = dateFrom;
  //   this._dateTo = dateTo;

  //   this._daysChart = null;
  //   // this._colorsChart = null;


  //   this._renderCharts();
  // }

  getTemplate() {
    // return createStatisticsTemplate({tasks: this._tasks.getTasks(), dateFrom: this._dateFrom, dateTo: this._dateTo});
    return createStatisticsTemplate({films: this._films.getFilms()});
  }

  // ok
  show() {
    super.show();
     
    // this.rerender(this._tasks, this._dateFrom, this._dateTo);
    this.rerender(this._films);
  }

  recoveryListeners() {}

  // ok
  rerender(films) {
    // super.rerender();


    this._films = films;


    // rerender(tasks, dateFrom, dateTo) {
    //   this._tasks = tasks;
    //   this._dateFrom = dateFrom;
    //   this._dateTo = dateTo;

    this._renderCharts();
  }
  // ok
  _renderCharts() {
    const element = this.getElement();


    // const daysCtx = element.querySelector(`.statistic__days`);
    const statisticCtx = element.querySelector(`.statistic__chart`);

    this._resetCharts();

    // this._daysChart = renderDaysChart(daysCtx, this._tasks.getTasks(), this._dateFrom, this._dateTo);
    this._statisticChart = renderDaysChart(statisticCtx, this._films.getFilms());
  }
  // ok
  _resetCharts() {
    // if (this._daysChart) {
    //   this._daysChart.destroy();
    //   this._daysChart = null;
    // }

    if (this._statisticChart) {
      this._statisticChart.destroy();
      this._statisticChart = null;
    }
  }

}

