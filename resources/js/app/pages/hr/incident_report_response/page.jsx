import HeaderSection from "./_sections/header-section";
import DetailsSection from "./_sections/details-section";
import FormSection from "./_sections/form-section";

export default function EmployeeResponsePage() {

    
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <HeaderSection />

                    {/* Incident Details */}
                    <DetailsSection />

                    {/* Form */}
                    <FormSection />
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        If you have any questions, please contact HR at
                        hr@empireonegroup.com
                    </p>
                </div>
            </div>
        </div>
    );
}
