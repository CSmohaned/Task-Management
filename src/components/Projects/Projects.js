import UseAuth from '../../hooks/useAuth';
// import axios from '../../api/axios';
import {useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const GETProjects_URL = 'http://localhost:8081/users/allProjects';

const Projects = () => {
    const { auth } = UseAuth()
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [characters, updateCharacters] = useState(data);
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateCharacters(items);
    }
    useEffect(() => {
        console.log("test")
        const fetchData = async () =>{
            console.log(auth)
            setLoading(true);
            try {
               const {data: response} = await axios.get(GETProjects_URL+`/${auth.user._id}`,
                {headers: {'Authorization' : `Bearer ${auth.accessToken}`,
                           'Content-Type':'application/json',    
                          },
                          withCredentials: true 
                });
              setData(response);
              updateCharacters(response);
            } catch (error) {
              console.error(error.message);
            }
            setLoading(false);
          }
          fetchData();
        }, [auth]);
  return (
    <div className='pt-20 px-10'>
    {loading && <div>Loading</div>}
    {!loading && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
    {(provided) => (
      <div className='flex flex-row flex-wrap justify-around align-middle characters' {...provided.droppableProps} ref={provided.innerRef}>
        {/* <h2>All Users Data</h2> */}
        {/* <table className='table-auto border-collapse border-spacing-2 border border-slate-400'>
  <thead>
    <tr>
      <th className='border border-slate-300 bg-[#282c34] text-slate-200'>Name</th>
      <th className='border border-slate-300 bg-[#282c34] text-slate-200'>Description</th>
      <th className='border border-slate-300 bg-[#282c34] text-slate-200'>CreateDate</th>
    </tr>
  </thead>
  <tbody>
    {data.map(item => (
    <tr key={item._id}>
    <td className='border border-slate-300 bg-fuchsia-600'>{item.Name}</td>
    <td className='border border-slate-300 bg-sky-600'>{item.Description}</td>
    <td className='border border-slate-300 bg-green-600'>{item.CreateDate}</td>
    </tr>
    ))}
  </tbody>
</table> */}
   {characters.map((item,index) => (
     <Draggable key={item._id} draggableId={item._id} index={index}>
     {(provided) => (
<div className="max-w-xs mb-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" key={item._id}  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
    <Link href="#"> 
    <div className="overflow-hidden">
        <img className="rounded-t-lg hover:scale-125" src="../../images/roast.jpg" alt="" />
    </div>
    </Link>
    <div className="p-5">
        <Link href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.Name}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.Description}</p>
        <Link to={`/project/${item._id.toString()}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[dodgerblue] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Enter to Project
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </Link>
    </div>
</div>
)}
</Draggable>
     ))}
        {provided.placeholder}
      </div>
    )}
    </Droppable>
      </DragDropContext>
    )}
    </div>
  )
}

export default Projects;
