import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import store from "./app/store/store";
import { Provider } from "react-redux";

const appName = import.meta.env.VITE_APP_NAME || "Archers Arena";
window.global = window;

if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
            console.warn("Notification permission denied.");
        }
    });
}
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./app/pages/${name}.jsx`,
            import.meta.glob("./app/pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <Provider store={store}>
                <App {...props} />
            </Provider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
