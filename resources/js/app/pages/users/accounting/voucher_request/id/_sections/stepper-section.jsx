import React from 'react'
import { CheckIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FileIcon } from 'lucide-react';
import moment from 'moment';
import { useSelector } from 'react-redux';

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function StepperSection() {
  const { voucher_request } = useSelector((store) => store.accounting);
  console.log("voucher_request", voucher_request?.logs);

  // Sample logs for voucher request if no data from Redux
  const sampleLogs = [
      {
          status: "Pending",
          created_at: "2024-01-15T10:00:00Z",
          notes: "Voucher request submitted for review",
          files: null
      },
      {
          status: "Approved",
          created_at: "2024-01-16T14:30:00Z",
          notes: "Approved by supervisor - John Smith",
          files: "/path/to/approval-document.pdf"
      },
      {
          status: "Released",
          created_at: "2024-01-17T09:15:00Z",
          notes: "Payment released to requestor",
          files: "/path/to/release-receipt.pdf"
      }
  ];

  // Use actual logs if available, otherwise use sample data
  const logs = voucher_request?.logs?.length > 0 ? voucher_request.logs : sampleLogs;
  
  // Get current status with fallback
  const currentStatus = voucher_request?.status || 'Pending';

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-4">Progress Tracker</h2>
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
        <nav aria-label="Progress">
          <ol role="list" className="overflow-hidden">
            {logs?.map((step, i) => (
              <li
                key={i}
                className={classNames(
                  i !== logs.length - 1 ? "pb-8" : "",
                  "relative"
                )}
              >
                {i !== logs.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-gray-300"
                  />
                )}
                <a
                  href="#"
                  className="group relative flex items-start"
                >
                  <span className="flex h-9 items-center">
                    <span
                      className={`${
                        step.status === "Declined"
                          ? "bg-red-600 group-hover:bg-red-800"
                          : "bg-blue-600 group-hover:bg-blue-800"
                      } relative z-10 flex size-8 items-center justify-center rounded-full`}
                    >
                      {step.status === "Declined" ? (
                        <XMarkIcon
                          aria-hidden="true"
                          className="size-5 text-white"
                        />
                      ) : (
                        <CheckIcon
                          aria-hidden="true"
                          className="size-5 text-white"
                        />
                      )}
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {step.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {moment(step.created_at).format("LLL")}
                    </span>
                    <div className="flex">
                      {step.files && (
                        <a
                          href={step.files}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500"
                        >
                          <FileIcon className="inline size-8 mr-1" />
                        </a>
                      )}
                      {step.notes && (
                        <span className="text-sm text-black">
                          {step.notes ?? ""}
                        </span>
                      )}
                    </div>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Status message */}
        <div className="mt-6 p-4 rounded-md bg-gray-50">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">
                Current Status: {currentStatus}
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                {currentStatus === 'Pending' && 'Your voucher request is being reviewed.'}
                {currentStatus === 'Approved' && 'Your voucher request has been approved and is being processed for release.'}
                {currentStatus === 'Released' && 'Payment has been released. Please check with accounting for details.'}
                {currentStatus === 'Completed' && 'Your voucher request has been completed successfully.'}
                {currentStatus === 'Declined' && 'Your voucher request has been declined. Please contact your supervisor for more information.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
