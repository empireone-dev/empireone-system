import React, { useState } from "react";
import Layout from "../layout";
import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import { H1Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import TextArea from "@/app/_components/textarea";
import Radio from "@/app/_components/radio";
import Modal from "@/Components/Modal";
import DashboardCardSection from "./sections/dashboard-card-section";

export default function Page() {
    const [open, setOpen] = useState(false);
    return (
        <Layout>
            <Button variant="primary" outline>
                click me
            </Button>
        </Layout>
    );
}
