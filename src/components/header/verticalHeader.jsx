import { dashboardLinks } from '../../../data/navigations'
import NextLink from 'next/link'
import { useState } from 'react'
import { motion, spring } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import { MdLastPage, MdFirstPage, MdSettings, MdOutlineHelp, MdClose, MdLogout, MdAccountCircle } from 'react-icons/md'

const VerticalHeader = ({path}) => {

  const [ isNarrow, setIsNarrow ] = useState(false)
  const [ isPopOpen, setIsPopOpen ] = useState(false)
  const { data: session } = useSession()

  const styleChange = (state) => {
    if (state) {
      return 'fixed bg-indigo-900 left-[4.5em] top-[1.5em] px-1 py-4 rounded-r-md flex items-center'
    } else {
      return 'fixed bg-indigo-900 left-[9em] top-[1.5em] px-2 py-4 rounded-r-md flex items-center'
    }
  }

  const buttonStylesNarrow = (href) => {
    if(path === href) {
      return 'flex justify-center p-3 bg-indigo-400/50 rounded-md'
    } else {
      return "flex justify-center p-3 hover:bg-indigo-400/50 rounded-md"
    }
  }

  const buttonStyles = (href) => {
    if(path === href) {
      return 'flex justify-start gap-2 p-2 items-center bg-indigo-400/50 rounded-md truncate'
    } else {
      return 'flex justify-start gap-2 p-2 items-center hover:bg-indigo-400/50 rounded-md truncate'
    }
  }

  const popStyles = (state) => {
    if (state) {
      return 'fixed left-[6em] bottom-[1.5em] bg-indigo-100/70 rounded-md shadow-lg p-4 text-indigo-800 min-w-[150px] flex flex-col flex-nowrap gap-2'
    } else {
      return 'fixed left-[11em] bottom-[1.5em] bg-indigo-100/70 rounded-md shadow-lg p-4 text-indigo-800 min-w-[150px] flex flex-col flex-nowrap gap-2'
    }
  }

  return (
    <motion.nav
      layout
      style={{ originX: 0 }}
      transition={{duration: 0.25, spring}}
      animate={{
        width: isNarrow ? '5em' : '10em',
      }}
      className='bg-indigo-900 text-indigo-100 shadow-md sticky top-0 h-screen flex flex-col flex-nowrap p-4'
    >
      {/* Logo */}
      <div className='flex justify-center py-4 border-b border-indigo-400'>
        <a className='font-bold text-2xl' href='/'>{isNarrow ? 'L' : 'Logo'}</a>
      </div>  
      {/* ToggleButton */}
      <motion.div
        layout
        className={styleChange(isNarrow)}
        transition={{duration: 0.25, spring}}
      >
        <button onClick={() => setIsNarrow(!isNarrow)}>{isNarrow ? <MdLastPage className='w-5 h-5' /> : <MdFirstPage className='w-5 h-5' />}</button>
      </motion.div>
      <div className='mt-4 flex flex-col w-full h-full flex-nowrap justify-between'>
        {/* Links */}
        <div className='flex flex-col flex-nowrap gap-4 w-full h-full'>
          {dashboardLinks && dashboardLinks.map((link, i) => {
            return <NextLink
              key={i}
              href={link.href}
              className={isNarrow ? buttonStylesNarrow(link.href) : buttonStyles(link.href)}
            >
              {link.icon && link.icon}{!isNarrow && link.name}
            </NextLink>
          })}
        </div>
        <div>
          <div className='flex flex-col flex-nowrap gap-2 border-t border-indigo-400 pt-4'>
            {/* Settings */}
            <NextLink
              href='/dashboard/settings'
              className={isNarrow ? buttonStylesNarrow('/dashboard/settings') : buttonStyles('/dashboard/settings')}
            >
              <MdSettings className='w-5 h-5'/>{!isNarrow && 'Settings'}
            </NextLink>
            {/* Help */}
            <NextLink
              href='/dashboard/help'
              className={isNarrow ? buttonStylesNarrow('/dashboard/help') : buttonStyles('/dashboard/help')}
            >
              <MdOutlineHelp className='w-5 h-5'/>{!isNarrow && 'Help'}
            </NextLink>
          </div>

          {/* Account */}
          {session && <div 
              className='flex flex-col flex-nowrap gap-2 border-t border-indigo-400 mt-2 pt-2'
            >
              <div 
                className={isNarrow ? 'flex flex-row flex-nowrap items-center justify-center gap-2 px-2 py-3 hover:bg-indigo-400/50 rounded-md' : 'flex flex-row flex-nowrap items-center gap-2 px-2 py-3 hover:bg-indigo-400/50 rounded-md hover:cursor-pointer'}
                onClick={() => setIsPopOpen(!isPopOpen)}
              >
                <div 
                  style={{backgroundImage: `url("${session.user.image}")`}}
                  className='w-5 h-5 rounded-full bg-center bg-cover'
                />
                {/* <p>{session.user.image}</p> */}
                {!isNarrow && <p className='text-xs truncate'>{session.user.name}</p>}
              </div>
            </div>
          }
          {/* POP */}
          {session && <motion.div
              className={isPopOpen ? popStyles(isNarrow) : 'hidden'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <button 
                className='absolute top-[1em] right-[1em] bg-white/50 rounded-full p-[.125em]'
                onClick={() => setIsPopOpen(!isPopOpen)}
              >
                <MdClose />
              </button>
              <NextLink 
                href='/dashboard/account'
                className='flex flex-row flex-nowrap items-center gap-2 px-3 py-2 hover:bg-indigo-800 hover:text-indigo-100 rounded-md'
              >
                <MdAccountCircle className='w-5 h-5'/>Account
              </NextLink>
              <button 
                className='flex flex-row flex-nowrap items-center gap-2 px-3 py-2 hover:bg-indigo-800 hover:text-indigo-100 rounded-md'
                onClick={() => signOut()}
              >
                <MdLogout className='w-5 h-5 '/>Logout
              </button>
            </motion.div>
          }

        </div>
      </div>
    </motion.nav>
  );
}
export default VerticalHeader;