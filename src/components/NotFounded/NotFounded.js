import React from 'react';
import './NotFounded.css';
function NotFounded() {
  return (
    <div className='nopage'>
        <img   src='../images/monkey.png' alt='nopage'/>
        <p>عذرًا، هذه الصفحة غير متاحة.</p>
        <p>يُرجى محاولة البحث عن محتوى آخر.</p>
    </div>
  )
}

export default NotFounded;