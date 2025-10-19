import * as THREE from "three";

export enum AnimationTypeEnum {
  ROTATE_XYZ = "Rotate XYZ",
  CIRCULAR_MOTION = "Circular Motion",
  MOVING_CAMERA = "Moving Camera",
}

export const description = {
  [AnimationTypeEnum.ROTATE_XYZ]: {
    label: "Rotate XYZ",
    tooltip: "Mesh will rotate in X, Y, Z axis",
  },
  [AnimationTypeEnum.CIRCULAR_MOTION]: {
    label: "Circular Motion",
    tooltip: "Mesh will move in circular motion",
  },
  [AnimationTypeEnum.MOVING_CAMERA]: {
    label: "Moving Camera",
    tooltip: "Camera will move in circular motion while focusing on the mesh",
  },
};

export const rotateIncrementallyFaster = (
  mesh: THREE.Mesh,
  clock: THREE.Clock,
) => {
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.x += 0.001 * elapsedTime;
  mesh.rotation.y += 0.001 * elapsedTime;
  mesh.rotation.z += 0.005 * elapsedTime;
};

export const circularMotion = (mesh: THREE.Mesh, clock: THREE.Clock) => {
  const elapsedTime = clock.getElapsedTime();

  mesh.position.x = Math.cos(elapsedTime);
  mesh.position.y = Math.sin(elapsedTime);
};

export const focusOnMeshWithMovingCamera = (
  mesh: THREE.Mesh,
  clock: THREE.Clock,
  camera: THREE.Camera,
) => {
  const elapsedTime = clock.getElapsedTime();

  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);

  camera.lookAt(mesh.position);
};
