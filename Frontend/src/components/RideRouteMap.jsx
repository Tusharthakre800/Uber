import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const RideRouteMap = ({ pickup, destination, pickupCoords, destinationCoords }) => {
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [captainLocation, setCaptainLocation] = useState(null);

  const watchIdRef = useRef(null);

  /* ---------- Route Calculation ---------- */
  const calculateRoute = useCallback(() => {
    if (!mapLoaded || !window.google || !window.google.maps) return;

    const hasOrigin = pickup || pickupCoords;
    const hasDest = destination || destinationCoords;
    if (!hasOrigin || !hasDest) {
      setLoading(false);
      return;
    }

    const origin = pickupCoords
      ? new window.google.maps.LatLng(parseFloat(pickupCoords.lat), parseFloat(pickupCoords.lng))
      : pickup;
    const dest = destinationCoords
      ? new window.google.maps.LatLng(parseFloat(destinationCoords.lat), parseFloat(destinationCoords.lng))
      : destination;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination: dest,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(`Route calculation failed: ${status}`);
        }
        setLoading(false);
      }
    );
  }, [pickup, destination, pickupCoords, destinationCoords, mapLoaded]);

  /* ---------- Live Tracking ---------- */
  const startLiveTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setCaptainLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => setError('Unable to access location'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );
    watchIdRef.current = id;
  }, []);

  const stopLiveTracking = useCallback(() => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  /* ---------- Effects ---------- */
  // Effect 1: Route calculation
  useEffect(() => {
    if (mapLoaded) calculateRoute();
  }, [mapLoaded, calculateRoute]);

  // Effect 2: Live tracking
  useEffect(() => {
    if (mapLoaded) {
      startLiveTracking();
      return () => stopLiveTracking();
    }
  }, [mapLoaded, startLiveTracking, stopLiveTracking]);

  /* ---------- Memoized Helpers ---------- */
  const mapCenter = useMemo(() => {
    if (captainLocation) return captainLocation;
    if (directions?.routes[0]) {
      const b = directions.routes[0].bounds;
      return {
        lat: (b.getNorthEast().lat() + b.getSouthWest().lat()) / 2,
        lng: (b.getNorthEast().lng() + b.getSouthWest().lng()) / 2,
      };
    }
    if (pickupCoords) {
      return { lat: parseFloat(pickupCoords.lat), lng: parseFloat(pickupCoords.lng) };
    }
    return { lat: 28.7041, lng: 77.1025 }; // Delhi fallback
  }, [captainLocation, directions, pickupCoords]);

  const pickupMarkerIcon = useMemo(() => 
    window.google && window.google.maps ? {
      url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      scaledSize: new window.google.maps.Size(40, 40),
    } : null, [mapLoaded]);
  
  const destMarkerIcon = useMemo(() => 
    window.google && window.google.maps ? {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new window.google.maps.Size(40, 40),
    } : null, [mapLoaded]);
  
  const captainMarkerIcon = useMemo(() => 
    window.google && window.google.maps ? {
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      scaledSize: new window.google.maps.Size(35, 35),
    } : null, [mapLoaded]);

  /* ---------- Map Load Handlers ---------- */
  const handleLoad = useCallback(() => setMapLoaded(true), []);
  const handleError = useCallback(() => {
    setError('Failed to load Google Maps');
    setLoading(false);
  }, []);

  /* ---------- Render ---------- */
  if (error && !directions) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <div className="text-red-500 text-lg mb-2">⚠️ {error}</div>
          <div className="text-sm text-gray-600">Showing locations without route</div>
        </div>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
      onLoad={handleLoad}
      onError={handleError}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={14}
        options={{
          gestureHandling: 'greedy',
          disableDefaultUI: false,
          scrollwheel: true,
          draggable: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: { strokeColor: '#1976D2', strokeWeight: 6, strokeOpacity: 0.9 },
              suppressMarkers: false,
              preserveViewport: false,
            }}
          />
        )}

        {pickupCoords && pickupMarkerIcon && (
          <Marker
            position={{ lat: parseFloat(pickupCoords.lat), lng: parseFloat(pickupCoords.lng) }}
            label="P"
            title="Pickup Location"
            icon={pickupMarkerIcon}
          />
        )}

        {destinationCoords && destMarkerIcon && (
          <Marker
            position={{ lat: parseFloat(destinationCoords.lat), lng: parseFloat(destinationCoords.lng) }}
            label="D"
            title="Destination"
            icon={destMarkerIcon}
          />
        )}

        {captainLocation && captainMarkerIcon && (
          <Marker
            position={captainLocation}
            label="C"
            title="Captain Location"
            icon={captainMarkerIcon}
            animation={window.google && window.google.maps ? window.google.maps.Animation.DROP : undefined}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default RideRouteMap;