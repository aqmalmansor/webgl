import * as THREE from "three";

export enum AnimationTypeEnum {
  ROTATE_XYZ = "ROTATE_XYZ",
  CIRCULAR_MOTION = "CIRCULAR_MOTION",
  MOVING_CAMERA = "MOVING_CAMERA",
  MOUSE_POSITION = "MOUSE_POSITION",
  MOUSE_POSITION_VECTOR = "MOUSE_POSITION_VECTOR",
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
  [AnimationTypeEnum.MOUSE_POSITION]: {
    label: "Mouse Position",
    tooltip: "Camera will be based on mouse position perspective",
  },
  [AnimationTypeEnum.MOUSE_POSITION_VECTOR]: {
    label: "Mouse Position (Vector)",
    tooltip: "Camera will be based on mouse position and vector",
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

export const mousePositionBasedCamera = (
  mesh: THREE.Mesh,
  camera: THREE.Camera,
  mousePosition: { x: number; y: number },
) => {
  camera.position.x = mousePosition.x;
  camera.position.y = mousePosition.y;

  camera.lookAt(mesh.position);
};

export const mousePositionAndVectorBasedCamera = (
  mesh: THREE.Mesh,
  camera: THREE.Camera,
  mousePosition: { x: number; y: number },
) => {
  camera.position.x = Math.sin(mousePosition.x * Math.PI * 2) * 3;
  camera.position.y = mousePosition.y * 5;
  camera.position.z = Math.cos(mousePosition.x * Math.PI * 2) * 3;

  camera.lookAt(mesh.position);
};
