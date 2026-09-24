"use client";
import { motion } from 'motion/react';
import { Code, Smartphone, Box, Film, Zap, Gamepad2, Palette, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback'; 
import { Button } from '@/app/components/ui/button';
import Link from "next/link";

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom, responsive websites built with modern frameworks and technologies. From landing pages to complex web applications, we create digital experiences that perform.',
      features: ['React & Next.js', 'E-commerce Solutions', 'CMS Integration', 'SEO Optimization'],
      image: 'https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzYxODQzODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver seamless user experiences on iOS and Android devices.',
      features: ['iOS & Android', 'React Native', 'UI/UX Design', 'App Store Optimization'],
      image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYxNzQ3MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Box,
      title: '3D Modeling & Animation',
      description: 'Stunning 3D models and animations for product visualization, architectural rendering, and creative projects.',
      features: ['Product Visualization', 'Architectural Renders', 'Character Modeling', 'Animation Sequences'],
      image: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMG1vZGVsaW5nJTIwZGVzaWdufGVufDF8fHx8MTc2MTg0ODQ1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Palette,
      title: '2D Animation',
      description: 'Captivating 2D animations for explainer videos, educational content, and brand storytelling.',
      features: ['Explainer Videos', 'Character Animation', 'Whiteboard Animation', 'Educational Content'],
      image: 'https://images.unsplash.com/photo-1502739423516-a7da6332f56f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYXRpb24lMjBzdHVkaW98ZW58MXx8fHwxNzYxNzQwMjc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Motion Graphics',
      description: 'Eye-catching motion graphics and visual effects for videos, presentations, and digital marketing campaigns.',
      features: ['Logo Animation', 'Kinetic Typography', 'Visual Effects', 'Social Media Content'],
      image: 'https://images.unsplash.com/photo-1633743252577-ccb68cbdb6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYxNzQ5NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Gamepad2,
      title: 'Game Development',
      description: 'Immersive game characters, environments, and backgrounds designed to bring your gaming vision to life.',
      features: ['Character Design', 'Environment Art', 'Background Assets', 'Concept Art'],
      image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzYxNzQxMDM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl text-white mb-4 bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive creative technology solutions tailored to your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${service.gradient} bg-opacity-20 border border-white/20 rounded-full px-4 py-2 mb-4`}>
                  <service.icon size={20} className="text-white" />
                  <span className="text-sm text-white">Professional Service</span>
                </div>
                
                <h2 className="text-3xl text-white mb-4">{service.title}</h2>
                <p className="text-gray-400 mb-6">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2">
                      <Sparkles size={16} className="text-cyan-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

<Link
  href="/contact"
  className={`inline-flex items-center justify-center px-6 py-3 rounded-md font-medium
              bg-gradient-to-r ${service.gradient} text-white hover:opacity-90 transition`}
>
  Get Started
</Link>
              </div>

              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="relative group">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 rounded-xl group-hover:opacity-30 transition-opacity`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 rounded-xl p-12 text-center"
        >
          <h2 className="text-3xl text-white mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            We offer tailored services to meet your specific requirements. Let's discuss how we can help bring your project to life.
          </p>
<Link
  href="/contact"
  className="inline-flex items-center justify-center px-8 py-4 rounded-md text-lg font-semibold
             bg-gradient-to-r from-cyan-500 to-purple-600
             hover:from-cyan-600 hover:to-purple-700 text-white transition"
>
  Contact Us Today
</Link>

        </motion.div>
      </div>
    </div>
  );
}
