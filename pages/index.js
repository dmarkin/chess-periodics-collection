import chalk from 'chalk';
import {getAll as getAllBooks} from './requests/utils';
import styles from '../styles/Home.module.css';
import BooksTable from "../components/BooksTable";
import Typography from '@mui/joy/Typography';
import {CssVarsProvider, StyledEngineProvider} from '@mui/joy/styles';

const Home = ({books}) => {
    console.log(chalk.green(`Books List: ${JSON.stringify(books)}`));

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h2 className={styles.title}>
                    Chess Library
                </h2>
                <BooksTable rows={books}/>
            </main>

            <StyledEngineProvider injectFirst>
                <CssVarsProvider>
                    <Typography variant="solid" color="info">
                        Based on Di Felice, Gino - Chess periodicals: an annotated international bibliography, 1836–2008
                        [©2010 Gino Di Felice]
                    </Typography>
                </CssVarsProvider>
            </StyledEngineProvider>
        </div>
    )
};

// change to getServerSideProps?
export const getStaticProps = async () => {
    console.log('getStaticProps call');
    const books = await getAllBooks();
    return {
        props: {
            books: books
        }
    }
};

export default Home;
