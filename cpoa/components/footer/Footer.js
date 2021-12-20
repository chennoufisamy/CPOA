import Link from "next/link"

const Footer = () => {
    return (
        <footer>
            <p className="text-footer"><span>Conception: </span>GARCIA Antony, CHENNOUFI Samy, BOULET Bastien</p>
            <ul className="container-social-media">
                <li>
                    <Link href="https://www.facebook.com/openparcauvergnerhonealpes/">
                        <a><i class="fab fa-facebook"></i></a>
                    </Link>
                </li>
                <li>
                    <Link href="https://twitter.com/OpenParcARA">
                        <a><i class="fab fa-twitter"></i></a>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;