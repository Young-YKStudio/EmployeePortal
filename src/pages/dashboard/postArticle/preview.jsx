import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Preview = ({submitForm, isPreview}) => {

  const { article } = submitForm
  return (
    <section className={isPreview ? 'flex flex-col w-full bg-slate-50 rounded-lg' : 'hidden'}>
      <div className='flex justify-center w-full pt-4'>
        <p className='font-extrabold text-indigo-900'>Preview</p>
      </div>
      <div className='p-4'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className='prose prose-indigo bg-white p-4 rounded-lg max-h-[85vh] overflow-auto'
        >
          {article}
        </ReactMarkdown>
      </div>

    </section>
  );
}
export default Preview;