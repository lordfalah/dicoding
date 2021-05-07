const {
    saveBook,
    getAllBook,
    getDetailsBook,
    updateBook,
    deleteBook,
} = require("./handler");


const routed = [
    {
        method: "POST",
        path: "/books",
        handler: saveBook,
    },

    {
        method: "GET",
        path: "/books",
        handler: getAllBook,
    },

    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getDetailsBook,
    },

    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: updateBook,
    },
    
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBook,
    },


];



module.exports = {routed};



