import React from 'react'

function UserItem() {
  return (
<div className='flex flex-row items-center justify-between gap-2 rounded-[8px] p-2'>
    <div className='avatar rounded-full min-h-8 min-w-8 bg-emerald-500 text-white font-[700] flex items-center justify-center'>
<p className='text-[14px] font-semibold'>DS</p>
    </div>

    <div className='grow'>
        <p className='text-[14px] font-bold'>Deji Samson</p>
        <p className='text-[12px] text-neutral-500'>deji@gmail.com</p>
    </div>
</div>
  )
}

export default UserItem