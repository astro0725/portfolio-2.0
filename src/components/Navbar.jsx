import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='text-white'>
      <nav className='flex justify-center items-center bg-primary p-4 text-gray-300 rounded-t-lg'>
        <ul className='flex flex-col sm:flex-row justify-center items-center sm:grid sm:grid-cols-3 px-10'>
          <li className='my-2 sm:my-0'>
            <NavLink to='/' className='text-white text-lg font-bold px-7 transition-colors duration-300 hover:text-tertiary' data-nav-link>
              About
            </NavLink>
          </li>

          <li className='my-2 sm:my-0'>
            <NavLink to='/resume' className='text-white text-lg font-bold px-7 transition-colors duration-300 hover:text-tertiary' data-nav-link>
              Resume
            </NavLink>
          </li>

          <li className='my-2 sm:my-0'>
            <NavLink to='/portfolio' className='text-white text-lg font-bold px-7 transition-colors duration-300 hover:text-tertiary' data-nav-link>
              Portfolio
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;