
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Monitor, UserPlus, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AeroManager</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive aviation management system for flight operations, permits, and customer services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="w-5 h-5 mr-2 text-blue-600" />
                FIDS Dashboard
              </CardTitle>
              <CardDescription>
                Flight Information Display System for operators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/fids">
                <Button className="w-full">Access FIDS</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-green-600" />
                Customer Registration
              </CardTitle>
              <CardDescription>
                Register your flight with our system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/register">
                <Button variant="outline" className="w-full">Register Flight</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-orange-600" />
                Operator Panel
              </CardTitle>
              <CardDescription>
                Flight registration and management tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/operator/register">
                <Button variant="outline" className="w-full">Operator Access</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sample Boarding Pass</h2>
          <p className="text-gray-600 mb-6">View a demo of our beautiful boarding pass interface</p>
          <Link to="/boarding/AA1234">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View Sample Boarding Pass
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
