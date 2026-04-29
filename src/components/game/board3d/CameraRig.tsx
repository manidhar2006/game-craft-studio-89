import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ISO_POSE, TOPDOWN_POSE } from "./CameraStates";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface Props {
  topDown: boolean;
}

export function CameraRig({ topDown }: Props) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const animatingRef = useRef(false);
  const savedIsoRef = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);

  useEffect(() => {
    camera.position.copy(ISO_POSE.position);
    camera.lookAt(ISO_POSE.target);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 32;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (topDown) {
      // capture current iso pose so we can return to it
      savedIsoRef.current = {
        position: camera.position.clone(),
        target: controls.target.clone(),
      };
    }
    animatingRef.current = true;
    controls.enabled = !topDown;
  }, [topDown, camera]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls || !animatingRef.current) return;
    const target = topDown
      ? TOPDOWN_POSE
      : savedIsoRef.current
        ? { position: savedIsoRef.current.position, target: savedIsoRef.current.target }
        : ISO_POSE;
    const t = Math.min(1, delta * 4);
    camera.position.lerp(target.position, t);
    controls.target.lerp(target.target, t);
    if (camera.position.distanceTo(target.position) < 0.05) {
      camera.position.copy(target.position);
      controls.target.copy(target.target);
      animatingRef.current = false;
    }
    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      enableZoom
      enableRotate
      enablePan={false}
      minDistance={6}
      maxDistance={18}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
      target={[0, 0, 0]}
    />
  );
}
