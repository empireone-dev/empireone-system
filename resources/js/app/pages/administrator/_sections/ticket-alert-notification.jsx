import React, { useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import showTicketNotificationSection from "@/app/pages/_sections/ticket-notification-section";
import { router } from "@inertiajs/react";

export default function TicketAlertNotification() {
    const { user } = useSelector((store) => store.accounts);
    const audioRef = useRef(null);

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        });

        const channel = pusher.subscribe("ticket-channel");
        channel.bind("notification-sent", (response) => {
            const { department, location, isUrgent, ticket_id, site_id } =
                response.data;

            if (department === user.department && user.location === location) {
                const priorityMap = {
                    "Low Priority": { type: "low", url: "/gif/low.gif" },
                    "Medium Priority": {
                        type: "medium",
                        url: "/gif/medium.gif",
                    },
                    "High Priority": { type: "high", url: "/gif/high.gif" },
                };

                const { type, url } =
                    priorityMap[isUrgent] || priorityMap["High Priority"];

                if (user.account_type !== "1") {
                    playNotificationAudio(type);
                }

                showTicketNotificationSection({
                    type,
                    url,
                    onConfirm: () => {
                        if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                        }

                        const locationPath = user.location
                            .replace(" ", "_")
                            .toLowerCase();
                        const path =
                            user.account_type === "1"
                                ? `/administrator/ticketing/${locationPath}/${ticket_id}/details`
                                : `/users/ticketing/internal_request/${ticket_id}/details`;

                        router.visit(path);
                    },
                });
            }
        });

        return () => {
            pusher.unsubscribe("ticket-channel");
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [user?.department, user?.location]);

    const playNotificationAudio = (priority) => {
        try {
            if (!audioRef.current) {
                audioRef.current = new Audio();
            }

            const audio = audioRef.current;
            let audioSrc = "/audio/alert.mp3"; // can be switched per priority

            audio.pause();
            audio.currentTime = 0;
            audio.src = audioSrc;
            audio.volume = 1;
            audio.loop = true;

            audio.play().catch((error) => {
                console.log("Audio play failed:", error);
            });
        } catch (error) {
            console.error("Error playing notification audio:", error);
        }
    };

    return <div className="hidden">TicketAlertNotification</div>;
}
