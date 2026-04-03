import { useState } from 'react';
import './App.css';
import townMap      from './assets/town-map.png';
import IntroScene   from './components/IntroScene/IntroScene';
import MapScene     from './components/MapScene/MapScene';
import MissionScene from './components/MissionScene/MissionScene';

const SCENES = ['intro', 'map', 'mission', 'success'];

function App() {
  const [scene, setScene] = useState('intro');

  const next = () => {
    setScene(prev => {
      const idx = SCENES.indexOf(prev);
      return SCENES[idx + 1] ?? prev;
    });
  };

  return (
    <div id="tablet-frame">
      <div className="map-container" style={{ backgroundImage: `url(${townMap})` }} />

      {scene === 'intro'   && <IntroScene   onComplete={next} />}
      {scene === 'map'     && <MapScene     onComplete={next} />}
      {scene === 'mission' && <MissionScene onComplete={next} />}
    </div>
  );
}

export default App;
