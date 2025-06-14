
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, AlertTriangle, CheckCircle, XCircle, Monitor } from "lucide-react";
import { sampleFlights } from "@/data/sampleFlights";
import { Flight } from "@/types/flight";

const FIDS = () => {
  const [flights, setFlights] = useState<Flight[]>(sampleFlights);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExternalWindowOpen, setIsExternalWindowOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if external window exists
    const checkExternalWindow = () => {
      const hasExternalWindow = localStorage.getItem('fids-external-window') === 'true';
      setIsExternalWindowOpen(hasExternalWindow);
    };

    checkExternalWindow();
    
    // Listen for storage changes to detect when external window opens/closes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'fids-external-window') {
        checkExternalWindow();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case storage events don't fire
    const intervalCheck = setInterval(checkExternalWindow, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalCheck);
    };
  }, []);

  const openFIDSWindow = () => {
    const newWindow = window.open(
      '/fids?external=true',
      'FIDS_Display',
      'width=1200,height=800,toolbar=no,menubar=no,scrollbars=yes,resizable=yes'
    );

    if (newWindow) {
      localStorage.setItem('fids-external-window', 'true');
      setIsExternalWindowOpen(true);

      // Listen for when the window is closed
      const checkClosed = setInterval(() => {
        if (newWindow.closed) {
          localStorage.removeItem('fids-external-window');
          setIsExternalWindowOpen(false);
          clearInterval(checkClosed);
        }
      }, 1000);
    }
  };

  const getTimeUntilDeparture = (departureTime: string) => {
    const departure = new Date(departureTime);
    const diffMs = departure.getTime() - currentTime.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 0) return "DEPARTED";
    if (diffMinutes < 60) return `${diffMinutes}m`;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const shouldBlink = (flight: Flight) => {
    const departure = new Date(flight.departureTime);
    const diffMs = departure.getTime() - currentTime.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    // Blink if takeoff is in 1 hour and status isn't done, or if takeoff is arriving (within 30 minutes)
    return (diffMinutes <= 60 && flight.permitStatus !== 'done') || 
           (diffMinutes <= 30 && diffMinutes > 0);
  };

  const getPermitStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'pending':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPermitStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Sort flights by time until departure
  const sortedFlights = [...flights].sort((a, b) => {
    return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
  });

  // Check if this is an external window
  const isExternalWindow = new URLSearchParams(window.location.search).get('external') === 'true';

  // If this is an external window, mark it in localStorage
  useEffect(() => {
    if (isExternalWindow) {
      localStorage.setItem('fids-external-window', 'true');
      
      // Clean up when window closes
      const handleBeforeUnload = () => {
        localStorage.removeItem('fids-external-window');
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [isExternalWindow]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Plane className="w-8 h-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">
                Flight Information Display System
                {isExternalWindow && " - External Display"}
              </h1>
              <p className="text-blue-200">
                Current Time (UTC): {currentTime.toISOString().slice(11, 19)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isExternalWindow && !isExternalWindowOpen && (
              <Button 
                onClick={openFIDSWindow}
                variant="outline" 
                className="text-blue-800"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Open in New Window
              </Button>
            )}
            {!isExternalWindow && (
              <Link to="/">
                <Button variant="outline" className="text-blue-800">
                  Back to Home
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {!isExternalWindow && isExternalWindowOpen ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
              <CardContent className="p-8 text-center">
                <Monitor className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h2 className="text-2xl font-bold mb-2">FIDS Open in External Window</h2>
                <p className="text-gray-600">
                  The Flight Information Display System is currently running in a separate window for secondary monitor display.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                    Status Legend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Permit Done</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                      <span>Permit Processing</span>
                    </div>
                    <div className="flex items-center">
                      <XCircle className="w-4 h-4 text-red-600 mr-2" />
                      <span>Permit Pending</span>
                    </div>
                    <div className="ml-8 text-sm text-gray-600">
                      * Blinking rows indicate urgent attention required
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              {sortedFlights.map((flight) => (
                <Card
                  key={flight.code}
                  className={`transition-all duration-500 ${
                    shouldBlink(flight) 
                      ? 'animate-pulse bg-amber-50 border-amber-300 shadow-md' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="font-bold text-lg text-blue-800">
                        {isExternalWindow ? (
                          flight.code
                        ) : (
                          <Link 
                            to={`/flight/${flight.code}`}
                            className="hover:underline"
                          >
                            {flight.code}
                          </Link>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Route</div>
                        <div className="font-semibold">
                          {flight.route.departure} → {flight.route.arrival}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Departure (UTC)</div>
                        <div className="font-semibold">
                          {new Date(flight.departureTime).toISOString().slice(11, 16)}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Time to Departure</div>
                        <div className="font-semibold text-blue-600">
                          {getTimeUntilDeparture(flight.departureTime)}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Permit Status</div>
                        <Badge className={getPermitStatusColor(flight.permitStatus)}>
                          <span className="flex items-center">
                            {getPermitStatusIcon(flight.permitStatus)}
                            <span className="ml-1 capitalize">{flight.permitStatus}</span>
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Gate</div>
                        <div className="font-semibold">{flight.gate || 'TBD'}</div>
                      </div>
                    </div>
                    
                    {shouldBlink(flight) && (
                      <div className="mt-2 p-2 bg-amber-100 rounded-md">
                        <div className="flex items-center text-amber-800 text-sm">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          {getTimeUntilDeparture(flight.departureTime).includes('m') && 
                           parseInt(getTimeUntilDeparture(flight.departureTime)) <= 60 && 
                           flight.permitStatus !== 'done' 
                            ? 'URGENT: Flight departing within 1 hour - Permit not complete!'
                            : 'ATTENTION: Flight approaching departure time'
                          }
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FIDS;
