"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";

import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UploadItemPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("3D Models");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [license, setLicense] = useState(""); // <-- new license state
  const [isFree, setIsFree] = useState(false);
  const [productLink, setProductLink] = useState("");
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const links = e.target.value.split(",").map((link) => link.trim());
    setImageLinks(links);
    setPreviewImages(links); // Show previews
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUploading(true);

    try {
      const docRef = await addDoc(collection(db, "marketplaceItems"), {
        title,
        type,
        price: isFree ? 0 : price,
        description,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        license: license.split(",").map((l) => l.trim()).filter(Boolean), // <-- save license array
        productLink,
        images: imageLinks.filter(Boolean),
        isFree,
        createdAt: serverTimestamp(),
      });

      console.log("Uploaded Item:", docRef.id);
      alert("Item uploaded successfully!");

      // Reset form
      setTitle("");
      setType("3D Models");
      setPrice(0);
      setDescription("");
      setTags("");
      setLicense(""); // <-- reset license input
      setIsFree(false);
      setProductLink("");
      setImageLinks([]);
      setPreviewImages([]);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload item. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back Button */}
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Marketplace
          </Button>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl text-white mb-8"
        >
          Upload New Marketplace Item
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-white">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Item title"
              className="bg-white/5 text-white"
              required
            />
          </div>

          {/* Type */}
          <div>
            <Label htmlFor="type" className="text-white">Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 rounded-md bg-white/5 text-black border border-white/10"
            >
              <option value="3D Models">3D Models</option>
              <option value="Textures">Textures</option>
              <option value="Image">Image</option>
              <option value="Illustration">Illustration</option>
              <option value="Audio">Audio</option>
              <option value="Video">Video</option>
              <option value="Templates">Templates</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price" className="text-white">Price (USD)</Label>
            <Input
              id="price"
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="bg-white/5 text-white"
              disabled={isFree}
              required={!isFree}
            />
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                id="free"
                className="accent-green-500"
              />
              <Label htmlFor="free" className="text-white">Mark as Free</Label>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item"
              className="bg-white/5 text-white"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="text-white">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="3D, Character, Sci-Fi"
              className="bg-white/5 text-white"
            />
          </div>

          {/* License */}
          <div>
            <Label htmlFor="license" className="text-white">License (optional, comma separated)</Label>
            <Input
              id="license"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              placeholder="Personal use, Commercial use, Extended license"
              className="bg-white/5 text-white"
            />
          </div>

          {/* Product Link */}
          <div>
            <Label htmlFor="productLink" className="text-white">Google Drive Link</Label>
            <Input
              id="productLink"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="bg-white/5 text-white"
              required
            />
          </div>

          {/* Images */}
          <div>
            <Label htmlFor="imageLinks" className="text-white">Image Links (comma separated)</Label>
            <Input
              id="imageLinks"
              value={imageLinks.join(",")}
              onChange={handleImageLinksChange}
              placeholder="https://... , https://..."
              className="bg-white/5 text-white"
            />
            <div className="flex gap-3 mt-4 flex-wrap">
              {previewImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Preview ${i}`}
                  className="w-32 h-32 object-cover rounded-md border border-white/10"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={uploading}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 w-full"
          >
            <UploadCloud size={16} className="mr-2" />
            {uploading ? "Uploading..." : "Upload Item"}
          </Button>
        </form>
      </div>
    </div>
  );
}
