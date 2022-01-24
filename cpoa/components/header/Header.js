import Navbar from "../navbar/navbar";
import { useUser } from "@auth0/nextjs-auth0";

const Header = ({ refs }) => {

    const { user } = useUser();

    const navLinks = {
		home: {name: "accueil", ref: typeof refs != "undefined" ? "#home" : "/"},
        news: {name: "actualités", ref: typeof refs != "undefined" ? "#news" : "/news"},
        ticketing: {name: "billetterie", ref: typeof refs != "undefined" ? "#tickets" : "/ticketing"},
        login: {name: "se connecter", ref: "/api/auth/login"},
        logout: {name: "se déconnecter", ref: "/api/auth/logout"},
        mytickets: {name: "mes billets", ref: "/mytickets"},
        admin: {name: "administration", ref: "/admin"}
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

    const adminNav = [
        navLinks.admin,
        navLinks.logout
    ]

    return (
        <header>
            <Navbar links={mainNavBar}/>
            <div className="container-connection-nav">
                <Navbar links={user ? user.sub == "auth0|61eebdb78b42c000762b4930" ? adminNav : [{name: "mes billets", ref: "/mytickets/"+user.sub.split('|')[1]}, navLinks.logout] : connectionNav}/>
            </div>
        </header>
    )
}

export default Header;