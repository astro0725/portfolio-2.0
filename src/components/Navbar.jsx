import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='items-center text-white'>
      <nav className='bg-primary p-4 text-gray-300 rounded-t-lg'>
      <ul className='flex flex-wrap justify-center just items-center px-10'>
        <li>
          <NavLink to='/' className='text-white text-lg font-bold px-7 transition-colors duration-300 hover:text-tertiary' data-nav-link>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to='/resume' className='text-white text-lg font-bold px-7 transition-colors duration-300 hover:text-tertiary' data-nav-link>
            Resume
          </NavLink>
        </li>

        <li>
          <NavLink to='/portfolio' className='text-white text-lg font-bold px-7 transition-colors duration-300 hover:text-tertiary' data-nav-link>
            Portfolio
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default Navbar