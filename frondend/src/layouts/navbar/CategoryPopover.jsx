import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';

const CategoryPopover = ({ category }) => {
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
                                        <Link to={item.to} className="mt-6 block font-medium text-gray-900">
                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                            {item.name}
                                        </Link>
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
                                                    <NavbarLink to={item.to} name={item.name} />
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