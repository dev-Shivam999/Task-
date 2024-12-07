import React from "react";
import Pro from "./context";
const Provider = ({ children }:{children:React.ReactNode}) => {
    const [userInfo, setUser] = React.useState<boolean>(true)
    return (
        <Pro.Provider value={{ userInfo, setUser }}>
            {children}
        </Pro.Provider>
    )
}



export default Provider