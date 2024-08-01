import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(function () {
        if (localStorage.getItem("tkn") !== null) {
            var token2 = localStorage.getItem("tkn");
            setToken(token2);
        }
    }, []);

    return (
        <authContext.Provider value={{ token, setToken }}>
            {children}
        </authContext.Provider>
    );
}
