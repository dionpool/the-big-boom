import React from 'react';

function PlanetTwo({ attackTwoPosition }) {
   return (
      <div className="planet-two">
         <div className="pond-two"></div>
         {attackTwoPosition && <div className="attack" style={{ right: attackTwoPosition.x, top: attackTwoPosition.y }}></div>}
      </div>
   );
}

export default PlanetTwo;
