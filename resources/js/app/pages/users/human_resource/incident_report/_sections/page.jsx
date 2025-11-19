import ViewRespondSection from "@/app/pages/hr/_sections/view-respond-section";


export default function ViewEmployeeResponsePage({ incident_report, log, explanation }) {
    return <ViewRespondSection incident_report={incident_report} log={log} explanation={explanation} />;
}