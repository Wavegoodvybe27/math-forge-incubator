
import { useState, useEffect } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EquationEditorProps {
  initialValue?: string;
  onSave?: (value: string) => void;
}

export function EquationEditor({ initialValue = "", onSave }: EquationEditorProps) {
  const [latex, setLatex] = useState(initialValue || "f(x) = \\sin(x) + \\frac{x^2}{2}");
  const [previewMode, setPreviewMode] = useState<"inline" | "block">("block");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Reset error when latex changes
  useEffect(() => {
    setError(null);
  }, [latex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "LaTeX equation copied to clipboard",
      duration: 2000,
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(latex);
      toast({
        title: "Saved!",
        description: "Your equation has been saved",
        duration: 2000,
      });
    }
  };

  const togglePreviewMode = () => {
    setPreviewMode(previewMode === "inline" ? "block" : "inline");
  };

  return (
    <Card className="shadow-sm border-2 border-math-highlight">
      <CardHeader className="pb-2">
        <CardTitle className="text-math-primary">Equation Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={latex}
          onChange={(e) => setLatex(e.target.value)}
          placeholder="Enter LaTeX equation..."
          className="font-mono min-h-[100px]"
        />

        {error ? (
          <div className="text-destructive text-sm p-2 bg-destructive/10 rounded-md">
            {error}
          </div>
        ) : (
          <div className="p-4 bg-math-background rounded-md overflow-x-auto">
            {previewMode === "inline" ? (
              <InlineMath math={latex} />
            ) : (
              <BlockMath math={latex} />
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={togglePreviewMode}
          >
            {previewMode === "inline" ? "Block Mode" : "Inline Mode"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-1"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </Button>
        </div>
        {onSave && (
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            className="flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
