import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';


export const NavbarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <FaIcons.FaHome />,
        cName: 'nav-text'
    },
    {
        title: 'Food',
        path: '/food',
        icon: <MdIcons.MdFastfood />,
        cName: 'nav-text'
    },
    {
        title: 'Exercise',
        path: '/exercise',
        icon: <IoIcons.IoIosFitness />,
        cName: 'nav-text'
    },
    {
        title: 'Mates',
        path: '/mates',
        icon: <FaIcons.FaUserFriends />,
        cName: 'nav-text'
    },
    {
        title: 'Sponsor',
        path: '/sponsor',
        icon: <MdIcons.MdOutlineAttachMoney />,
        cName: 'nav-text'
    },
]