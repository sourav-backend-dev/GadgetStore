import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary p-3 shadow-lg">
      <div className="container-fluid">
        {/* Logo and Navbar Brand */}
        <Link href={!user ? '#' : '/'} className="navbar-brand text-white font-weight-bold">
          Gadget Store
        </Link>

        {/* Toggle Button for Mobile View */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Admin Links (only for admin users) */}
            {user && user.roleId === 1 ? (
              <>
                <li className="nav-item">
                  <Link href="/admin/" className="nav-link text-white">Products</Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/category" className="nav-link text-white">Category</Link>
                </li>
              </>
            ) : user && (<>
              <li className="nav-item">
                <Link href="/" className="nav-link text-white">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/products" className="nav-link text-white">Products</Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link text-white">About</Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link text-white">Contact US</Link>
              </li>
              <li className="nav-item">
                <Link href="/cart" className="nav-link text-white d-flex align-items-center">
                  <FaShoppingCart className="mx-2 my-1" /> 
                </Link>
              </li>
            </>)
            }
          </ul>
          {/* User Authentication Links */}
          <div className="d-flex">
            {user ? (
              <Link href="/logout" className="btn btn-outline-light bg-danger">Logout</Link>
            ) : (
              <Link href="/login" className="btn btn-light">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
