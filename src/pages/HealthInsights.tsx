
import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Activity, TrendingUp, Zap, Target, Calendar, Bell } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const HealthInsights = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [healthScore, setHealthScore] = useState(0);

  useEffect(() => {
    // Animate health score counter
    gsap.to({ value: 0 }, {
      value: 92,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setHealthScore(Math.round(this.targets()[0].value));
      }
    });

    // Animate cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, 
          { 
            y: 100, 
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Floating animation for icons
    gsap.to(".floating-icon", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3
    });

  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />
      
      <div ref={containerRef} className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Health Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered insights to help you understand and improve your health
            </p>
          </div>

          {/* Health Score Hero */}
          <div ref={addToRefs} className="mb-12">
            <Card className="bg-gradient-to-br from-primary/10 to-blue-600/10 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="relative">
                  <Brain className="floating-icon h-16 w-16 text-primary mx-auto mb-4" />
                  <div className="text-6xl font-bold text-primary mb-2">{healthScore}</div>
                  <div className="text-2xl font-semibold mb-4">Health Score</div>
                  <Progress value={healthScore} className="w-full max-w-md mx-auto mb-4" />
                  <p className="text-muted-foreground">Based on your recent data and AI analysis</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div ref={addToRefs}>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="floating-icon h-6 w-6 mr-2 text-red-500 group-hover:scale-110 transition-transform" />
                    Cardiovascular Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Heart Rate</span>
                      <Badge variant="secondary">Excellent</Badge>
                    </div>
                    <Progress value={85} />
                    <p className="text-sm text-muted-foreground">
                      Your heart rate patterns show excellent cardiovascular fitness.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div ref={addToRefs}>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="floating-icon h-6 w-6 mr-2 text-green-500 group-hover:scale-110 transition-transform" />
                    Activity Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Weekly Goal</span>
                      <Badge variant="secondary">78%</Badge>
                    </div>
                    <Progress value={78} />
                    <p className="text-sm text-muted-foreground">
                      You're close to reaching your weekly activity target.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div ref={addToRefs}>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="floating-icon h-6 w-6 mr-2 text-blue-500 group-hover:scale-110 transition-transform" />
                    Health Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Improvement</span>
                      <Badge variant="secondary">+12%</Badge>
                    </div>
                    <Progress value={65} />
                    <p className="text-sm text-muted-foreground">
                      Your overall health has improved significantly this month.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI Recommendations */}
          <div ref={addToRefs}>
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="floating-icon h-6 w-6 mr-2 text-purple-500" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Target className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Sleep Optimization</h4>
                        <p className="text-sm text-muted-foreground">
                          Consider going to bed 30 minutes earlier to improve recovery.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Workout Schedule</h4>
                        <p className="text-sm text-muted-foreground">
                          Tuesday and Thursday are optimal for high-intensity training.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Bell className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Hydration Alert</h4>
                        <p className="text-sm text-muted-foreground">
                          Increase water intake by 20% based on your activity level.
                        </p>
                      </div>
                    </div>
                    <Button className="w-full">
                      Get Personalized Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HealthInsights;
