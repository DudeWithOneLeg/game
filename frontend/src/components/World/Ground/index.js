import { DoubleSide } from "three";
import {axesHelper} from '@react-three/drei'

export default function Ground() {
  const arr = []
  for (let i = 0; i < 400; i++) {
    arr.push(i)
  }
  return (
    <>
    {
      true && arr.map((value, i) => {
        return <mesh rotation={[Math.PI / -2, 0, 0]} position={[0, 0, i]}>
        {/* <planeBufferGeometry attach="geometry" args={[25, 15]} /> */}
        <planeGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={i % 2 == 0 ? 'green' : 'blue'} side={DoubleSide}/>
      {/* <axesHelper/> */}
      </mesh>
      })
    }
    </>
  );
}
