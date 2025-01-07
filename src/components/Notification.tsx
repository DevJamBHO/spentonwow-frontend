import React, {useEffect, useState} from 'react';
import styles from '@/styles/Notification.module.scss';
import {faBullhorn, faXmark} from "@fortawesome/free-solid-svg-icons";

import {hasNotification} from "@/api/notification";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useSettingStore from '@/store/useSettingStore';
import {NotificationResponse} from "@/interfaces/Notifications";


const Notification: React.FC = () => {
    const notificationTime = useSettingStore(state => state.notificationTime);
    const setNotificationTime = useSettingStore(state => state.setNotificationTime);
    const [notification, setNotification] = useState<NotificationResponse | null >();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await hasNotification()
                setNotification(data)
            } catch (err: unknown) {

            }
        }
        fetchNotifications()
    }, []);

    const closeNotification = () => {
        const date = new Date();
        setNotificationTime(date);
    };

    const shouldShowNotification = () => {
        if (!notification) return false;
        if (!notificationTime) return true;
        const now = new Date();
        const timeDiff = (now.getTime() - new Date(notificationTime).getTime()) / (1000 * 60 * 60 * 24);
        return timeDiff >= 7;
    };

    if (!shouldShowNotification()) return null;

    if (notification) {
        return (
            <div className={styles.notificationContainer}>
                <a
                    href={notification.url}
                    target={notification.site === 'spentonwow' ? '_self' : '_blank'}
                    className={styles.notification}
                >

                    <FontAwesomeIcon icon={faBullhorn} width={30} height={30} />
                    {notification.text}
                </a>
                <FontAwesomeIcon
                    onClick={closeNotification}
                    className={styles.close}
                    icon={faXmark}
                    width={20}
                    height={20}
                />
            </div>
        );
    }
};

export default Notification;