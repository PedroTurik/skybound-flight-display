
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plane, Calendar, MapPin, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    flightCode: '',
    departure: '',
    arrival: '',
    aircraft: '',
    departureDate: '',
    departureTime: '',
    passengerCount: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.flightCode || !formData.departure || !formData.arrival || !formData.departureDate) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Flight Registered Successfully!",
      description: `Flight ${formData.flightCode} has been registered. You will receive a confirmation email shortly.`,
    });

    // Reset form
    setFormData({
      flightCode: '',
      departure: '',
      arrival: '',
      aircraft: '',
      departureDate: '',
      departureTime: '',
      passengerCount: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      specialRequests: ''
    });
  };

  const aircraftOptions = [
    'Boeing 737-800',
    'Boeing 737-900',
    'Airbus A320',
    'Airbus A321',
    'Boeing 757-200',
    'Boeing 767-300',
    'Boeing 777-200',
    'Boeing 787-8',
    'Boeing 787-9',
    'Airbus A330-200',
    'Airbus A350-900'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Plane className="w-8 h-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Flight Registration</h1>
              <p className="text-blue-200">Register your flight with AeroManager</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" className="text-blue-800">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              Flight Registration Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="flightCode">Flight Code *</Label>
                    <Input
                      id="flightCode"
                      placeholder="e.g., AA1234"
                      value={formData.flightCode}
                      onChange={(e) => setFormData({...formData, flightCode: e.target.value.toUpperCase()})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="departure">Departure Airport *</Label>
                      <Input
                        id="departure"
                        placeholder="JFK"
                        value={formData.departure}
                        onChange={(e) => setFormData({...formData, departure: e.target.value.toUpperCase()})}
                        maxLength={3}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="arrival">Arrival Airport *</Label>
                      <Input
                        id="arrival"
                        placeholder="LAX"
                        value={formData.arrival}
                        onChange={(e) => setFormData({...formData, arrival: e.target.value.toUpperCase()})}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="aircraft">Aircraft Type</Label>
                    <Select value={formData.aircraft} onValueChange={(value) => setFormData({...formData, aircraft: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select aircraft type" />
                      </SelectTrigger>
                      <SelectContent>
                        {aircraftOptions.map((aircraft) => (
                          <SelectItem key={aircraft} value={aircraft}>
                            {aircraft}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="departureDate">Departure Date *</Label>
                      <Input
                        id="departureDate"
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="departureTime">Departure Time (UTC)</Label>
                      <Input
                        id="departureTime"
                        type="time"
                        value={formData.departureTime}
                        onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="passengerCount">Number of Passengers</Label>
                    <Input
                      id="passengerCount"
                      type="number"
                      placeholder="150"
                      value={formData.passengerCount}
                      onChange={(e) => setFormData({...formData, passengerCount: e.target.value})}
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Contact Information
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="contactName">Contact Name</Label>
                        <Input
                          id="contactName"
                          placeholder="John Doe"
                          value={formData.contactName}
                          onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="contactEmail">Email Address</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="contactPhone">Phone Number</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requirements, medical equipment, oversized luggage, etc."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-2">Important Information</h3>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Flight permit processing typically takes 24-48 hours</li>
                  <li>• You will receive email updates on your permit status</li>
                  <li>• Please ensure all flight details are accurate before submission</li>
                  <li>• Contact us immediately if any changes are needed after submission</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="w-full sm:w-auto">
                  <MapPin className="w-4 h-4 mr-2" />
                  Register Flight
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerRegistration;
