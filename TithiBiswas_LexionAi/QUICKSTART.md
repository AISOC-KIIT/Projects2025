# 🚀 Quick Start Guide - LexionAI

## Step 1: Start the Backend

```bash
cd Backend
python main.py
```

Make sure it's running on `http://127.0.0.1:8000/`

## Step 2: Install Frontend Dependencies

```bash
cd react-frontend
npm install
```

## Step 3: Start the Frontend

```bash
npm run dev
```

The app will automatically open at `http://localhost:3000`

## Step 4: Use the Application

1. **Upload a PDF** - Drag and drop or click to browse
2. **View Summary** - See the AI-generated summary on the left
3. **Ask Questions** - Chat with your document on the right
4. **Get Answers** - Receive context-aware responses

## 🎨 UI Features

- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Works on all devices
- **Drag & Drop** - Easy file upload
- **Real-time Chat** - Smooth messaging experience
- **Document Summary** - Quick overview of your PDF
- **Smart Scrolling** - Auto-scroll to latest messages
- **Loading States** - Clear feedback during processing

## 🔧 Configuration

To change the backend URL, edit these files:

- `src/components/FileUpload.jsx`
- `src/components/ChatInterface.jsx`

Look for: `const BACKEND_URL = 'http://127.0.0.1:8000/'`

## 📱 Screenshots

Your new UI includes:

- Clean header with gradient branding
- Drag-and-drop upload zone
- Two-column layout (Summary + Chat)
- Beautiful message bubbles
- Smooth animations and transitions
- Professional color scheme

Enjoy your new modern RAG chatbot UI! 🎉
