import * as THREE from "three";

export interface CameraPose {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

export const ISO_POSE: CameraPose = {
  position: new THREE.Vector3(0, 9.5, 8.5),
  target: new THREE.Vector3(0, 0, 0),
};

export const TOPDOWN_POSE: CameraPose = {
  position: new THREE.Vector3(0, 12, 0.001),
  target: new THREE.Vector3(0, 0, 0),
};
