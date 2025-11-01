import Chatbot from '@/components/Chatbot';

export default function AssistantPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Assistant</h1>
      <p className="text-sm text-gray-600">
        Ask about the simulator, indicators, targets, and methodology. No internet access. Session is not saved.
      </p>
      <Chatbot />
    </div>
  );
}

