import {useContext,useState} from 'react';
// import './Navbar.css';
import logo from '../../logo.svg';
import {Link,useNavigate } from "react-router-dom";
import AuthContext from '../../context/AuthProvider';

function Navbar() {
  const { setAuth,auth } = useContext(AuthContext);
  // console.log(auth);
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const logout = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    setAuth({});
    navigate('/');
}
  return (
      <>
    {/* <div className='Header'>
     <div className='Logo'>
        <img src={logo} width="100" height="50" alt='logo'/>
    </div> */}
    <nav className="z-50 fixed top-0 left-0 w-full shadow bg-[#282c34]">
    <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
            <div className="flex items-center justify-between py-1 md:py-3 md:block">
                <img className='pl-1' src={logo} width="50" height="30" alt='logo'/>
                <div className="md:hidden">
                    <button
                        className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                        onClick={() => setNavbar(!navbar)}
                    >
                        {navbar ? (
                            <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-[dodgerblue]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-[dodgerblue]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                    navbar ? "block" : "hidden"
                }`}>
                <ul className="items-center justify-center space-y-2 md:flex md:space-x-6 md:space-y-0">
                    {auth.Email ?
                        (
                         <>
                         <li className='hover:bg-[dodgerblue] py-2 px-2 border rounded-md'>
                         <Link to="/" className='text-white'>Home</Link>
                       </li>
                       <li className='hover:bg-[dodgerblue] py-2 px-2 border rounded-md'>
                         <Link to="/profile" className='text-white'>Profile</Link>
                       </li>
                       <li className='hover:bg-[dodgerblue] py-2 px-2 border rounded-md'>
                         <Link to="/tasks" className='text-white'>Tasks</Link>
                       </li>
                       <li className='hover:bg-[dodgerblue] py-2 px-2 border rounded-md'>
                         <Link to="/projects" className='text-white'>Projects</Link>
                       </li>
                       {auth.roles === 'Admin' && 
                         <li className='hover:bg-[dodgerblue] py-2 min-w-fit px-2 border rounded-md'>
                         <Link to="/register" className='text-white'>Add New User</Link>
                         </li>
                       }
                       {(auth.roles === 'Admin'|| auth.roles === 'Manager') && (
                         <>
                         <li className='hover:bg-[dodgerblue] py-2 min-w-fit px-2 border rounded-md'>
                         <Link to="/users" className='text-white'>All Users</Link>
                         </li>
                         <li className='hover:bg-[dodgerblue] py-2 min-w-fit px-2 border rounded-md'>
                         <Link to="/addTask" className='text-white'>Add New Task</Link>
                         </li>
                         <li className='hover:bg-[dodgerblue] py-2 min-w-fit px-2 border rounded-md'>
                         <Link to="/addProject" className='text-white'>Add New Project</Link>
                         </li>
                         </>
                           )}
                       </>
                       ): <></>}
                       {/* <div className=''>
                         {auth.Email ? (
                           <>
                           <li className='hover:bg-[dodgerblue] py-2 px-4 border rounded-md'>
                           <Link onClick={logout} className='text-white'>Logout</Link>
                           </li>
                           </>
                         ):(
                         <>
                         <li className='hover:bg-[dodgerblue] py-2 px-4 border rounded-md mr-4'>
                         <Link to="/login" className='text-white'>Login</Link>
                        </li>
                       </>
                         )}
                       </div> */}
                </ul>

                <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                    {auth.Email ? (
                        <li className='hover:bg-[dodgerblue] py-2 px-2 border rounded-md list-none'>
                        <Link onClick={logout} className='text-white'>Logout</Link>
                        </li>
                      ):(
                      <li className='hover:bg-[dodgerblue] py-2 px-2 border rounded-md list-none'>
                      <Link to="/login" className='text-white'>Login</Link>
                     </li>
                      )}
                 </div>
            </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
            {auth.Email ? (
                <li className='hover:bg-[dodgerblue] py-2 px-2 border rounded-md list-none'>
                <Link onClick={logout} className='text-white'>Logout</Link>
                </li>
              ):(
              <li className='hover:bg-[dodgerblue] py-2 px-2 border rounded-md list-none'>
              <Link to="/login" className='text-white'>Login</Link>
             </li>
              )}
        </div>
    </div>
</nav>
    {/* </div> */}
     </>
  )
}
export default Navbar;