export default function TermsAndConditionSection({ onAgreeChange, agreed }) {
    return (
        <div className="p-4 bg-gray-50  rounded-md w-full max-w-2xl">
            <h2 className="text-lg font-semibold">BPO Terms & Conditions</h2>
            <p className="mt-2 ">
                Please carefully read the following terms and conditions before
                proceeding with your onboarding.
            </p>

            {/* Scrollable T&C content */}
            <div className="mt-4 h-[45vh] overflow-y-auto border border-gray-300  p-4 rounded-md bg-white  text-sm text-gray-700 ">
                <p>
                    <strong>1. Compliance with Company Policies</strong>
                </p>
                <p>
                    You agree to comply with all company policies, procedures,
                    and regulations, including confidentiality, security, and IT
                    policies.
                </p>

                <p className="mt-2">
                    <strong>2. Confidentiality</strong>
                </p>
                <p>
                    All information, processes, and client data accessed during
                    your employment or engagement is strictly confidential and
                    must not be disclosed to unauthorized parties.
                </p>

                <p className="mt-2">
                    <strong>3. Data Security</strong>
                </p>
                <p>
                    You must follow the company’s security protocols when
                    handling any system, tool, or client information.
                </p>

                <p className="mt-2">
                    <strong>4. Workplace Conduct</strong>
                </p>
                <p>
                    You are expected to maintain professional behavior, adhere
                    to work schedules, and communicate effectively with team
                    members and clients.
                </p>

                <p className="mt-2">
                    <strong>5. Intellectual Property</strong>
                </p>
                <p>
                    All work products, processes, and documentation created
                    during your engagement are the intellectual property of the
                    company or the client, as applicable.
                </p>

                <p className="mt-2">
                    <strong>6. Termination</strong>
                </p>
                <p>
                    Violation of any of the terms may result in disciplinary
                    action, up to and including termination.
                </p>

                <p className="mt-2">
                    <strong>7. Modifications</strong>
                </p>
                <p>
                    The company reserves the right to update these terms and
                    conditions from time to time. It is your responsibility to
                    review and comply with the updated terms.
                </p>
            </div>

            {/* Agree checkbox */}
            <div className="mt-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => onAgreeChange(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700 ">
                        I have read and agree to the EmpireOne BPO Solutions
                        Terms & Conditions.
                    </span>
                </label>
            </div>
        </div>
    );
}
