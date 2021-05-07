const {nanoid} = require("nanoid");
const books = require("./notes");


const saveBook = (request, h) =>{
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;


    if(!name){
        const response =  h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });

        response.code(400);
        return response;
    };

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });

        response.code(400);
        return response;
    };

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;


    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter(book => book.id === id).length > 0;

    if(isSuccess){
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });

        response.code(201);
        return response;
    };

    const response = h.response({
        status: "error",
        message: "Buku gagal ditambahkan",
    });

    response.code(500);
    return response;
};

const getAllBook = (request, h) =>{
    return {
        status: "success",
        data: {
            books: books.map(book => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    };
};


const getDetailsBook = (request, h) =>{
    const {bookId} = request.params;

    const book = books.filter(idx => idx.id === bookId)[0];

    if(book){
        const response = h.response({
            status: "success",
            data: {
                book
            },
        });

        response.code(200);
        return response;
    };

    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
    });

    response.code(404);
    return response;
};

const updateBook = (request, h) =>{
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const {bookId} = request.params;

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });

        response.code(400);
        return response;
    };

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });

        response.code(400);
        return response;
    };

    const book = books.findIndex(idx => idx.id === bookId);

    if(book != -1){
        books[book] = {
            ...books[book],
            bookId,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt,
        };

        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });

        response.code(200);
        return response;
    };

    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });

    response.code(404);
    return response;
};


const deleteBook = (request, h) =>{
    const {bookId} = request.params;

    const book = books.findIndex(idx => idx.id === bookId);

    if(book != -1){
        books.splice(book, 1);

        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });

        response.code(200);
        return response;
    };

    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
    });

    response.code(404);
    return response;
};

module.exports = {
    saveBook, 
    getAllBook, 
    getDetailsBook, 
    updateBook,
    deleteBook,
};







