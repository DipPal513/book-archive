// decalring global variable
const searchInput = document.getElementById('search-input');
const displayResult = document.getElementById('show-result')
const searchQuantityDisplay = document.getElementById('searchQuantity');
const displayError = document.getElementById('displayError');
const loader = document.getElementById('loader');
let storeBooks = [];
// search book
const searchBook = () => {
    const searchText = searchInput.value;

    if (searchInput.value === '') {
        displayResult.textContent = '';
        displayError.innerHTML = `Input cannot be empty!`
        displayError.classList.remove('d-none')
        searchQuantityDisplay.textContent = ''
    }
    else if (searchInput.value.length > 0) {
        searchInput.value = '';
        searchQuantityDisplay.innerHTML = ''
        loader.style.display = 'block'
        const url = ` https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    displayBook(data.docs)
                }
                else {
                    displayError.innerHTML = `Something went wrong please try again later`;
                    loader.style.display = 'none'

                }
            })
    }
}

// display book
const displayBook = (data) => {
    storeBooks.length = 0;
    loader.style.display = 'none'
    displayResult.textContent = '';
    displayError.classList.add('d-none')

    if (data.num_found === 0) {
        displayError.innerHTML = `Please enter a valid book name`;
        displayError.classList.remove('d-none')
    }
    const allData = data.slice(0, 20)
    allData.forEach(book => {
        const coverImg = book.cover_i;
        const div = document.createElement("div");
        div.classList.add('col-lg-4', 'col-md-4', 'col-sm-6')
        div.innerHTML =
            `
        <div class="card h-100" >
        <img src="https://covers.openlibrary.org/b/id/${coverImg}-M.jpg" class="card-img-top book-img" alt="...">
        <div class="card-body">
        <h5 class="card-title">Tittle : ${book.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Author : ${book.author_name ? book.author_name[0] : 'Unknown author'}</h6>
        <h6 class="card-subtitle mb-2 text-muted">First Publish Year : ${book.first_publish_year}</h6>
        </div>
        </div> `
        displayResult.appendChild(div)
    })
    data.forEach(book => {
        storeBooks.push(book)
    })
    if(storeBooks.length < 1){
        displayError.innerHTML = 'Please enter a valid book name';
        displayError.classList.remove('d-none')
    }
    else{

        searchQuantityDisplay.innerHTML = `About ${storeBooks.length} Results Found`;
    }

}
