
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Calendar, 
  Heart, 
  Activity, 
  Users, 
  FileText,
  Clock,
  TrendingUp,
  Bell,
  MessageSquare
} from "lucide-react";
import { gsap } from "gsap";

export const PatientDashboard = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    // Animate quick actions with wave effect
    if (quickActionsRef.current) {
      const buttons = quickActionsRef.current.querySelectorAll('button');
      gsap.fromTo(buttons,
        { y: 50, opacity: 0, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1
        }
      );
    }

    // Animate cards with different effects
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const delay = index * 0.1;
        gsap.fromTo(card,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotationY: index % 2 === 0 ? -15 : 15,
            scale: 0.8
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: delay + 0.5
          }
        );
      }
    });

    // Floating animation for icons
    gsap.to(".floating-icon", {
      y: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2
    });

  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-16">
      {/* Welcome Header */}
      <div ref={headerRef} className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's your health overview for today
        </p>
      </div>

      {/* Quick Actions */}
      <div ref={quickActionsRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Button className="h-20 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 group">
          <div className="text-center">
            <Brain className="floating-icon h-6 w-6 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm">AI Health Check</span>
          </div>
        </Button>
        <Button variant="outline" className="h-20 group">
          <div className="text-center">
            <Calendar className="floating-icon h-6 w-6 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Book Appointment</span>
          </div>
        </Button>
        <Button variant="outline" className="h-20 group">
          <div className="text-center">
            <MessageSquare className="floating-icon h-6 w-6 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Chat with AI</span>
          </div>
        </Button>
        <Button variant="outline" className="h-20 group">
          <div className="text-center">
            <Users className="floating-icon h-6 w-6 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Find Doctors</span>
          </div>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Health Overview */}
          <div ref={addToRefs}>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 group hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="floating-icon h-5 w-5 mr-2 text-red-500 group-hover:scale-110 transition-transform" />
                  Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">98</div>
                    <div className="text-xs text-muted-foreground">Health Score</div>
                    <Progress value={98} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">72</div>
                    <div className="text-xs text-muted-foreground">Heart Rate</div>
                    <Progress value={72} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">120/80</div>
                    <div className="text-xs text-muted-foreground">Blood Pressure</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">7.5h</div>
                    <div className="text-xs text-muted-foreground">Sleep</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div ref={addToRefs}>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 group hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="floating-icon h-5 w-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: Brain, title: "AI Health Assessment", desc: "Completed health check", time: "2 hours ago", color: "text-primary" },
                    { icon: Calendar, title: "Consultation with Dr. Smith", desc: "Video call scheduled", time: "Tomorrow 3 PM", color: "text-blue-500" },
                    { icon: FileText, title: "Lab Results", desc: "Blood work results available", time: "3 days ago", color: "text-green-500" }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-center">
                          <IconComponent className={`floating-icon h-8 w-8 ${item.color} mr-3`} />
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-muted-foreground">{item.desc}</div>
                          </div>
                        </div>
                        <Badge variant="secondary">{item.time}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div ref={addToRefs}>
            <Card className="bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20 group hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="floating-icon h-5 w-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Sleep Quality", desc: "Your sleep pattern has improved by 15% this week. Consider maintaining your current bedtime routine." },
                    { title: "Activity Level", desc: "You're 85% towards your weekly exercise goal. A 30-minute walk today will help you reach it." },
                    { title: "Nutrition", desc: "Consider increasing your water intake. You've been below your daily hydration goal." }
                  ].map((insight, index) => (
                    <div key={index} className="p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                      <div className="text-sm font-medium mb-1">{insight.title}</div>
                      <div className="text-xs text-muted-foreground">{insight.desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <div ref={addToRefs}>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 group hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="floating-icon h-5 w-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Dr. Sarah Johnson</div>
                      <div className="text-xs text-muted-foreground">Cardiology</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Tomorrow</div>
                      <div className="text-xs text-muted-foreground">3:00 PM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">AI Health Check</div>
                      <div className="text-xs text-muted-foreground">Weekly assessment</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Friday</div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div ref={addToRefs}>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 group hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Consultations</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Health Assessments</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Days Active</span>
                    <span className="font-semibold">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
