
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  Stethoscope, 
  Calendar, 
  Activity,
  Clock,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const ActionContent = ({ action, Icon }: { action: any; Icon: any }) => (
  <>
    {action.urgent && (
      <div className="absolute top-2 right-2 flex items-center space-x-1">
        <Clock className="h-3 w-3" />
        <span className="text-xs font-medium">24/7</span>
      </div>
    )}
    
    <div className="p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
      <Icon className="h-6 w-6" />
    </div>
    
    <div className="text-center">
      <div className="font-semibold text-base">{action.title}</div>
      <div className="text-sm opacity-90">{action.subtitle}</div>
    </div>
  </>
);

export const QuickActions = () => {
  const quickActions = [
    {
      icon: MessageCircle,
      title: "Instant Consultation",
      subtitle: "Talk to AI now",
      color: "bg-blue-600 hover:bg-blue-700 text-white",
      urgent: true,
      link: "/ai-voice-consult"
    },
    {
      icon: Stethoscope,
      title: "Check Symptoms",
      subtitle: "AI symptom analysis",
      color: "bg-green-600 hover:bg-green-700 text-white",
      urgent: false
    },
    {
      icon: Calendar,
      title: "Book Appointment",
      subtitle: "Find nearby doctors",
      color: "bg-purple-600 hover:bg-purple-700 text-white",
      urgent: false
    },
    {
      icon: Activity,
      title: "Health Insights",
      subtitle: "Track your health",
      color: "bg-orange-600 hover:bg-orange-700 text-white",
      urgent: false
    }
  ];

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          How can we help you today?
        </h2>
        <p className="text-gray-600">
          Get instant access to healthcare services
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className={`${action.color} border-0 h-auto p-6 flex flex-col items-center space-y-3 relative overflow-hidden group`}
              asChild={!!action.link}
            >
              {action.link ? (
                <Link to={action.link}>
                  <ActionContent action={action} Icon={Icon} />
                </Link>
              ) : (
                <ActionContent action={action} Icon={Icon} />
              )}
            </Button>
          );
        })}
      </div>

      {/* Emergency Banner */}
      <Card className="mt-8 bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-red-800">Medical Emergency?</p>
                <p className="text-sm text-red-600">Call 911 immediately for life-threatening situations</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-100">
              Emergency Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
