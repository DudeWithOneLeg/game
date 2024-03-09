import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useFBX, PerspectiveCamera, axesHelper, useAnimations, PointerLockControls, TrackballControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from 'three';

export function Avatar() {
  const { nodes, materials } = useGLTF("models/65e1707a3f080f9a6d9c3581.glb");
  const cameraRef = useRef(null);
  const charRef = useRef(null);
  const controlsRef = useRef(null);
  //const trackControlRef = useRef(null)
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [groupRotation, setGroupRotation] = useState([0, 0, 0]);
  const [groupPos, setGroupPos] = useState([0, 0, 0])
  const [camRotate, setCamRotate] = useState([.2, 3.1, 0]);
  const [camPos, setCamPos] = useState([0, 3, -4])
  const [key, setKey] = useState('')
  const [animation, setAnimation] = useState('')
  //console.log(position)
  //const [rx, ry, rz] = rotation;
  // useEffect(() => {
  // }, [px, py, pz]);
  // Load animations from FBX files
  const { animations: walking } = useFBX('animations/Walking.fbx');
  const { animations: standing } = useFBX('animations/Standing.fbx');

  walking[0].name = 'Walking'
  standing[0].name = 'Standing'
  // Extract animation data
  // const walkingAnimation = walkingFbx.animations;
  // const standingAnimation = standingFbx.animations;

  // Use animations
  const { actions } = useAnimations(walking, charRef);
  const { actions: standingActions } = useAnimations(standing, charRef);

  //console.log(standingActions)
  useFrame((camera) => {
    const [ x, y, z ] = charRef.current.position;
    const [ rx, ry, rz ] = charRef.current.rotation;
    const [ grx, gry, grz ] = groupRotation;
    const [ gpx, gpy, gpz ] = groupPos;
    const [ cx, cy, cz ] = cameraRef.current.position;
    if (charRef.current && cameraRef.current) {
      //console.log(camera)
      //setRotation([-1.5, 0, -cameraRef.current.rotation.y])
      //setGroupRotation([0, controlsRef.current.camera.rotation.z, 0])
      console.log(rx, ry, rz)
      console.log(cx, cy, cz)

      //cameraRef.current.lookAt(x, y, z)
      //cameraRef.current.rotateCamera(-cameraRef.current.rotation.x ,-cameraRef.current.rotation.y)

      //cameraRef.current.lookAt(x , y + 1, z + 1)
      //cameraRef.current.rotation.set(rx, ry, rz);
    }
    const handleKeyDown = (e) => {
      const currKey = e.key;
      setKey(currKey)
    };
    const handleKeyUp = (e) => {
      setKey('')
    }
    // setRotation([rx, ry, rz])

    if (key == "a") {
      //setPosition([px + .05 , py, pz])
      setGroupRotation([grx, gry + .01, grz])
      //setCamPos([cx + .01])
      //cameraRef.current.lookAt(x - .05 , y, z)
    };
    if (key == "d") {
      //setPosition([px - .05 , py, pz])
      setGroupRotation([grx, gry - .01, grz])
    };
    if (key == "s") setPosition([x, y, z - .05]);
    if (key == "w") {
      setPosition([x,y, z + .015])
    };
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);
    //setPosition([px, py, pz + .05])
    setCamPos([0, y + 3, z - 4 + (-rz)])
    cameraRef.current.lookAt(gpx - .05 , gpy + 1, gpz)
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };

  });

  useEffect(() => {
    const [ rx, ry, rz ] = charRef.current.rotation
    if (key == 'w') {
      setAnimation('Walking')
      setRotation([-1.5, ry, rz])
      //console.log(rotation)
    }
    if (key == '') {
      // actions['Walking'].reset().stop()
      setRotation([- 1.5, ry, rz])
      //')
      setAnimation('')

    }
  },[key])

  useEffect(() => {
    if (animation) {
      actions['Walking'].reset().play().fadeIn(0.5)
      standingActions.Standing.reset().stop().fadeOut(0.5)
      //console.log(walkingActions)
      //console.log(walking)
    }
    if (animation && key == '') {
      actions['Walking'].reset().fadeOut(0.5)
    }
  },[animation, key])

  useEffect(() => {
    const [ rx, ry, rz ] = charRef.current.rotation
    standingActions.Standing.reset().play().fadeIn(0.5)
    setRotation([- 1.5, ry, rz])

  },[])


  return (
    <group rotation={groupRotation} position={groupPos}>
      <PerspectiveCamera
      rotation={camRotate}
      position={camPos}
        camera={{ fov: 70 }}
        //position={position}
        ref={cameraRef}
        makeDefault
      />
      <PointerLockControls ref={controlsRef}/>
      {/* <TrackballControls /> */}
      {/* <OrbitControls target={position}/> */}
      <group dispose={null} ref={charRef} position={position} rotation={rotation}>
        <primitive object={nodes.Hips} />

        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <axesHelper />
      </group>
    </group>
  );
}

useGLTF.preload("models/65e1707a3f080f9a6d9c3581.glb");
