var API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fc76a04962defb059ffa9428a2b0dbd9&page=1&language=fr-FR';
var GENRE_API_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=fc76a04962defb059ffa9428a2b0dbd9&language=fr-FR';
var IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
var moviesElements = document.querySelectorAll('.movie');
var moviesHeader = document.querySelector('.MoviesHeader');

var data;
var date=1;
var i=0;
var api_data;
var genres_data;

async function getGenres(url){
    const res = await fetch(url);
    const data = await res.json();
    genres_data = data.genres;
}
getGenres(GENRE_API_URL)
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    api_data = data.results;
    console.log(api_data);
    selectContent();
};
getMovies(API_URL);

function selectContent(){
    i=0;
    api_data.splice(12);
    data = api_data;
    var filmIndex=0;
    var m1;
    switch(date){
        case 1:
            m1=1;
            break;
        case 2:
            m1=4;
            break;
        case 3:
            m1=7;
            break;
        case 4:
            m1=10;
            break;
    }
    api_data.forEach((film) => {
        const { title, poster_path, vote_average, overview } = film;
        if(filmIndex-1 == m1 || filmIndex == m1 || filmIndex+1 == m1){
            updateContent(film, m1)
        }
        filmIndex++;
        initSelect(api_data)
    });
}

function updateContent(array, idx){
    const imgBox: HTMLElement = moviesElements[i].querySelector('.imageBox');

    const thumbnail: HTMLImageElement = imgBox.querySelector('.thumbnail');
    thumbnail.src = `${IMAGE_PATH+array.poster_path}`;
    
    imgBox.querySelector('.movie-desc').innerHTML = ``;

    var owtitle = document.createElement('h5');
    var owdesc = document.createElement('p');

    owtitle.innerText = array.title;
    owdesc.innerText = array.overview;

    var button:HTMLButtonElement = moviesElements[i].querySelector('.movie-info-btn');
    
    button.setAttribute("film", "");
    button.setAttribute('film', `${i-1+idx}`);

    imgBox.querySelector('.movie-desc').appendChild(owtitle);
    imgBox.querySelector('.movie-desc').appendChild(owdesc);

    const movieTitle: HTMLTitleElement = moviesElements[i].querySelector('.movie-title')
    movieTitle.innerText = array.title;

    var releaseDate = array.release_date.split("-");
    switch(releaseDate[1]){
        case "01":
            releaseDate[1] = " Janvier ";
            break;
        case "02":
            releaseDate[1] = " Février ";
            break;
        case "03":
            releaseDate[1] = " Mars ";
            break;
        case "04":
            releaseDate[1] = " Avril ";
            break;
        case "05":
            releaseDate[1] = " Mai ";
            break;
        case "06":
            releaseDate[1] = " Juin ";
            break;
        case "07":
            releaseDate[1] = " Juillet ";
            break;
        case "08":
            releaseDate[1] = " Août ";
            break;
        case "09":
            releaseDate[1] = " Septembre ";
            break;
        case "10":
            releaseDate[1] = " Octobre ";
            break;
        case "11":
            releaseDate[1] = " Novembre ";
            break;
        case "12":
            releaseDate[1] = " Décembre ";
            break;
    }
    moviesElements[i].querySelector('.movie-release').innerHTML =`
    <i class="fas fa-calendar"></i>
    ${releaseDate[2]+ releaseDate[1] +" "+releaseDate[0]}`;
    i++;
}

function initSelect(data){
    const select = document.getElementById('Seances')
    select.innerHTML = 
    `
    <option value="/">--Choisissez une Séance--</option>

    <option disabled value="/">--5 Août--</option>
    ${optionBuilder(data[0].title,data[1].title,data[2].title)}
    <option disabled value="/">--6 Août--</option>
    ${optionBuilder(data[3].title,data[4].title,data[5].title)}
    <option disabled value="/">--7 Août--</option>
    ${optionBuilder(data[6].title,data[7].title,data[8].title)}
    <option disabled value="/">--8 Août--</option>
    ${optionBuilder(data[9].title,data[10].title,data[11].title)}
    `
}

function optionBuilder(title1: string, title2: string, title3: string){
    return `
    <option value="${title1}">18H-20H ➔ ${title1}</option>
    <option value="${title2}">20H-22H ➔ ${title2}</option>
    <option value="${title3}">22-Minuit ➔ ${title3}</option>
    `;
}

setInterval(() => {
    const scrollButton:HTMLLinkElement = document.querySelector('.scroll-top');
   if(window.pageYOffset > 0){

       scrollButton.style.visibility = "visible";
       scrollButton.style.opacity = "1";
   }
   else{

    scrollButton.style.visibility = "hidden";
    scrollButton.style.opacity = "0";   
}

}, 100);

const button_left: HTMLButtonElement = document.querySelector('.movies-carousel-left');
const button_right: HTMLButtonElement = document.querySelector('.movies-carousel-right');

button_left.addEventListener('click', () => {
    date--;
    moviesHeader.querySelector("h2").innerText = `${4+date} Août 2021`;
    enableButtons();
    if(date == 1){
        button_left.disabled = true;
    }
    selectContent();
})

button_right.addEventListener('click', () => {
    date++;
    enableButtons();
    moviesHeader.querySelector("h2").innerText = `${4+date} Août 2021`;
    if(date == 4){
        button_right.disabled = true;
        button_right.classList.add('disabled')
    }
    selectContent();
})

function enableButtons() {
    button_left.disabled = false;
    button_right.disabled = false;
    button_left.classList.remove('disabled')
    button_right.classList.remove('disabled')
}

function removeActiveClasses(){
    const nav_links = document.querySelectorAll('.nav-link')
    nav_links.forEach((menu_element) => {
        menu_element.classList.remove('active')
    })
}

const nav_links = document.querySelectorAll('.nav-link');

const moviesInfoButtons = document.querySelectorAll('.movie-info-btn');

const openFilmPopup = _ => {
    const genres = [];
    api_data[_].genre_ids.forEach((genre) => {
        function checkGenre(genre){
            genres_data.forEach((id) => {
                if(id.id == genre) genres.push(id.name)
            })
        }
        checkGenre(genre)
    })
    const background:HTMLDivElement = document.createElement('div');
    const movieCard:HTMLDivElement = document.createElement('div');

    background.classList.add("background");
    movieCard.classList.add("popup");

    const cardbottom = document.createElement("div");
    const cardtop = document.createElement('div');

    

    document.body.classList.add('scroll-lock');
    console.log(background);
    document.body.appendChild(background);
    background.appendChild(movieCard);
}

moviesInfoButtons.forEach((button) => {
    button.addEventListener("click", (e) => openFilmPopup(button.getAttribute('film')))
})

