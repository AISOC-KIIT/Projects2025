import { FileText, Sparkles } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              LexionAI
            </h1>
            <p className="text-sm text-gray-500">
              RAG-Powered Document Assistant
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
