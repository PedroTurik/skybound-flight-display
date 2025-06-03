
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plane, Settings, Upload, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OperatorRegistration = () => {
  const [formData, setFormData] = useState({
    flightCode: '',
    departure: '',
    arrival: '',
    aircraft: '',
    departureDate: '',
    departureTime: '',
    gate: '',
    terminal: '',
    passengerCount: '',
    permitStatus: 'pending',
    priority: 'normal',
    operatorNotes: '',
    metar: '',
    rotaer: '',
    taf: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.flightCode || !formData.departure || !formData.arrival || !formData.departureDate) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Flight Created Successfully!",
      description: `Flight ${formData.flightCode} has been added to the system.`,
    });

    // Reset form
    setFormData({
      flightCode: '',
      departure: '',
      arrival: '',
      aircraft: '',
      departureDate: '',
      departureTime: '',
      gate: '',
      terminal: '',
      passengerCount: '',
      permitStatus: 'pending',
      priority: 'normal',
      operatorNotes: '',
      metar: '',
      rotaer: '',
      taf: ''
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Operator Flight Registration</h1>
              <p className="text-blue-200">Administrative flight creation and management</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link to="/fids">
              <Button variant="outline" className="text-blue-800">
                View FIDS
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="text-blue-800">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-6xl">
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Plane className="w-6 h-6 mr-2 text-blue-600" />
              Create New Flight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Basic Flight Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Flight Details
                  </h3>
                  
                  <div>
                    <Label htmlFor="flightCode">Flight Code *</Label>
                    <Input
                      id="flightCode"
                      placeholder="AA1234"
                      value={formData.flightCode}
                      onChange={(e) => setFormData({...formData, flightCode: e.target.value.toUpperCase()})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="departure">Departure *</Label>
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
                      <Label htmlFor="arrival">Arrival *</Label>
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
                        <SelectValue placeholder="Select aircraft" />
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
                      <Label htmlFor="departureDate">Date *</Label>
                      <Input
                        id="departureDate"
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="departureTime">Time (UTC)</Label>
                      <Input
                        id="departureTime"
                        type="time"
                        value={formData.departureTime}
                        onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Operational Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Operations
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="gate">Gate</Label>
                      <Input
                        id="gate"
                        placeholder="A12"
                        value={formData.gate}
                        onChange={(e) => setFormData({...formData, gate: e.target.value.toUpperCase()})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="terminal">Terminal</Label>
                      <Input
                        id="terminal"
                        placeholder="1"
                        value={formData.terminal}
                        onChange={(e) => setFormData({...formData, terminal: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="passengerCount">Passengers</Label>
                    <Input
                      id="passengerCount"
                      type="number"
                      placeholder="150"
                      value={formData.passengerCount}
                      onChange={(e) => setFormData({...formData, passengerCount: e.target.value})}
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="permitStatus">Permit Status</Label>
                    <Select value={formData.permitStatus} onValueChange={(value) => setFormData({...formData, permitStatus: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="operatorNotes">Operator Notes</Label>
                    <Textarea
                      id="operatorNotes"
                      placeholder="Internal notes for operations team"
                      value={formData.operatorNotes}
                      onChange={(e) => setFormData({...formData, operatorNotes: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Weather and Navigation Data */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Weather & Navigation
                  </h3>

                  <div>
                    <Label htmlFor="metar">METAR</Label>
                    <Textarea
                      id="metar"
                      placeholder="Current meteorological report"
                      value={formData.metar}
                      onChange={(e) => setFormData({...formData, metar: e.target.value})}
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rotaer">ROTAER</Label>
                    <Textarea
                      id="rotaer"
                      placeholder="Route and aerodrome information"
                      value={formData.rotaer}
                      onChange={(e) => setFormData({...formData, rotaer: e.target.value})}
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="taf">TAF</Label>
                    <Textarea
                      id="taf"
                      placeholder="Terminal aerodrome forecast"
                      value={formData.taf}
                      onChange={(e) => setFormData({...formData, taf: e.target.value})}
                      rows={2}
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Label className="flex items-center mb-2">
                      <Upload className="w-4 h-4 mr-2" />
                      Flight Documents
                    </Label>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 text-center">
                      <p className="text-sm text-blue-600">Upload permits, charts, and other documents</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Auto-assign gate</Badge>
                  <Badge variant="outline">Generate permit request</Badge>
                  <Badge variant="outline">Notify ATC</Badge>
                  <Badge variant="outline">Schedule crew briefing</Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="w-full sm:w-auto">
                  Create Flight
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperatorRegistration;
