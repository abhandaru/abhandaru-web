import React, { useRef } from 'react'
import { extend, useFrame, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const Controls = () => {
  const controls = useRef()
  const { camera, gl } = useThree()
  const maxPolar = Math.PI / 2 - 0.1;
  useFrame(() => controls.current.update())
  return (
    <orbitControls
      ref={controls}
      autoRotate
      autoRotateSpeed={0.2}
      args={[camera, gl.domElement]}
      maxPolarAngle={maxPolar}
      maxDistance={50}
      minDistance={3}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  )
};

export default Controls;
