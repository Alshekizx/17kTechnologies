//file: (views)/marketplace/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Star,
  Download,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
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
  const itemId = Array.isArray(id) ? id[0] : id;
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
      const endpoint = item?.isFree ? "/api/free-download" : "/api/grey/initiate";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, itemId: item?.id }),
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
    if (!itemId) return;

    const fetchItem = async () => {
      try {
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
        setRelatedItems(related.slice(0, 3)); // reduce to 3 related items
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
      <div style={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
        Loading marketplace item...
      </div>
    );
  }

  if (!item) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#000", color: "#888", display: "flex", justifyContent: "center", alignItems: "center" }}>
        Item not found
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#000", paddingTop: 96, paddingBottom: 64 }}>
      <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 16px" }}>
        
        {/* Back Button */}
        <Link href="/marketplace">
          <button style={{ marginBottom: 24, color: "#aaa", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <ArrowLeft size={16} style={{ marginRight: 8 }} />
            Back to Marketplace
          </button>
        </Link>

        {/* Product Section */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginBottom: 64 }}>
          
          {/* Image Gallery */}
          <motion.div style={{ flex: "1 1 400px" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 16 }}>
              <ImageWithFallback
                src={item.images[activeImage]}
                alt={item.title}
                style={{ width: "100%", height: 380, objectFit: "cover" }}
              />
            </div>

            {item.images.length > 1 && (
              <div style={{ display: "flex", gap: 12 }}>
                {item.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 8,
                      overflow: "hidden",
                      border: activeImage === i ? "2px solid #06b6d4" : "1px solid rgba(255,255,255,0.1)",
                      cursor: "pointer"
                    }}
                  >
                    <ImageWithFallback src={img} alt="Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div style={{ flex: "1 1 400px" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ background: "linear-gradient(to right, #06b6d4, #a855f7)", display: "inline-block", padding: "4px 12px", borderRadius: 4, marginBottom: 12, color: "#fff" }}>
              {item.type}
            </div>

            <h1 style={{ fontSize: 28, color: "#fff", marginBottom: 12 }}>{item.title}</h1>

            <div style={{ display: "flex", gap: 16, fontSize: 14, color: "#aaa", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Star size={14} style={{ color: "#facc15" }} />
                {item.rating}
              </div>
              <span>•</span>
              <span>{item.downloads} downloads</span>
            </div>

            <p style={{ color: "#ccc", marginBottom: 24, lineHeight: 1.6 }}>{item.description}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {item.tags.map(tag => (
                <div key={tag} style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: 4, fontSize: 12, color: "#aaa" }}>{tag}</div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 24, color: "#fff" }}>
                {item.isFree ? <span style={{ color: "#22c55e" }}>Free</span> : `$${item.price}`}
              </span>
              <button
                onClick={item.isFree ? handleDownloadClick : handlePurchaseClick}
                disabled={processing}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: item.isFree ? "#22c55e" : "linear-gradient(to right, #06b6d4, #a855f7)",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  opacity: processing ? 0.6 : 1
                }}
              >
                {item.isFree ? <Download size={16} /> : <ShoppingCart size={16} />}
                {processing ? "Processing..." : item.isFree ? "Download" : "Purchase"}
              </button>
            </div>

            <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16, backgroundColor: "rgba(255,255,255,0.05)" }}>
              <h3 style={{ color: "#fff", marginBottom: 12 }}>License</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#aaa" }}>
                {item.license.map((rule, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <CheckCircle size={14} style={{ color: "#22c55e" }} />
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
            <h2 style={{ fontSize: 24, color: "#fff", marginBottom: 24 }}>Related Items</h2>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {relatedItems.map(ri => (
                <Link key={ri.id} href={`/marketplace/${ri.id}`}>
                  <div style={{ flex: "1 1 250px", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", cursor: "pointer" }}>
                    <ImageWithFallback src={ri.images[0]} alt={ri.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                    <div style={{ padding: 12 }}>
                      <h3 style={{ color: "#fff", fontSize: 14, marginBottom: 4 }}>{ri.title}</h3>
                      <p style={{ fontSize: 12, color: "#aaa" }}>{ri.isFree ? "Free" : `$${ri.price}`}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {showEmailPrompt && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 24, width: "100%", maxWidth: 400 }}>
            <h3 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>Enter your Gmail</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginBottom: 16 }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => { setShowEmailPrompt(false); setEmail(""); }} style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #ccc", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleSendLink} disabled={processing} style={{ padding: "8px 16px", borderRadius: 6, border: "none", backgroundColor: "#06b6d4", color: "#fff", cursor: "pointer" }}>
                {processing ? "Processing..." : "Send Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
