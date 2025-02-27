import React from 'react'
import Link from 'next/link'
import Programtable from '@/components/userpanel/programtable'
function Program() {
    return (
        <div className='bg-[#000000] min-h-screen  '>
            <div className='flex flex-col items-center'>
              <h2 className='text-white'>this is the program table</h2>
            </div>
            <div className='mx-4 lg:mx-40 mt-10'>
                <Programtable />
            </div>
        </div>
    )
}

export default Program