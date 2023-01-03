import React from 'react';
import UseAuth from '../../hooks/useAuth';

const Profile = () => {
  const { auth } = UseAuth();
  console.log(auth.user)
  return (
    <div className="p-16">
<div className="p-8 bg-white shadow mt-24">
  <div className="grid grid-cols-1 md:grid-cols-3">
    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
      <div>
        <p className="font-bold text-gray-700 text-xl">{auth?.user?.Tasks?.length === undefined ? <span>0</span>: auth?.user?.Tasks?.length}</p>
        <p className="text-gray-400">Number of Tasks</p>
      </div>
      <div>
           <p className="font-bold text-gray-700 text-xl">{auth?.user?.Projects?.length === undefined ? <span>0</span> : auth?.user?.Tasks?.length}</p>
        <p className="text-gray-400">Number of Project</p>
      </div>
          <div>
           <p className="font-bold text-gray-700 text-xl">{auth.user.Roles}</p>
        <p className="text-gray-400">Your Role</p>
      </div>
    </div>
    <div className="relative">
      <div className="w-28 h-28 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
<svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
</svg>
      </div>
    </div>
  </div>

  <div className="mt-20 text-center pb-12">
    <h1 className="text-4xl font-medium text-gray-700">Your Name: {auth.user.Name}</h1>
    <p className="font-light text-gray-600 mt-3">Your Email: {auth.user.Email}</p>
  </div>
</div>
</div>
  )
}

export default Profile;
