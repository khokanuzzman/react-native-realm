import realm from "./realm";

let getAllBooks = () => {
    return realm.objects('Book');
}

// Add our two new functions
let addBook = (_title, _pages, _edition = null) => {
    realm.write(() => {
        const book = realm.create('Book', {
            title: _title,
            pages:  _pages,
            edition: _edition
        });
    });
}

let updateAllBookEditions = () => {
    realm.write(() => {
        let books = getAllBooks()
        books.map((item, index) => {
            if (item.edition === null){
                item.edition = 1
            }
        })
    });
};

let deleteAllBooks = () => {
    realm.write(() => {
        realm.delete(getAllBooks());
    })
}

export {
    getAllBooks,
    addBook,
    deleteAllBooks,
    updateAllBookEditions
}