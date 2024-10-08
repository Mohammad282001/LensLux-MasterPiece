'use client'
import { Fragment, useEffect, useState } from 'react'
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
import { useCart } from 'react-use-cart';

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, openSignUp, logout } from '../../redux/authSlice';
import LoginPopup from '../../pages/auth/LoginPopup';
import SignUpPopup from '../../pages/auth/SignUpPopup';
import logo from "../../assets/images/logo.png"
import { useContext } from 'react';


const DesktopNavbar = ({ navigation, setOpen }) => {
    const { items, totalUniqueItems } = useCart();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        console.log("User Logout")
        // location.reload(); 
    }, [dispatch]);
    return (
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

                    {localStorage.getItem("token") ? <>
                        <Link to="/profile" className="-m-2 block p-2 font-medium text-gray-200">
                        Profile
                        </Link>

                        <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                        <button 
                            onClick={() => dispatch(logout())  }
                            className="-m-2 block p-2 font-medium text-gray-200"
                        >
                            Logout
                        </button>
                    </>
                        : 
                    <>
                    <button
                        onClick={() => dispatch(openLogin())}
                        className="-m-2 block p-2 font-medium text-gray-200"
                    >
                        Login
                    </button>

                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                    <button
                        onClick={() => dispatch(openSignUp())}
                        className="-m-2 block p-2 font-medium text-gray-200"
                    >
                        Create account
                    </button>

                        </>
                    }
                    
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
                                    <Popover key={category.name} setOpen={setOpen} className="flex">
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
                            <div className="ml-4 flow-root lg:ml-6 relative">
                                <Link to="/cart" className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    />
                                    {/* Notification Badge */}
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalUniqueItems}
                                    </span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default DesktopNavbar;