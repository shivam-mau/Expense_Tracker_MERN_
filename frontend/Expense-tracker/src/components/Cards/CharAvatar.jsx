import React from 'react'
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ fullName, width, height, style }) => {
  return <div className={`${width || "w-12"} ${height || "h-12"} ${style || ""} text-gray-900 font-medium bg-gray-100 rounded-full flex items-center justify-center`}>
    {getInitials( fullName || "")}
    </div>
  
};

export default CharAvatar
