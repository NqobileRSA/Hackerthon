'use client';
import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  ClipboardList,
  ArrowRight,
  ChevronRight,
  Star,
} from 'lucide-react';
import StokvelRegistration from '../Auth/RegistrationForm';
import LoginModal from '../Auth/LoginForm';

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                Stokvel
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setOpenLogin(true)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Login
              </button>
              <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Transform Your Community's Financial Future
            </h1>
            <p className="text-xl text-gray-600 mb-8 lg:mb-12">
              Join thousands of communities using Stokvel to save, invest, and
              grow together. Your path to collective financial success starts
              here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => setOpenLogin(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-50 transition border border-gray-200 shadow-md hover:shadow-lg"
              >
                Login to Account
              </button>
            </div>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-60" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Choose Stokvel?
            </h2>
            <p className="text-lg text-gray-600">
              Experience a revolutionary way to manage community savings with
              features designed for transparency, security, and ease of use.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Collaborative Saving',
                description:
                  'Pool resources effectively with built-in tools for group contribution tracking and goal setting.',
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: 'Bank-Grade Security',
                description:
                  'Your funds are protected with enterprise-level encryption and secure transaction processing.',
              },
              {
                icon: <ClipboardList className="w-8 h-8" />,
                title: 'Smart Management',
                description:
                  'Intuitive dashboard for tracking contributions, managing members, and monitoring progress.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition group"
              >
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            Trusted by Communities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: 'Stokvel revolutionized how our family saves together. The transparency and ease of use made all the difference.',
                author: 'Sarah Thompson',
                role: 'Family Group Leader',
              },
              {
                text: "The best platform for managing our church group's savings. Everything is clear, organized, and professional.",
                author: 'Pastor James Miller',
                role: 'Community Leader',
              },
              {
                text: "We've achieved our savings goals faster than ever. The automated features make management a breeze.",
                author: 'Lindiwe Khumalo',
                role: 'Savings Group Admin',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Community?
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of successful saving groups and start your journey
              to financial freedom.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto group"
            >
              <span>Get Started For Free</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <StokvelRegistration open={open} onOpenChange={setOpen} />
      <LoginModal open={openLogin} onOpenChange={setOpenLogin} />
    </div>
  );
}
