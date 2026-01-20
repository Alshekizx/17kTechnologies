"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export default function UploadBlogPage() {
  const [mounted, setMounted] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [imageURL, setImageURL] = useState(""); // direct image link
  const [videoURL, setVideoURL] = useState(""); // direct video link
  const [readTime, setReadTime] = useState("");
  const [uploading, setUploading] = useState(false);

  // Ensure client-side rendering
  useEffect(() => setMounted(true), []);

  // TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    setUploading(true);

    try {
      await addDoc(collection(db, "blogPosts"), {
        title,
        author,
        category,
        content: editor.getHTML(),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        image: imageURL || null,
        video: videoURL || null,
        readTime: readTime || "5 min read",
        createdAt: serverTimestamp(),
      });

      alert("Blog uploaded successfully!");

      // Reset form
      setTitle("");
      setAuthor("");
      setCategory("General");
      setTags("");
      setImageURL("");
      setVideoURL("");
      setReadTime("");
      editor.commands.setContent("");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload blog. Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Button>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl text-white mb-8"
        >
          Upload New Blog Post
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-white">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-white">Author</Label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-white/5 text-white"
              required
            />
          </div>

<div>
  <Label style={{ color: "#ffffff" }}>
    Category
  </Label>

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    style={{
      width: "100%",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      backgroundColor: "#ffffff",
      color: "#000000",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      outline: "none",
    }}
  >
    <option value="General">General</option>
    <option value="Tutorial">Tutorials</option>
    <option value="News">Articles</option>
  </select>
</div>


          <div>
            <Label className="text-white">Content</Label>
            <div className="bg-white/5 text-white p-3 rounded-md min-h-[200px]">
              {mounted && editor ? (
                <EditorContent editor={editor} />
              ) : (
                "Loading editor..."
              )}
            </div>
          </div>

          <div>
            <Label className="text-white">Tags (comma separated)</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="bg-white/5 text-white"
            />
          </div>

          <div>
            <Label className="text-white">Featured Image URL</Label>
            <Input
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="bg-white/5 text-white"
            />
          </div>

          <div>
            <Label className="text-white">Optional Video URL</Label>
            <Input
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="bg-white/5 text-white"
            />
          </div>

          <div>
            <Label className="text-white">Read Time</Label>
            <Input
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="bg-white/5 text-white"
            />
          </div>

          <Button
            type="submit"
            disabled={uploading}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 w-full"
          >
            <UploadCloud size={16} className="mr-2" />
            {uploading ? "Uploading..." : "Upload Blog"}
          </Button>
        </form>
      </div>
    </div>
  );
}
