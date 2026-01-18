//file: (views)/marketplace/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Download,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

import { db } from "@/app/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

interface MarketplaceItem {
  id: string;
  title: string;
  type: string;
  price: number;
  rating?: number;
  downloads?: number;
  description: string;
  license: string[];
  images: string[];
  tags: string[];
  isFree: boolean;
}

export default function MarketplaceItemPage() {
  const { id } = useParams();
  const itemId = Array.isArray(id) ? id[0] : id; // Ensure a string ID
  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [relatedItems, setRelatedItems] = useState<MarketplaceItem[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
const [showEmailPrompt, setShowEmailPrompt] = useState(false);
const [processing, setProcessing] = useState(false);

const handleDownloadClick = () => {
  setShowEmailPrompt(true);
  if (processing) return;

  
};



const handlePurchaseClick = async () => {
  setShowEmailPrompt(true);
  if (processing) return;

};



const handleSendLink = async () => {
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    alert("Enter a valid email");
    return;
  }

  setProcessing(true);

  try {
    const endpoint = item?.isFree
      ? "/api/free-download"
      : "/api/grey/initiate";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        itemId: item?.id,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
      return;
    }

    alert("Link sent to your email");
    setShowEmailPrompt(false);
    setEmail("");
  } catch (err) {
    alert("Something went wrong");
  } finally {
    setProcessing(false);
  }
};



  useEffect(() => {
    if (!itemId) return; // Stop if no valid ID

    const fetchItem = async () => {
      try {
        // Fetch item by ID from Firestore
        const docRef = doc(db, "marketplaceItems", itemId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setItem(null);
          setLoading(false);
          return;
        }

        const data = docSnap.data() as any;
        const fetchedItem: MarketplaceItem = {
          id: docSnap.id,
          title: data.title,
          type: data.type,
        
          price: data.price,
          rating: data.rating || 0,
          downloads: data.downloads || 0,
          description: data.description,
          license: data.license || [],
          images: data.images || [],
          tags: data.tags || [],
          isFree: data.isFree || false,
        };

        setItem(fetchedItem);

        // Fetch related items (same type, different ID)
        const relatedQuery = query(
          collection(db, "marketplaceItems"),
          where("type", "==", fetchedItem.type)
        );
        const relatedSnapshot = await getDocs(relatedQuery);
        const related: MarketplaceItem[] = [];
        relatedSnapshot.forEach((doc) => {
          if (doc.id !== itemId) {
            const d = doc.data() as any;
            related.push({
              id: doc.id,
              title: d.title,
              type: d.type,
              price: d.price,
            
              rating: d.rating || 0,
              downloads: d.downloads || 0,
              description: d.description,
              license: d.license || [],
              images: d.images || [],
              tags: d.tags || [],
              isFree: d.isFree || false,
            });
          }
        });
        setRelatedItems(related);
      } catch (err) {
        console.error("Error fetching marketplace item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading marketplace item...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Item not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-8xl">

        {/* Back */}
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Marketplace
          </Button>
        </Link>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">

          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="rounded-xl overflow-hidden border border-white/10 mb-4">
              <ImageWithFallback
                src={item.images[activeImage]}
                alt={item.title}
                className="w-full h-[380px] object-cover"
              />
            </div>

            {item.images.length > 1 && (
              <div className="flex gap-3">
                {item.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 rounded-lg overflow-hidden border ${
                      activeImage === i
                        ? "border-cyan-500"
                        : "border-white/10"
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-3 bg-gradient-to-r from-cyan-500 to-purple-600 border-0">
              {item.type}
            </Badge>

            <h1 className="text-3xl text-white mb-3">{item.title}</h1>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                {item.rating}
              </div>
              <span>•</span>
              <span>{item.downloads} downloads</span>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">{item.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-white/20 text-gray-400"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl text-white">
                {item.isFree ? (
                  <span className="text-green-400">Free</span>
                ) : (
                  `$${item.price}`
                )}
              </span>

              <Button
  className={
    item.isFree
      ? "bg-green-500 hover:bg-green-600"
      : "bg-gradient-to-r from-cyan-500 to-purple-600"
  }
  onClick={item.isFree ? handleDownloadClick : handlePurchaseClick}
  disabled={processing}
>
  {item.isFree ? (
    <>
      <Download size={16} className="mr-2" />
      {processing ? "Processing..." : "Download"}
    </>
  ) : (
    <>
      <ShoppingCart size={16} className="mr-2" />
      {processing ? "Processing..." : "Purchase"}
    </>
  )}
</Button>

            </div>

            {/* License */}
            <div className="border border-white/10 rounded-xl p-4 bg-white/5">
              <h3 className="text-white mb-3">License</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {item.license.map((rule, i) => (
                    <li key={i} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-400" />
                    {rule}
                    </li>
                ))}
                </ul>

            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div>
            <h2 className="text-2xl text-white mb-6">Related Items</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedItems.map((ri) => (
                <Link key={ri.id} href={`/marketplace/${ri.id}`}>
                  <div className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition">
                    <ImageWithFallback
                      src={ri.images[0]}
                      alt={ri.title}
                      className="h-40 w-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-4">
                      <h3 className="text-white text-sm mb-1">{ri.title}</h3>
                      <p className="text-xs text-gray-400">
                        {ri.isFree ? "Free" : `$${ri.price}`}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {showEmailPrompt && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-bold mb-4">Enter your Gmail</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full p-2 rounded border mb-4"
      />
      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setShowEmailPrompt(false);
            setEmail("");
          }}
          className="px-4 py-2 rounded border"
        >
          Cancel
        </button>
        <button
          onClick={handleSendLink}
          className="px-4 py-2 rounded bg-cyan-500 text-white"
          disabled={processing}
        >
          {processing ? "Processing..." : "Send Link"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
