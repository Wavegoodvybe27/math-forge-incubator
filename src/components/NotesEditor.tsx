
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Download, FileUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EquationEditor } from "./EquationEditor";

interface Note {
  id: string;
  title: string;
  content: string;
  equations: { id: string; latex: string }[];
  timestamp: string;
}

export function NotesEditor() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "note-1",
      title: "Introduction to Framework",
      content: "This mathematical framework aims to provide a unified approach to modeling complex systems.",
      equations: [
        { id: "eq-1", latex: "E = mc^2" },
        { id: "eq-2", latex: "F = ma" }
      ],
      timestamp: new Date().toISOString()
    }
  ]);
  const [activeNoteId, setActiveNoteId] = useState<string>("note-1");
  const [showEquationEditor, setShowEquationEditor] = useState(false);
  const { toast } = useToast();

  const activeNote = notes.find(note => note.id === activeNoteId) || notes[0];

  const handleTitleChange = (title: string) => {
    setNotes(notes.map(note => 
      note.id === activeNoteId ? { ...note, title } : note
    ));
  };

  const handleContentChange = (content: string) => {
    setNotes(notes.map(note => 
      note.id === activeNoteId ? { ...note, content } : note
    ));
  };

  const addNewNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "New Note",
      content: "",
      equations: [],
      timestamp: new Date().toISOString()
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
    toast({
      title: "Note created",
      description: "A new note has been added"
    });
  };

  const saveEquation = (latex: string) => {
    const newEquation = {
      id: `eq-${Date.now()}`,
      latex
    };
    
    setNotes(notes.map(note => 
      note.id === activeNoteId 
        ? { ...note, equations: [...note.equations, newEquation] } 
        : note
    ));
    
    setShowEquationEditor(false);
    toast({
      title: "Equation added",
      description: "The equation has been added to your note"
    });
  };

  const deleteEquation = (equationId: string) => {
    setNotes(notes.map(note => 
      note.id === activeNoteId 
        ? { ...note, equations: note.equations.filter(eq => eq.id !== equationId) } 
        : note
    ));
    toast({
      title: "Equation removed",
      description: "The equation has been removed from your note"
    });
  };

  const saveNotes = () => {
    // In a real app, this would save to a database
    // For now, we'll just save to localStorage
    localStorage.setItem("mathForgeNotes", JSON.stringify(notes));
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully"
    });
  };

  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `math-framework-notes-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Notes exported",
      description: "Your notes have been exported as a JSON file"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {notes.map(note => (
            <Button
              key={note.id}
              variant={note.id === activeNoteId ? "default" : "outline"}
              onClick={() => setActiveNoteId(note.id)}
              className="text-sm"
            >
              {note.title}
            </Button>
          ))}
          <Button variant="outline" onClick={addNewNote} className="text-sm">
            + New Note
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportNotes} className="text-sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button onClick={saveNotes} className="text-sm">
            <Save className="h-4 w-4 mr-1" />
            Save All
          </Button>
        </div>
      </div>

      {activeNote && (
        <Card className="shadow-sm border-2 border-math-highlight">
          <CardHeader className="pb-2">
            <Input
              value={activeNote.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-xl font-semibold border-0 p-0 h-auto focus-visible:ring-0"
            />
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={activeNote.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="min-h-[200px]"
              placeholder="Enter your notes here..."
            />

            {activeNote.equations.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Equations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeNote.equations.map(equation => (
                    <Card key={equation.id} className="p-3 shadow-sm">
                      <EquationEditor initialValue={equation.latex} />
                      <div className="flex justify-end mt-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteEquation(equation.id)}
                          className="text-xs text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {showEquationEditor ? (
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Add New Equation</h3>
                <EquationEditor onSave={saveEquation} />
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowEquationEditor(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setShowEquationEditor(true)}
                className="w-full"
              >
                <FileUp className="h-4 w-4 mr-1" />
                Add Equation
              </Button>
            )}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground justify-between">
            <span>Last modified: {new Date(activeNote.timestamp).toLocaleString()}</span>
            <span>{activeNote.equations.length} equation(s)</span>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
