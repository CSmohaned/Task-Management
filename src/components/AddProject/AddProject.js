import React from 'react';
import UseAuth from '../../hooks/useAuth';
import {useEffect,useState,useRef} from 'react';
import axios from 'axios';

const GETUSERS_URL = 'http://localhost:8081/users/allUsers';
const ADDPROJECT_URL = 'http://localhost:8081/projects/add';

const AddProject = () => {
    const [errMsg, setErrmsg] = useState('');
    const errRef = useRef();
    const { auth } = UseAuth();
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [managerId, setManagerId] = useState('');
    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        setErrmsg('')    
       }, []);
    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            const response = await axios.post(ADDPROJECT_URL,JSON.stringify({Name:Name,Description: Description,MangerId:managerId}),{
                headers: {'Authorization' : `Bearer ${auth.accessToken}`,
                'Content-Type':'application/json',    
               },
              withCredentials: true
            }
          );
          console.log(response.data);
          setSuccess(true);
          // clear inputs filed
          } catch (error) {
            if (!error?.response) {
              setErrmsg('No Server Response')
            } else if (error.response?.status === 409) {
              setErrmsg('user Is  Taken')
            } else {
              setErrmsg('Registration Failed')
            }
          }
    }
   
    useEffect(() => {
        const fetchData = async () =>{
            try {
               const {data: response} = await axios.get(GETUSERS_URL,
                {headers: {'Authorization' : `Bearer ${auth.accessToken}`,
                           'Content-Type':'application/json',    
                          },
                          withCredentials: true 
                });
              setData(response);
            } catch (error) {
              console.error(error.message);
            }
          }
          fetchData();
        }, [auth.accessToken]);
  return (
    <div className="p-20 rounded border border-gray-200">
         {success ? (
      <section>
        <h2>Success</h2>
      </section>
    ) :<></>}
         <p ref={errRef} className={errMsg ? 'errmsg' :
        'offscreen'} aria-live='assertive'>{errMsg}</p>
  <h1 className="font-medium text-3xl">Add Project</h1>
  <p className="text-gray-600 mt-6">you should add new project.</p>
  <form onSubmit={handleSubmit}>
    <div className="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <label htmlFor="name" className="text-sm text-gray-700 block mb-1 font-medium">Name</label>
        <input type="text" value={Name} name="name" id="name" onChange={(e)=> setName(e.target.value)} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your name" />
      </div>

      <div>
        <label htmlFor="email" className="text-sm text-gray-700 block mb-1 font-medium">Description</label>
        <input type="text" value={Description} name="email" id="email" onChange={(e)=> setDescription(e.target.value)} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your Description" />
      </div>

      <div>
        <label htmlFor="manager" className="text-sm text-gray-700 block mb-1 font-medium">Manager</label>
        <select name="manager" id="manager" className='bg-gray-100 border border-gray-200 rounded  px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full' value={managerId} onChange={(e)=> setManagerId(e.target.value)}>
           <option>
           Select
           </option>
            {data.filter(dd=> dd.Roles === 'Manager').map((option) => (
              <option key={option._id} value={option._id.toString()}>{option.Name}</option>
            ))}
          </select>      </div>
    </div>

    <div className="space-x-4 mt-8">
      <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Submit</button>
    </div>
  </form>
</div>
  )
}

export default AddProject;
