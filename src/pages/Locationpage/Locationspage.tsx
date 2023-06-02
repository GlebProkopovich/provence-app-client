import { FC, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { IPosition } from '../../types';
import 'leaflet/dist/leaflet.css';
import './Locationpage.scss';

const Locationspage: FC<IPosition> = ({
  position,
  locationOfTheRestaurant,
  adressOfTheRestaurant,
}) => {
  const zoom = 17;

  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    const L = require('leaflet');

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }, []);

  function handleMarkerPositionChanged(newPosition: [number, number]): void {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    map.setView(newPosition, map.getZoom());
  }

  handleMarkerPositionChanged(position);

  return (
    <div className="map-container">
      <div className="map-subcontainer">
        <h2>the location of the restaurant in {locationOfTheRestaurant}</h2>
        <MapContainer center={position} zoom={zoom} ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} draggable={true}>
            <Popup>Provence</Popup>
          </Marker>
        </MapContainer>
        <h4>{adressOfTheRestaurant}</h4>
      </div>
    </div>
  );
};

export default Locationspage;
