import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import styles from "../../styles/Admin.module.css";
import FormMatchSimple from "../../components/form/FormMatchSimple";
import FormMatchDouble from "../../components/form/FormMatchDouble";
import FormTeamReferee from "../../components/form/FormRefereeTeam";

export default function Login({players}) {
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
				<div className={styles.container_form}>
					<FormMatchSimple />
					<FormMatchDouble />
				</div>
				
		</main>
        <Footer />
    </div>
    )
}