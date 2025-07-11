
import { useState, useEffect } from "react";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";
import { ProfessionalDashboard } from "@/components/dashboard/ProfessionalDashboard";
import { Navigation } from "@/components/Navigation";

const Dashboard = () => {
  const [userType, setUserType] = useState<"patient" | "professional">("patient");

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as "patient" | "professional";
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />
      
      <div className="pt-20">
        {userType === "patient" ? <PatientDashboard /> : <ProfessionalDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
