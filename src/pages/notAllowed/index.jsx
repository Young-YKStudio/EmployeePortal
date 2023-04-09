import NextLink from 'next/link'

const NotAllowed = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div
        className='flex flex-col text-indigo-900 justify-center items-center gap-4'
      >
        <p className='text-3xl font-bold'>Oops, You're not allowed</p>
        <p>If you're a new user, plase contact service to gain access to dashboard.</p>
        <NextLink href='/' className='px-4 py-2 bg-indigo-600 text-center rounded-md hover:bg-indigo-400 text-white'>Back to Home</NextLink>
      </div>
    </section>
  );
}
export default NotAllowed;