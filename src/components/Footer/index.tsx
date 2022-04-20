import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer p-10 bg-gradient-to-b from-base-200 to-base-500 text-base-content'>
      <div className='w-full grid gap-y-10 justify-items-center md:gap-y-0 md:grid-cols-3 max-w-7xl mx-auto'>
        <div className='flex flex-col space-y-2.5'>
          <span className='footer-title'>Services</span>
          <Link to='/#branding' className='link link-hover'>
            Branding
          </Link>
          <Link to='/#advert' className='link link-hover'>
            Advertisement
          </Link>
        </div>
        <div className='flex flex-col space-y-2.5'>
          <span className='footer-title'>Company</span>
          <Link to='/about' className='link link-hover'>
            About us
          </Link>
          <Link to='/#contact' className='link link-hover'>
            Contact
          </Link>
        </div>
        <div className='flex flex-col space-y-2.5'>
          <span className='footer-title'>Social</span>
          <div className='grid grid-flow-col items-center gap-4'>
            <a
              className='cursor-pointer hover:scale-105 ease-in-out duration-200'
              href='https://www.instagram.com/pahugerpb_'
              rel='noreferrer'
            >
              <FaInstagram className='w-7 h-7' />
            </a>
            <a
              className='cursor-pointer hover:scale-105 ease-in-out duration-200'
              href='https://www.youtube.com/pahugerpuruhitabaiq'
              rel='noreferrer'
            >
              <FaYoutube className='w-7 h-7' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
