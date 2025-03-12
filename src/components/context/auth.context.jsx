import { createContext, useState } from 'react';

export const AuthContext = createContext({
    id: "",
    email: "",
    username: "",
    roles: []
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        username: "",
        roles: []
    })

    const [isAppLoading, setIsAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}
