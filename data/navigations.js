import { MdSpaceDashboard, MdOutlineForwardToInbox, MdSell, MdAccountCircle } from "react-icons/md";

export const links = [
  {
    name: 'Products',
    href: '/products',
    icon: <MdSell className="w-5 h-5" />
  },
]

export const dashboardLinks = [
  // examples below
  // {
  //   name: 'Dashboard',
  //   href: '/dashboard',
  //   icon: <MdSpaceDashboard className='w-5 h-5'/>
  // },
  // {
  //   name: 'Login',
  //   href: '/account/login',
  // },
]

export const accountLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <MdSpaceDashboard className="w-5 h-5" />
  },
  {
    name: 'Account',
    href: '#',
    icon: <MdAccountCircle className="w-5 h-5" />
  },
]