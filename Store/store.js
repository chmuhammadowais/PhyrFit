import React, { createContext, useState } from 'react';

export const UserContext = createContext({
    user: {
        name: "",
        email: "",
        phone: "",
        age: "",
        height: "",
        weight: "",
        target: ""
    },
    addUser: (userData) => {},
    removeUser: () => {}
});

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        height: "",
        weight: "",
        target: ""
    });

    function addUser(userData) {
        setUser(userData);
    }

    function removeUser() {
        setUser({
            name: "",
            email: "",
            phone: "",
            age: "",
            height: "",
            weight: "",
            target: ""
        });
    }

    const value = {
        user,
        addUser,
        removeUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
