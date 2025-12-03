import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // function to update user state
    const updateUser = (userData) => {
        setUser(userData);
    };

    // function to clear user state (e.g., on logout)
    const clearUser = () => {
        setUser(null);
    };
    
    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
    