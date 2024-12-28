import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-transparent fixed w-full z-20 top-3 left-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 border-2 border-[#aacde2] rounded-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/logo.jpeg" // Place your logo in the `public` folder of your Next.js project
            alt="Logo"
            
            className="h-10 rounded-full w-35"
          />
         
          {/* <span className="self-center text-3xl font-extrabold whitespace-nowrap text-gray-800 dark:text-white">
            HealthAI
          </span> */}
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-12 rtl:space-x-reverse text-xl font-bold">
          <Link
            href="/"
            className="text-xl text-white hover:text-blue-400 font-semibold"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-xl text-white hover:text-blue-400 font-semibold"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-xl text-white hover:text-blue-400 font-semibold"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-xl text-white hover:text-blue-400 font-semibold"
          >
            Contact
          </Link>
        </div>

        {/* Get Started Button */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            className="text-lg text-white bg-slate-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get Started
          </button>
        

        {/* Mobile Menu Toggle */}
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex items-center p-3 w-12 h-12 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 mt-4"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
          {/* Mobile Menu Toggle */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-3 w-12 h-12 justify-center text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="items-center justify-between hidden w-full md:hidden border border-[#aacde2] rounded-lg mt-2"
        id="navbar-sticky"
      >
        <ul className="flex flex-col p-4 mt-4 bg-gray-50 border border-[#aacde2] rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <li>
            <Link
              href="/"
              className="block py-3 px-4 text-xl text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-400 font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-3 px-4 text-xl text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-400 font-medium"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="block py-3 px-4 text-xl text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-400 font-medium"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-3 px-4 text-xl text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-400 font-medium"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
