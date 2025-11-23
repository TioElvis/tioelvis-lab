"use client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImage } from "./use-image";
import { Editor } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Fragment, useState, useRef, useEffect } from "react";
import { ImageIcon, Upload, Link2Icon, Trash2Icon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  editor: Editor;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

export function ImageButton({ editor }: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isActive, currentImage, setImage, removeImage } = useImage({
    editor,
  });

  // Update the form when currentImage changes
  useEffect(() => {
    if (isOpen && isActive && currentImage) {
      const src = currentImage.src || "";
      const altText = currentImage.alt || "";

      // Defer state updates to avoid calling setState synchronously within the effect
      const update = () => {
        setUrl(src);
        setAlt(altText);
        setPreview(src);
      };

      update();
    }
    // no-op cleanup if conditions not met
    return;
  }, [isOpen, isActive, currentImage]);

  const handleOpenDialog = () => {
    if (isActive && currentImage) {
      // Get updated attributes directly from the editor
      const attrs = editor.getAttributes("image");
      setUrl(attrs.src || "");
      setAlt(attrs.alt || "");
      setPreview(attrs.src || "");
    } else {
      setUrl("");
      setAlt("");
      setPreview("");
    }
    setIsOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error("Invalid file type", {
        description: "Only JPG, PNG, GIF and WebP images are allowed",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > MAX_FILE_SIZE) {
      const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
      toast.error("Image too large", {
        description: `The file is ${sizeMB}MB. Maximum allowed size is 5MB`,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // If validations pass, process the image
    setIsLoading(true);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
      setUrl(""); // Clear URL when a file is uploaded
      setIsLoading(false);
      toast.success("Image loaded successfully", {
        description: `${selectedFile.name} (${(
          selectedFile.size / 1024
        ).toFixed(0)}KB)`,
      });
    };

    reader.onerror = () => {
      setIsLoading(false);
      toast.error("Error loading image", {
        description: "Could not read the file. Try another one.",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleInsertFromUrl = () => {
    if (!url.trim()) {
      toast.error("URL required", {
        description: "Please enter a valid URL",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast.error("Invalid URL", {
        description: "The entered URL is not valid",
      });
      return;
    }

    setImage(url, alt);
    setIsOpen(false);
    resetForm();

    if (isActive) {
      toast.success("Image updated");
    } else {
      toast.success("Image inserted from URL");
    }
  };

  const handleInsertFromFile = () => {
    if (!preview) {
      toast.error("No image to insert", {
        description: "Please select a file first",
      });
      return;
    }

    setImage(preview, alt);
    setIsOpen(false);
    resetForm();

    if (isActive) {
      toast.success("Image updated");
    } else {
      toast.success("Image inserted successfully");
    }
  };

  const handleRemoveImage = () => {
    removeImage();
    setIsOpen(false);
    resetForm();
    toast.success("Image removed");
  };

  const resetForm = () => {
    setUrl("");
    setAlt("");
    setPreview("");
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Fragment>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            className="cursor-pointer"
            size="icon-sm"
            variant={isActive ? "default" : "ghost"}
            onClick={handleOpenDialog}>
            <ImageIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Image</TooltipContent>
      </Tooltip>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isActive ? "Edit Image" : "Insert Image"}
            </DialogTitle>
            <DialogDescription>
              {isActive
                ? "Update the image URL or alt text"
                : "Add an image from a URL or upload a file (max 5MB)"}
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">
                <Link2Icon className="h-4 w-4 mr-2" />
                URL
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertFromUrl();
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image-alt">Alt text (optional)</Label>
                <Input
                  id="image-alt"
                  placeholder="Description of the image"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertFromUrl();
                    }
                  }}
                />
              </div>
              {url && (
                <div className="border rounded-lg p-2 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={alt || "Preview"}
                    className="max-h-48 mx-auto rounded"
                    onError={(e) => {
                      e.currentTarget.src = "";
                      e.currentTarget.alt = "Failed to load image";
                      toast.error("Error loading preview", {
                        description: "Check that the URL is valid",
                      });
                    }}
                  />
                </div>
              )}
            </TabsContent>
            <TabsContent value="upload" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="image-file">Upload Image</Label>
                <Input
                  id="image-file"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG, GIF, WebP • Max 5MB
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="upload-alt">Alt text (optional)</Label>
                <Input
                  id="upload-alt"
                  placeholder="Description of the image"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertFromFile();
                    }
                  }}
                />
              </div>
              {isLoading && (
                <div className="border rounded-lg p-4 bg-muted/30 text-center">
                  <p className="text-sm text-muted-foreground">
                    Loading image...
                  </p>
                </div>
              )}
              {preview && !isLoading && (
                <div className="border rounded-lg p-2 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt={alt || "Preview"}
                    className="max-h-48 mx-auto rounded"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
          <DialogFooter className="gap-2 sm:gap-0">
            {isActive && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleRemoveImage}
                className="sm:mr-auto cursor-pointer">
                <Trash2Icon className="h-4 w-4 mr-2" />
                Remove Image
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                }}>
                Cancel
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  if (preview && !url) {
                    handleInsertFromFile();
                  } else {
                    handleInsertFromUrl();
                  }
                }}
                disabled={(!url && !preview) || isLoading}>
                {isActive ? "Update" : "Insert"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
