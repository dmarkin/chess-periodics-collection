import {useEffect, useState} from 'react';
import BookItem from "../../components/BookItem";
import {getById, update as updateBook} from '../requests/utils';
import {useRouter} from 'next/router';

const Edit = () => {
    const router = useRouter();
    const id = router.query.id;
    const [book, setBook] = useState();

    useEffect(() => {
        getById(id)
            .then((data) => setBook(data))
            .catch((error => console.log(error)));
    }, [id]);

    const update = (data) => {
        console.log('Update book: ', data);
        updateBook(data)
            .then((data) => console.log('Book updated', data))
            .then(() => router.push('/'))
            .catch((error => console.log(error)));
    };

    return (
        <>
            <BookItem
                isNew={false}
                initialValue={book}
                onSubmit={update}/>
        </>);
};

// export const getStaticProps = async() => {
//     const router = useRouter();
//     const id = router.query.id;
//     console.log('getStaticProps');
//     const book = await getById(id)
//         .then((data) => setBook(data))
//         .catch((error => console.log(error)));
//     return {
//         props: {
//             book
//         }
//     }
// };

export default Edit;
