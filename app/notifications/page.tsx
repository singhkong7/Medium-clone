import Header from "@/components/Header";

export default function NotificationPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div>
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Notifications</h1>
          <p className="text-gray-600">
            This is a Medium clone built using Next.js. Here users can view their notifications.
          </p>
        </div>
      </div>
    </div>
  );
}
