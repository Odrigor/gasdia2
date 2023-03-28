import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadModules } from 'esri-loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VisualizarPedidos = () => {
  const [dias, setDias] = useState('');
  const [data, setData] = useState([]);
  const [mapType, setMapType] = useState(null);

  const uri = import.meta.env.VITE_BACKEND_URL;

  const handleInputChange = (event) => {
    setDias(event.target.value);
  };

  const handleButtonClick = (type) => {
    if (!dias) {
      toast.error('Es necesario especificar una cantidad de dias');
      return;
    }

    axios.get(uri+`/api/positions/${dias}`)
      .then((response) => {
        setData(response.data);
        setMapType(type);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (mapType === 'points') {
      createMap();
    }
  }, [mapType]);

  const createMap = () => {
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/layers/GraphicsLayer'], { css: true })
      .then(([Map, MapView, Graphic, GraphicsLayer]) => {
        const map = new Map({
          basemap: 'hybrid'
        });

        const view = new MapView({
          container: 'map',
          map: map,
          center: [-70.6506, -33.4372],
          zoom: 12
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        data.forEach((pedido) => {
          const point = {
            type: 'point',
            longitude: pedido.longitud_pedido,
            latitude: pedido.latitud_pedido
          };

          const simpleMarkerSymbol = {
            type: 'simple-marker',
            color: [226, 119, 40],
            outline: {
              color: [255, 255, 255],
              width: 1
            }
          };

          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol
          });

          graphicsLayer.add(pointGraphic);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <button onClick={() => handleButtonClick('points')}>Generar mapa de puntos</button>
      <div id="map" style={{ width: '80%', height: '500px' }}></div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default VisualizarPedidos;