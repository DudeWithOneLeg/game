import React, { useRef, useState, useEffect } from "react";
import Ground from "./Ground";
import { Avatar } from "../Avatar";

export default function World() {

  return (
    <group>
      {/* <axesHelper /> */}
      <group >
        {/* <group position={position}> */}

          <Avatar />


            <directionalLight
              position={[5, 5, -8]}
              castShadow
              intensity={5}
              shadow-mapSize={2048}
              shadow-bias={-0.001}
            />

          {/* </PerspectiveCamera> */}
        {/* </group> */}
      </group>
        <Ground />
    </group>
  );
}
