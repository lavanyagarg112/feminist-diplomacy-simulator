'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy-load the heavy chat UI to avoid increasing initial page payload
const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating launcher button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open assistant"
        className="fixed bottom-5 right-5 z-40 rounded-full bg-rose-600 p-3 text-white shadow-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M7.5 8.25h9a.75.75 0 0 0 0-1.5h-9a.75.75 0 0 0 0 1.5Zm0 4.5h5.25a.75.75 0 0 0 0-1.5H7.5a.75.75 0 0 0 0 1.5Z" />
          <path fillRule="evenodd" d="M2.25 12c0-4.97 4.53-9 10.125-9S22.5 7.03 22.5 12s-4.53 9-10.125 9c-1.048 0-2.055-.145-3-.416-1.016.676-2.288 1.18-3.74 1.343a.75.75 0 0 1-.805-.967c.28-.8.515-1.86.591-2.94C3.47 16.809 2.25 14.52 2.25 12Zm10.125-7.5C7.59 4.5 3.75 7.86 3.75 12c0 2.133 1.068 4.073 2.85 5.456l.506.388-.044.64c-.026.367-.083.78-.162 1.197.784-.256 1.497-.608 2.06-1.034l.38-.285.461.135c.877.258 1.834.403 2.968.403 4.785 0 8.625-3.36 8.625-7.5s-3.84-7.5-8.625-7.5Z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20" aria-modal="true" role="dialog">
          <div className="m-4 w-full max-w-md rounded-xl border bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-3">
              <div className="text-sm font-semibold">Assistant</div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="hidden sm:inline">No internet • Not saved</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="rounded p-1 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-3">
              <Chatbot />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

