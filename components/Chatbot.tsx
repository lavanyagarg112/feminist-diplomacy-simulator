'use client';

import { useState } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      content:
        'Hi! I can answer questions about the simulator, indicators, and methodology. No internet access. This session is not saved.',
    },
  ]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || pending) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setPending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, useContext: true }),
      });
      const data = await res.json();
      if (data?.ok) {
        setMessages([...next, { role: 'assistant', content: data.content as string }]);
      } else {
        setMessages([
          ...next,
          { role: 'assistant', content: (data?.display as string) || 'API key not working; chat offline.' },
        ]);
      }
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Network error. Please try again later.' }]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[70vh] w-full max-w-xl border rounded-lg p-3 bg-white">
      <div className="text-xs text-gray-500 mb-2">
        Experimental assistant. Uses local project context (indicators, targets, sources, research excerpts). No internet access. Session isn’t saved.
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div
              className={`inline-block px-3 py-2 rounded-lg ${
                m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {pending && <div className="text-sm text-gray-400">Thinking…</div>}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask about credibility, targets, sources…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !pending && send()}
          disabled={pending}
        />
        <button
          className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={send}
          disabled={pending}
        >
          Send
        </button>
      </div>
    </div>
  );
}
