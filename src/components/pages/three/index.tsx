import { useEffect, useRef, useState } from "react";
import { Button, Tooltip } from "@radix-ui/themes";
import * as THREE from "three";

import {
  AnimationTypeEnum,
  circularMotion,
  description,
  focusOnMeshWithMovingCamera,
  rotateIncrementallyFaster,
} from "./config";

export const ThreePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationType, setAnimationType] = useState<AnimationTypeEnum>(
    AnimationTypeEnum.ROTATE_XYZ,
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    // Canvas
    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "green" });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Sizes
    const sizes = {
      width: 800,
      height: 600,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);

    // Renderer
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
        default:
          break;
      }

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      requestAnimationFrame(tick);
    };

    tick();

    // Cleanup
    return () => {
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
          <Tooltip content={description[item].tooltip}>
            <Button onClick={() => setAnimationType(item)} size="4">
              {description[item].label}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
