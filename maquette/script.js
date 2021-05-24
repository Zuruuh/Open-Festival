var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fc76a04962defb059ffa9428a2b0dbd9&page=1&language=fr-FR';
var GENRE_API_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=fc76a04962defb059ffa9428a2b0dbd9&language=fr-FR';
var IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
var moviesElements = document.querySelectorAll('.movie');
var moviesHeader = document.querySelector('.MoviesHeader');
var data;
var date = 1;
var i = 0;
var api_data;
var genres_data;
var scale = function (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
function getGenres(url) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    genres_data = data.genres;
                    return [2 /*return*/];
            }
        });
    });
}
getGenres(GENRE_API_URL);
function getMovies(url) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    api_data = data.results;
                    selectContent();
                    return [2 /*return*/];
            }
        });
    });
}
;
getMovies(API_URL);
function selectContent() {
    i = 0;
    api_data.splice(12);
    data = api_data;
    var filmIndex = 0;
    var m1;
    switch (date) {
        case 1:
            m1 = 1;
            break;
        case 2:
            m1 = 4;
            break;
        case 3:
            m1 = 7;
            break;
        case 4:
            m1 = 10;
            break;
    }
    api_data.forEach(function (film) {
        var title = film.title, poster_path = film.poster_path, vote_average = film.vote_average, overview = film.overview;
        if (filmIndex - 1 == m1 || filmIndex == m1 || filmIndex + 1 == m1) {
            updateContent(film, m1);
        }
        filmIndex++;
        initSelect(api_data);
    });
}
function updateContent(array, idx) {
    var imgBox = moviesElements[i].querySelector('.imageBox');
    var thumbnail = imgBox.querySelector('.thumbnail');
    thumbnail.src = "" + (IMAGE_PATH + array.poster_path);
    imgBox.querySelector('.movie-desc').innerHTML = "";
    var owtitle = document.createElement('h5');
    var owdesc = document.createElement('p');
    var overvieww = array.overview;
    if (overvieww.length > 400)
        overvieww = overvieww.slice(0, 400) + " ...";
    owtitle.innerText = array.title;
    owdesc.innerText = overvieww;
    var button = moviesElements[i].querySelector('.movie-info-btn');
    button.setAttribute("film", "");
    button.setAttribute('film', "" + (i - 1 + idx));
    imgBox.querySelector('.movie-desc').appendChild(owtitle);
    imgBox.querySelector('.movie-desc').appendChild(owdesc);
    var movieTitle = moviesElements[i].querySelector('.movie-title');
    movieTitle.innerText = array.title;
    var releaseDate = array.release_date.split("-");
    var finalDate = (getDate(releaseDate));
    moviesElements[i].querySelector('.movie-release').innerHTML = "\n    <i class=\"fas fa-calendar\"></i>\n    " + finalDate;
    i++;
}
function getDate(date) {
    var day = date[2];
    var dayArr = day.split('');
    if (dayArr[0] == "0") {
        day = dayArr[1];
    }
    var month = date[1];
    var year = date[0];
    switch (month) {
        case "01":
            month = " Janvier ";
            break;
        case "02":
            month = " Février ";
            break;
        case "03":
            month = " Mars ";
            break;
        case "04":
            month = " Avril ";
            break;
        case "05":
            month = " Mai ";
            break;
        case "06":
            month = " Juin ";
            break;
        case "07":
            month = " Juillet ";
            break;
        case "08":
            month = " Août ";
            break;
        case "09":
            month = " Septembre ";
            break;
        case "10":
            month = " Octobre ";
            break;
        case "11":
            month = " Novembre ";
            break;
        case "12":
            month = " Décembre ";
            break;
        default:
    }
    return "" + day + month + year;
}
function initSelect(data) {
    var select = document.getElementById('Seances');
    select.innerHTML =
        "\n    <option value=\"/\">--Choisissez une S\u00E9ance--</option>\n\n    <option disabled value=\"/\">--5 Ao\u00FBt--</option>\n    " + optionBuilder(data[0].title, data[1].title, data[2].title) + "\n    <option disabled value=\"/\">--6 Ao\u00FBt--</option>\n    " + optionBuilder(data[3].title, data[4].title, data[5].title) + "\n    <option disabled value=\"/\">--7 Ao\u00FBt--</option>\n    " + optionBuilder(data[6].title, data[7].title, data[8].title) + "\n    <option disabled value=\"/\">--8 Ao\u00FBt--</option>\n    " + optionBuilder(data[9].title, data[10].title, data[11].title) + "\n    ";
}
function optionBuilder(title1, title2, title3) {
    return "\n    <option value=\"" + title1 + "\">18H-20H \u2794 " + title1 + "</option>\n    <option value=\"" + title2 + "\">20H-22H \u2794 " + title2 + "</option>\n    <option value=\"" + title3 + "\">22H-Minuit \u2794 " + title3 + "</option>\n    ";
}
setInterval(function () {
    var scrollButton = document.querySelector('.scroll-top');
    if (window.pageYOffset > 0) {
        scrollButton.style.visibility = "visible";
        scrollButton.style.opacity = "1";
    }
    else {
        scrollButton.style.visibility = "hidden";
        scrollButton.style.opacity = "0";
    }
}, 100);
var button_left = document.querySelector('.movies-carousel-left');
var button_right = document.querySelector('.movies-carousel-right');
button_left.addEventListener('click', function () {
    date--;
    moviesHeader.querySelector("h2").innerText = 4 + date + " Ao\u00FBt 2021";
    enableButtons();
    if (date == 1) {
        button_left.disabled = true;
    }
    selectContent();
});
button_right.addEventListener('click', function () {
    date++;
    enableButtons();
    moviesHeader.querySelector("h2").innerText = 4 + date + " Ao\u00FBt 2021";
    if (date == 4) {
        button_right.disabled = true;
        button_right.classList.add('disabled');
    }
    selectContent();
});
function enableButtons() {
    button_left.disabled = false;
    button_right.disabled = false;
    button_left.classList.remove('disabled');
    button_right.classList.remove('disabled');
}
function removeActiveClasses() {
    var nav_links = document.querySelectorAll('.nav-link');
    nav_links.forEach(function (menu_element) {
        menu_element.classList.remove('active');
    });
}
var nav_links = document.querySelectorAll('.nav-link');
var moviesInfoButtons = document.querySelectorAll('.movie-info-btn');
var openFilmPopup = function (_) {
    var genres = [];
    api_data[_].genre_ids.forEach(function (genre) {
        function checkGenre(genre) {
            genres_data.forEach(function (id) {
                if (id.id == genre)
                    genres.push(id.name);
            });
        }
        checkGenre(genre);
    });
    var background = document.createElement('div');
    var movieCard = document.createElement('div');
    background.classList.add("background");
    movieCard.classList.add("popup");
    document.body.classList.add('scroll-lock');
    movieCard.innerHTML =
        "\n    <div class=\"card-top\">\n        <div class=\"imageBox\">\n            <img class=\"content-thumbnail\" src=\"" + (IMAGE_PATH + api_data[_].poster_path) + "\"/>\n        </div>\n        <div class=\"content\">\n            <div class=\"content-top\">\n                <h5>" + api_data[_].title + "</h5>\n                <div class=\"content-rating\">\n                    <svg>\n                    <circle cx=\"40\" cy=\"40\" r=\"40\"></circle>\n                        <circle cx=\"40\" cy=\"40\" r=\"40\" class=\"circle\" style=\"\n                        stroke-dashoffset:" + scale(api_data[_].vote_average, 0, 10, 500, 250) + ";\n                        stroke:" + getColor(api_data[_].vote_average) + ";\n                        stroke-dasharray: 500;\n                        \">\n                        </circle>\n                    </svg>\n                    <p class=\"rating-number\">\n                    " + api_data[_].vote_average + "\n                    <sub style=\"\n                            font-size: 0.6em;\n                            font-weight: 400;\n                            \">/10</sub></p>\n                    </p>\n                </div>\n            </div>\n        <p class=\"release-date\">\n                        Parution: " + (getDate(api_data[_].release_date.split('-'))) + "\n        </p>\n        <div class=\"tags\">\n            " + returnGenres(genres) + "\n        </div>\n    </div>\n</div>\n    <div class=\"cardbottom\">\n        <p>\n                " + api_data[_].overview + "  \n        </p>\n        <button class=\"popup-close-btn\">D'accord</button>\n    </div>\n    ";
    document.body.appendChild(background);
    background.appendChild(movieCard);
    initEvents(background);
};
moviesInfoButtons.forEach(function (button) {
    button.addEventListener("click", function (e) { return openFilmPopup(button.getAttribute('film')); });
});
function initEvents(background) {
    var button = document.querySelector('.popup-close-btn');
    button.addEventListener('click', function (e) {
        closePopup(e);
        document.body.classList.remove('scroll-lock');
    });
    background.addEventListener('click', function (e) { return closePopup(e); });
    var closePopup = function (_) {
        if (_.target == background || _.target == button) {
            background.remove();
            document.body.classList.remove('scroll-lock');
        }
    };
}
function getColor(note) {
    if (note <= 4)
        return '#EA2620 ';
    else if (note <= 6)
        return '#EAE120';
    else if (note <= 8)
        return '#91EA20';
    else if (note <= 10)
        return '#38EA20';
}
function returnGenres(array) {
    var final = "";
    array.forEach(function (element) {
        final +=
            "\n        <div class=\"tag\">" + element + "</div>\n        ";
    });
    return final;
}
var links = document.querySelectorAll('.mobile-nav li');
links.forEach(function (link) {
    link.addEventListener('click', function (e) {
        document.querySelector('.mobile-nav').classList.toggle('active');
        document.querySelector('.toggle').classList.toggle('active');
    });
});
