import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
    const [listings, setListings] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5063/api/Listings').then(response => {
            setListings(response.data);
        })
    },[])


  return (
      <div className="App">
          <Header as='h2' icon='users' content='Listings' />
          <List divided relaxed>
              {listings.map((listing: any) => (
                  <List.Item key={listing.id}>
                      {listing.address}
                  </List.Item>
              ))}
          </List>
              

    </div>
  );
}

export default App;
