import {Box} from '@mui/material';
import '../styles/globals.css'
import Meta from "../components/Meta";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Image from 'next/image';
import UKR from "../assets/Ukraine_3.svg";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

function MyApp({Component, pageProps}) {
    return (<>
        <Meta/>

        <Header/>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Component {...pageProps} />
        </LocalizationProvider>

        <footer className={styles.footer}>
            <Box>
                Copyright © Dmitry Markin, 2022-2023<br/>
                <Image src={UKR} alt="Stand for Ukraine!" width={45} heignt={30}/>
            </Box>
        </footer>
    </>)
}

export default MyApp;
