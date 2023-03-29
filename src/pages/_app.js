import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import Header from '@/components/header/Header'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import Spinner from '@/components/spinner/spinner'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps: {session, ...pageProps} }) {

  const { pathname } = useRouter()

  const styleDistributor = (path) => {
    if(path.includes('/dashboard')) {
      return 'flex flex-row flex-nowrap'
    } else {
      return 'flex flex-col'
    }
  }

  return (
  <SessionProvider session={session}>
    <Provider store={store}>
      <div className={styleDistributor(pathname)}>
        <Spinner />
        <Header path={pathname} />
        {/* Modal */}
        <Component {...pageProps} />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Provider>
  </SessionProvider>
  )
}
