import { createContext, useState } from 'react';

export const AuthContext = createContext({
    id: "",
    email: "",
    username: "",
    role: "",

});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        username: "",
        role: "",
    })

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
            {/* <RouterProvider router={router} /> */}
        </AuthContext.Provider>
    )
}
