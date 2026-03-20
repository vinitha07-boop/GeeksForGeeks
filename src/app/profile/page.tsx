"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserCircle2, Mail, Briefcase, GraduationCap, Github, Linkedin, Settings, Save, X, Edit3, Code2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initial user state (using auth context as base)
  const [profileData, setProfileData] = useState({
    name: user?.name || "Alex Dev",
    email: user?.email || "alex@example.com",
    department: "Computer Science and Engineering",
    graduationYear: "2025",
    githubUrl: "https://github.com/alexdev",
    linkedinUrl: "https://linkedin.com/in/alexdev",
    bio: "Passionate software engineering student leaning into full-stack development and open-source contributions."
  });

  const [formData, setFormData] = useState(profileData);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit mode
      setFormData(profileData);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call to save user profile
    setTimeout(() => {
      setProfileData(formData);
      // Optional: Update the global Auth profile context if name or email changed
      if (formData.name !== user?.name || formData.email !== user?.email) {
        login({ name: formData.name, email: formData.email });
      }
      setIsEditing(false);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container py-12 md:py-20 max-w-5xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Account Profile
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your personal information, links, and preferences.
          </p>
        </div>
        <button
          onClick={isEditing ? handleSave : handleEditToggle}
          disabled={isLoading}
          className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            isEditing 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">Saving...</span>
          ) : isEditing ? (
            <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</span>
          ) : (
            <span className="flex items-center gap-2"><Edit3 className="w-4 h-4" /> Edit Profile</span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Sidebar Profile Image Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1"
        >
          <div className="bg-card border border-border/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-primary/5 pattern-grid-lg" />
            
            <div className="relative z-10">
              <div className="w-32 h-32 rounded-full ring-4 ring-primary/20 bg-background flex items-center justify-center shadow-xl mx-auto mb-6">
                <UserCircle2 className="w-20 h-20 text-primary/50" />
              </div>
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-primary font-medium mt-1">{profileData.department}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                Class of {profileData.graduationYear}
              </div>
            </div>

            {isEditing && (
              <button 
                onClick={handleEditToggle}
                className="absolute top-4 right-4 p-2 bg-destructive/10 text-destructive rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors z-20"
                aria-label="Cancel editing"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Right Content Form Area */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border/50 rounded-3xl shadow-lg p-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6 border-b border-border/50 pb-4">
              <Settings className="w-5 h-5 text-primary mr-3" />
              <h3 className="text-xl font-bold">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <UserCircle2 className="w-4 h-4" /> Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 bg-muted/30 rounded-xl font-medium border border-transparent">{profileData.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 bg-muted/30 rounded-xl font-medium border border-transparent">{profileData.email}</p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Department / Major
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 bg-muted/30 rounded-xl font-medium border border-transparent">{profileData.department}</p>
                )}
              </div>

              {/* Graduation Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Graduation Year
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 bg-muted/30 rounded-xl font-medium border border-transparent">{profileData.graduationYear}</p>
                )}
              </div>
              
              {/* Bio */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <UserCircle2 className="w-4 h-4" /> Short Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                ) : (
                  <p className="px-4 py-3 bg-muted/30 rounded-xl font-medium border border-transparent leading-relaxed">{profileData.bio}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Developer Links */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border/50 rounded-3xl shadow-lg p-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6 border-b border-border/50 pb-4">
              <Code2 className="w-5 h-5 text-primary mr-3" />
              <h3 className="text-xl font-bold">Developer Links</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GitHub */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub Profile
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourusername"
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                ) : (
                  <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 bg-muted/30 rounded-xl font-medium border border-transparent text-primary hover:underline truncate">
                    {profileData.githubUrl}
                  </a>
                )}
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn Profile
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourusername"
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                ) : (
                  <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 bg-muted/30 rounded-xl font-medium border border-transparent text-primary hover:underline truncate">
                    {profileData.linkedinUrl}
                  </a>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
