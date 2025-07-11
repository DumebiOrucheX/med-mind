
import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, User, Download, Search, Filter } from "lucide-react";
import { gsap } from "gsap";

const History = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate timeline items
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(item,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            scale: 0.8
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.2
          }
        );
      }
    });

    // Animate timeline line
    if (timelineRef.current) {
      gsap.fromTo(timelineRef.current.querySelector('.timeline-line'),
        { scaleY: 0 },
        { scaleY: 1, duration: 2, ease: "power2.out", delay: 0.5 }
      );
    }
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const historyItems = [
    {
      date: "Today",
      type: "Health Assessment",
      description: "AI-powered health check completed",
      status: "completed",
      icon: FileText
    },
    {
      date: "Yesterday",
      type: "Consultation",
      description: "Video call with Dr. Sarah Johnson",
      status: "completed",
      icon: User
    },
    {
      date: "3 days ago",
      type: "Lab Results",
      description: "Blood work analysis received",
      status: "reviewed",
      icon: FileText
    },
    {
      date: "1 week ago",
      type: "Assessment",
      description: "Weekly AI health evaluation",
      status: "completed",
      icon: FileText
    },
    {
      date: "2 weeks ago",
      type: "Consultation",
      description: "Follow-up with Dr. Michael Chen",
      status: "completed",
      icon: User
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Health History
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your health journey and previous consultations
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            <div className="timeline-line absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-primary to-transparent transform origin-top"></div>
            
            <div className="space-y-8">
              {historyItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} ref={addToRefs} className="relative">
                    <Card className="ml-20 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 group">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <IconComponent className="h-5 w-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                            {item.type}
                          </CardTitle>
                          <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.date}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background group-hover:scale-125 transition-transform"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
