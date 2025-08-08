export default function browser_notification(title, options = {}, onClick = null,path) {
    if (!("Notification" in window)) {
        console.warn("This browser does not support notifications.");
        return;
    }

    const showNotification = () => {
        const notification = new Notification(title, options);

        // Always open the app in a new tab when notification is clicked
        notification.onclick = (event) => {
            event.preventDefault();
            // window.open(path, "MsgWindow", "width=1280,height=800");
            if (typeof onClick === "function") {
                onClick(event);
            }
        };
    };

    if (Notification.permission === "granted") {
        showNotification();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                showNotification();
            }
        });
    }
}
