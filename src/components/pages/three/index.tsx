import { useEffect, useRef, useState } from "react";
import { Button, Tooltip } from "@radix-ui/themes";
import * as THREE from "three";

import {
  AnimationTypeEnum,
  circularMotion,
  description,
  focusOnMeshWithMovingCamera,
  mousePositionAndVectorBasedCamera,
  mousePositionBasedCamera,
  rotateIncrementallyFaster,
} from "./config";

export const ThreePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationType, setAnimationType] = useState<AnimationTypeEnum>(
    AnimationTypeEnum.ROTATE_XYZ,
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "green" });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const sizes = {
      width: 800,
      height: 600,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);

    const mousePosition = {
      x: 0,
      y: 0,
    };

    const handleMouseMove = (evt: MouseEvent) => {
      mousePosition.x = (evt.clientX / sizes.width - 0.5) * 3;
      mousePosition.y = -(evt.clientY / sizes.height - 0.5) * 3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    const clock = new THREE.Clock();

    const tick = () => {
      switch (animationType) {
        case AnimationTypeEnum.ROTATE_XYZ:
          rotateIncrementallyFaster(mesh, clock);
          break;
        case AnimationTypeEnum.CIRCULAR_MOTION:
          circularMotion(mesh, clock);
          break;
        case AnimationTypeEnum.MOVING_CAMERA:
          focusOnMeshWithMovingCamera(mesh, clock, camera);
          break;
        case AnimationTypeEnum.MOUSE_POSITION:
          mousePositionBasedCamera(mesh, camera, mousePosition);
          break;
        case AnimationTypeEnum.MOUSE_POSITION_VECTOR:
          mousePositionAndVectorBasedCamera(mesh, camera, mousePosition);
          break;
        default:
          break;
      }

      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [animationType]);

  return (
    <div className="container mx-auto">
      <h1>Three.js Page</h1>
      <canvas ref={canvasRef} className="webgl"></canvas>
      <div className="flex flex-row flex-wrap gap-3 mb-3 my-8">
        {Object.values(AnimationTypeEnum).map((item) => (
          <Tooltip key={item} content={description[item].tooltip}>
            <Button onClick={() => setAnimationType(item)} size="4">
              {description[item].label}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
