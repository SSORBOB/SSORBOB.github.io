const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.querySelector('#add-modal'); the hashtag # makes it a css selector
// const addMovieModal = document.body.children[1];

const startAddMovieButton = document.querySelector("header button");
// const startAddMovieButton = document.querySelector('header').lastElementChild;

const backdrop = document.getElementById("backdrop");
// const backdrop = document.body.firstElementChild;
const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive"); //period dot(.) is used to identify css id's
const confirmAddMovieBtn = addMovieModal.querySelector(".btn--success");
// const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
// const userInputs = addMovieModal.getElementByTagName('input');

const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const entryTextSection = document.getElementById("entry-text");

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const clearMovieInput = () => {
    for (const inp of userInputs) {
        inp.value = "";
    }
};

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

const deleteMovie = (movieId) => {
    let movieIdx = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIdx++;
    }
    //Remove from array
    movies.splice(movieIdx, 1);
    //Update dom and remove item from idx
    const listRoot = document.getElementById("movie-list");
    listRoot.children[movieIdx].remove();
    // listRoot.removeChild(listRoot.children[movieIdx]);
    cancelMovieDeletionModal();
    updateUI();
};

const cancelMovieDeletionModal = () => {
    deleteMovieModal.classList.remove("visible");
    toggleBackdrop();
};

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();
    const cancelDeletion = deleteMovieModal.querySelector(".btn--passive");
    let confirmDeletion = deleteMovieModal.querySelector(".btn--danger");

    cancelDeletion.removeEventListener("click", cancelMovieDeletionModal);
    cancelDeletion.addEventListener("click", cancelMovieDeletionModal);

    // confirmDeletion.removeEventListener("click",deleteMovie.bind(null, movieId)); will not work

    confirmDeletion.replaceWith(confirmDeletion.cloneNode(true)); //Removes the previous listeners because when you replace with a clone GC removes the prev listeners as they are then unassigned since this is a deepcopy
    confirmDeletion = deleteMovieModal.querySelector(".btn--danger");
    confirmDeletion.addEventListener("click", deleteMovie.bind(null, movieId));
    // deleteMovie(movieId);
};

const renderNewMovieElement = (movieObj) => {
    title = movieObj["title"];
    imageUrl = movieObj["imageUrl"];
    rating = movieObj["rating"];
    id = movieObj["id"];
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt = "${title}">
    </div>
    <div class = "movie-element__info"
        <h2>${title}</h2>
        <p>${rating}/5</p>
    </div>
    `;
    newMovieElement.addEventListener(
        "click",
        deleteMovieHandler.bind(null, id)
    );
    const listRoot = document.getElementById("movie-list");
    listRoot.append(newMovieElement);
};

const closeMovieModal = () => {
    addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
    addMovieModal.classList.add("visible");
    toggleBackdrop();
};

const backdropClickHandler = () => {
    closeMovieModal();
    cancelMovieDeletionModal();
    clearMovieInput();
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInput();
};

const confirmAddMovieHandler = () => {
    //Select user inputs then validate data
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === "" ||
        imageUrlValue.trim() == "" ||
        ratingValue.trim() == "" ||
        parseInt(ratingValue) < 1 ||
        parseInt(ratingValue) > 5
    ) {
        alert("Please enter valid values ( rating has to be from 1 to 5 )");
    }

    const newMovie = {
        title: titleValue,
        imageUrl: imageUrlValue,
        rating: ratingValue,
        id: Math.random().toString(),
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie);
    updateUI();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener("click", confirmAddMovieHandler);
