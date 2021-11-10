import React, { useEffect, useRef, useState } from 'react'
import * as Notifications from 'expo-notifications';
import { getFullPath } from '../navigation/getFullPath';

const useNotifications = () => {
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    //add this
    const lastNotificationResponse = Notifications.useLastNotificationResponse();

    useEffect(() => {
        if (lastNotificationResponse) {
            //get the route
            const route = JSON.stringify(
                lastNotificationResponse.notification.request.content.data.route
            );

            //use some function to return the correct screen by route
            getFullPath(JSON.parse(route));
        }
    }, [lastNotificationResponse]);
}

export default useNotifications
