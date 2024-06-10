import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/FindBus">Find bus</Link>
        </div>
    )
}

export default Navbar;