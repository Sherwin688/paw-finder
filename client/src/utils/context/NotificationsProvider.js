import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, getURL } from "../ApiHelper";
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


    const deleteNotification = async(id) => {
        await axios.delete(`${getURL}/notifications/delete/${id}`, {
            headers: {
              "Authorization": getAccessToken(),
            }
          })
            .then(res => {
              if (res.status === 200) {
                setNotifications(notifications.filter(notification=>notification._id!==id))
              }
            }).catch(err => {
              console.log(err);
            })
    };


    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications, getNotifications, deleteNotification }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsProvider;
