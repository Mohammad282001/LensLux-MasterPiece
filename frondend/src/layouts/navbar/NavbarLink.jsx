import { Link } from 'react-router-dom';

const NavbarLink = ({ to, name }) => {
    return (
        <Link to={to} className="flow-root">
            {name}
        </Link>
    );
};

export default NavbarLink;