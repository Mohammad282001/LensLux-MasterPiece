import { createContext, useState } from 'react';

// Create the context
export const NavbarContext = createContext();

// Create a provider component
export const NavbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <NavbarContext.Provider value={{ open, setOpen }}>
            {children}
        </NavbarContext.Provider>
    );
};
