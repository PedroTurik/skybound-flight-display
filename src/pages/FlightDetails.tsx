
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Upload, Clock, AlertCircle } from "lucide-react";
import { sampleFlights } from "@/data/sampleFlights";
import { toast } from "@/hooks/use-toast";

const FlightDetails = () => {
  const { flightCode } = useParams();
  const flight = sampleFlights.find(f => f.code === flightCode);
  
  const [permitStatus, setPermitStatus] = useState(flight?.permitStatus || 'pending');
  const [metar, setMetar] = useState(flight?.metar || '');
  const [rotaer, setRotaer] = useState(flight?.rotaer || '');
  const [taf, setTaf] = useState(flight?.taf || '');
  const [specialInfo, setSpecialInfo] = useState(flight?.specialInfo || '');
  const [delayReason, setDelayReason] = useState('');

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Flight Not Found</h1>
          <p className="text-gray-600 mb-4">Flight {flightCode} could not be found.</p>
          <Link to="/fids">
            <Button>Back to FIDS</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    toast({
      title: "Flight Updated",
      description: `Flight ${flight.code} has been successfully updated.`,
    });
  };

  const handleDelay = () => {
    if (!delayReason.trim()) {
      toast({
        title: "Delay Reason Required",
        description: "Please provide a reason for the delay.",
        variant: "destructive",
      });
      return;
    }
    
    setPermitStatus('pending');
    toast({
      title: "Flight Delayed",
      description: `Flight ${flight.code} has been delayed. Permit status reset to pending.`,
    });
  };

  const handlePermitStatusChange = (value: string) => {
    setPermitStatus(value as 'pending' | 'processing' | 'done');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Plane className="w-8 h-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Flight Details - {flight.code}</h1>
              <p className="text-blue-200">
                {flight.route.departure} → {flight.route.arrival}
              </p>
            </div>
          </div>
          <Link to="/fids">
            <Button variant="outline" className="text-blue-800">
              Back to FIDS
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Flight Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Flight Code</Label>
                  <Input value={flight.code} disabled />
                </div>
                <div>
                  <Label>Aircraft</Label>
                  <Input value={flight.aircraft} disabled />
                </div>
                <div>
                  <Label>Departure</Label>
                  <Input value={flight.route.departure} disabled />
                </div>
                <div>
                  <Label>Arrival</Label>
                  <Input value={flight.route.arrival} disabled />
                </div>
                <div>
                  <Label>Departure Time (UTC)</Label>
                  <Input 
                    value={new Date(flight.departureTime).toISOString().slice(0, 16)} 
                    disabled 
                  />
                </div>
                <div>
                  <Label>Gate</Label>
                  <Input value={flight.gate || 'TBD'} disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permit Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Permit Status</Label>
                <Select value={permitStatus} onValueChange={handlePermitStatusChange}>
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
                <Label>Permit Documents</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop files here or click to upload</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Flight Delay Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                <h3 className="font-semibold text-amber-800">Delay Flight</h3>
              </div>
              <p className="text-sm text-amber-700 mb-4">
                Delaying a flight will reset the permit status to pending and require reprocessing.
              </p>
              <div className="space-y-3">
                <div>
                  <Label>Delay Reason</Label>
                  <Textarea
                    placeholder="Enter reason for delay (weather, maintenance, etc.)"
                    value={delayReason}
                    onChange={(e) => setDelayReason(e.target.value)}
                  />
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleDelay}
                  className="w-full md:w-auto"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Delay Flight
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>METAR</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Current meteorological report"
                value={metar}
                onChange={(e) => setMetar(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ROTAER</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Route and aerodrome information"
                value={rotaer}
                onChange={(e) => setRotaer(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TAF</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Terminal aerodrome forecast"
                value={taf}
                onChange={(e) => setTaf(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Special Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Additional information for customers"
              value={specialInfo}
              onChange={(e) => setSpecialInfo(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Link to="/fids">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
