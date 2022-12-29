import BookItem from "../../components/BookItem";
import {create as createBook} from '../requests/utils';
import {useRouter} from 'next/router';

const Add = () => {
    const router = useRouter();

    const add = (data) => {
        console.log('Add book: ', data);
        return createBook(data)
            .then((data) => console.log(data))
            .then(() => router.push('/'))
            .catch((error => console.log(error)));
    };

    return (<>
        <BookItem
            isNew
            onSubmit={add}/>
    </>);
};

export default Add;
