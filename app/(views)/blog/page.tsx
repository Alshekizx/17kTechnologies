"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Tag, BookOpen, Video, FileText } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

interface BlogPost {
  id: string;
  type: "article" | "video" | "tutorial";
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from Firestore
useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const blogCol = collection(db, "blogPosts");
      const q = query(blogCol, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const blogs: BlogPost[] = snapshot.docs.map((doc) => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          title: data.title,
          author: data.author,
          category: data.category,
          content: data.content,
          tags: data.tags || [],
          image: data.image || "",
          video: data.video || null,
          readTime: data.readTime || "5 min read",
          date: data.createdAt
            ? new Date(data.createdAt.seconds * 1000).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Unknown",
          excerpt: data.excerpt || (data.content ? data.content.substring(0, 120) + "..." : ""),
          type: data.video ? "video" : data.category === "Tutorial" ? "tutorial" : "article",
        };
      });

      setBlogPosts(blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchBlogs();
}, []);


  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return FileText;
      case "video":
        return Video;
      case "tutorial":
        return BookOpen;
      default:
        return FileText;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl text-white mb-4 bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Blog & Tutorials
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Learn, grow, and stay updated with the latest in creative technology
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 bg-white/5">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600">
              All Content
            </TabsTrigger>
            <TabsTrigger value="article" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600">
              Articles
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600">
              Videos
            </TabsTrigger>
            <TabsTrigger value="tutorial" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600">
              Tutorials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <BlogGrid posts={blogPosts} getTypeIcon={getTypeIcon} />
          </TabsContent>
          <TabsContent value="article" className="mt-0">
            <BlogGrid posts={blogPosts.filter((post) => post.type === "article")} getTypeIcon={getTypeIcon} />
          </TabsContent>
          <TabsContent value="video" className="mt-0">
            <BlogGrid posts={blogPosts.filter((post) => post.type === "video")} getTypeIcon={getTypeIcon} />
          </TabsContent>
          <TabsContent value="tutorial" className="mt-0">
            <BlogGrid posts={blogPosts.filter((post) => post.type === "tutorial")} getTypeIcon={getTypeIcon} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BlogGrid({ posts, getTypeIcon }: { posts: BlogPost[]; getTypeIcon: (type: string) => any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => {
        const TypeIcon = getTypeIcon(post.type);
        return (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all group"
          >
            <div className="relative aspect-video overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 border-0 text-white">
                  <TypeIcon size={12} className="mr-1" />
                  {post.type}
                </Badge>
              </div>
              {post.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Video className="text-white ml-1" size={28} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="text-xs text-cyan-400 mb-2">{post.category}</div>
              <h3 className="text-white mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                  >
                    Read More
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                {post.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className="border-white/20 text-gray-400 text-xs"
                  >
                    <Tag size={10} className="mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
