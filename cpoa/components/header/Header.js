import Navbar from "../navbar/navbar";
import { useUser } from "@auth0/nextjs-auth0";

const Header = ({ refs }) => {

    const { user } = useUser();

    const navLinks = {
		home: {name: "accueil", ref: typeof refs != "undefined" ? "#home" : "/"},
        news: {name: "actualité", ref: typeof refs != "undefined" ? "#news" : "/news"},
        ticketing: {name: "billetterie", ref: typeof refs != "undefined" ? "#tickets" : "/ticketing"},
        login: {name: "se connecter", ref: "/api/auth/login"},
        logout: {name: "se déconnecter", ref: "/api/auth/logout"},
        mytickets: {name: "mes billets", ref: "/mytickets"}

	};

	const mainNavBar = [
		navLinks.home,
		navLinks.news,
        navLinks.ticketing
	];

    const connectionNav = [
        navLinks.login
    ]

    const connectedNav = [
        navLinks.mytickets,
        navLinks.logout
    ]

    return (
        <header>
            <Navbar links={mainNavBar}/>
            <div className="container-connection-nav">
                <Navbar links={!user ? connectionNav : connectedNav}/>
            </div>
        </header>
    )
}

export default Header;