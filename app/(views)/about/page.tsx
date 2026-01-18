"use client";
import { motion } from 'motion/react';
import { Target, Eye, Award, Users, Lightbulb, Heart } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback'; 

export default function AboutPage() {
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
            About 17K Technologies
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Pioneering the future of digital creativity and innovation
          </p>
        </motion.div>

        {/* Company Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl text-white mb-6">Our Story</h2>
              <p className="text-gray-400 mb-4">
                17K Technologies Limited is a creative technology company dedicated to transforming ideas into exceptional digital experiences. We specialize in cutting-edge solutions that merge technical excellence with artistic innovation.
              </p>
              <p className="text-gray-400 mb-4">
                From web and mobile applications to stunning 3D models and immersive animations, we bring expertise across the entire spectrum of digital creation. Our team of passionate developers, designers, and animators work together to deliver solutions that exceed expectations.
              </p>
              <p className="text-gray-400">
                We believe in the power of technology to inspire, engage, and transform. That's why we're committed to staying at the forefront of innovation, continuously evolving our skills and exploring new creative possibilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1519217651866-847339e674d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjE4MjEwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Creative Workspace"
                className="w-full h-96 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-xl"></div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/30 rounded-xl p-8"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-4">
                <Target className="text-cyan-400" size={28} />
              </div>
              <h2 className="text-2xl text-white mb-4">Our Mission</h2>
              <p className="text-gray-400">
                To empower businesses and creators with innovative digital solutions that combine cutting-edge technology with exceptional design. We strive to transform ideas into reality, delivering products that inspire, engage, and drive success in the digital age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-xl p-8"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-4">
                <Eye className="text-purple-400" size={28} />
              </div>
              <h2 className="text-2xl text-white mb-4">Our Vision</h2>
              <p className="text-gray-400">
                To become a global leader in creative technology, recognized for pushing the boundaries of what's possible in digital innovation. We envision a future where technology and creativity seamlessly merge to create extraordinary experiences that shape the digital landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-white mb-4">Our Core Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'We constantly explore new technologies and creative approaches to stay ahead of the curve.'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We deliver exceptional quality in every project, never settling for anything less than outstanding.'
              },
              {
                icon: Users,
                title: 'Collaboration',
                description: 'We work closely with our clients and team members to achieve the best possible outcomes.'
              },
              {
                icon: Heart,
                title: 'Passion',
                description: 'We love what we do, and it shows in the creativity and dedication we bring to every project.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <value.icon className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl text-white mb-4">Expert Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our talented professionals bring diverse skills and unwavering dedication to every project
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '30+', label: 'Happy Clients' },
              { number: '15+', label: 'Team Members' },
              { number: '5+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6"
              >
                <div className="text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
