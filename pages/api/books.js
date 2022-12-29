import {connectToDB} from '../helpers/utils';
import {add as addBook, getAll as getAllBooks} from '../controllers/books';

export default async (req, res) => {
    await connectToDB();
    console.log('API Method: ', req.method);

    if (req.method === 'GET') {
        return getAllBooks(req, res);
    }

    if (req.method === 'POST') {
        return addBook(req, res);
    }
}