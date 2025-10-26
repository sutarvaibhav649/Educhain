import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Card, CardContent } from './ui/card';
import {
  BookOpen,
  Users,
  Award,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Share2,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './ui/Navbar';
// ======== Navbar ===========

<Navbar></Navbar>

// ======== Section Wrapper ===========

const Section = ({ id, title, subtitle, icon: IconComponent, children }) => (
  <section id={id} className="py-24 bg-background border-b border-border">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex justify-center mb-4">
          <IconComponent className="text-primary" size={36} />
        </div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-12">{subtitle}</p>
        {children}
      </motion.div>
    </div>
  </section>
);

// ======== Home Page ===========

const Home = () => {
  // State to simulate login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Optional: redirect to home page
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-24 text-center bg-linear-to-b from-primary/10 to-background">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-bold mb-4">
            Empower Your Campus with Skill Sharing
          </motion.h1>
          <p className="text-lg text-muted-foreground mb-8">
            Learn, teach, and exchange skills with your peers — all within your university. 
            EduChain builds a connected ecosystem of knowledge powered by blockchain transparency.
          </p>
          <Button size="lg">Get Started</Button>
        </div>
      </section>

      {/* Skills Section */}
      <Section
        id="skills"
        title="Explore & Share Skills"
        subtitle="Offer your expertise or learn from others in your university network."
        icon={BookOpen}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Programming', 'Design', 'Languages'].map((skill, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">{skill}</h3>
                <p className="text-muted-foreground">
                  Connect with mentors and learners to collaborate and grow your {skill.toLowerCase()} skills.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Exchange Section */}
      <Section
        id="exchange"
        title="Skill Exchange Marketplace"
        subtitle="Trade knowledge and experience securely using our blockchain-powered system."
        icon={Share2}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card><CardContent className="p-6">Post your skill offers and find matching learners.</CardContent></Card>
          <Card><CardContent className="p-6">Track exchanges and trust levels via blockchain verification.</CardContent></Card>
        </div>
      </Section>

      {/* Community Section */}
      <Section
        id="community"
        title="Join the Community"
        subtitle="Engage with groups, discussions, and feedback to enhance your learning journey."
        icon={Users}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card><CardContent className="p-6">Create interest-based communities.</CardContent></Card>
          <Card><CardContent className="p-6">Host peer-to-peer workshops and webinars.</CardContent></Card>
          <Card><CardContent className="p-6">Collaborate on campus projects and hackathons.</CardContent></Card>
        </div>
      </Section>

      {/* Achievements Section */}
      <Section
        id="achievements"
        title="Achievements & Rewards"
        subtitle="Get recognized for your teaching, learning, and collaborations."
        icon={Award}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card><CardContent className="p-6">Earn verified certificates for completed skill exchanges.</CardContent></Card>
          <Card><CardContent className="p-6">Showcase your achievements in your profile portfolio.</CardContent></Card>
          <Card><CardContent className="p-6">Collect digital badges powered by blockchain authenticity.</CardContent></Card>
        </div>
      </Section>

      {/* Settings Section */}
      <Section
        id="settings"
        title="Manage Your Profile"
        subtitle="Customize your preferences, privacy settings, and notifications."
        icon={Settings}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card><CardContent className="p-6">Update your personal details and university info.</CardContent></Card>
          <Card><CardContent className="p-6">Control who can view your skills and achievements.</CardContent></Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-muted py-6 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} EduChain. Built for University Skill Exchange.
      </footer>
    </div>
  );
};

export default Home;
