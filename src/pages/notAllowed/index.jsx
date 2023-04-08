import NextLink from 'next/link'

const NotAllowed = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div
        className='flex flex-col text-indigo-900 justify-center gap-4'
      >
        <p className='text-3xl font-bold'>You're not allowed</p>
        <NextLink href='/' className='px-4 py-2 bg-indigo-600 text-center rounded-md hover:bg-indigo-400 text-white'>Home</NextLink>
      </div>
    </section>
  );
}
export default NotAllowed;