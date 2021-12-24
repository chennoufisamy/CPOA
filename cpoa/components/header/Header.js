import Navbar from "../navbar/navbar";

const Header = ({ refs }) => {

    const navLinks = {
		home: {name: "accueil", ref: typeof refs != "undefined" ? "#home" : "/"},
        news: {name: "actualité", ref: typeof refs != "undefined" ? "#news" : "/news"},
        ticketing: {name: "billetterie", ref: typeof refs != "undefined" ? "#tickets" : "/ticketing"},
        login: {name: "se connecter", ref: "/login"},
        register: {name: "créer un compte", ref: "/register"}
	};

	const mainNavBar = [
		navLinks.home,
		navLinks.news,
        navLinks.ticketing
	];

    const connectionNav = [
        navLinks.login,
        navLinks.register
    ]

    return (
        <header>
            <Navbar links={mainNavBar}/>
            <div className="container-connection-nav">
                <Navbar links={connectionNav}/>
            </div>
            
        </header>
    )
}

export default Header;