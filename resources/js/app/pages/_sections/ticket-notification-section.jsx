import React from "react";
import Swal from "sweetalert2";

export default function TicketNotificationSection({ url, onConfirm, type }) {
    return Swal.fire({
        html: url ? `<img src="${url}" alt="gif" style="width:100%;" />` : "",
        showConfirmButton: true,
        allowOutsideClick: false,
        background: "#f0f0f0", // ✅ Light gray background
        confirmButtonText: `VIEW CONCERN`,
        confirmButtonColor:
            type === "low"
                ? "#ffcc00"
                : type === "medium"
                ? "#FFAE42"
                : "#FF0000",
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm(); // ✅ trigger the callback
        }
    });
}
