
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, MapPin, Clock, CheckCircle, AlertCircle, Cloud, Navigation, Radio } from "lucide-react";
import { sampleFlights } from "@/data/sampleFlights";

const BoardingPass = () => {
  const { flightCode } = useParams();
  const flight = sampleFlights.find(f => f.code === flightCode);

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Flight Not Found</h1>
            <p className="text-gray-600 mb-6">Flight {flightCode} could not be found in our system.</p>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getPermitStatusInfo = (status: string) => {
    switch (status) {
      case 'done':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', text: 'Approved' };
      case 'processing':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Processing' };
      case 'pending':
        return { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', text: 'Pending' };
      default:
        return { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100', text: 'Unknown' };
    }
  };

  const permitInfo = getPermitStatusInfo(flight.permitStatus);
  const PermitIcon = permitInfo.icon;

  const departureTime = new Date(flight.departureTime);
  const timeUntilDeparture = Math.floor((departureTime.getTime() - Date.now()) / (1000 * 60));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-white">
              <Plane className="w-8 h-8 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">AeroManager</h1>
                <p className="text-blue-200">Digital Flight Information</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Boarding Pass Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl bg-gradient-to-r from-white to-blue-50">
            <CardContent className="p-0">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Flight {flight.code}</h2>
                    <p className="text-blue-100">Digital Flight Information</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {flight.route.departure} → {flight.route.arrival}
                    </div>
                    <div className="text-blue-100">
                      {timeUntilDeparture > 0 ? `Departing in ${Math.floor(timeUntilDeparture / 60)}h ${timeUntilDeparture % 60}m` : 'Departed'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Flight Information */}
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Flight Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      Flight Details
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Aircraft:</span>
                        <span className="font-semibold">{flight.aircraft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gate:</span>
                        <span className="font-semibold">{flight.gate || 'TBD'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Terminal:</span>
                        <span className="font-semibold">{flight.terminal || 'TBD'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Passengers:</span>
                        <span className="font-semibold">{flight.passengerCount || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Schedule
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-gray-600 text-sm">Departure Time (UTC)</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {departureTime.toISOString().slice(11, 16)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {departureTime.toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Local Time</div>
                        <div className="font-semibold">
                          {departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Permit Status */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                      Flight Permit
                    </h3>
                    
                    <div className={`p-4 rounded-lg ${permitInfo.bg}`}>
                      <div className="flex items-center mb-2">
                        <PermitIcon className={`w-6 h-6 mr-2 ${permitInfo.color}`} />
                        <span className="font-semibold text-lg">{permitInfo.text}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {flight.permitStatus === 'done' && 'Your flight permit has been approved and is ready for departure.'}
                        {flight.permitStatus === 'processing' && 'Your flight permit is currently being processed by our team.'}
                        {flight.permitStatus === 'pending' && 'Your flight permit is pending review. We will update you soon.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather and Navigation Information */}
              {(flight.metar || flight.rotaer || flight.taf) && (
                <div className="bg-gray-50 p-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Weather & Navigation Information</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {flight.metar && (
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Cloud className="w-4 h-4 mr-2 text-blue-600" />
                            METAR
                          </h4>
                          <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                            {flight.metar}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                    
                    {flight.rotaer && (
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Navigation className="w-4 h-4 mr-2 text-blue-600" />
                            ROTAER
                          </h4>
                          <p className="text-sm bg-gray-100 p-2 rounded">
                            {flight.rotaer}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                    
                    {flight.taf && (
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Radio className="w-4 h-4 mr-2 text-blue-600" />
                            TAF
                          </h4>
                          <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                            {flight.taf}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p>For assistance, contact AeroManager support</p>
                    <p className="text-blue-200">This is a digital flight information display</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{flight.code}</div>
                    <div className="text-sm text-blue-200">Flight Code</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Updates */}
          {timeUntilDeparture <= 60 && timeUntilDeparture > 0 && (
            <Card className="mt-6 border-amber-300 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center text-amber-800">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Departure Alert:</span>
                  <span className="ml-2">Your flight is departing soon. Please proceed to the gate.</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardingPass;
