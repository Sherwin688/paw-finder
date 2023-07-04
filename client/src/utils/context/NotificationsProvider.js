import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getURL } from "../ApiHelper";
import { DataContext } from "./DataProvider";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const { account } = useContext(DataContext)
    const [notifications, setNotifications] = useState([]);



    const getNotifications = async () => {

        // axios.get(`${getURL}/notifications/${account.user_name}`).then(res => {
        await axios.get(`${getURL}/notifications/${account.name}`).then(res => {
            setNotifications(res.data)

        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        if (account.name === "") {
            console.log("Came account");
            setNotifications({title:"No Notifications"})
        }
        else {
            console.log("Came not account");
            getNotifications()
        }

    }, [])


    const clearNotifications = () => {
        setNotifications([]);
    };


    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications, getNotifications, clearNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsProvider;
