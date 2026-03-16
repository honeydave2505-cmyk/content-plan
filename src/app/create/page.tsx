import Header from "@/components/Header";
import ContentForm from "@/components/ContentForm";

export default function CreatePage() {
  return (
    <>
      <Header
        title="Create Content"
        description="Plan and draft new content for your channels"
      />
      <div className="bg-card-bg rounded-xl border border-border p-6">
        <ContentForm />
      </div>
    </>
  );
}
