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
  const gl = useThree((state) => state.gl);
  const size = useThree((state) => state.size);
  const xr = gl.xr;

  const mirrorTexture = useMemo(
    () => new MirrorTexture(camera, size),
    [camera]
  );

  const mirrorRef = useRef<THREE.Mesh>(null!);

  useFrame(({ gl, scene, camera, xr }) => {
    if (dropsRef.current) dropsRef.current.visible = false;
    if (splashRef.current) splashRef.current.visible = false;
    mirrorRef.current.visible = false;

    if (gl.xr.isPresenting) {
      const session = gl.xr.getSession();
      if (session) {
        const referenceSpace = gl.xr.getReferenceSpace();
        if (referenceSpace) {
          session.requestAnimationFrame((time, xrFrame) => {
            const pose = xrFrame.getViewerPose(referenceSpace);
            if (pose) {
              const baseLayer = session.renderState.baseLayer;
              if (baseLayer) {
                for (const view of pose.views) {
                  const viewport = baseLayer.getViewport(view);
                  if (viewport) {
                    gl.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
                    mirrorTexture.render(gl, scene, camera);
                  }
                }
              }
            }
          });
        }
      }
    } else {
      mirrorTexture.render(gl, scene, camera);
    }

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
