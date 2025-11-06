import {
    LuLayoutDashboard,
    LuHandCoin,
    LuWalletMinimal,
    LuLogOut,
 } from "react-icons/lu";



export const SIDE_MENU_DATA = [ 
    {
        id:"01",
        lable:"Dashboard",
        icon:<LuLayoutDashboard size="20"/>,
        path:"/dashboard",
    },
    {
        id:"02",
        lable:"Transactions",
        icon:<LuHandCoin size="20"/>,
        path:"/income",
    },
    {
        id:"03",
        lable:"Expenses",
        icon:<LuWalletMinimal size="20"/>,
        path:"/expenses",
    },

    {
        id:"06",
        lable:"Logout",
        icon:<LuLogOut size="20"/>,
        path:"/logout",
    }];