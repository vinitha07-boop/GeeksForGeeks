"use client";

import { useParams } from "next/navigation";
import { allEvents } from "../page";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Share2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : null;
  const event = allEvents.find(e => e.id === eventId);
  const [isRegistered, setIsRegistered] = useState(false);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-4">Event not found</h1>
        <Link href="/events" className="text-primary hover:underline">Return to events list</Link>
      </div>
    );
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    // In a real app we'd submit to API
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={event.image} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12">
          <Link href="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 w-fit transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Link>
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-md shadow-sm">
              {event.category}
            </span>
            <span className={`px-3 py-1 text-xs font-bold rounded-md shadow-sm backdrop-blur ${
              event.status === 'Upcoming' ? 'bg-green-500/90 text-white' : 'bg-gray-500/90 text-white'
            }`}>
              {event.status}
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl"
          >
            {event.title}
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-muted-foreground whitespace-pre-wrap text-lg leading-relaxed">
                {event.description}
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">What you'll learn</h3>
                <ul className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Practical hands-on experience and real-world application of concepts discussed during the session.</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Speakers & Instructors</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop" alt="Alex" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Alex Johnson</h4>
                  <p className="text-muted-foreground text-sm">President, GFG Campus Club RIT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-xl mb-6">Event Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Available Seats</p>
                    <p className="text-muted-foreground">Limited to 50 students</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-8">
                {event.status === 'Upcoming' ? (
                  isRegistered ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                      <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h4 className="font-bold text-lg text-green-600 dark:text-green-500">You're Registered!</h4>
                      <p className="text-sm text-muted-foreground mt-1">We've sent the details to your RIT email.</p>
                      <button className="mt-4 text-sm font-medium text-primary hover:underline" onClick={() => setIsRegistered(false)}>
                        Cancel Registration
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                      <h4 className="font-bold">Register Now</h4>
                      <input 
                        type="email" 
                        required 
                        placeholder="Your RIT Email"
                        className="w-full px-4 py-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-primary text-primary-foreground h-12 rounded-md font-bold px-4 hover:bg-primary/90 transition-colors flex items-center justify-center"
                      >
                        Reserve My Spot
                      </button>
                    </form>
                  )
                ) : (
                  <div className="bg-muted rounded-xl p-4 text-center">
                    <h4 className="font-bold text-muted-foreground">Event Ended</h4>
                    <Link href="#" className="mt-2 inline-block text-primary text-sm font-medium hover:underline">
                      View Recording & Resources
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                  <Share2 className="h-4 w-4 mr-2" /> Share this event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
