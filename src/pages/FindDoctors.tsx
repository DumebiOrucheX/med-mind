
import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Clock, User, Search, Filter, Video, Calendar } from "lucide-react";
import { gsap } from "gsap";

const FindDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    // Animate doctor cards with staggered animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            rotationX: -15
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.1
          }
        );
      }
    });

    // Floating animation for search bar
    gsap.to(".search-container", {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      availability: "Available Today",
      image: "👩‍⚕️",
      experience: "15 years"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      rating: 4.8,
      reviews: 89,
      location: "Los Angeles, CA",
      availability: "Next Available: Tomorrow",
      image: "👨‍⚕️",
      experience: "12 years"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      rating: 4.9,
      reviews: 156,
      location: "Chicago, IL",
      availability: "Available Today",
      image: "👩‍⚕️",
      experience: "10 years"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      rating: 4.7,
      reviews: 203,
      location: "Houston, TX",
      availability: "Available Tomorrow",
      image: "👨‍⚕️",
      experience: "18 years"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Find Doctors
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with certified healthcare professionals for consultations and expert care
            </p>
          </div>

          {/* Search and Filters */}
          <div className="search-container max-w-2xl mx-auto mb-12">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search by specialty, name, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button>
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <div key={index} ref={addToRefs}>
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 group hover:shadow-2xl hover:scale-105">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {doctor.image}
                    </div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit mx-auto">
                      {doctor.specialty}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="ml-1 font-semibold">{doctor.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {doctor.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {doctor.availability}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        {doctor.experience} experience
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button size="sm" className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctors;
