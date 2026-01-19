# LexionAI - RAG Chatbot Frontend

A modern, clean React-based UI for your RAG (Retrieval-Augmented Generation) chatbot.

## ✨ Features

- 🎨 **Modern UI** - Clean, professional design with Tailwind CSS
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- 💬 **Chat Interface** - Smooth, intuitive chat experience
- 📄 **Document Upload** - Drag-and-drop PDF upload with validation
- 📊 **Summary View** - Display document summaries in a dedicated panel
- ⚡ **Fast** - Built with Vite for lightning-fast development and builds
- 🎯 **Type-Safe** - Modern React with hooks and functional components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Python backend running on `http://127.0.0.1:8000/`

### Installation

1. Navigate to the react-frontend directory:

```bash
cd react-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
react-frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with branding
│   │   ├── FileUpload.jsx      # PDF upload component
│   │   ├── Summary.jsx         # Document summary display
│   │   ├── ChatInterface.jsx   # Main chat interface
│   │   └── Message.jsx         # Individual message component
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      }
    }
  }
}
```

### Backend URL

Update the `BACKEND_URL` constant in:

- `src/components/FileUpload.jsx`
- `src/components/ChatInterface.jsx`

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## 📝 Usage

1. **Upload Document**: Drag and drop or click to upload a PDF document
2. **View Summary**: The document summary appears in the left panel
3. **Ask Questions**: Type your questions in the chat interface
4. **Get Answers**: Receive AI-powered answers based on your document

## 🔧 Troubleshooting

**Backend Connection Error**:

- Ensure Python backend is running on port 8000
- Check CORS settings in backend
- Verify the backend URL in the frontend code

**Upload Issues**:

- Ensure PDF file is under 50MB
- Check that the file is a valid PDF
- Verify backend upload endpoint is working

## 📄 License

This project is part of LexionAI.
