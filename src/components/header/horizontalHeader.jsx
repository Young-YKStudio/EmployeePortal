import { links, accountLinks } from '../../../data/navigations'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { MdLogin, MdMenu, MdClose, MdShoppingCart } from 'react-icons/md'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RdxLogOutButton1 } from '../../../redux/auth/logOutButtons'

const HorizontalHeader = ({path}) => {
  const { cartItems } = useSelector((state) => state.cart)

  const { data: session } = useSession()
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ isAccountOpen, setIsAccountOpen ] = useState(false)

  const buttonStyles = (href) => {
    if (path === href) {
      return 'bg-indigo-400/50 px-4 py-2 rounded-md flex items-center truncate'
    } else {
      return 'hover:bg-indigo-400/50 px-4 py-2 rounded-md flex items-center truncate'
    }
  }

  const menuButtonHandler = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const ImageDistributor = (user) => {
    return <div
      className='w-7 h-7 rounded-full flex justify-center items-center bg-indigo-400 text-white text-md'
    >
      {user.name.substring(0, 1).toUpperCase()}
    </div>
  }


  const AccountClickHandler = () => {
    setIsAccountOpen(!isAccountOpen)
  }

  return (
    <>
      <nav className="fixed top-0 z-40 bg-transparent w-full text-indigo-900 p-4 flex justify-between">
        <div className='flex items-center w-full justify-center md:justify-start'>
          <NextLink href='/' className='text-xl font-bold'>YK | Employee</NextLink>
        </div>
        {/* full menu */}
        <div className='hidden md:flex flex-row items-center gap-4'>
          { session ? 
            <div className='flex flex-row flex-nowrap items-center gap-2 p-2 px-3 hover:bg-indigo-400/50 rounded-md hover:cursor-pointer'
              onClick={AccountClickHandler}
            >
              {ImageDistributor(session.user)}
              <p className='text-md truncate'>{session.user.name}</p>
            </div>
            :
            <NextLink 
              href='/account/login'
              className="hover:bg-indigo-400/50 px-4 py-2 rounded-md flex items-center"
            >
              <MdLogin className='mr-2 w-5 h-5' />Login
            </NextLink>
          }
        </div>
        {/* hamburger */}
        <div className='flex items-center md:hidden'>
          <button 
            className='fixed top-[0.85em] right-2 px-4 py-2 rounded-md flex items-center hover:bg-indigo-400/50'
            onClick={menuButtonHandler}
          >
            {isMenuOpen ?
              <MdClose className='w-5 h-5'/>
            :
              <MdMenu className='w-5 h-5'/>
            }
          </button>
        </div>
      </nav>
      {/* Small Window popup menu */}
      {isMenuOpen &&
        <AnimatePresence>
          <motion.section 
            className='text-indigo-900 bg-indigo-200 fixed top-[4.25em] right-2 w-72 z-40 p-4 rounded-md shadow-md flex flex-col gap-2 md:hidden'
            initial={{ opacity: 0, x: 400}}
            animate={{ opacity: 1, x: 0}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            { session ? 
              <div className='flex flex-col'>
                <div className='flex flex-row flex-nowrap items-center gap-2 p-2 px-3 border-b border-indigo-400'
                  // onClick={AccountClickHandler}
                >
                  {ImageDistributor(session.user)}
                  <p className='text-md truncate'>{session.user.name}</p>
                </div>
                
                <div className=' flex flex-col mt-2'>
                {accountLinks && accountLinks.map((link) => {
                  return <NextLink
                    key={link.name}
                    href={link.href}
                    className={buttonStyles(link.href)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon && <span className='mr-2'>{link.icon}</span>}{link.name}
                  </NextLink>
                })}
                </div>
                
                <RdxLogOutButton1 />
              </div>
              :
              <NextLink 
                href='/account/login'
                className="hover:bg-indigo-400/50 px-4 py-2 rounded-md flex items-center"
                onClick={menuButtonHandler}
              >
                <MdLogin className='mr-2 w-5 h-5' />Login
              </NextLink>
            }
          </motion.section>
        </AnimatePresence>
      }
      {/* Large window popup menu when logged in */}
      {
        isAccountOpen &&
        <AnimatePresence>
          <motion.section
            className='fixed top-[5em] right-2 bg-indigo-200 w-72 z-40 p-4 rounded-md shadow-md hidden md:flex flex-col text-indigo-900 gap-2'
            initial={{ opacity: 0, x: 400}}
            animate={{ opacity: 1, x: 0}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {accountLinks && accountLinks.map((link) => {
              return <NextLink
                key={link.name}
                href={link.href}
                className={buttonStyles(link.href)}
                onClick={() => setIsAccountOpen(false)}
              >
                {link.icon && <span className='mr-2'>{link.icon}</span>}{link.name}
              </NextLink>
            })}
            <RdxLogOutButton1 />
          </motion.section>
        </AnimatePresence>
      }
    </>
  );
}
export default HorizontalHeader; 