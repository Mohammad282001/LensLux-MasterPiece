import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTruck, faRotateLeft, faPercent } from '@fortawesome/free-solid-svg-icons';




const BenefitsSection = () => {

    return (
        <>
            <div className='m-12'>
                <div className=' flex flex-row items-center justify-center px-4 py-16 gap-10 sm:px-6 lg:px-8 md:ml-24 md:mr-24 bg-gray-100 text-[#2C2F34] '>
                    <div className='flex flex-col justify-center gap-2 font-bold text-center'>
                        <FontAwesomeIcon icon={faTruck} className="text-3xl" />
                        <h3 className='text-2xl'>FREE SHIPPING</h3>
                        <h5 className=''>Free delivery on orders over 50 JOD</h5>
                    </div>
                    <div className='flex flex-col justify-center gap-2 font-bold text-center'>
                        <FontAwesomeIcon icon={faRotateLeft} className="text-3xl" />
                        <h3 className='text-2xl'>RETURN AND EXCHANGE</h3>
                        <h5 className=''>48-hours returns and exchange</h5>
                    </div>
                    <div className='flex flex-col justify-center gap-2 font-bold text-center'>
                        <FontAwesomeIcon icon={faPercent} className="text-3xl" />
                        <h3 className='text-2xl'>SPECIAL DISCOUNTS </h3>
                        <h5 className=''>special discounts for new users</h5>
                    </div>
                </div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M489.2 287.9h-27.4c-2.6 0-4.6 2-4.6 4.6v32h-36.6V146.2c0-2.6-2-4.6-4.6-4.6h-27.4c-2.6 0-4.6 2-4.6 4.6v32h-36.6v-32c0-2.6-2-4.6-4.6-4.6h-27.4c-2.6 0-4.6 2-4.6 4.6v32h-36.6v-32c0-6-8-4.6-11.7-4.6v-38c8.3-2 17.1-3.4 25.7-3.4 10.9 0 20.9 4.3 31.4 4.3 4.6 0 27.7-1.1 27.7-8v-60c0-2.6-2-4.6-4.6-4.6-5.1 0-15.1 4.3-24 4.3-9.7 0-20.9-4.3-32.6-4.3-8 0-16 1.1-23.7 2.9v-4.9c5.4-2.6 9.1-8.3 9.1-14.3 0-20.7-31.4-20.8-31.4 0 0 6 3.7 11.7 9.1 14.3v111.7c-3.7 0-11.7-1.4-11.7 4.6v32h-36.6v-32c0-2.6-2-4.6-4.6-4.6h-27.4c-2.6 0-4.6 2-4.6 4.6v32H128v-32c0-2.6-2-4.6-4.6-4.6H96c-2.6 0-4.6 2-4.6 4.6v178.3H54.8v-32c0-2.6-2-4.6-4.6-4.6H22.8c-2.6 0-4.6 2-4.6 4.6V512h182.9v-96c0-72.6 109.7-72.6 109.7 0v96h182.9V292.5c.1-2.6-1.9-4.6-4.5-4.6zm-288.1-4.5c0 2.6-2 4.6-4.6 4.6h-27.4c-2.6 0-4.6-2-4.6-4.6v-64c0-2.6 2-4.6 4.6-4.6h27.4c2.6 0 4.6 2 4.6 4.6v64zm146.4 0c0 2.6-2 4.6-4.6 4.6h-27.4c-2.6 0-4.6-2-4.6-4.6v-64c0-2.6 2-4.6 4.6-4.6h27.4c2.6 0 4.6 2 4.6 4.6v64z" /></svg> */}
            </div>
        </>
    )
};
export default BenefitsSection;