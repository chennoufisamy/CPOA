import Hamburger from "../hamburger/Hamburger";
import Navbar from "../navbar/navbar";

const Header = () => {

    const navLinks = {
		home: {name: "accueil", ref: "/"},
        news: {name: "actualité", ref: "/news"},
        ticketing: {name: "billetterie", ref: "ticketing"}
	};

	const navBar = [
		navLinks.home,
		navLinks.news,
        navLinks.ticketing
	];

    return (
        <header>
            <Navbar links={navBar}/>
            <Hamburger />
        </header>
    )
}

export default Header;