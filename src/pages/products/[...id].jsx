import { dummyProducts } from '../../../data/dummyProducts';
import { useState } from 'react'
import { MdStarRate, MdOutlineAdd, MdOutlineRemove, MdOutlineFavoriteBorder, MdOutlineFavorite, MdAddShoppingCart } from 'react-icons/md'
import RdxAddToCartButton from '../../../redux/cart/AddCartButton';
import { Disclosure } from '@headlessui/react';

const ProductPage = (props) => {

  const [ currentImage, setCurrentImage ] = useState(0)
  const [ qty, setQty ] = useState(1)
  const [ isFav, setIsFav ] = useState(false) // to be updated according to user data

  // this product is for dummy purpose, update with DB and models for the future
  const dummyProduct = {
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    images: [
      {
        id: '0',
        name: 'main image',
        src: props.product.imagePath,
        alt: 'Main Image'
      },
      {
        id: '1',
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
      }
    ],
    description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',
    details: [
      {
        name: 'Features',
        items: [
          'Multiple strap configurations',
          'Spacious interior with top zip',
          'Leather handle and tabs',
          'Interior dividers',
          'Stainless strap loops',
          'Double stitched construction',
          'Water-resistant',
        ],
      },
      {
        name: 'Care',
        items: [
          'Spot clean as needed',
          'Hand wash with mild soap',
          'Machine wash interior dividers',
          'Treat handle and tabs with leather conditioner',
        ],
      },
      {
        name: 'Shipping',
        items: [
          'Free shipping on orders over $300',
          'International shipping available',
          'Expedited shipping options',
          'Signature required upon delivery',
        ],
      },
      {
        name: 'Returns',
        items: [
          'Easy return requests',
          'Pre-paid shipping label included',
          '10% restocking fee for returns',
          '60 day return window',
        ],
      },
      // ... more options
    ],
    rate: 4
  }

  const qtySetter = (type) => {
    if (type === 'minus') {
      let newQty = qty - 1
      return newQty < 1 ? setQty(1) : setQty(newQty)
    } else if (type === 'plus') {
      let newQty = qty + 1
      return setQty(newQty)
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <section className='pt-24 flex flex-col lg:flex-row lg:gap-8 px-4'>
      {/* image */}
      <div>
        <div className='flex flex-col'>
          <div
            style={{backgroundImage: `url("${dummyProduct.images[Number(currentImage)].src}")`}}
            className='w-full lg:w-[50vw] h-96 bg-center bg-cover rounded-lg md:h-[32em]'
          />
          <div className='hidden md:grid grid-cols-4 gap-4 my-4'>
            {dummyProduct.images.length > 0 && dummyProduct.images.map((image, i) => {
              return <div
                key={image.name}
                style={{backgroundImage: `url("${image.src}")`}}
                className='w-full h-48 lg:h-36 bg-slate-300 rounded-lg hover:cursor-pointer hover:bg-blend-multiply bg-cover bg-center'
                onClick={() => setCurrentImage(Number(image.id))}
              />
            })}
          </div>
        </div>
      </div>

      <div>
        {/* title */}
        <div className='pt-8 flex flex-col gap-4'>
          <p className='text-3xl font-bold'>{dummyProduct.name}</p>
          <p className='text-lg'>${dummyProduct.price}</p>
        </div>

        {/* rating */}
        <div className='flex flex-row my-2'>
          {[0, 1, 2, 3, 4].map((rate) => {
            return <MdStarRate
              key={rate}
              className={dummyProduct.rate > rate ? 'text-indigo-700 text-xl' : 'text-gray-300 text-xl'}
            />
          })}
        </div>

        {/* description */}
        <div className='my-4'>
          <p className='text-slate-500'>{dummyProduct.description}</p>
        </div>

        {/* qty */}
        <div className='flex flex-col gap-2 py-4'>
          <div>
            <p>Quantity</p>
          </div>
          <div className='flex flex-row items-center'>
            <button 
              onClick={() => qtySetter('minus')}
              className='p-2 border border-gray-300 rounded-md hover:border-indigo-400'
            > <MdOutlineRemove /> </button>
            <div
              className='py-2 px-4 text-indigo-900 text-xl'
            >{qty}</div>
            <button 
              onClick={() => qtySetter('plus')}
              className='p-2 border border-gray-300 rounded-md hover:border-indigo-400'
            > <MdOutlineAdd /> </button>
          </div>
        </div>

        {/* buttons */}
        <div className='flex flex-row flex-nowrap items-center py-4 gap-4'>
          <div className='max-w-sm w-full'>
            <RdxAddToCartButton item={dummyProduct} qty={qty} />
          </div>
          <div 
            className='p-3 hover:bg-slate-100 rounded-lg text-gray-300 hover:text-indigo-900'
            onClick={() => setIsFav(!isFav)} //to be modified according to user model
          >
            {!isFav ? <MdOutlineFavoriteBorder className='w-6 h-6' /> : <MdOutlineFavorite className='w-6 h-6 text-indigo-700' />}
          </div>
        </div>

        {/* Details */}
        <div className='pt-12'>
          <div className="divide-y divide-gray-200 border-t">
            {dummyProduct.details.map((detail) => (
              <Disclosure as="div" key={detail.name}>
                {({ open }) => (
                  <>
                    <h3>
                      <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span
                          className={classNames(open ? 'text-indigo-700' : 'text-gray-900', 'text-sm font-medium')}
                        >
                          {detail.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MdOutlineRemove
                              className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-900"
                              aria-hidden="true"
                            />
                          ) : (
                            <MdOutlineAdd
                              className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                      <ul role="list">
                        {detail.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
  
export async function getServerSideProps(context) {
    
  const id = context.params.id[0]

  // API to get products
  const data = dummyProducts
  const selectedProduct = data.find((product) => product.id === id)

  return {props: {id: id, product: selectedProduct}}
}

export default ProductPage ;
