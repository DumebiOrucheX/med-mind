
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { User, Stethoscope, ArrowLeft } from "lucide-react";

const SignUp = () => {
  const [userType, setUserType] = useState<"patient" | "professional" | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    specialization: "",
    licenseNumber: "",
    organization: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Signup data:", { userType, ...formData });
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Navigation />
        
        <div className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Join MedMind AI
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose your account type to get started
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Patient/User Card */}
              <Card 
                className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
                onClick={() => setUserType("patient")}
              >
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Patient / User</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Access AI health insights, connect with healthcare professionals, and manage your health journey.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                    <li>• AI-powered health assessments</li>
                    <li>• Book consultations with doctors</li>
                    <li>• Track health history and insights</li>
                    <li>• Personalized health recommendations</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-primary to-blue-600">
                    Sign Up as Patient
                  </Button>
                </CardContent>
              </Card>

              {/* Healthcare Professional Card */}
              <Card 
                className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
                onClick={() => setUserType("professional")}
              >
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Stethoscope className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Healthcare Professional</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Leverage AI tools to enhance patient care, manage consultations, and access advanced analytics.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                    <li>• Advanced AI diagnostic tools</li>
                    <li>• Patient management dashboard</li>
                    <li>• Telehealth consultations</li>
                    <li>• Professional analytics and insights</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-primary to-blue-600">
                    Sign Up as Professional
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <Button 
            variant="ghost" 
            onClick={() => setUserType(null)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to selection
          </Button>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {userType === "patient" ? "Patient Registration" : "Professional Registration"}
              </CardTitle>
              <p className="text-muted-foreground">
                Create your {userType === "patient" ? "patient" : "healthcare professional"} account
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {userType === "professional" && (
                  <>
                    <div>
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="e.g. Cardiology, Pediatrics"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="licenseNumber">Medical License Number</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="organization">Organization/Hospital</Label>
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-600">
                  Create Account
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
