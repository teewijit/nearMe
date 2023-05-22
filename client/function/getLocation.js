import { useEffect, useState } from "react";

const getLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null
  });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation({
        ...location,
        error: {
          code: 0,
          message: "Geolocation not supported"
        }
      });
      return;
    }

    const onSuccess = (location) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        },
        error: null
      });
    };

    const onError = (error) => {
      setLocation({
        ...location,
        error
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [location]);

  return location;
};

export default getLocation;
