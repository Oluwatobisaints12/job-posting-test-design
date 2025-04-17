import React from 'react'
import Image from 'next/image'
import { montserratBold } from '../../../fonts'

const Advertisement = () => {
    return (
        <div className='mt-[1.3125rem] flex justify-center'>
           <div className='flex flex-col '>
           <h1 className={`text-[11px] ${montserratBold.className} text-end `}>Advertisement</h1>
            <Image
                src="/assets/images/advertisement.png"
                alt="Icon"
                width={1000}
                height={1000}
 
            />
           </div>
        </div>
    )
}

export default Advertisement
