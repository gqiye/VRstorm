/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { GLTFResult } from "../types";
import { MirrorMaterial } from "./MirrorMaterial";
import { MirrorTexture } from "./MirrorTexture";

interface RoadProps {
  dropsRef?: React.MutableRefObject<THREE.Group>;
  splashRef?: React.MutableRefObject<THREE.Group>;
}

export function Road({ dropsRef, splashRef }: RoadProps) {
  const { nodes, materials } = useGLTF("/bicycle.glb") as GLTFResult;

  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const mirrorTexture = useMemo(
    () => new MirrorTexture(camera, size),
    [camera]
  );

  const mirrorRef = useRef<THREE.Mesh>(null!);

  useFrame(({ gl, scene, camera }) => {
    if (dropsRef.current) dropsRef.current.visible = false;
    if (splashRef.current) splashRef.current.visible = false;
    mirrorRef.current.visible = false;
    mirrorTexture.render(gl, scene, camera);
    mirrorRef.current.visible = true;
    if (dropsRef.current) dropsRef.current.visible = true;
    if (splashRef.current) splashRef.current.visible = true;
  });

  return (
    <group dispose={null}>
      <mesh
        ref={mirrorRef}
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        renderOrder={1}
      >
        <MirrorMaterial
          baseMaterial={materials.Road}
          renderTexture={mirrorTexture}
        />
      </mesh>
    </group>
  );
}