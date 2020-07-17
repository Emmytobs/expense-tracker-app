import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

function Header() {

    const auth = useContext(AuthContext);
    
    const logout = async () => {
        const response = await auth.logoutUser();
        if(response.status !== 200) {
            console.log("Couldn't sign out")
            return;
        };
        window.location = "/"
    }

    return (
        <header className="w-full px-4 py-3 flex flex-row justify-around items-center bg-white text-white mb-5">
            <div className="text-black">Expense Tracker App</div>
        
            {!!auth.user &&
                (<button onClick={logout} className="cursor-pointer py-1 px-3 rounded-lg bg-gray-300 hover:bg-gray-700 hover:text-white text-black">Logout</button>)
            }
        </header>

    )
}


export default Header;