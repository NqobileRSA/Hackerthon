'use client';
import React, { useState } from 'react';
import { Users, ShieldCheck, ClipboardList } from 'lucide-react';
import StokvelRegistration from '../Auth/RegistrationForm';
import LoginModal from '../Auth/LoginForm';

export default function LandingPage() {
  // const [showLoginModal, setShowLoginModal] = useState(false);
  // const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm absolute top-0 w-full z-10">
        <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-indigo-600">Stokvel</div>
          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition"
              onClick={() => setOpenLogin(true)}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-gray-100 text-indigo-600 rounded-md font-semibold hover:bg-gray-200 transition"
              onClick={() => setOpen(true)}
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 mt-16">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Empower Your Community with Stokvel
          </h1>
          <p className="text-lg mb-8">
            A platform that brings people together to save, share, and succeed.
          </p>
          <a
            href="/registration"
            className="px-8 py-4 bg-white text-indigo-600 rounded-md font-semibold hover:bg-gray-100 shadow-md transition"
          >
            Get Started
          </a>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-600 opacity-30"
          aria-hidden="true"
        />
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-bold text-center mb-6">
            What is Stokvel?
          </h2>
          <p className="text-lg text-center mb-12">
            Stokvel is a collaborative savings and investment platform designed
            to empower communities. Whether it’s for a fixed-term goal or an
            event, we help you manage your group&apos;s finances effortlessly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Save Together',
                icon: (
                  <Users className="h-10 w-10 text-indigo-600 mb-4 mx-auto" />
                ),
                text: 'Contribute as a group and achieve your goals faster.',
              },
              {
                title: 'Transparency',
                icon: (
                  <ShieldCheck className="h-10 w-10 text-indigo-600 mb-4 mx-auto" />
                ),
                text: 'Track all contributions, withdrawals, and members in one place.',
              },
              {
                title: 'Simple Management',
                icon: (
                  <ClipboardList className="h-10 w-10 text-indigo-600 mb-4 mx-auto" />
                ),
                text: 'Admins can approve transactions and manage members effortlessly.',
              },
            ].map(({ title, icon, text }) => (
              <div
                key={title}
                className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition"
              >
                {icon}
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white mt-[50px]">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-bold text-center mb-6">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: `"Stokvel has transformed how my family saves together. It's easy to use and keeps us organized!"`,
                author: '- Sarah T.',
              },
              {
                text: `"The transparency and tracking features make Stokvel stand out. Highly recommend!"`,
                author: '- Jacob M.',
              },
              {
                text: `"A perfect tool for managing our group's finances for events and emergencies."`,
                author: '- Lindiwe K.',
              },
            ].map(({ text, author }) => (
              <div key={author} className="p-6 bg-gray-50 shadow-md rounded-lg">
                <p className="italic mb-4">{text}</p>
                <h4 className="font-semibold text-right">{author}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-lg mb-8">
            Join Stokvel today and take the first step toward financial success
            with your community.
          </p>
          <a
            href="/registration"
            className="px-8 py-4 bg-white text-indigo-600 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Get Started Now
          </a>
        </div>
      </section>

      {/* Modals */}
      <StokvelRegistration open={open} onOpenChange={setOpen} />
      <LoginModal open={openLogin} onOpenChange={setOpenLogin} />
      {/* {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />} */}
      {/* {showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} />} */}
    </div>
  );
}
