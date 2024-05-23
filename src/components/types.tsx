import * as THREE from "three";
import { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  nodes: {
    Circle: THREE.Mesh;
    Circle002: THREE.Mesh;
    Esportsm_RailGuard_Ext_13_Dup_42_lambert2_0001: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_3001: THREE.Mesh;
    smallrock2_smallrocks_0: THREE.Mesh;
    polySurface7_Traffic_Signs_0001: THREE.Mesh;
  };
  materials: {
    Grass: THREE.MeshStandardMaterial;
    Road: THREE.MeshStandardMaterial;
    lambert2: THREE.MeshStandardMaterial;
    initialShadingGroup: THREE.MeshStandardMaterial;
    bike_bulb: THREE.MeshStandardMaterial;
    smallrocks: THREE.MeshStandardMaterial;
    Traffic_Signs: THREE.MeshStandardMaterial;
  };
};
