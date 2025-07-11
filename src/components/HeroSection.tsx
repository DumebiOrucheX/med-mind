
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Stethoscope, 
  Calendar, 
  Shield,
  Play,
  Star,
  CheckCircle
} from "lucide-react";

export const HeroSection = () => {
  const trustIndicators = [
    "HIPAA Compliant",
    "24/7 Available",
    "Board-Certified Doctors",
    "AI-Powered Insights"
  ];

  return (
    <section className="relative py-16 lg:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-100 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-100 rounded-full opacity-50 animate-pulse delay-500"></div>
      </div>

      <div className="text-center max-w-5xl mx-auto">
        {/* Trust Badge */}
        <Badge variant="outline" className="mb-6 px-4 py-2 text-green-600 border-green-200 bg-green-50">
          <Shield className="h-4 w-4 mr-2" />
          Trusted by 10,000+ Healthcare Professionals
        </Badge>

        {/* Main Heading */}
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Your AI-Powered
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent block lg:inline lg:ml-4">
            Healthcare Companion
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Get instant medical consultations, symptom analysis, and connect with healthcare providers 
          through our HIPAA-compliant AI platform.
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600 bg-white/70 px-3 py-2 rounded-full border border-gray-200">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              {indicator}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
            <MessageCircle className="h-5 w-5 mr-2" />
            Start Free Consultation
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4 text-lg group">
            <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="ml-2">4.9/5 from 50,000+ users</span>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-8 border border-gray-200 shadow-xl">
            <div className="aspect-video bg-white rounded-xl shadow-inner flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Stethoscope className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <p className="text-lg font-medium">Interactive Healthcare Dashboard</p>
                <p className="text-sm">Real-time consultations and health monitoring</p>
              </div>
            </div>
          </div>
          
          {/* Floating Cards */}
          <div className="hidden lg:block absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 transform -rotate-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Dr. Sarah online</span>
            </div>
          </div>
          
          <div className="hidden lg:block absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 transform rotate-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Next available: Now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
