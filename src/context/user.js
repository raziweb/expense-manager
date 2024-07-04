import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({children}) {
    const [user, setUser] = useState(null);

    const valueToShare = {
        user,
        setUser
    }

    return <UserContext.Provider value={valueToShare}>
        {children}
    </UserContext.Provider>
}

export {UserProvider, UserContext}