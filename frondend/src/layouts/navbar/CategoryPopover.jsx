import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';

const CategoryPopover = ({ category, setOpen }) => {
    const navigate = useNavigate();

    const handleLinkClick = (to) => {
        navigate(to);  // Navigate to the desired route
        setOpen(false);  // Close the navbar or popover
    };

    return (
        <Popover className="flex">
            <div className="relative flex">
                <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-red-600 data-[open]:text-red-600">
                    {category.name}
                </PopoverButton>
            </div>
            <PopoverPanel
                transition
                className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />
                <div className="relative bg-white">
                    <div className="mx-auto max-w-7xl px-8">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
                                        </div>
                                        <button
                                            onClick={() => handleLinkClick(item.to)}  // Call handleLinkClick
                                            className="mt-6 block font-medium text-gray-900"
                                        >
                                            {item.name}
                                        </button>
                                        <p aria-hidden="true" className="mt-1">
                                            Shop now
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                    <div key={section.name}>
                                        <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                        </p>
                                        <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                            {section.items.map((item) => (
                                                <li key={item.name} className="flex">
                                                    <button
                                                        onClick={() => handleLinkClick(item.to)}  // Handle link click
                                                        className="hover:text-gray-800"
                                                    >
                                                        {item.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default CategoryPopover;
