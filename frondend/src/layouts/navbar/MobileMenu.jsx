import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react';
import { Fragment, useState } from 'react'
import { useContext } from 'react';
import { NavbarContext } from './NavbarContext';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const MobileMenu = ({ navigation }) => {
    const { open, setOpen } = useContext(NavbarContext);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden ">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
                <DialogPanel
                    transition
                    className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                >
                    <div className="flex px-4 pb-2 pt-5">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Links */}
                    <TabGroup className="mt-2">
                        <div className="border-b border-gray-200">
                            <TabList className="-mb-px flex space-x-8 px-4">
                                {navigation.categories.map((category) => (
                                    <Tab
                                        key={category.name}
                                        className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-red-600 data-[selected]:text-red-800"
                                    >
                                        {category.name}
                                    </Tab>
                                ))}
                            </TabList>
                        </div>
                        <TabPanels as={Fragment}>
                            {navigation.categories.map((category) => (
                                <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                    <div className="grid grid-cols-2 gap-x-4">
                                        {category.featured.map((item) => (
                                            <div key={item.name} className="group relative text-sm">

                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                    <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
                                                </div>
                                                <Link to={item.to} className="mt-6 block font-medium text-gray-900">
                                                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                    {item.name}
                                                </Link>
                                                <p aria-hidden="true" className="mt-1">
                                                    Shop now
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    {category.sections.map((section) => (
                                        <div key={section.name}>
                                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                {section.name}
                                            </p>
                                            <ul
                                                role="list"
                                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                className="mt-6 flex flex-col space-y-6"
                                            >
                                                {section.items.map((item) => (
                                                    <li key={item.name} className="flow-root">
                                                        <Link to={item.to} className="-m-2 block p-2 text-gray-500">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                        {navigation.pages.map((page) => (
                            <div key={page.name} className="flow-root">
                                <Link to={page.to} className="-m-2 block p-2 font-medium text-gray-900">
                                    {page.name}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                        <div className="flow-root">
                            <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900">
                                Login
                            </Link>
                        </div>
                        <div className="flow-root">
                            <Link to="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                                Create account
                            </Link>     
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6">
                        <Link to="#" className="-m-2 flex items-center p-2">
                            <img
                                src="https://tailwindui.com/img/flags/flag-jordan.svg"
                                alt=""
                                className="block h-auto w-5 flex-shrink-0"
                            />
                            <span className="ml-3 block text-base font-medium text-gray-900">JO</span>
                            <span className="sr-only">, change currency</span>
                        </Link>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default MobileMenu;