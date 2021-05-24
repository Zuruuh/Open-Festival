const API_URL:String = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fc76a04962defb059ffa9428a2b0dbd9&page=1&language=fr-FR';
const GENRE_API_URL:String = 'https://api.themoviedb.org/3/genre/movie/list?api_key=fc76a04962defb059ffa9428a2b0dbd9&language=fr-FR';
const IMAGE_PATH:String = 'https://image.tmdb.org/t/p/w1280';
var moviesElements:NodeListOf<HTMLElement> = document.querySelectorAll('.movie');
var moviesHeader:HTMLElement = document.querySelector('.MoviesHeader');

var data;
var date:number = 1;
var i:number = 0;
var api_data;
var genres_data;

const scale:Function = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
} 

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
    selectContent();
};
getMovies(API_URL);

function selectContent(){
    i=0;
    api_data.splice(12);
    data = api_data;
    var filmIndex=0;
    var m1:number;
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
    var overvieww = array.overview;
    if(overvieww.length > 400) overvieww = overvieww.slice(0, 400) + " ...";
    owtitle.innerText = array.title;
    owdesc.innerText = overvieww;
    var button:HTMLButtonElement = moviesElements[i].querySelector('.movie-info-btn');
    
    button.setAttribute("film", "");
    button.setAttribute('film', `${i-1+idx}`);

    imgBox.querySelector('.movie-desc').appendChild(owtitle);
    imgBox.querySelector('.movie-desc').appendChild(owdesc);

    const movieTitle: HTMLTitleElement = moviesElements[i].querySelector('.movie-title')
    movieTitle.innerText = array.title;

    var releaseDate = array.release_date.split("-");
    var finalDate = (getDate(releaseDate));

    moviesElements[i].querySelector('.movie-release').innerHTML =`
    <i class="fas fa-calendar"></i>
    ${finalDate}`;
    i++;
}

function getDate(date){
    var day:string = date[2];
    var dayArr = day.split('');
    if(dayArr[0] == "0") {
        day = dayArr[1];
    }
    var month:string = date[1];
    var year:string = date[0];
    switch(month){
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
    }
    return `${day}${month}${year}`;
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
    <option value="${title3}">22H-Minuit ➔ ${title3}</option>
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
    document.body.classList.add('scroll-lock');

    movieCard.innerHTML =
    `
    <div class="card-top">
        <div class="imageBox">
            <img class="content-thumbnail" src="${IMAGE_PATH + api_data[_].poster_path}"/>
        </div>
        <div class="content">
            <div class="content-top">
                <h5>${api_data[_].title}</h5>
                <div class="content-rating">
                    <svg>
                    <circle cx="40" cy="40" r="40"></circle>
                        <circle cx="40" cy="40" r="40" class="circle" style="
                        stroke-dashoffset:${scale(api_data[_].vote_average, 0, 10, 500, 250)};
                        stroke:${getColor(api_data[_].vote_average)};
                        stroke-dasharray: 500;
                        ">
                        </circle>
                    </svg>
                    <p class="rating-number">
                    ${api_data[_].vote_average}
                    <sub style="
                            font-size: 0.6em;
                            font-weight: 400;
                            ">/10</sub></p>
                    </p>
                </div>
            </div>
        <p class="release-date">
                        Parution: ${(getDate(api_data[_].release_date.split('-')))}
        </p>
        <div class="tags">
            ${returnGenres(genres)}
        </div>
    </div>
</div>
    <div class="cardbottom">
        <p>
                ${api_data[_].overview}  
        </p>
        <button class="popup-close-btn">D'accord</button>
    </div>
    `;

    

    document.body.appendChild(background);
    background.appendChild(movieCard);
    initEvents(background);
}

moviesInfoButtons.forEach((button) => {
    button.addEventListener("click", (e) => openFilmPopup(button.getAttribute('film')))
})

function initEvents(background){

    const button:HTMLButtonElement = document.querySelector('.popup-close-btn')

    button.addEventListener('click', (e) => {
        closePopup(e)
        document.body.classList.remove('scroll-lock');
    })
    background.addEventListener('click', (e) => closePopup(e))


    const closePopup = _ => {
        if(_.target == background || _.target == button){
            background.remove();
            document.body.classList.remove('scroll-lock')
        }
    }

}

function getColor(note){
    if(note <= 4)return '#EA2620 ';
    else if(note <= 6)return '#EAE120';
    else if(note <= 8)return '#91EA20';
    else if(note <= 10)return '#38EA20';
}

function returnGenres(array){
    var final = "";
    array.forEach((element) => {
        final+=
        `
        <div class="tag">${element}</div>
        `;
    })
    return final;
}

const links:NodeListOf<HTMLLIElement> = document.querySelectorAll('.mobile-nav li');
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        document.querySelector('.mobile-nav').classList.toggle('active');
        document.querySelector('.toggle').classList.toggle('active');
    })
})
        
        
