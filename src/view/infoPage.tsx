import { useState, useEffect } from 'react';
import Axios from 'axios'; // Import Axios or your preferred HTTP client
import '../styles/style.css'; // Import your custom CSS
import API_URL from '../config';

interface InfoItem {
  email: string;
  emailId: string;
  location: string;
  isRead: boolean;
}

function InfoPage() {
  // Define a state variable to store the fetched data
 const [infoData, setInfoData] = useState<InfoItem[]>([]);

  useEffect(() => {
    // Make a GET request to fetch data from the server
    Axios.get(`${API_URL}get-emails`)
      .then((response) => {
        // Handle successful response and store the data in state
        setInfoData(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, []); // The empty array [] ensures this effect runs once when the component mounts


  return (
    <div className="info-container">
      <h2 className="info-title">User Information</h2>
      {infoData.length > 0 ? (
        <div>
          {infoData.map((item, index) => (
            <div key={index} className="info-card">
              <p className="info-text">Email: {item.email}</p>
              <p className="info-text">Email ID: {item.emailId}</p>
              <p className="info-text">Location: {item.location}</p>
              <p className="info-text">Is Read: {item.isRead ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
}

export default InfoPage;
