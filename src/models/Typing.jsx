/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "../assets/3d/typing.glb";

// 3D Model from: https://sketchfab.com/3d-models/fox-f372c04de44640fbb6a4f9e4e5845c78
export function Typing({ currentAnimation, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);
  
  // This effect will run whenever the currentAnimation prop changes
  useEffect(() => {
    console.log(currentAnimation)
    Object.values(actions).forEach((action) => action.stop());

    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
    <group name="Sketchfab_Scene">
    <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
      <group
        name="584ef5b7d97b4d0b9e420614c81b79d0fbx"
        rotation={[Math.PI / 2, 0, 0]}
      >
        <group name="Object_2">
          <group name="RootNode">
            <group name="Object_4">
              <primitive object={nodes._rootJoint} />
              <skinnedMesh
                name="Object_7"
                geometry={nodes.Object_7.geometry}
                material={materials.material}
                skeleton={nodes.Object_7.skeleton}
              />
              <skinnedMesh
                name="Object_9"
                geometry={nodes.Object_9.geometry}
                material={materials["Mat.1"]}
                skeleton={nodes.Object_9.skeleton}
              />
              <skinnedMesh
                name="Object_11"
                geometry={nodes.Object_11.geometry}
                material={materials.Mat_0}
                skeleton={nodes.Object_11.skeleton}
              />
              <skinnedMesh
                name="Object_13"
                geometry={nodes.Object_13.geometry}
                material={materials.Mat_0}
                skeleton={nodes.Object_13.skeleton}
              />
              <group name="Object_6" position={[0.483, 60.671, -2.777]} />
              <group
                name="Object_8"
                position={[-0.465, -58.285, 2.669]}
                scale={[1, 0.947, 1]}
              />
              <group name="Object_10" position={[-0.465, -38.635, 2.669]} />
              <group name="Object_12" position={[0, 97.766, -3.215]} />
              <group
                name="CINEMA_4D_Editor"
                position={[319.36, 230.049, 5.648]}
                rotation={[-Math.PI, -0.126, 2.621]}
              >
                <group name="Object_80" />
              </group>
              <group name="Plane">
                <mesh
                  name="Plane_Mat4_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane_Mat4_0.geometry}
                  material={materials["Mat.4"]}
                />
              </group>
              <group
                name="Light"
                position={[0, 525.541, 56.733]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <group name="Object_84" rotation={[Math.PI / 2, 0, 0]}>
                  <group name="Object_85" />
                </group>
              </group>
              <group name="Bath_Stool___KEUCO">
                <group name="Feet" position={[0, 25.929, 0.041]}>
                  <mesh
                    name="Feet_Mat_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Feet_Mat_0.geometry}
                    material={materials.Mat_3}
                  />
                </group>
                <group name="Top" position={[0, 52.34, -0.041]}>
                  <mesh
                    name="Top_Mat4_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Mat4_0.geometry}
                    material={materials["Mat.4"]}
                  />
                </group>
              </group>
              <group
                name="Computer_Monitor"
                position={[-7.887, 78.316, 93.895]}
              >
                <group name="Main_Body" position={[0.281, 33.492, 0.266]}>
                  <group name="Boole">
                    <group name="Null_1_Null">
                      <mesh
                        name="Null_1_Null_Mat_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Null_1_Null_Mat_0.geometry}
                        material={materials.Mat_4}
                      />
                    </group>
                  </group>
                </group>
                <group name="Back_Grip" position={[0.281, 33.492, 5.019]}>
                  <mesh
                    name="Back_Grip_Mat4_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Back_Grip_Mat4_0.geometry}
                    material={materials["Mat.4"]}
                  />
                </group>
                <group name="Stand" position={[0.281, 0.423, 3.662]}>
                  <group name="Base" position={[0, 0.043, -1.223]}>
                    <mesh
                      name="Base_Mat_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Base_Mat_0.geometry}
                      material={materials.Mat_4}
                    />
                  </group>
                  <group name="Cube" position={[0, 30.444, 7.745]}>
                    <mesh
                      name="Cube_Mat_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Cube_Mat_0.geometry}
                      material={materials.Mat_4}
                    />
                  </group>
                  <group name="Arm" position={[0, -0.043, 1.223]}>
                    <mesh
                      name="Arm_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Arm_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                </group>
                <group
                  name="Screen"
                  position={[0.281, 33.492, -6.238]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                >
                  <group name="buttons" position={[25.539, 0.718, 18.935]}>
                    <group name="Cube_2" position={[-4.269, 0.071, 0.015]}>
                      <mesh
                        name="Cube_2__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube_2__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                    <group name="Cube_1" position={[-1.325, 0.071, 0.015]}>
                      <mesh
                        name="Cube_1__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube_1__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                    <group name="Cube_2_2" position={[1.62, 0.071, 0.015]}>
                      <mesh
                        name="Cube_2_2__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube_2_2__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                    <group
                      name="Plane_1_Null"
                      position={[3.973, -0.214, -0.046]}
                    >
                      <mesh
                        name="Plane_1_Null__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_1_Null__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                  </group>
                  <group name="Plane_1_Null_2" position={[0, 0.76, 0]}>
                    <mesh
                      name="Plane_1_Null_2_Mat_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Plane_1_Null_2_Mat_0.geometry}
                      material={materials.Mat_2}
                    />
                  </group>
                  <group name="screen">
                    <mesh
                      name="screen_Mat_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.screen_Mat_1.geometry}
                      material={materials.material}
                    />
                  </group>
                </group>
                <group name="Port" position={[31.782, 33.469, 0.73]}>
                  <group name="Null" position={[0, 1.927, 0]}>
                    <group name="Cube_3" position={[-0.05, 0, 0.084]}>
                      <mesh
                        name="Cube_3__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube_3__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                    <group name="Cube_1_2" position={[0.05, 0, -0.084]}>
                      <mesh
                        name="Cube_1_2__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube_1_2__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                  </group>
                  <group name="Null_1" position={[0, -1.927, 0]}>
                    <group name="Cube_4" position={[-0.05, 0, 0.084]}>
                      <mesh
                        name="Cube_4__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube_4__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                    <group name="Cube_1_3" position={[0.05, 0, -0.084]}>
                      <mesh
                        name="Cube_1_3__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube_1_3__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                  </group>
                </group>
              </group>
              <group
                name="Keyboard"
                position={[-6.521, 75.434, 60.854]}
                rotation={[Math.PI, 0, -Math.PI]}
              >
                <group name="Keys" position={[6.109, 0.07, -1.654]}>
                  <group name="Plane_2" position={[-3.018, 0.701, 2.139]}>
                    <mesh
                      name="Plane_2_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Plane_2_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                  <group
                    name="single_keys"
                    position={[-27.932, -0.589, 7.794]}
                  >
                    <group name="Plane_1" position={[23.422, 0, -2.435]}>
                      <mesh
                        name="Plane_1_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_1_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_2"
                      position={[-3.154, 0.886, -6.614]}
                    >
                      <mesh
                        name="Keys_Group_B_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_4"
                      position={[-3.166, 0.886, -4.551]}
                    >
                      <mesh
                        name="Keys_Group_B_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_1"
                      position={[-3.407, 0.886, -2.485]}
                    >
                      <mesh
                        name="Keys_Group_B_1_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Cube_5" position={[-3.146, 0, -0.432]}>
                      <mesh
                        name="Cube_5_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube_5_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Plane_1_2" position={[0.917, 0, 0.216]}>
                      <mesh
                        name="Plane_1_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_1_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Plane_3" position={[2.23, 0, 0.216]}>
                      <mesh
                        name="Plane_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Plane_3_2" position={[6.327, 0, 0.216]}>
                      <mesh
                        name="Plane_3_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_3_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Plane_4" position={[15.484, 0, 0.216]}>
                      <mesh
                        name="Plane_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Plane_5" position={[18.039, 0, 0.216]}>
                      <mesh
                        name="Plane_5_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_5_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Plane_2_2"
                      position={[20.643, 0.898, 0.249]}
                    >
                      <mesh
                        name="Plane_2_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_2_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Plane_6" position={[24.717, 0, -0.441]}>
                      <mesh
                        name="Plane_6_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_6_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group name="Cloner" position={[-9.277, -0.537, 2.64]}>
                    <group name="Keys_Group_B_0">
                      <mesh
                        name="Keys_Group_B_0_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_2" position={[2.075, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_2" position={[4.15, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_3" position={[6.225, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_4_2" position={[8.3, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_4_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_4_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_5" position={[10.375, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_5_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_5_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_6" position={[12.45, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_6_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_6_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_7" position={[14.525, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_7_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_7_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_8" position={[16.6, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_8_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_8_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_9" position={[18.675, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_9_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_9_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_10" position={[20.75, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_10_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_10_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group name="Cloner_1" position={[-8.318, -0.537, 0.58]}>
                    <group name="Keys_Group_B_0_2">
                      <mesh
                        name="Keys_Group_B_0_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_3" position={[2.075, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_3" position={[4.15, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_3_2" position={[6.225, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_3_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_3_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_4_3" position={[8.3, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_4_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_4_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_5_2"
                      position={[10.375, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_5_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_5_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_6_2" position={[12.45, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_6_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_6_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_7_2"
                      position={[14.525, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_7_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_7_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_8_2" position={[16.6, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_8_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_8_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_9_2"
                      position={[18.675, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_9_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_9_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_10_2"
                      position={[20.75, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_10_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_10_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_11" position={[22.825, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_11_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_11_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group
                    name="Cloner_2"
                    position={[-8.748, -0.537, -1.478]}
                  >
                    <group name="Keys_Group_B_0_3">
                      <mesh
                        name="Keys_Group_B_0_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_4" position={[2.075, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_4" position={[4.15, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_3_3" position={[6.225, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_3_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_3_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_4_4" position={[8.3, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_4_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_4_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_5_3"
                      position={[10.375, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_5_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_5_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_6_3" position={[12.45, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_6_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_6_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_7_3"
                      position={[14.525, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_7_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_7_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_8_3" position={[16.6, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_8_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_8_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_9_3"
                      position={[18.675, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_9_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_9_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_10_3"
                      position={[20.75, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_10_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_10_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_11_2"
                      position={[22.825, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_11_2_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_11_2_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group
                    name="Cloner_3"
                    position={[-11.813, -0.537, -3.526]}
                  >
                    <group name="Keys_Group_B_0_4">
                      <mesh
                        name="Keys_Group_B_0_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_5" position={[2.075, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_5_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_5_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_5" position={[4.15, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_5_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_5_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_3_4" position={[6.225, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_3_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_3_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_4_5" position={[8.3, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_4_5_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_4_5_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_5_4"
                      position={[10.375, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_5_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_5_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_6_4" position={[12.45, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_6_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_6_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_7_4"
                      position={[14.525, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_7_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_7_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_8_4" position={[16.6, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_8_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_8_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_9_4"
                      position={[18.675, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_9_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_9_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_10_4"
                      position={[20.75, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_10_4_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_10_4_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_11_3"
                      position={[22.825, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_11_3_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_11_3_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_12" position={[24.9, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_12_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_12_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group
                    name="Cloner_4"
                    position={[-9.016, -0.537, -6.515]}
                  >
                    <group name="Keys_Group_B_0_5">
                      <mesh
                        name="Keys_Group_B_0_5_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_5_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_6" position={[2.075, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_6_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_6_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_6" position={[4.15, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_6_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_6_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_3_5" position={[6.225, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_3_5_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_3_5_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group
                    name="Cloner_5"
                    position={[-0.035, -0.537, -6.515]}
                  >
                    <group name="Keys_Group_B_0_6">
                      <mesh
                        name="Keys_Group_B_0_6_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_6_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_7" position={[2.075, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_7_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_7_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_7" position={[4.15, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_7_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_7_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_3_6" position={[6.225, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_3_6_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_3_6_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group name="Cloner_6" position={[8.84, -0.537, -6.515]}>
                    <group name="Keys_Group_B_0_7">
                      <mesh
                        name="Keys_Group_B_0_7_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_7_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_8" position={[2.075, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_8_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_8_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_8" position={[4.15, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_8_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_8_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_3_7" position={[6.225, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_3_7_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_3_7_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group name="Cloner_7" position={[9.494, 0.314, -3.841]}>
                    <group name="Keys_Group_B_0_8">
                      <mesh
                        name="Keys_Group_B_0_8_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_8_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_9" position={[1.994, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_9_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_9_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_9" position={[3.988, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_9_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_9_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group
                    name="Keys_Group_B_2_10"
                    position={[-31.566, 0.292, -3.829]}
                  >
                    <mesh
                      name="Keys_Group_B_2_10_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Keys_Group_B_2_10_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                  <group name="Cloner_8" position={[7.437, 0.314, -0.834]}>
                    <group name="Keys_Group_B_0_9">
                      <mesh
                        name="Keys_Group_B_0_9_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_9_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_10" position={[2.04, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_10_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_10_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_11" position={[4.08, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_11_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_11_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_3_8" position={[6.12, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_3_8_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_3_8_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group name="Cloner_10" position={[7.437, 0.314, 3.279]}>
                    <group name="Keys_Group_B_0_10">
                      <mesh
                        name="Keys_Group_B_0_10_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_10_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_11" position={[2.04, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_11_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_11_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_12" position={[4.08, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_12_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_12_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group name="Cloner_11" position={[7.437, 0.314, 5.346]}>
                    <group name="Keys_Group_B_0_11">
                      <mesh
                        name="Keys_Group_B_0_11_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_11_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_12" position={[2.04, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_12_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_12_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_13" position={[4.08, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_13_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_13_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group name="Cloner_12" position={[0.389, 0.314, -0.764]}>
                    <group name="Keys_Group_B_0_12">
                      <mesh
                        name="Keys_Group_B_0_12_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_12_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_13" position={[2.04, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_13_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_13_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_14" position={[4.08, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_14_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_14_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group name="Cloner_13" position={[0.389, 0.314, 1.302]}>
                    <group name="Keys_Group_B_0_13">
                      <mesh
                        name="Keys_Group_B_0_13_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_13_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_14" position={[2.04, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_14_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_14_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_15" position={[4.08, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_15_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_15_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group name="Cloner_15" position={[0.372, 0.314, 7.493]}>
                    <group name="Keys_Group_B_0_14">
                      <mesh
                        name="Keys_Group_B_0_14_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_14_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_1_15"
                      position={[2.079, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_1_15_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_15_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group
                      name="Keys_Group_B_2_16"
                      position={[4.158, 0, 0]}
                    >
                      <mesh
                        name="Keys_Group_B_2_16_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_16_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group
                    name="Keys_Group_B"
                    position={[2.436, 0.321, 5.428]}
                  >
                    <mesh
                      name="Keys_Group_B_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Keys_Group_B_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                  <group name="Cloner_9" position={[7.437, 0.314, 1.204]}>
                    <group name="Keys_Group_B_0_15">
                      <mesh
                        name="Keys_Group_B_0_15_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_0_15_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_1_16" position={[2.04, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_1_16_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_1_16_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                    <group name="Keys_Group_B_2_17" position={[4.08, 0, 0]}>
                      <mesh
                        name="Keys_Group_B_2_17_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keys_Group_B_2_17_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                    </group>
                  </group>
                  <group
                    name="Keys_Group_B_2_18"
                    position={[13.551, 0.314, 1.204]}
                  >
                    <mesh
                      name="Keys_Group_B_2_18_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Keys_Group_B_2_18_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                  <group
                    name="Keys_Group_B_3_9"
                    position={[13.551, 0.314, 5.343]}
                  >
                    <mesh
                      name="Keys_Group_B_3_9_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Keys_Group_B_3_9_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                  <group
                    name="Keys_Group_B_1_17"
                    position={[11.517, 0.321, 7.406]}
                  >
                    <mesh
                      name="Keys_Group_B_1_17_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Keys_Group_B_1_17_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                  <group
                    name="Keys_Group_B_4_6"
                    position={[8.538, 0.321, 7.406]}
                  >
                    <mesh
                      name="Keys_Group_B_4_6_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Keys_Group_B_4_6_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                  <group
                    name="Keys_Group_B_5_5"
                    position={[-3.547, 0.321, -0.831]}
                  >
                    <mesh
                      name="Keys_Group_B_5_5_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Keys_Group_B_5_5_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                </group>
                <group name="Cable" position={[-3.169, -0.519, 0.931]}>
                  <group name="USB_Cable" position={[0, 0.484, 0]}>
                    <mesh
                      name="USB_Cable__0"
                      castShadow
                      receiveShadow
                      geometry={nodes.USB_Cable__0.geometry}
                      material={materials.RootNode}
                    />
                    <group
                      name="Cap_1"
                      position={[11.75, 0, -8.635]}
                      rotation={[-0.011, 0.024, -3.138]}
                    >
                      <mesh
                        name="Cap_1__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cap_1__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                    <group
                      name="Cap_2"
                      position={[19.352, 0.115, -22.912]}
                      rotation={[3.064, -1.523, -0.074]}
                    >
                      <mesh
                        name="Cap_2__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cap_2__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                  </group>
                  <group
                    name="USB_Cable_Wgt"
                    position={[11.716, 0.438, -12.556]}
                    rotation={[-0.012, -0.013, 0]}
                  >
                    <mesh
                      name="USB_Cable_Wgt_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.USB_Cable_Wgt_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                  <group
                    name="USB_Cable_Plug"
                    position={[19.352, 0.599, -22.912]}
                    rotation={[3.09, -1.496, 3.09]}
                  >
                    <group
                      name="Plug_Cable_Fx"
                      position={[-0.019, -0.021, 0.385]}
                      rotation={[-Math.PI, 0.005, Math.PI]}
                    >
                      <mesh
                        name="Plug_Cable_Fx__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plug_Cable_Fx__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                    <group
                      name="Plug_Base"
                      position={[-0.008, -0.021, -1.78]}
                      rotation={[-Math.PI, 0.005, Math.PI]}
                    >
                      <mesh
                        name="Plug_Base__0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plug_Base__0.geometry}
                        material={materials.RootNode}
                      />
                    </group>
                    <group
                      name="Plug"
                      position={[0.004, -0.021, -4.023]}
                      rotation={[-Math.PI, 0.005, Math.PI]}
                    >
                      <mesh
                        name="Plug_Mat4_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plug_Mat4_0.geometry}
                        material={materials["Mat.4"]}
                      />
                      <group name="Plug_Ins" position={[0, 0.082, 0]}>
                        <mesh
                          name="Plug_Ins__0"
                          castShadow
                          receiveShadow
                          geometry={nodes.Plug_Ins__0.geometry}
                          material={materials.RootNode}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="USB_Cable_Jt"
                    position={[11.75, 0.484, -8.575]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="USB_Cable_Jt_Mat4_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.USB_Cable_Jt_Mat4_0.geometry}
                      material={materials["Mat.4"]}
                    />
                  </group>
                </group>
                <group name="Keyboard_2" position={[-2.94, -0.035, 0.723]}>
                  <mesh
                    name="Keyboard_2_Mat_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Keyboard_2_Mat_0.geometry}
                    material={materials.Mat_4}
                  />
                </group>
                <group name="Logo" position={[-3.169, -0.035, 0.931]}>
                  <mesh
                    name="Logo_Mat4_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Logo_Mat4_0.geometry}
                    material={materials["Mat.4"]}
                  />
                </group>
              </group>
              <group
                name="Computertisch"
                position={[4.631, 0, 76.895]}
                rotation={[Math.PI, 0, -Math.PI]}
              >
                <group name="01" position={[-2.523, 7.571, 12.437]}>
                  <mesh
                    name="01_Mat_2"
                    castShadow
                    receiveShadow
                    geometry={nodes["01_Mat_2"].geometry}
                    material={materials.Mat_3}
                  />
                </group>
                <group name="02" position={[10.533, 0, -1.487]}>
                  <mesh
                    name="02__0"
                    castShadow
                    receiveShadow
                    geometry={nodes["02__0"].geometry}
                    material={materials.RootNode}
                  />
                </group>
                <group name="03" position={[13.056, 10.092, -1.342]}>
                  <mesh
                    name="03__0"
                    castShadow
                    receiveShadow
                    geometry={nodes["03__0"].geometry}
                    material={materials.RootNode}
                  />
                </group>
              </group>
              <group name="pose" position={[-0.076, 22.209, -0.155]}>
                <group name="T_Shirt" position={[0.56, 38.463, -2.623]} />
                <group
                  name="Legs"
                  position={[-0.388, -80.494, 2.823]}
                  scale={[1, 0.947, 1]}
                />
                <group name="Arms" position={[-0.388, -60.844, 2.823]} />
                <group name="Head" position={[0.076, 75.557, -3.06]} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  </group>
    </group>
  );
}

useGLTF.preload(scene);
