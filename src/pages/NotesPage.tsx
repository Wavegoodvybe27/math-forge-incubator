
import { PageHeader } from "@/components/PageHeader";
import { NotesEditor } from "@/components/NotesEditor";

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notes"
        description="Document your mathematical framework and ideas"
      />
      
      <NotesEditor />
    </div>
  );
}
