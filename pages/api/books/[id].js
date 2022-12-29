import {connectToDB} from "../../helpers/utils";
import {get as getBook, remove as removeBook, update as updateBook} from "../../controllers/books";

export default async (req, res) => {
    await connectToDB();

    if (req.method === 'GET') {
        return getBook(req, res);
    }

    if (req.method === 'PUT') {
        return updateBook(req, res);
    }

    if (req.method === 'DELETE') {
        return removeBook(req, res);
    }
}