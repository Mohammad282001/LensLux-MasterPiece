'use client'

import { Fragment, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, openSignUp } from '../redux/authSlice';
import LoginPopup from '../pages/auth/LoginPopup';
import SignUpPopup from '../pages/auth/SignUpPopup';

import optical_cover from "../assets/images/optical_cover.jpg"

const navigation = {
    categories: [
        {
            id: 'opticalFrames',
            name: 'OPTICAL FRAMES',
            featured: [
                {
                    name: 'New Arrivals',
                    to: '#',
                    imageSrc: 'https://t3.ftcdn.net/jpg/01/08/89/60/360_F_108896011_pFy4YagjpacvJRaEU4zABaCqJ4LXLgV0.jpg',
                    imageAlt: 'New Arrivals',
                },
                {
                    name: 'Best Selling',
                    to: '#',
                    imageSrc: "https://d1u3tbowg43alx.cloudfront.net/_static/.v-202426070341/img/home/jan_2024/optical_sm.jpg",
                    imageAlt: 'Best Selling',
                },
            ],
            sections: [
                {
                    id: 'shop',
                    name: 'Shop',
                    items: [
                        { name: 'All Opticals', to: '/glasses/optical' },
                        { name: 'New Arrivals', to: '#' },
                        { name: 'Opticals for Men', to: '/glasses/optical/men' },
                        { name: 'Opticals for Women', to: '/glasses/optical/women' },
                        { name: 'Opticals for Kids', to: '/glasses/optical/kids' },
                        { name: 'Unisex', to: '#' },
                        { name: 'Best Selling', to: '#' },
                    ],
                },
                {
                    id: 'frameShape',
                    name: 'FRAME SHAPE',
                    items: [
                        { name: 'Square Opticals', to: '#' },
                        { name: 'Round Opticals', to: '#' },
                        { name: 'Aviator Opticals', to: '#' },
                        { name: 'Rectangle Opticals', to: '#' },
                        { name: 'Cat Eye Opticals', to: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Ray-Ban', to: '#' },
                        { name: 'Gucci', to: '#' },
                        { name: 'Prada', to: '#' },
                        { name: 'VYSEN', to: '#' },
                        { name: 'All Brands', to: '#' },
                    ],
                },
            ],
        },
        {
            id: 'sunglasses',
            name: 'SUNGLASSES',
            featured: [
                {
                    name: 'New Arrivals',
                    to: '#',
                    imageSrc: 'https://en.idei.club/uploads/posts/2023-06/1686782288_en-idei-club-p-woman-sunglasses-black-and-white-dizain-18.jpg',
                    imageAlt: 'New Arrivals',
                },
                {
                    name: 'Best Selling',
                    to: '#',
                    imageSrc: "https://cdn.tatlerasia.com/asiatatler/i/my/2021/05/17121246-1_cover_1920x1200.png",
                    imageAlt: 'Best Selling',
                },
            ],
            sections: [
                {
                    id: 'shop',
                    name: 'Shop',
                    items: [
                        { name: 'All Sunglasses', to: '/glasses/sunglasses' },
                        { name: 'New Arrivals', to: '#' },
                        { name: 'Sunglasses for Men', to: '/glasses/sunglasses/men' },
                        { name: 'Sunglasses for Women', to: '/glasses/sunglasses/women' },
                        { name: 'Unisex', to: '#' },
                        { name: 'Best Selling', to: '#' },
                    ],
                },
                {
                    id: 'frameShape',
                    name: 'FRAME SHAPE',
                    items: [
                        { name: 'Square Sunglasses', to: '#' },
                        { name: 'Round Sunglasses', to: '#' },
                        { name: 'Aviator Sunglasses', to: '#' },
                        { name: 'Rectangle Sunglasses', to: '#' },
                        { name: 'Cat Eye Sunglasses', to: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Ray-Ban', to: '#' },
                        { name: 'Gucci', to: '#' },
                        { name: 'Prada', to: '#' },
                        { name: 'VYSEN', to: '#' },
                        { name: 'All Brands', to: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'CONTACT LENSES', to: '#' },
        { name: 'EYE EXAM', to: '#' },
        { name: 'FRAME FINDER', to: '#' },

    ],
}

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            {/* Mobile menu */}
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
                                <Link to="#" className="-m-2 block p-2 font-medium text-gray-900">
                                    Sign in
                                </Link>
                            </div>
                            <div className="flow-root">
                                <Link to="#" className="-m-2 block p-2 font-medium text-gray-900">
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

            <header className="relative bg-white">
                <div className="hidden lg:flex h-10 bg-black px-4 text-sm font-medium text-white lg:px-8">
                    <div className="hidden lg:ml-8 lg:flex">
                        <Link to="#" className="flex items-center justify-start  hover:text-gray-300">
                            <svg class="block h-auto w-5 flex-shrink-0" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256" /><path d="m155.826 166.957h340.25c-36.17-97.485-130.006-166.957-240.076-166.957-70.694 0-134.687 28.659-181.011 74.989z" /><path d="m155.826 345.043h340.25c-36.17 97.485-130.006 166.957-240.076 166.957-70.694 0-134.687-28.659-181.011-74.989z" fill="#6da544" /><path d="m74.98 74.98c-99.974 99.974-99.974 262.065 0 362.04 41.313-41.313 81.046-81.046 181.02-181.02z" fill="#d80027" /><path d="m101.605 200.348 14.049 29.379 31.729-7.333-14.21 29.301 25.515 20.234-31.767 7.159.088 32.564-25.404-20.373-25.405 20.373.089-32.564-31.767-7.159 25.514-20.234-14.208-29.301 31.727 7.333z" fill="#f0f0f0" /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                            <span className="ml-2 block text-sm font-medium">JO</span>
                            <span className="sr-only">, change currency</span>
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:space-x-6 justify-end ">
                        <button
                            onClick={() => dispatch(openLogin())}
                            className="-m-2 block p-2 font-medium text-gray-200"
                        >
                            Login
                        </button>
                        <LoginPopup />
                        <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                        {/* <Link to="#" className="-m-2 block p-2 font-medium text-gray-200"> */}
                        {/* Create account */}
                        {/* </Link> */}
                        <button
                            onClick={() => dispatch(openSignUp())}
                            className="-m-2 block p-2 font-medium text-gray-200"
                        >
                            Create account
                        </button>
                        <SignUpPopup />

                    </div>


                </div>


                <p className="flex h-10 items-center justify-center bg-red-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                    Get free delivery on orders over 100.0 JOD
                </p>




                <nav

                    id="navbar"
                    aria-label="Top"
                    className="sticky top-0 z-10 w-full bg-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"

                >
                    <div className=" border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden "
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link to="/">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src={logo}
                                        alt=""
                                    />
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup className="hidden z-10 lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            <div className="relative flex">
                                                <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-red-600 data-[open]:text-red-600">
                                                    {category.name}
                                                </PopoverButton>
                                            </div>

                                            <PopoverPanel
                                                transition
                                                className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                                                <div className="relative bg-white">
                                                    <div className="mx-auto max-w-7xl px-8">
                                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                {category.featured.map((item) => (
                                                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                            <img
                                                                                alt={item.imageAlt}
                                                                                src={item.imageSrc}
                                                                                className="object-cover object-center"
                                                                            />
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
                                                                                    <Link to={item.to} className="hover:text-gray-800">
                                                                                        {item.name}
                                                                                    </Link>
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
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            to={page.to}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverGroup>

                            <div className="ml-auto flex items-center">


                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <Link to="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                                    </Link>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to="#" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}









