import React from 'react';
import UseAuth from '../../hooks/useAuth';
import {useEffect,useState,useRef} from 'react';
import axios from 'axios';

const GETUSERS_URL = 'http://localhost:8081/users/allUsers';
const GETPROJECT_URL = 'http://localhost:8081/users/allProjects';
const ADDTASK_URL = 'http://localhost:8081/tasks/add';

const AddTask = () => {
  const [errMsg, setErrmsg] = useState('');
  const errRef = useRef();
  const { auth } = UseAuth();
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const optionsPriority = [
    {
      label: "Low",
      value: "Low",
    },
    {
      label: "High",
      value: "High",
    },
    {
      label: "Normal",
      value: "Normal",
    }
    ];
  const [Priority, setPriority] = useState('Normal');  
  const optionsStatus = [
    {
      label: "Done",
      value: "Done",
    },
    {
      label: "In Progress",
      value: "In Progress",
    },
    {
      label: "Not Started",
      value: "Not Started",
    },
    {
      label: "Canceled",
      value: "Canceled",      
    }
    ];
  const [Status, setStatus] = useState('Not Started');
  const [assignId, setAssignId] = useState('Select');
  const [projectId, setProjectId] = useState('Select');
  const [dataUser, setDataUser] = useState([]);
  const [dataProject, setDataProject] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
      setErrmsg('')    
     }, []);
  const handleSubmit = async (e)=> {
      e.preventDefault();
      console.log(JSON.stringify({Title:Title,Description: Description,Status:Status,Priority:Priority,CreateId:auth.user._id.toString(),AssignId:assignId,ProjectId:projectId}))
      try {
          const response = await axios.post(ADDTASK_URL,JSON.stringify({Title:Title,Description:Description,Status:Status,CreateId:auth.user._id.toString(),AssignId:assignId,ProjectId:projectId,Priority:Priority}),{
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
             const {data: response1} = await axios.get(GETUSERS_URL,
              {headers: {'Authorization' : `Bearer ${auth.accessToken}`,
                         'Content-Type':'application/json',    
                        },
                        withCredentials: true 
              });
            setDataUser(response1);
            const {data: response2} = await axios.get(GETPROJECT_URL+`/${auth.user._id}`,
              {headers: {'Authorization' : `Bearer ${auth.accessToken}`,
                         'Content-Type':'application/json',    
                        },
                        withCredentials: true 
              });
              setDataProject(response2);
          } catch (error) {
            console.error(error.message);
          }
        }
        fetchData();
      }, [auth]);
return (
  <div className="p-20 rounded border border-gray-200">
       {success ? (
    <section>
      <h2>Success</h2>
    </section>
  ) :<></>}
       <p ref={errRef} className={errMsg ? 'errmsg' :
      'offscreen'} aria-live='assertive'>{errMsg}</p>
<h1 className="font-medium text-3xl">Add Task</h1>
<p className="text-gray-600 mt-6">you should add new task.</p>
<form onSubmit={handleSubmit}>
  <div className="mt-8 grid lg:grid-cols-2 gap-4">
    <div>
      <label htmlFor="title" className="text-sm text-gray-700 block mb-1 font-medium">Title</label>
      <input type="text" value={Title} name="title" id="title" onChange={(e)=> setTitle(e.target.value)} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your name" />
    </div>

    <div>
      <label htmlFor="description" className="text-sm text-gray-700 block mb-1 font-medium">Description</label>
      <input type="text" value={Description} name="description" id="description" onChange={(e)=> setDescription(e.target.value)} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your Description" />
    </div>
    <div>
      <label>Status:</label>
      <select value={Status} onChange={(e)=> setStatus(e.target.value)}>
      {optionsStatus.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
      ))}
      </select>
    </div>
    <div>
      <label>Priority:</label>
      <select value={Priority} onChange={(e)=> setPriority(e.target.value)}>
      {optionsPriority.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
      ))}
      </select>
    </div>  
    <div>
      <label htmlFor="manager" className="text-sm text-gray-700 block mb-1 font-medium">Users:</label>
      <select name="manager" id="manager" className='bg-gray-100 border border-gray-200 rounded  px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full' value={assignId} onChange={(e)=> setAssignId(e.target.value)}>
          <option>
          Select
          </option>
          {console.log(dataUser.filter(dd=> dd.Roles === 'User'))}
          {dataUser.filter(dd=> dd.Roles === 'User').map((option) => (
            <option key={option._id} value={option._id.toString()}>{option.Name}</option>
          ))}
        </select>
        </div>
        <div>
      <label htmlFor="project" className="text-sm text-gray-700 block mb-1 font-medium">Projects:</label>
      <select name="project" id="project" className='bg-gray-100 border border-gray-200 rounded  px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full' value={projectId} onChange={(e)=> setProjectId(e.target.value)}>
          <option>
          Select
          </option>
          {dataProject.map((option) => (
            <option key={option._id} value={option._id.toString()}>{option.Name}</option>
          ))}
        </select>
        </div>
  </div>
  <div className="space-x-4 mt-8">
    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Submit</button>
  </div>
</form>
</div>
)
}

export default AddTask;
