import {React, useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUserData } = useContext(UserContext);


    const navigate = useNavigate();

    const handClickLogout = () => {
        if (route === "logout") {
            handleLogout();
        }
        return;
    }
    const handleLogout = () => {
        localStorage.clear();
        clearUserData();
        navigate("/login");
    };
    
    return <div className='w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px]'>
            <div className='flex flex-col item-centres justify-center gap-3 mt-3 mb-8'>
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl || ""}
                        alt='Profile'
                        className='w-20 h-20 bg-slate-400 rounded-full '
                    />) : <></>}
                <h5 className='text-gray-950 font-medium leading-6'>{user?.fullName || "User"}</h5>
            </div>
            {SIDE_MENU_DATA.map(({ item, index }) => (
                <button
                    key={`menu${index}`}
                    className={`w-full fles item-center gap-4 text-[15px] ${
                        activeMenu === item.lable ? "text-white bg-primary":""
                    } py-3 px-6 rounded-lg mb-3`}
                        onClick={() => handleClick(item.path)}
                        >
                        <item.icon className="text-xl"/>
                        {item.lable}
                        </button>
            ))}
        </div>;
};

export default SideMenu;
