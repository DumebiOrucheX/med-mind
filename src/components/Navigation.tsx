import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Brain,
  Menu,
  X,
  Shield,
  User,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import ScrollToTopLink from "./ScrollToTopLink";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { label: "AI Consultation", href: "/ai-voice-consult" },
    { label: "Pricing", href: "/pricing" },
    { label: "Health Insights", href: "/health-insights" },
    { label: "About", href: "/#about" },
    { label: "Privacy Policy", href: "/policy" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <ScrollToTopLink
            to="/"
            className="flex items-center space-x-3 cursor-pointer max-[410px]:space-x-1 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center max-[410px]:w-8 max-[410px]:h-8">
                <Brain className="h-6 w-6 text-white max-[410px]:h-5 max-[410px]:w-5" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white max-[410px]:w-3 max-[410px]:h-3"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 max-[410px]:text-base group-hover:underline group-hover:decoration-blue-600 group-hover:underline-offset-4 transition-all">
                MedMind AI
              </h1>
              <Badge
                variant="outline"
                className="text-xs px-2 py-0 text-green-600 border-green-200 sm:text-sm max-[410px]:text-[10px] max-[410px]:px-1 max-[410px]:py-0.5 max-[410px]:leading-tight cursor-pointer group-hover:underline group-hover:decoration-green-600 group-hover:underline-offset-2 transition-all"
              >
                <Shield className="h-3 w-3 mr-1 sm:text-sm max-[410px]:h-2.5 max-[410px]:w-2.5" />
                HIPAA Compliant
              </Badge>
            </div>
          </ScrollToTopLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <ScrollToTopLink
                key={item.label}
                to={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 hover:underline decoration-blue-600 underline-offset-4"
              >
                {item.label}
              </ScrollToTopLink>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="hidden sm:inline-flex">
                <ScrollToTopLink to="/login">Sign In</ScrollToTopLink>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 max-[410px]:py-1 max-[410px]:px-2 max-[410px]:text-xs max-[360px]:hidden">
                <ScrollToTopLink to="/signup">Get Started</ScrollToTopLink>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <ScrollToTopLink
                  key={item.label}
                  to={item.href}
                  className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </ScrollToTopLink>
              ))}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 px-4 pt-3 border-t border-gray-200 sm:px-1">
                  <ScrollToTopLink to="/login" className="w-full">
                    <Button variant="ghost" className="w-full py-2 text-sm">
                      Sign In
                    </Button>
                  </ScrollToTopLink>
                  <ScrollToTopLink to="/signup" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-2 max-[410px]:py-1 max-[410px]:text-xs">
                      Get Started
                    </Button>
                  </ScrollToTopLink>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
