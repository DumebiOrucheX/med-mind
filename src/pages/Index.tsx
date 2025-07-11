import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  MessageCircle,
  Calendar,
  Activity,
  Shield,
  MapPin,
  Clock,
  Users,
  Brain,
  Heart,
  PhoneCall,
  Bot,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCard } from "@/components/FeatureCard";
import { QuickActions } from "@/components/QuickActions";
import { Footer } from "@/components/Footer";
import ScrollToTopLink from "@/components/ScrollToTopLink";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState("consultation");

  const features = [
    {
      id: "consultation",
      icon: MessageCircle,
      title: "AI Medical Consultation",
      description:
        "24/7 voice and chat-based medical consultations with AI assistance",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      id: "symptom-checker",
      icon: Stethoscope,
      title: "Symptom Checker",
      description: "Advanced AI-powered symptom analysis and health assessment",
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      id: "scheduling",
      icon: Calendar,
      title: "AI Doctor Scheduling",
      description:
        "Find and book appointments with local healthcare providers with the help of our AI powered assistant",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      id: "tracking",
      icon: Activity,
      title: "Health Insights",
      description: "Monitor your health metrics and medical history",
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
  ];

  const stats = [
    { label: "Healthcare Providers", value: "10,000+", icon: Users },
    { label: "Patient Consultations", value: "500K+", icon: MessageCircle },
    { label: "Cities Covered", value: "250+", icon: MapPin },
    { label: "Avg Response Time", value: "< 2 min", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8 space-y-12">
        <HeroSection />

        {/* Quick Actions */}
        <QuickActions />

        {/* Feature Showcase */}
        <section className="py-16">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-blue-600 border-blue-200"
            >
              <Shield className="h-4 w-4 mr-2" />
              HIPAA Compliant Platform
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of healthcare with our AI-powered platform
              designed for patients, doctors, and healthcare providers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                isActive={activeFeature === feature.id}
                onClick={() => setActiveFeature(feature.id)}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/70 rounded-2xl backdrop-blur-sm border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-gray-600">
              Join thousands of healthcare providers and patients using MedMind
              AI
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Healthcare Experience?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join MedMind AI today and get instant access to AI-powered
                medical consultations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-blue-600">
                  <ScrollToTopLink to="/ai-voice-consult">
                    <Bot className="h-5 w-5 mr-2" />
                    Start Consultation
                  </ScrollToTopLink>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/20"
                >
                  <ScrollToTopLink to="/ai-voice-consult">
                    <Calendar className="h-5 w-5 mr-2" />
                    View our pricing tiers
                  </ScrollToTopLink>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
