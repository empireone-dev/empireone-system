import { department_slug } from "@/app/lib/search-lib";
import { Link } from "@inertiajs/react";
import { Table, Tag } from "antd";
import moment from "moment";
import React from "react";
import { FcCancel, FcCheckmark, FcFinePrint, FcLike } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function StatsTableSection() {
    const { stats } = useSelector((store) => store.tickets);

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        // { title: "Email", dataIndex: "email", key: "email" },
        { title: "Department", dataIndex: "department", key: "department" },
        { title: "Location", dataIndex: "location", key: "location" },
        {
            title: "Total Assignees",
            dataIndex: "total_assignees",
            key: "total_assignees",
        },
        {
            title: "Total Overdue",
            dataIndex: "total_overdue",
            key: "total_overdue",
        },
        {
            title: "On Time",
            dataIndex: "on_time",
            key: "on_time",
        },
        {
            title: "Result",
            dataIndex: "percentage",
            key: "percentage",
            render: ({ percent, result }) => (
                <span className={"flex gap-3"}>
                    {/* <span
                        className={
                            result === "PASSED"
                                ? "text-green-600"
                                : "text-red-600"
                        }
                    >
                        {result}
                    </span>
                    {percent.toFixed(1)}% */}
                    {result === "PASSED" && (
                        <Tag color={"green"}>
                            {" "}
                            {result} - {percent.toFixed(2)}%
                        </Tag>
                    )}
                    {result === "FAILED" && (
                        <Tag color={"red"}>
                            {" "}
                            {result} - {percent.toFixed(2)}%
                        </Tag>
                    )}{" "}
                </span>
            ),
        },
    ];

    const columns2 = [
        { title: "Ticket ID", dataIndex: "ticket_id", key: "ticket_id" },
        { title: "Requestor", dataIndex: "requestor", key: "requestor" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Urgent Type", dataIndex: "isUrgent", key: "isUrgent" },
        {
            title: "Fixed Duration",
            dataIndex: "fixed_duration",
            key: "fixed_duration",
        },
        { title: "Started At", dataIndex: "start", key: "start" },
        { title: "Ended At", dataIndex: "end", key: "end" },
        {
            title: "Is Overdue",
            dataIndex: "isOverdue",
            key: "isOverdue",
            render: (isOverdue) =>
                isOverdue ? (
                    <FcCancel className="text-4xl" />
                ) : (
                    <FcCheckmark className="text-4xl" />
                ),
        },
        {
            title: "Overdue Duration",
            dataIndex: "overdue",
            key: "overdue",
            render: (text) => (text !== "—" ? `⏱ ${text}` : <>⏱ No Overdue</>),
        },
    ];

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) => (
                    <Table
                        columns={columns2}
                        dataSource={record?.assignees?.map((assignee) => {
                            const startTime = moment(assignee.created_at);
                            const startTime2 = moment(assignee.start);
                            const updatedTime = moment(assignee.updated_at);
                            const fixedDurationMoment = moment.duration(
                                updatedTime.diff(startTime2)
                            );
                            const fdDays = fixedDurationMoment.days();
                            const fdHours = fixedDurationMoment.hours();
                            const fdMinutes = fixedDurationMoment.minutes();
                            const fixed_duration = `${fdDays}d ${fdHours}h ${fdMinutes}m`;

                            const endTime = moment(assignee.end);
                            const isOverdue = updatedTime.isAfter(endTime);

                            let overdue = "—";
                            if (isOverdue) {
                                const duration = moment.duration(
                                    updatedTime.diff(endTime)
                                );
                                const days = duration.days();
                                const hours = duration.hours();
                                const minutes = duration.minutes();
                                overdue = `${days}d ${hours}h ${minutes}m`;
                            }

                            return {
                                key: assignee.id,
                                ticket_id: assignee.ticket_id,
                                requestor: assignee.user?.name ?? "N/A",
                                status: assignee.status,
                                isUrgent: assignee.isUrgent,
                                fixed_duration: fixed_duration,
                                start: moment(assignee.start).format(
                                    "M-D-YYYY h:mm:ss A"
                                ),
                                end: moment(assignee.end).format(
                                    "M-D-YYYY h:mm:ss A"
                                ),
                                isOverdue,
                                overdue,
                            };
                        })}
                        pagination={false}
                    />
                ),
                rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={stats?.map((res) => {
                const assignees = res?.assignees ?? [];

                const totalNotOverDue = assignees.filter((a) =>
                    moment(a.updated_at).isBefore(moment(a.end))
                ).length;

                const totalAssignees = assignees.length;
                const percent =
                    totalAssignees > 0
                        ? (totalNotOverDue / totalAssignees) * 100
                        : 0;
                const result = percent < 75 ? "FAILED" : "PASSED";

                return {
                    key: res.id,
                    name: res?.name ?? "NONE",
                    email: res?.email ?? "NONE",
                    department: res?.department ?? "N/A",
                    location: res?.location ?? "N/A",
                    assignees,
                    total_assignees: assignees.length,
                    total_overdue: assignees.filter((a) =>
                        moment(a.updated_at).isAfter(moment(a.end))
                    ).length,
                    on_time: assignees.filter(
                        (a) => !moment(a.updated_at).isAfter(moment(a.end))
                    ).length,
                    percentage: { percent, result },
                };
            })}
        />
    );
}
