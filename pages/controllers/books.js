import Book from '../models/Book';

export const getAll = async (req, res) => {
    let books;
    try {
        books = await Book.find();
        console.log('Books', books);
    } catch (e) {
        return new Error(e);
    }

    if (!books) {
        return res
            .status(500)
            .json({message: 'Internal Server Error'})
    }

    return res
        .status(200)
        .json({books})
};

export const get = async (req, res) => {
    const id = req.query.id;
    console.log('ID', id);
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        return new Error(e);
    }

    if (!book) {
        return res
            .status(500)
            .json({message: 'Internal Server Error'})
    }

    return res
        .status(200)
        .json({book})
};

export const add = async (req, res) => {
    // validate
    // if invalid
    // return res
    //     .status(422)
    //     .json({message: 'Invalid data'})

    let book;
    try {
        console.log('Controller book: ', book);
        book = new Book({...req.body});
        console.log('Controller book: ', book);
        book = await book.save();
        console.log('Saved book: ', book);
    } catch (e) {
        console.log('Error during saving: ', e);
        return new Error(e);
    }

    if (!book) {
        return res
            .status(500)
            .json({message: 'Internal Server Error'})
    }

    return res
        .status(201)
        .json({book})
};

export const update = async (req, res) => {
    // validate
    // if invalid
    // return res
    //     .status(422)
    //     .json({message: 'Invalid data'})

    const id = req.query.id;
    let book;
    try {
        book = await Book.findByIdAndUpdate(id, {...req.body});
    } catch (e) {
        return new Error(e);
    }

    if (!book) {
        return res
            .status(500)
            .json({message: 'Internal Server Error'})
    }

    return res
        .status(200)
        .json({book})
};

export const remove = async (req, res) => {
    // validate
    // if invalid
    // return res
    //     .status(422)
    //     .json({message: 'Invalid data'})

    const id = req.query.id;
    let book;
    try {
        book = await Book.findByIdAndRemove(id);
    } catch (e) {
        return new Error(e);
    }

    if (!book) {
        return res
            .status(500)
            .json({message: 'Internal Server Error'})
    }

    return res
        .status(200)
        .json({book})
};
