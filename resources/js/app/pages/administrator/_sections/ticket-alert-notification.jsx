import React, { useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";
import showTicketNotificationSection from "@/app/pages/_sections/ticket-notification-section";
import { router } from "@inertiajs/react";
import browser_notification from "@/app/lib/browser-notification";
import { setLoad } from "@/app/redux/app-slice";

export default function TicketAlertNotification() {
    const { user } = useSelector((store) => store.accounts);
    const audioRef = useRef(null);
    const dispatch = useDispatch();
    const locationPath = user?.location?.replace(" ", "_").toLowerCase();

    useEffect(() => {
        // if (!user?.department || !user?.location) return;

        Pusher.logToConsole = false;

        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        });

        const ticketChannel = pusher.subscribe("ticket-channel");
        const messageChannel = pusher.subscribe("message-channel");

        ticketChannel.bind("notification-sent", (response) => {
            const { department, location, isUrgent, ticket_id } = response.data;

            if (department == user.department && location == user.location) {
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

                if (user.account_type != "1") {
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

                        const path =
                            user.account_type == "1"
                                ? `/administrator/ticketing/${locationPath}/${ticket_id}/details`
                                : `/users/ticketing/internal_request/${ticket_id}/details`;

                        router.visit(path);
                    },
                });
            }
        });

        messageChannel.bind("message-sent", (response) => {
            const { ticket, user_id } = response.data;
            dispatch(setLoad(Math.random()));
            console.log("sssss0", user?.department);
            console.log("sssss00", ticket?.department);
            console.log("sssss1", user?.account_type);
            console.log("sssss2", ticket.location);
            console.log("sssss3", user.location);
            console.log("sssss4", user?.id);
            console.log("sssss5", user_id);
            console.log("sssss6", ticket);
            if (user?.account_type != "1") {
                if (
                    ticket.location == "Carcar" &&
                    ticket.department == user?.department &&
                    user?.id != user_id
                ) {
                    browser_notification(
                        "New Message",
                        {
                            body: `You have a new message from ${ticket.ticket_id}`,
                            icon: "/images/logs.png",
                        },
                        () => {
                            const path = `/users/ticketing/internal_request/${ticket.ticket_id}/details`;
                            router.visit(path);
                        },
                        `/users/ticketing/internal_request/${ticket.ticket_id}/details`
                    );
                } else if (
                    ticket.location == "San Carlos" &&
                    ticket.department == user?.department &&
                    user?.id != user_id
                ) {
                    browser_notification(
                        "New Message",
                        {
                            body: `You have a new message from ${ticket.ticket_id}`,
                            icon: "/images/logs.png",
                        },
                        () => {
                            const path = `/users/ticketing/internal_request/${ticket.ticket_id}/details`;
                            router.visit(path);
                        },
                        `/users/ticketing/internal_request/${ticket.ticket_id}/details`
                    );
                }
            } else if (
                user?.account_type == "1" &&
                ticket.location == user.location &&
                user?.id != user_id
            ) {
                browser_notification(
                    "New Message",
                    {
                        body: `You have a new message from ${ticket.ticket_id}`,
                        icon: "/images/logs.png",
                    },
                    () => {
                        const path = `/administrator/ticketing/${locationPath}/${ticket.ticket_id}/details`;
                        router.visit(path);
                    },
                    `/administrator/ticketing/${locationPath}/${ticket.ticket_id}/details`
                );
            }
        });

        return () => {
            ticketChannel.unbind_all();
            messageChannel.unbind_all();
            pusher.unsubscribe("ticket-channel");
            pusher.unsubscribe("message-channel");
            pusher.disconnect();

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
            audio.src = "/audio/alert.mp3";
            audio.volume = 1;
            audio.loop = true;

            audio.pause();
            audio.currentTime = 0;

            audio.play().catch((error) => {
                console.log("Audio play failed:", error);
            });
        } catch (error) {
            console.error("Error playing notification audio:", error);
        }
    };

    return <div className="hidden" />;
}
