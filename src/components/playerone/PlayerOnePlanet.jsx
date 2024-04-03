import React from 'react';

function PlayerOnePlanet({ attackPosition }) {
   return (
      <div className="planet-one">
         <div className="pond-one"></div>
         {attackPosition && <div className="attack" style={{left: attackPosition.x, top: attackPosition.y}}></div>}
      </div>
   );
}

export default PlayerOnePlanet;
