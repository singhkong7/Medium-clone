import Header from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div>
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Contact</h1>
          <p className="text-gray-600">Email: support@mediumclone.com</p>
        </div>
      </div>
    </div>
  );
}
