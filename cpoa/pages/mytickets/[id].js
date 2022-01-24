import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import styles from "../../styles/MyTickets.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import Myticket from "../../components/cards/MyTicket";

export const getServerSideProps = async (context) => {
	const res = await fetch("http://localhost:3000/api/ticket_by_user?id="+context.query.id);
	const data = await res.json();
	return {
	  props: { tickets: data }
	}
}

export default function( { tickets }) {

    const { user } = useUser();
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"></link>
            </Head>

            <main className={styles.main}>
                <Header />
                <Myticket tickets={tickets}/>
            </main>
            <Footer />
        </div>
    )
}