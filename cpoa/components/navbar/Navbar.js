const Navbar = ({ links }) => {

    return (
        <nav className="nav-header">
            {links.map(link => (
                <a className="link-header" key={link.name} href={link.ref}>{link.name}</a>
            ))}
        </nav>
    )
}

export default Navbar;