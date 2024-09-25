import MobileMenu from './MobileMenu';
import DesktopNavbar from './DesktopNavbar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, openSignUp } from '../../redux/authSlice';
import LoginPopup from '../../pages/auth/LoginPopup';
import SignUpPopup from '../../pages/auth/SignUpPopup';
import { NavbarProvider } from './NavbarContext';  // Import the provider

 

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
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

    return (
        <NavbarProvider>
            <MobileMenu navigation={navigation} />
            <DesktopNavbar navigation={navigation} user={user} dispatch={dispatch} />
            <LoginPopup />
            <SignUpPopup />
        </NavbarProvider>
    );
};

export default Navbar;