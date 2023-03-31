import axios from "axios";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
// import img from "./icon/taxi-svgrepo-com.svg";

function App() {
  const [branches, setBranches] = useState([]);
  const getAllBranch = async () => {
    try {
      const result = await axios.get("http://localhost:8001/restaurants");
      console.log(result);
      setBranches(result.data.message);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const getNearBranch = async () => {
    console.log("NEAR");
    try {
      const result = await axios.post(
        "http://localhost:8001/restaurants/near?distance=200",
        {
          lat: 47.92394060040875,
          lon: 106.93371541130081,
        }
      );
      setBranches(result.data.branches);
    } catch (err) {
      console.log("ERR", err);
    }
  };

  return (
    <div className="App">
      <h1>MAP</h1>
      <div>
        <button onClick={getAllBranch}>All locations</button>
        <button onClick={getNearBranch}>Өгөгдсөн зайд ойрыг харуулах</button>
      </div>
      <div>
        <MapContainer
          center={[47.92379, 106.93394]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "90vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[47.92379, 106.93394]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {branches.length > 0 &&
            branches.map((r, index) => (
              <Marker
                key={index}
                position={[
                  r.location.coordinates[1],
                  r.location.coordinates[0],
                ]}
              >
                {console.log("asd", r)}
                <Popup>{r.name}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
