import { FileText, RotateCcw, FileCheck } from "lucide-react";

function Summary({ summary, filename, onReset }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-fit sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-lg">
            <FileCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Document Summary</h3>
            <p className="text-xs text-gray-500 truncate max-w-[180px]">
              {filename}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4 max-h-[600px] overflow-y-auto scrollbar-custom">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
          {summary}
        </pre>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Upload New Document
      </button>
    </div>
  );
}

export default Summary;
