import UseAuth from '../../hooks/useAuth';
// import axios from '../../api/axios';
import {useEffect,useState,useRef} from 'react';
import axios from 'axios';
const GETUSERS_URL = 'http://localhost:8081/users/allUsers';
const DELETEUSERS_URL = 'http://localhost:8081/users/delete';

const Users = () => {
  const [errMsg, setErrmsg] = useState('');
  const errRef = useRef();

  const handleDelete = async (e,id)=> {
    console.log(id);
    console.log(id.toString())
    console.log(auth.accessToken)
    const  response = await axios.get(DELETEUSERS_URL+`/${id.toString()}`,
      {headers: {'Authorization' : `Bearer ${auth.accessToken}`,
                 'Content-Type':'application/json',    
                },
        withCredentials: true         
      });
      setErrmsg(response.data.Msg)     
  }
    const { auth } = UseAuth()
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      setErrmsg('')    
     }, []);
    useEffect(() => {
        const fetchData = async () =>{
          console.log(";;;")
            setLoading(true);
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
            setLoading(false);
          }
          fetchData();
        }, [auth.accessToken,errMsg]);
  return (
    <div className='pt-20 px-10'>
    {loading && <div>Loading</div>}
    {!loading && (
      <div className='flex flex-col justify-center align-middle'>
        <h2>All Users Data</h2>
        <p ref={errRef} className={errMsg ? 'errmsg' :
        'offscreen'} aria-live='assertive'>{errMsg}</p>
        <table className='table-auto border-collapse border-spacing-2 border border-slate-400'>
  <thead>
    <tr>
      <th className='border border-slate-300 bg-[#282c34] text-slate-200'>Name</th>
      <th className='border border-slate-300 bg-[#282c34] text-slate-200'>Email</th>
      <th className='border border-slate-300 bg-[#282c34] text-slate-200'>Role</th>
      <th className='border border-slate-300 bg-[#282c34] text-slate-200'>Edit</th>
      <th className='border border-slate-300 bg-[#282c34] text-slate-200'>Delete</th>
    </tr>
  </thead>
  <tbody>
    {data.map(item => (
    <tr key={item._id}>
    <td className='border border-slate-300 bg-fuchsia-600'>{item.Name}</td>
    <td className='border border-slate-300 bg-sky-600'>{item.Email}</td>
    <td className='border border-slate-300 bg-green-600'>{item.Roles}</td>
    <td className='border border-slate-300 bg-yellow-400'><button>Edit User</button></td>
    <td className='border border-slate-300 bg-red-600' onClick={(e)=> handleDelete(e,item._id)}><button>Delete User</button></td>
    </tr>
    ))}
  </tbody>
</table>
        
      </div>
    )}
    </div>
  )
}

export default Users;
