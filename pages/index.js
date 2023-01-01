import chalk from 'chalk';
import {getAll as getAllBooks} from './requests/utils';
import styles from '../styles/Home.module.css';
import BooksTable from "../components/BooksTable";

const Home = ({books}) => {
    console.log(chalk.green(`Books List: ${JSON.stringify(books)}`));

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h3 className={styles.title}>
                    Chess Library
                </h3>
                <BooksTable rows={books}/>
            </main>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
};

// change to getServerSideProps?
export const getStaticProps = async () => {
    console.log('getStaticProps');
    const books = await getAllBooks();
    return {
        props: {
            books: books
        }
    }
};

export default Home;
