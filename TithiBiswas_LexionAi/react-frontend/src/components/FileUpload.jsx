import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:8000/";

function FileUpload({ onUploadComplete, isUploading, setIsUploading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    setError("");

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      // 50MB limit
      setError("File size must be less than 50MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        onUploadComplete(response.data);
      }
    } catch (err) {
      setError("Failed to upload file. Please ensure the backend is running.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <div className="text-center mb-6">
        <div className="inline-block bg-primary-100 p-4 rounded-full mb-4">
          <FileText className="w-12 h-12 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Upload Your Document
        </h3>
        <p className="text-gray-500">Drag and drop or click to browse</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          dragActive
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        {selectedFile ? (
          <div className="space-y-2">
            <FileText className="w-16 h-16 mx-auto text-primary-600" />
            <p className="text-gray-700 font-medium">{selectedFile.name}</p>
            <p className="text-sm text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-16 h-16 mx-auto text-gray-400" />
            <p className="text-gray-600">Click or drag PDF file here</p>
            <p className="text-sm text-gray-400">Maximum file size: 50MB</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className="mt-6 w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing Document...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Upload & Analyze
          </>
        )}
      </button>
    </div>
  );
}

export default FileUpload;
