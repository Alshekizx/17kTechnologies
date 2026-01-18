"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { db } from "@/app/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";

interface BlogPost {
  id: string;
  type: "article" | "video" | "tutorial";
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  video?: string | null;
}

export default function BlogDetailsPage() {
  const { id } = useParams();
  const postId = Array.isArray(id) ? id[0] : id;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");
  const [mounted, setMounted] = useState(false); // Track client mount

  // Ensure client-side rendering before TipTap
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch blog post from Firestore
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      try {
        const docRef = doc(db, "blogPosts", postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as any;

          const fetchedPost: BlogPost = {
            id: docSnap.id,
            title: data.title,
            author: data.author,
            category: data.category,
            content: data.content || "",
            tags: data.tags || [],
            image: data.image || "",
            video: data.video || null,
            readTime: data.readTime || "5 min read",
            date: data.createdAt
              ? new Date(data.createdAt.seconds * 1000).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )
              : "Unknown",
            excerpt:
              data.excerpt ||
              (data.content ? data.content.substring(0, 120) + "..." : ""),
            type: data.video
              ? "video"
              : data.category === "Tutorial"
              ? "tutorial"
              : "article",
          };

          setPost(fetchedPost);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // TipTap editor (read-only)
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension,
      ImageExtension.configure({ inline: false, allowBase64: true }),
    ],
    content: "", // start empty
    editable: false,
    editorProps: { attributes: { class: "prose prose-invert max-w-none" } },
    immediatelyRender: false,
  });

  // Update editor content after post is loaded
  useEffect(() => {
    if (editor && post) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    setComments([...comments, commentText]);
    setCommentText("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading blog post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Blog post not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2" size={16} />
            Back to Blog
          </Button>
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-cyan-500 to-purple-600 border-0">
            {post.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl text-white mb-4">{post.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <User size={14} /> {post.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} /> {post.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} /> {post.readTime}
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl overflow-hidden mb-8 border border-white/10">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Video if present */}
        {post.video && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <video
              src={post.video}
              controls
              className="w-full rounded-lg border border-white/10"
            />
          </motion.div>
        )}

        {/* Content rendered with TipTap */}
       {mounted && editor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 prose prose-invert max-w-none text-white"
          >
            <EditorContent editor={editor} />
          </motion.div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-white/20 text-gray-400">
              <Tag size={12} className="mr-1" /> {tag}
            </Badge>
          ))}
        </div>

        {/* Comments Section */}
        <div className="mb-16">
          <h2 className="text-xl text-white mb-4 flex items-center gap-2">
            <MessageSquare size={18} /> Comments
          </h2>

          <div className="space-y-4 mb-4">
            {comments.length === 0 && <p className="text-gray-500 text-sm">No comments yet.</p>}
            {comments.map((comment, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 text-gray-300 text-sm">
                {comment}
              </div>
            ))}
          </div>

          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-gray-300 mb-3 focus:outline-none focus:border-cyan-500"
          />

          <Button onClick={handleAddComment}>Post Comment</Button>
        </div>
      </div>
    </div>
  );
}
