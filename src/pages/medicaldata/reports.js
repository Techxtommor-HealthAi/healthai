import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function UploadReport() {
  const [reportType, setReportType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [analyzedDetails, setAnalyzedDetails] = useState("");
  const [cookies] = useCookies(["username"]);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ![
        "image/png",
        "image/jpeg",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      setErrorMessage("Only PNG, JPEG, PDF, or DOCX files are allowed.");
      setSelectedFile(null);
    } else {
      setErrorMessage("");
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportType || !selectedFile) {
      setErrorMessage("Please fill all fields.");
      return;
    }
    setErrorMessage("");

    const formData = new FormData();
    formData.append("reportType", reportType);
    formData.append("file", selectedFile);
    formData.append("username", cookies.username);

    try {
      const response = await fetch("/extract", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setExtractedText(data.extractedText);
        setAnalyzedDetails(data.analyzedDetails);
      } else {
        throw new Error("Failed to process the file.");
      }
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Error processing file");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-600">
          Upload Health Report
        </h2>
        <div className="mb-4">
          <label
            htmlFor="reportType"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Type
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select type --</option>
            <option value="Prescription">Prescription</option>
            <option value="Diagnostic Report">Diagnostic Report</option>
            <option value="OP Consultation">OP Consultation</option>
            <option value="Discharge Summary">Discharge Summary</option>
            <option value="Immunization Record">Immunization Record</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-gray-700 font-medium mb-2"
          >
            Add Health Record (PNG, JPEG, PDF, or DOCX only)
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-teal-600 transition"
        >
          Submit
        </button>
      </form>
      {extractedText && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-xl font-bold mb-4 text-teal-600">
            Extracted Text
          </h3>
          <pre className="text-gray-800 whitespace-pre-wrap">{extractedText}</pre>
          <h3 className="text-xl font-bold mt-6 mb-4 text-teal-600">
            Analyzed Details
          </h3>
          <pre className="text-gray-800 whitespace-pre-wrap">
            {analyzedDetails}
          </pre>
        </div>
      )}
    </div>
  );
}
