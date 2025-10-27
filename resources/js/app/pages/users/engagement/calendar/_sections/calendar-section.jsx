import React from "react";
import { Badge, Calendar } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const CalendarSection = () => {
    const { calendars = [] } = useSelector((state) => state.engagement || {});

    const getListData = (value, calendars) => {
        if (!Array.isArray(calendars)) return [];

        const listData = [];
        calendars.forEach((event) => {
            if (!event?.activity?.start_at || !event?.activity?.end_at) return;

            const start = dayjs(event.activity.start_at);
            const end = dayjs(event.activity.end_at);
            if (!start.isValid() || !end.isValid()) return;

            if (value.isBetween(start, end, "day", "[]")) {
                listData.push({
                    type: "success",
                    content: event.activity.name || "Untitled Event",
                });
            }
        });

        console.log("listData", listData);
        return listData;
    };

    const cell_data = (value) => {
        try {
            const listData = getListData(value, calendars);
            if (!listData?.length) return null;

            return (
                <ul className="events m-0 p-0 list-none">
                    {listData.map((item, index) => (
                        <li key={index}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))}
                </ul>
            );
        } catch (error) {
            console.error("Calendar cell render error:", error);
            return null;
        }
    };

    return <Calendar cellRender={(current) => cell_data(current)} />;
};

export default CalendarSection;
