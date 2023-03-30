import axios from 'axios'
import { MdOutlineAdd } from 'react-icons/md'
import { useState } from 'react'
import AddEmployee from './modals/addEmployee'
import EditEmployee from './modals/editEmployee'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ManageAccounts = (props) => {

  const [ isAddEmployeeOpen, setIsAddEmployeeOpen ] = useState(false)
  const [ isEditEmployeeOpen, setIsEditEmployeeOpen ] = useState(false)
  const [ selectedAccount, setSelectedAccount ] = useState()

  const editHandler = (e, id) => {
    let selectedAccount = props.users.find((user) => user._id === id)
    setSelectedAccount(selectedAccount)
    setIsEditEmployeeOpen(true)
  }

  return (
    <>
    <section
      className='p-8 text-indigo-900 w-full h-screen'
    >
      <div className='border-b border-indigo-400 w-full pb-4'>
        <h1 className='font-bold text-xl pl-6'>Manage Employees page</h1>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 h-[92%] overflow-auto mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Employees</h1>
            <p className="pt-2 text-sm text-gray-700">
              List of all employees, and update their roles.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="rounded-md bg-indigo-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center"
              onClick={() => setIsAddEmployeeOpen(true)}
            >
              <MdOutlineAdd className='w-5 h-5 mr-2'/> Employee
            </button>
          </div>
        </div>
        <div className="pt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.users && props.users.map((person, personIdx) => (
                    <tr key={person.email}>
                      <td
                        className={classNames(
                          personIdx !== props.users.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}
                      >
                        {person.name}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.users.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {person.title}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.users.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                        )}
                      >
                        {person.email}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.users.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {person.role}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.users.length - 1 ? 'border-b border-gray-200' : '',
                          'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                        )}
                      >
                        <button
                          className='text-indigo-600 hover:text-indigo-900'
                          onClick={(e) => editHandler(e, person._id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    {isAddEmployeeOpen && <AddEmployee isAddEmployeeOpen={isAddEmployeeOpen} setIsAddEmployeeOpen={setIsAddEmployeeOpen}/>}
    {isEditEmployeeOpen && <EditEmployee isEditEmployeeOpen={isEditEmployeeOpen} setIsEditEmployeeOpen={setIsEditEmployeeOpen} selectedAccount={selectedAccount}/>}
    </>
  );
}
export default ManageAccounts;

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3000/api/account/getAllAccount')
  let data = null
  if(res.data) {
    data = res.data.users
  }

  return { props: {users: data}}
}