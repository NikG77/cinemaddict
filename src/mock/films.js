const DECRIPTION_FILM = {
  MIN: 1,
  MAX: 5,
};

const WRITERS_FILM = {
  MIN: 0,
  MAX: 3,
};

const ACTORS_FILM = {
  MIN: 5,
  MAX: 14,
};

const GENRE_FILM = {
  MIN: 1,
  MAX: 3,
};

const GenreItems = [`Action`, `Sci-Fi`, `Adventure`, `Comedy`, `Animation`, `Thriller`, `Horror`, `Drama`, `Family`];

const TitleItems = [`A Shark Who Bought The Carpet`, `Happiness Of The Floor`, `A Man Who Bought The Wall`, `A Shark Of The Room`, `Raiders Who The Storm`, `A Lion Of The Darkness`, `A Little Pony Within The Wall`, `Family Who Sold The Wall`, `Pioneers Who Saw The Carpet`, `Raiders In The Void`, `A Shark In Him`, `Friends Of Him`, `A Little Pony With The Floor`, `A Tale Of A Little Bird Of Him`, `Country Who Saw The Room`, `Family In The Wall`, `Guest Who Us`, `Country Who Saw Him`, `Country On Us`, `Pioneers Of Himself`];

const AlternativeTitleItems = [`A Lion Who Sold The Void`, `A Lion On Us`, `Laziness In Us`, `A Shark Who Sold The Floor`, `A Man In The Floor`, `A Tale Of A Little Bird In Himself`, `A Man Who Bought Himself`, `Raiders Without The Room`, `Raiders Who The Darkness`, `Happiness Of The Floor`, `A Shark Of Himself`, `A Tale Of A Little Bird With The Wall`, `Country On Himself`, `Country On The Storm`, `Family Who Bought Us`, `Country In The Darkness`, `Happiness Who Sold Themselves`, `Laziness Who Stole The Wall`, `Laziness Who The Darkness`, `A Tale Of A Little Bird Within The Room`];

const DirectorItems = [`Quentin Tarantino`, `Clint Eastwood`, `Tom Ford`, `Brad Bird`, `Chrostopher Nolan`, `Alejandro Gonsales Inarritu`, `Akira Kurosawa`, `James Cameron`];

const WritersItems = [`Brad Bird`, `Robert Rodrigues`, `Takeshi Kitano`, `Hayao Miazaki`, `Robert Zemeckis`, `Martin Scorsese`, `Quentin Tarantino`, `Stephen King`];

const ActorsItems = [`Robert De Niro`, `Matt Damon`, `Tom Hanks`, `Takeshi Kitano`, `Christian Bale`, `Gary Oldman`, `Harrison Ford`, `Ralph Fiennes`, `Morgan Freeman `, `Michael Caine`, `Brad Pitt`, `Leonardo DiCaprio`, `Edward Norton`, `Al Pacino`, `Cillian Murphy`];

const EmojiItems = [`./images/emoji/angry.png`, `./images/emoji/puke.png`, `./images/emoji/sleeping.png`, `./images/emoji/smile.png`];

class Comments {
  constructor(emotion, data, avtor, message) {
    this.emotion = emotion;
    this.data = data;
    this.avtor = avtor;
    this.message = message;
  }
}

const DescriptionItems = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, ` Cras aliquet varius magna, non porta ligula feugiat eget.`, ` Fusce tristique felis at fermentum pharetra.`, ` Aliquam id orci ut lectus varius viverra.`, ` Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, ` Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, ` Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, ` Sed sed nisi sed augue convallis suscipit in sed felis.`, ` Aliquam erat volutpat.`, ` Nunc fermentum tortor ac porta dapibus.`, ` In rutrum ac purus sit amet tempus.`];

// Выдает на основе входящего массива массив с рандомным кол-вом элементов
const getRandomArray = function (arr, min, max) {
  const numberRandom = getRandomIntegerNumber(min, max);
  const arrClon = arr.slice();
  const arrNew = [];
  let numberArrRandom;

  for (let i = 0; i < numberRandom; i++) {
    numberArrRandom = getRandomIntegerNumber(0, arrClon.length - 1);
    arrNew.push(arrClon[numberArrRandom]);
    arrClon.splice(numberArrRandom, 1);
  }
  return arrNew;
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomReiting = () => {
  return Math.floor(Math.random() * (100 + 1)) / 10;
};

const getRandomDate = () => {
  const targetDate = new Date();

  targetDate.setFullYear(targetDate.getFullYear() - getRandomIntegerNumber(0, 50));
  targetDate.setDate(targetDate.getDate() - getRandomIntegerNumber(0, 365));
  targetDate.setMilliseconds(targetDate.getMilliseconds() - getRandomIntegerNumber(0, 1000 * 60 * 60 * 24));
  return targetDate;
};

const getRandomDateCommit = () => {
  const targetDate = new Date();

  targetDate.setHours(targetDate.getHours() - getRandomIntegerNumber(0, 40));
  return targetDate;
};

let commentsItems = [];
let commentsCounter = 0;

const getComments = (id) => {
  const commentsNumber = getRandomIntegerNumber(1, 5);
  const commentsFilmsItems = [];
  for (let i = 0; i < commentsNumber; i++) {
    commentsFilmsItems.push(String(commentsCounter));

    commentsFilmsItems[i] = new Comments(getRandomArrayItem(EmojiItems), getRandomDateCommit(), `avtor id-${id} N-${commentsCounter}`, `message id-${id} N-${commentsCounter}`);
    commentsCounter++;
  }
  commentsItems.push(commentsFilmsItems);

  return commentsItems[id];
};


let id = -1;
const generateFilm = () => {
  id++;
  return {
    "id": id,
    "film_info": {
      "title": getRandomArrayItem(TitleItems),
      "alternative_title": getRandomArrayItem(AlternativeTitleItems),
      "total_rating": getRandomReiting(),
      "poster": `./images/posters/the-great-flamarion.jpg`,
      "age_rating": 6,
      "director": getRandomArrayItem(DirectorItems),
      "writers": getRandomArray(WritersItems, WRITERS_FILM.MIN, WRITERS_FILM.MAX),
      "actors": getRandomArray(ActorsItems, ACTORS_FILM.MIN, ACTORS_FILM.MAX),
      "release": {
        "date": getRandomDate(),
        "release_country": `Italy`
      },
      "runtime": getRandomIntegerNumber(80, 130),
      "genre": getRandomArray(GenreItems, GENRE_FILM.MIN, GENRE_FILM.MAX),
      "description": getRandomArray(DescriptionItems, DECRIPTION_FILM.MIN, DECRIPTION_FILM.MAX),
    },
    "user_details": {
      "personal_rating": 5,
      "watchlist": Math.random() > 0.5,
      "already_watched": Math.random() > 0.5,
      "watching_date": `2020-04-08T08:28:00.929Z`,
      "favorite": Math.random() > 0.5
    },
    "comments": getComments(id),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
