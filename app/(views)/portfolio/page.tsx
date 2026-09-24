"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Filter } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback'; 
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: '3d', label: '3D & Animation' },
    { id: 'game', label: 'Game Assets' },
    { id: 'motion', label: 'Motion Graphics' }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      tags: ['React', 'E-commerce', 'UI/UX'],
      description: 'Modern e-commerce platform with seamless checkout experience',
      image: 'https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzYxODQzODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      title: 'Fitness Tracking App',
      category: 'mobile',
      tags: ['React Native', 'Health', 'iOS/Android'],
      description: 'Cross-platform fitness app with real-time tracking',
      image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYxNzQ3MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 3,
      title: 'Product Visualization',
      category: '3d',
      tags: ['3D Modeling', 'Rendering', 'Product Design'],
      description: 'High-quality 3D product renders for marketing',
      image: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMG1vZGVsaW5nJTIwZGVzaWdufGVufDF8fHx8MTc2MTg0ODQ1NHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 4,
      title: 'Fantasy Game Characters',
      category: 'game',
      tags: ['Character Design', 'Game Art', '3D'],
      description: 'Detailed character models for RPG game',
      image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzYxNzQxMDM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 5,
      title: 'Brand Animation',
      category: 'motion',
      tags: ['Motion Graphics', 'Logo Animation', 'Branding'],
      description: 'Dynamic brand animation for tech startup',
      image: 'https://images.unsplash.com/photo-1633743252577-ccb68cbdb6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYxNzQ5NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 6,
      title: 'Corporate Website',
      category: 'web',
      tags: ['Next.js', 'Corporate', 'SEO'],
      description: 'Professional corporate website with CMS',
      image: 'https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjE4Mjk0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 7,
      title: 'Animated Explainer',
      category: 'motion',
      tags: ['2D Animation', 'Explainer Video', 'Marketing'],
      description: 'Engaging explainer video for SaaS product',
      image: 'https://images.unsplash.com/photo-1502739423516-a7da6332f56f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYXRpb24lMjBzdHVkaW98ZW58MXx8fHwxNzYxNzQwMjc2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 8,
      title: 'Architectural Renders',
      category: '3d',
      tags: ['3D', 'Architecture', 'Visualization'],
      description: 'Photorealistic architectural visualization',
      image: 'https://images.unsplash.com/photo-1519217651866-847339e674d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjE4MjEwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 9,
      title: 'Food Delivery App',
      category: 'mobile',
      tags: ['Mobile', 'Food Tech', 'UI/UX'],
      description: 'Intuitive food ordering and delivery app',
      image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYxNzQ3MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

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
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing our best work across web, mobile, 3D, and animation projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? 'default' : 'outline'}
              onClick={() => setActiveFilter(category.id)}
              className={
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'border-white/20 text-gray-300 hover:bg-white/5'
              }
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all"
            >
              <div className="relative overflow-hidden aspect-video">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/50 text-white hover:bg-white/10"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Project
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <Filter size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
