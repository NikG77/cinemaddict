import AbstractSmartComponent from "./abstract-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";


// const colorToHex = {
//   black: `#000000`,
//   blue: `#0c5cdd`,
//   green: `#31b55c`,
//   pink: `#ff3cb9`,
//   yellow: `#ffe125`,
// };

// const getUniqItems = (item, index, array) => {
//   return array.indexOf(item) === index;
// };

// const getTasksByDateRange = (tasks, dateFrom, dateTo) => {
//   return tasks.filter((task) => {
//     const dueDate = task.dueDate;

//     return dueDate >= dateFrom && dueDate <= dateTo;
//   });
// };

// const createPlaceholder = (dateFrom, dateTo) => {
//   const format = (date) => {
//     return moment(date).format(`DD MMM`);
//   };

//   return `${format(dateFrom)} - ${format(dateTo)}`;
// };

// const calcUniqCountColor = (tasks, color) => {
//   return tasks.filter((it) => it.color === color).length;
// };

// const calculateBetweenDates = (from, to) => {
//   const result = [];
//   let date = new Date(from);

//   while (date <= to) {
//     result.push(date);

//     date = new Date(date);
//     date.setDate(date.getDate() + 1);
//   }

//   return result;
// };


const renderDaysChart = (statisticCtx, films) => {


  // const renderDaysChart = (daysCtx, tasks, dateFrom, dateTo) => {
  //   const days = calculateBetweenDates(dateFrom, dateTo);

  //   const taskCountOnDay = days.map((date) => {
  //     return tasks.filter((task) => {
  //       return isOneDay(task.dueDate, date);
  //     }).length;
  //   });

  //   const formattedDates = days.map((it) => moment(it).format(`DD MMM`));

  // return new Chart(daysCtx, {
  //   plugins: [ChartDataLabels],
  //   type: `line`,
  //   data: {
  //     labels: formattedDates,
  //     datasets: [{
  //       data: taskCountOnDay,


  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
      datasets: [{
        data: [11, 8, 7, 4, 3],
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
}

// ok
const createStatisticsTemplate = ({films}) => {

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

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">Sci-Fi</p>
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
    this._films = films;


    // rerender(tasks, dateFrom, dateTo) {
    //   this._tasks = tasks;
    //   this._dateFrom = dateFrom;
    //   this._dateTo = dateTo;

    super.rerender();

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

