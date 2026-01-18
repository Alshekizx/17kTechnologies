// file: /app/(views)/marketplace/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from 'motion/react';
import { Search, ShoppingCart, Download, Star } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"; 
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface MarketplaceItem {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  downloads: number;
  image: string;
  tags: string[];
  isFree?: boolean;
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "marketplaceItems");
        const snapshot = await getDocs(colRef);
        const items: MarketplaceItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as any;
          items.push({
            id: doc.id,
            title: data.title,
            type: data.type,
            price: data.price || 0,
            rating: data.rating || 0,
            downloads: data.downloads || 0,
            image: data.images?.[0] || "", // take first image
            tags: data.tags || [],
            isFree: data.isFree || data.price === 0,
          });
        });
        setMarketplaceItems(items);
      } catch (err) {
        console.error("Error fetching marketplace items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = marketplaceItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading marketplace items...
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
            Marketplace
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Browse and download premium 3D models, illustrations, and animations
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search for models, illustrations, animations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 bg-white/5">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600">
              All Items
            </TabsTrigger>
            <TabsTrigger value="3d" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600">
              3D Models
            </TabsTrigger>
            <TabsTrigger value="illustrations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600">
              Illustrations
            </TabsTrigger>
            <TabsTrigger value="animations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600">
              Animations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <MarketplaceGrid items={filteredItems} />
          </TabsContent>
          <TabsContent value="3d" className="mt-0">
            <MarketplaceGrid items={filteredItems.filter(item => item.type === "3D Models")} />
          </TabsContent>
          <TabsContent value="illustrations" className="mt-0">
            <MarketplaceGrid items={filteredItems.filter(item => item.type === "Illustrations")} />
          </TabsContent>
          <TabsContent value="animations" className="mt-0">
            <MarketplaceGrid items={filteredItems.filter(item => item.type === "Animations")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MarketplaceGrid({ items }: { items: MarketplaceItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <Link key={item.id} href={`/marketplace/${item.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="cursor-pointer bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all group"
          >
            <div className="relative aspect-video overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {item.isFree && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-500/90 text-white border-0">
                    FREE
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.type}</p>
                </div>
              </div>

             

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className="border-white/20 text-gray-400 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-white">
                  {item.price === 0 ? (
                    <span className="text-green-400">Free</span>
                  ) : (
                    <span>${item.price}</span>
                  )}
                </div>
                <Button
                  size="sm"
                  className={
                    item.isFree
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                  }
                >
                  {item.isFree ? (
                    <>
                      <Download size={16} className="mr-2" />
                      Download
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} className="mr-2" />
                      Purchase
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
