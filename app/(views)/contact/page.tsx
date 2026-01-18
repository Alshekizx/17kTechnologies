"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Input } from '@/app/components/ui/input'; 
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind? Let's collaborate and bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Contact Cards */}
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white mb-2">Email Us</h3>
              <p className="text-sm text-gray-400 mb-2">Send us an email anytime</p>
              <a href="mailto:info@17ktech.com" className="text-cyan-400 hover:text-cyan-300 text-sm">
                info@17ktech.com
              </a>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-purple-400" size={24} />
              </div>
              <h3 className="text-white mb-2">Call Us</h3>
              <p className="text-sm text-gray-400 mb-2">Mon-Fri from 9am to 6pm</p>
              <a href="tel:+1234567890" className="text-cyan-400 hover:text-cyan-300 text-sm">
                +1 (234) 567-890
              </a>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-pink-400" size={24} />
              </div>
              <h3 className="text-white mb-2">Visit Us</h3>
              <p className="text-sm text-gray-400">
                123 Innovation Street<br />
                Tech City, TC 12345<br />
                United States
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-4">Connect With Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl text-white mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300 mb-2 block">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300 mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-300 mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300 mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 rounded-xl p-6">
              <h3 className="text-white mb-2">Quick Response</h3>
              <p className="text-sm text-gray-400">
                We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
