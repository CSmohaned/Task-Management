import React from 'react';
import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react';
import UseAuth from '../../hooks/useAuth';
import axios from 'axios';
import Moment from 'moment';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const GETProject_URL = 'http://localhost:8081/users/Project';
const GETTASKS_URL = 'http://localhost:8081/users/allTasks';
const UPDATETASKS_URL = 'http://localhost:8081/tasks/changeStatus';

const ProjectPage = () => {
    const {id} = useParams();
    const [data, setData] = useState({});
    const [tasks, setTasks] = useState([]);
    const { auth } = UseAuth()
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(true);
    const shelves = [{id:1, shelfName:"Done", shelfDisplayName:"Done"},
                   {id:2, shelfName:"In Progress", shelfDisplayName:"In Progress"},
                   {id:3, shelfName:"Not Selected", shelfDisplayName:"Not Selected"},
                   {id:4, shelfName:"Canceled", shelfDisplayName:"Canceled"}
                  ];
                  const filterPosts = (posts, query) => {
                    if (!query) {
                        return posts;
                    }
                
                    return posts.filter((post) => {
                        const postName = post.Title.toLowerCase();
                        return postName.includes(query);
                    });
                };
                const { search } = window.location;
                const query = new URLSearchParams(search).get('s');
                const [searchQuery, setSearchQuery] = useState(query || '');
                const filteredPosts = filterPosts(tasks, searchQuery);
                  const updateShelf = async (e,id,newValue)=> {
                    e.preventDefault();
                    setLoading(true);
                    setStatus(true);
                    try {
                      const response = await axios.post(UPDATETASKS_URL+`/${id}`,JSON.stringify({newStatus:newValue}),{
                          headers: {'Authorization' : `Bearer ${auth.accessToken}`,
                          'Content-Type':'application/json',    
                         },
                        withCredentials: true
                      }
                    );
                    console.log(response.data);
                    // clear inputs filed
                    } catch (error) {
                      if (!error?.response) {
                        console.log('No Server Response')
                      } else if (error.response?.status === 409) {
                        console.log('user Is  Taken')
                      } else {
                        console.log('Registration Failed')
                      }
                    }
                    setLoading(false);
                    setStatus(false);
                  }
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
               const response = await axios.get(GETProject_URL+`/${id}`,
                {headers: {'Authorization' : `Bearer ${auth.accessToken}`,
                           'Content-Type':'application/json',    
                          },
                          withCredentials: true 
                });
                const response2 = await axios.get(GETTASKS_URL+`/${auth.user._id}/${id}`,
                {headers: {'Authorization' : `Bearer ${auth.accessToken}`,
                           'Content-Type':'application/json',    
                          },
                          withCredentials: true 
                });
              setData(response.data);
              setTasks(response2.data);
            } catch (error) {
              console.error(error.message);
            }
            setLoading(false);
          }
          fetchData();
        }, [auth,id,status]);
  return (
    <div>
       {loading && <div>Loading</div>}
    {!loading && (
    <div className="p-5">
<div className="p-2 bg-white shadow mt-12">
  <div className="grid grid-cols-1 md:grid-cols-3">
    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
      <div>
        <p className="font-bold text-gray-700 text-base">{data?.Users?.length}</p>
        <p className="text-gray-400">Number of Users</p>
      </div>
      <div>
           <p className="font-bold text-gray-700 text-base">{data?.Tasks?.length}</p>
        <p className="text-gray-400">Number of Tasks</p>
      </div>
          <div>
           <p className="font-bold text-gray-700 text-base">{data.Manager.Name}</p>
        <p className="text-gray-400">Manager By:</p>
      </div>
    </div>
    <div className="relative">
      <div className="w-24 h-24 bg-indigo-100 mx-auto rounded-full shadow-lg absolute inset-x-0 top-20 -mt-24 flex items-center justify-center text-indigo-500">
         <h2>{data.Name}</h2>
      </div>
    </div>

    <div className="space-x-8 flex justify-start mt-32 md:mt-0 md:justify-center">
   {auth.user.Roles !== 'User' && <button className='h-10 text-white hover:bg-blue-800 min-w-fit border rounded-lg bg-[dodgerblue]'>Add New User</button>}
   {/* <form action="/" method="get" className='flex flex-row'> */}
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search for task by title"
            name="s" className='h-10'
        />
        {/* <button type="submit" className='px-1 h-10 text-white hover:bg-blue-800 min-w-fit border rounded-lg bg-[dodgerblue]'>Search</button> */}
    {/* </form> */}
    </div>
  </div>  
  <div className="flex px-4 pb-8 items-start overflow-x-scroll py-20 characters">
                <div className="rounded bg-gray-200  flex-no-shrink w-80 p-2 mr-3">
                    <div className="flex justify-between py-1">
                        <h3 className="text-sm">Not Started</h3>
                        <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
                    </div>
                    <div className="text-sm mt-2">
                        {filteredPosts.filter(task=> task.Status === 'Not Selected').map(item => (
                         <div key={item._id} className="flex justify-start mt-2">
                         <div className="p-1 rounded-lg shadow-lg bg-white w-full">
                         <p className='float-left text-xs text-slate-400'>Created By: {item.CreateBy.Name}</p>
                         <label className={`float-right inline-block px-2 py-.5 font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out ${item.Priority === 'Low' && 'bg-yellow-500'} ${item.Priority === 'Normal' && 'bg-blue-600'} ${item.Priority === 'High' && 'bg-red-600'}`}>
                             {item.Priority === "Low" && <span className='text-white'>Low</span>}
                             {item.Priority === 'High' && <span className='text-white'>High</span>}
                             {item.Priority === 'Normal' && <span className='text-white'>Normal</span>}
                         </label>
                           <div className="p-6">
                             <h5 className="text-gray-900 text-xl font-medium mb-2">{item.Title}</h5>
                             <p className="text-gray-700 text-base mb-4 flex justify-start">
                               {item.Description}
                             </p>
                           </div>
                           <p className='float-left text-xs text-slate-400'>Created Date: {Moment(item.CreateDate).format('DD-MM-YYYY')}</p>          
                         <select className="float-right inline-block mb-1 px-2 py-1.5 bg-pink-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out"  onChange={(e)=> updateShelf(e ,item._id.toString(),e.target.value)} defaultValue={item.shelf || "none"}>
                         <option>
                         Move to
                         </option>
                         {auth.user.Roles === 'User' ? shelves.filter(shelve => shelve.shelfDisplayName !== 'Canceled').map(item => 
                                      <option key={item.id} value={item.shelfName}>{item.shelfDisplayName}
                                      </option>):shelves.map( item => 
                                      <option key={item.id} value={item.shelfName}>{item.shelfDisplayName}
                                      </option>
                                      )}
                         </select>
                         </div>
                       </div>
                        ))}
       
                    </div>
                </div>
                <div className="rounded bg-gray-200 flex-no-shrink w-80 p-2 mr-3">
                    <div className="flex justify-between py-1">
                        <h3 className="text-sm">In Progress</h3>
                        <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
                    </div>
                    <div className="text-sm mt-2">
                        {tasks.filter(task=> task.Status === 'In Progress').map(item => (
                         <div key={item._id} className="flex justify-start mt-2">
                         <div className="p-1 rounded-lg shadow-lg bg-white w-full">
                         <p className='float-left text-xs text-slate-400'>Created By: {item.CreateBy.Name}</p>
                         <label className={`float-right inline-block px-2 py-.5 font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out ${item.Priority === 'Low' && 'bg-yellow-500'} ${item.Priority === 'Normal' && 'bg-blue-600'} ${item.Priority === 'High' && 'bg-red-600'}`}>
                             {item.Priority === "Low" && <span className='text-white'>Low</span>}
                             {item.Priority === 'High' && <span className='text-white'>High</span>}
                             {item.Priority === 'Normal' && <span className='text-white'>Normal</span>}
                         </label>
                           <div className="p-6">
                             <h5 className="text-gray-900 text-xl font-medium mb-2">{item.Title}</h5>
                             <p className="text-gray-700 text-base mb-4 flex justify-start">
                               {item.Description}
                             </p>
                           </div>
                           <p className='float-left text-xs text-slate-400'>Created Date: {Moment(item.CreateDate).format('DD-MM-YYYY')}</p>          
                         <select className="float-right inline-block mb-1 px-2 py-1.5 bg-pink-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out"  onChange={(e)=> updateShelf(e ,item._id.toString(),e.target.value)} defaultValue={item.shelf || "none"}>
                         <option>
                         Move to
                         </option>
                         {auth.user.Roles === 'User' ? shelves.filter(shelve => shelve.shelfDisplayName !== 'Canceled').map(item => 
                                      <option key={item.id} value={item.shelfName}>{item.shelfDisplayName}
                                      </option>):shelves.map( item => 
                                      <option key={item.id} value={item.shelfName}>{item.shelfDisplayName}
                                      </option>
                                      )}
                         </select>
                         </div>
                       </div>
                        ))}
       
                    </div>
                </div>
                <div className="rounded bg-gray-200 flex-no-shrink w-80 p-2 mr-3">
                    <div className="flex justify-between py-1">
                        <h3 className="text-sm">Done</h3>
                        <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
                    </div>
                    <div className="text-sm mt-2">
                        {tasks.filter(task=> task.Status === 'Done').map(item => (
                         <div key={item._id} className="flex justify-start mt-2">
                         <div className="p-1 rounded-lg shadow-lg bg-white w-full">
                         <p className='float-left text-xs text-slate-400'>Created By: {item.CreateBy.Name}</p>
                         <label className={`float-right inline-block px-2 py-.5 font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out ${item.Priority === 'Low' && 'bg-yellow-500'} ${item.Priority === 'Normal' && 'bg-blue-600'} ${item.Priority === 'High' && 'bg-red-600'}`}>
                             {item.Priority === "Low" && <span className='text-white'>Low</span>}
                             {item.Priority === 'High' && <span className='text-white'>High</span>}
                             {item.Priority === 'Normal' && <span className='text-white'>Normal</span>}
                         </label>
                           <div className="p-6">
                             <h5 className="text-gray-900 text-xl font-medium mb-2">{item.Title}</h5>
                             <p className="text-gray-700 text-base mb-4 flex justify-start">
                               {item.Description}
                             </p>
                           </div>
                           <p className='float-left text-xs text-slate-400'>Created Date: {Moment(item.CreateDate).format('DD-MM-YYYY')}</p>          
                         <select className="float-right inline-block mb-1 px-2 py-1.5 bg-pink-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out"  onChange={(e)=> updateShelf(e ,item._id.toString(),e.target.value)} defaultValue={item.shelf || "none"}>
                         <option>
                         Move to
                         </option>
                         {auth.user.Roles === 'User' ? shelves.filter(shelve => shelve.shelfDisplayName !== 'Canceled').map(item => 
                                      <option key={item.id} value={item.shelfName}>{item.shelfDisplayName}
                                      </option>):shelves.map( item => 
                                      <option key={item.id} value={item.shelfName}>{item.shelfDisplayName}
                                      </option>
                                      )}
                         </select>
                         </div>
                       </div>
                        ))}
       
                    </div>
                </div>
                {(auth.user.Roles ==='Admin' || auth.user.Roles === 'Manager') && (
                                 <div className="rounded bg-gray-200 flex-no-shrink w-80 p-2 mr-3">
                                 <div className="flex justify-between py-1">
                                     <h3 className="text-sm">Canceled</h3>
                                     <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
                                 </div>
                                 <div className="text-sm mt-2">
                                     {tasks.filter(task=> task.Status === 'Canceled').map(item => (
                                      <div key={item._id} className="flex justify-start mt-2">
                                      <div className="p-1 rounded-lg shadow-lg bg-white w-full">
                                      <p className='float-left text-xs text-slate-400'>Created By: {item.CreateBy.Name}</p>
                                      <label className={`float-right inline-block px-2 py-.5 font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out ${item.Priority === 'Low' && 'bg-yellow-500'} ${item.Priority === 'Normal' && 'bg-blue-600'} ${item.Priority === 'High' && 'bg-red-600'}`}>
                                          {item.Priority === "Low" && <span className='text-white'>Low</span>}
                                          {item.Priority === 'High' && <span className='text-white'>High</span>}
                                          {item.Priority === 'Normal' && <span className='text-white'>Normal</span>}
                                      </label>
                                        <div className="p-6">
                                          <h5 className="text-gray-900 text-xl font-medium mb-2">{item.Title}</h5>
                                          <p className="text-gray-700 text-base mb-4 flex justify-start">
                                            {item.Description}
                                          </p>
                                        </div>
                                        <p className='float-left text-xs text-slate-400'>Created Date: {Moment(item.CreateDate).format('DD-MM-YYYY')}</p>          
                                      <select className="float-right inline-block mb-1 px-2 py-1.5 bg-pink-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out"  onChange={(e)=> updateShelf(e ,item._id.toString(),e.target.value)} defaultValue={item.shelf || "none"}>
                                      <option>
                                      Move to
                                      </option>
                                      {auth.user.Roles === 'User' ? shelves.filter(shelve => shelve.shelfDisplayName !== 'Canceled').map(item => 
                                      <option key={item.id} value={item.shelfName}>{item.shelfDisplayName}
                                      </option>):shelves.map( item => 
                                      <option key={item.id} value={item.shelfName}>{item.shelfDisplayName}
                                      </option>
                                      )}
                                      {/* {shelves.map( item => 
                                      <option key={item.id} value={item.shelfName}>{item.shelfDisplayName}
                                      </option>
                                      )} */}
                                      </select>
                                      </div>
                                    </div>
                                     ))}
                    
                                 </div>
                             </div>
                ) }
 
            </div>
</div>
</div>
    )}
     </div>
  )
}

export default ProjectPage;
