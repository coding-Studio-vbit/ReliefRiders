import axios from "axios";

export const fetchRequests = async (radius, token) => {

  if (navigator.geolocation) {
      console.log("hh");
    navigator.geolocation.getCurrentPosition(async(position) => {
        let data
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/rider/showFetchedRequests`,
        {
          latitude: coords.lat,
          longitude: coords.lng,
          maxDistance: radius,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (response.data.message.length === 0) {
        return {error:"No nearby requests found"};
      } else {
        data = response.data.message;
        for (let i = 0; i < data.length; i++) {
          data[i].distance = 0;
        }
        
      }
      return {coords,data}
      
    }

      
    );
    
    navigator.permissions.query({ name: "geolocation" }).then((res) => {
      if (res.state === "denied") {
        console.log("Location Permission denied");
        alert("Please allow location permission");
      }
    });
  }
  
  
    
  
}
