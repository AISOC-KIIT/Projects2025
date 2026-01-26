import { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import FileUpload from "./components/FileUpload";
import Summary from "./components/Summary";
import Header from "./components/Header";

function App() {
  const [docId, setDocId] = useState(null);
  const [summary, setSummary] = useState("");
  const [filename, setFilename] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadComplete = (data) => {
    setDocId(data.doc_id);
    setSummary(data.summary);
    setFilename(data.filename);
  };

  const handleReset = () => {
    setDocId(null);
    setSummary("");
    setFilename("");
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!docId ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to LexionAI
              </h2>
              <p className="text-gray-600 text-lg">
                Upload a PDF document to get started. I'll analyze it and answer
                any questions you have.
              </p>
            </div>
            <FileUpload
              onUploadComplete={handleUploadComplete}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Summary */}
            <div className="lg:col-span-1">
              <Summary
                summary={summary}
                filename={filename}
                onReset={handleReset}
              />
            </div>

            {/* Right Column - Chat */}
            <div className="lg:col-span-2">
              <ChatInterface docId={docId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
