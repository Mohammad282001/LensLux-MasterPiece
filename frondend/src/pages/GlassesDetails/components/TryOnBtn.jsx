import React from "react";

const TryOnBtn = () => {
    return (
        <button
        
            className={`inline-flex items-center px-6 py-2 border border-black text-base font-medium transition-colors duration-300 "text-black hover:bg-black hover:text-white "
                }`}
        
        >
            <span className="bg-neutral-100 shadow-neutral-100 absolute -top-[150%] left-0 inline-flex w-80 h-[10px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
            Try It Now
        </button>
    );
};
export default TryOnBtn;
