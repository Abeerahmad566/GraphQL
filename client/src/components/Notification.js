import { useSubscription } from "@apollo/client";
import { NOTIFICATION_SUBSCRIPTION } from "../queries/Mutation";
import { useEffect, useState } from "react";

function Notification() {
  const [Notifications, setNotifications] = useState([]);
  const { data, loading } = useSubscription(NOTIFICATION_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const noti = data.subscriptionData.data.notificationCreated;
      console.log(noti);
      setNotifications((Notifications) => [...Notifications, noti]);
    },
  });
  console.log(Notifications);
  return (
    <div>
      <h1>Notifications</h1>
      {Notifications.length > 0 &&
        Notifications.map((Notification, index) => (
          <li key={index}>
            <strong>
              {Notification.author} Added {Notification.name}
            </strong>
          </li>
        ))}
    </div>
  );
}

export default Notification;
