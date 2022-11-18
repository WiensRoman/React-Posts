import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className='navbar__llnks'>
                <Link to='/about'>0 сайтов</Link>
                <Link to='/posts'>посты</Link>
            </div>
        </div>
    )
}

export default Navbar;