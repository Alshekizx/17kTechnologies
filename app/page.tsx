"use client";
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code, Palette, Rocket } from 'lucide-react';
import { Button } from './components/ui/button'; 
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import Link from "next/link";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjE4Mjk0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Futuristic Technology"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="text-cyan-400" size={16} />
              <span className="text-sm text-cyan-400">Creative Technology Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent">
              17K Technologies Limited
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Innovate. Create. Transform.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              We bring your vision to life through cutting-edge web & mobile development, stunning 3D & 2D animation, immersive game design, and innovative motion graphics.
            </p>
            
            <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {/* Explore Services Link */}
  <Link href="/services" legacyBehavior>
    <a
      
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        background: "linear-gradient(to right, #06b6d4, #9333ea)",
        color: "#fff",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: 600,
        transition: "all 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background =
          "linear-gradient(to right, #0891b2, #7e22ce)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background =
          "linear-gradient(to right, #06b6d4, #9333ea)";
      }}
    >
      Explore Services
      <ArrowRight size={18} />
    </a>
  </Link>

  {/* View Portfolio Link */}
  <Link href="/blog" legacyBehavior>
    <a
      onClick={(e) => {
        e.preventDefault();
        onNavigate("blog");
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        border: "1px solid rgba(6, 182, 212, 0.5)",
        color: "#06b6d4",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: 600,
        transition: "all 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background =
          "rgba(6, 182, 212, 0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
      }}
    >
      View Blog
    </a>
  </Link>
</div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-white mb-4">Why Choose 17K Technologies?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine creativity with technology to deliver exceptional digital solutions that drive results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code,
                title: 'Development Excellence',
                description: 'Expert web and mobile app development with modern technologies.',
                color: 'cyan'
              },
              {
                icon: Palette,
                title: 'Creative Design',
                description: '3D modeling, 2D animation, and stunning motion graphics.',
                color: 'purple'
              },
              {
                icon: Rocket,
                title: 'Game Development',
                description: 'Captivating game characters and immersive backgrounds.',
                color: 'pink'
              },
              {
                icon: Sparkles,
                title: 'Innovation First',
                description: 'Cutting-edge solutions that push creative boundaries.',
                color: 'blue'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`text-${feature.color}-400`} size={24} />
                </div>
                <h3 className="text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-y border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your creative vision to life with our expert team.
          </p>
          <Link href="#contact" legacyBehavior>
  <a
    onClick={(e) => {
      e.preventDefault();
      onNavigate("contact");
    }}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      background: "linear-gradient(to right, #06b6d4, #9333ea)",
      color: "#fff",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.background =
        "linear-gradient(to right, #0891b2, #7e22ce)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.background =
        "linear-gradient(to right, #06b6d4, #9333ea)";
    }}
  >
    Get In Touch
    <ArrowRight size={18} />
  </a>
</Link>
        </div>
      </section>
    </div>
  );
}
