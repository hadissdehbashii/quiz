import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import App from './App.tsx'
import { QuizProvider } from "./stores/QuizContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>,
)
