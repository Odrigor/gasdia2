import React, { useState } from "react";
import axios from "axios";
import { loadModules } from 'esri-loader';

const VisualizarPedidos = () => {
  const [diasVentas, setDiasVentas] = useState(0);
  const [pedidosVentas, setPedidosVentas] = useState([]);

  const handleGenerarMapa = () => {
    axios.get(`http://localhost:3000/api/positions/${diasVentas}`)
      .then(res => {
        setPedidosVentas(res.data);

        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/GraphicsLayer', 'esri/Graphic', 'esri/renderers/HeatmapRenderer'])
          .then(([Map, MapView, GraphicsLayer, Graphic, HeatmapRenderer]) => {
            const map = new Map({
              basemap: 'streets-navigation-vector'
            });

            const view = new MapView({
              container: 'map',
              map: map,
              center: [-70.6506, -33.4372],
              zoom: 12
            });

            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);

            res.data.forEach(pedido => {
              const point = {
                type: 'point',
                longitude: pedido.longitud_pedido,
                latitude: pedido.latitud_pedido
              };

              const pointGraphic = new Graphic({
                geometry: point
              });

              graphicsLayer.add(pointGraphic);
            });

            const heatmapRenderer = new HeatmapRenderer({
              field: 'fieldName',
              blurRadius: 10,
              maxPixelIntensity: 25,
              minPixelIntensity: 0
            });

            graphicsLayer.renderer = heatmapRenderer;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  return (
    <>
      <div>
        <label htmlFor="diasVentas">Días:</label>
        <input type="number" id="diasVentas" value={diasVentas} onChange={(event) => setDiasVentas(event.target.value)} />
        <button onClick={handleGenerarMapa}>Generar Mapa</button>
      </div>

      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </>
  );
};

export default VisualizarPedidos;