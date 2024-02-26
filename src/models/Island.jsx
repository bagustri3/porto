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

import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/mining_town.glb";

export function Island({
    isRotating,
    setIsRotating,
    setCurrentStage,
    currentFocusPoint,
    ...props
}) {
    const islandRef = useRef();
    // Get access to the Three.js renderer and viewport
    const { gl, viewport } = useThree();
    const { nodes, materials } = useGLTF(islandScene);

    // Use a ref for the last mouse x position
    const lastX = useRef(0);
    // Use a ref for rotation speed
    const rotationSpeed = useRef(0);
    // Define a damping factor to control rotation damping
    const dampingFactor = 0.95;

    // Handle pointer (mouse or touch) down event
    const handlePointerDown = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsRotating(true);

        // Calculate the clientX based on whether it's a touch event or a mouse event
        const clientX = event.touches
            ? event.touches[0].clientX
            : event.clientX;

        // Store the current clientX position for reference
        lastX.current = clientX;
    };

    // Handle pointer (mouse or touch) up event
    const handlePointerUp = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsRotating(false);
    };

    // Handle pointer (mouse or touch) move event
    const handlePointerMove = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (isRotating) {
            // If rotation is enabled, calculate the change in clientX position
            const clientX = event.touches
                ? event.touches[0].clientX
                : event.clientX;

            // calculate the change in the horizontal position of the mouse cursor or touch input,
            // relative to the viewport's width
            const delta = (clientX - lastX.current) / viewport.width;

            // Update the island's rotation based on the mouse/touch movement
            islandRef.current.rotation.y += delta * 0.01 * Math.PI;

            // Update the reference for the last clientX position
            lastX.current = clientX;

            // Update the rotation speed
            rotationSpeed.current = delta * 0.01 * Math.PI;
        }
    };

    // Handle keydown events
    const handleKeyDown = (event) => {
        if (event.key === "ArrowLeft") {
            if (!isRotating) setIsRotating(true);

            islandRef.current.rotation.y += 0.005 * Math.PI;
            rotationSpeed.current = 0.007;
        } else if (event.key === "ArrowRight") {
            if (!isRotating) setIsRotating(true);

            islandRef.current.rotation.y -= 0.005 * Math.PI;
            rotationSpeed.current = -0.007;
        }
    };

    // Handle keyup events
    const handleKeyUp = (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            setIsRotating(false);
        }
    };

    useEffect(() => {
        // Add event listeners for pointer and keyboard events
        const canvas = gl.domElement;
        canvas.addEventListener("pointerdown", handlePointerDown);
        canvas.addEventListener("pointerup", handlePointerUp);
        canvas.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Remove event listeners when component unmounts
        return () => {
            canvas.removeEventListener("pointerdown", handlePointerDown);
            canvas.removeEventListener("pointerup", handlePointerUp);
            canvas.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

    // This function is called on each frame update
    useFrame(() => {
        // If not rotating, apply damping to slow down the rotation (smoothly)
        if (!isRotating) {
            // Apply damping factor
            rotationSpeed.current *= dampingFactor;

            // Stop rotation when speed is very small
            if (Math.abs(rotationSpeed.current) < 0.001) {
                rotationSpeed.current = 0;
            }

            islandRef.current.rotation.y += rotationSpeed.current;
        } else {
            // When rotating, determine the current stage based on island's orientation
            const rotation = islandRef.current.rotation.y;

            /**
             * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
             * The goal is to ensure that the rotation value remains within a specific range to
             * prevent potential issues with very large or negative rotation values.
             *  Here's a step-by-step explanation of what this code does:
             *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
             *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
             *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
             *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
             *     This is done to ensure that the value remains positive and within the range of
             *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
             *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
             *     modulo operation to the value obtained in step 2. This step guarantees that the value
             *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
             *     circle in radians.
             */
            const normalizedRotation =
                ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

            // Set the current stage based on the island's orientation
            switch (true) {
                case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                    setCurrentStage(4);
                    break;
                case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
                    setCurrentStage(3);
                    break;
                case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
                    setCurrentStage(2);
                    break;
                case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                    setCurrentStage(1);
                    break;
                default:
                    setCurrentStage(null);
            }
        }
    });

    return (
        // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
        <a.group ref={islandRef} {...props}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                    <group name="root">
                        <group
                            name="GLTF_SceneRootNode"
                            rotation={[Math.PI / 2, 0, 0]}
                        >
                            <group
                                name="spw_tree_c_02004_0"
                                position={[0.6099776, 1.0967505, 3.54001975]}
                                rotation={[0, -0.06929204, 0]}
                                scale={0.73140395}
                            >
                                <mesh
                                    name="Object_4"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_4.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_tree_c_02003_1"
                                position={[-3.70642424, 1.99616361, 0.14371133]}
                                rotation={[0, 0.80350055, 0]}
                                scale={0.73140395}
                            >
                                <mesh
                                    name="Object_6"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_6.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_tree_c_02002_2"
                                position={[2.70387244, 3.15778971, -1.83059728]}
                                rotation={[0, -1.03194305, 0]}
                                scale={0.73140395}
                            >
                                <mesh
                                    name="Object_8"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_8.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_tree_c_02001_3"
                                position={[5.93578148, 3.15778971, -6.39597034]}
                                rotation={[0, 0.38286089, 0]}
                                scale={1.19240594}
                            >
                                <mesh
                                    name="Object_10"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_10.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_tree_c_01002_4"
                                position={[-5.18713951, 1.00570321, 7.46800423]}
                                rotation={[0, -0.48993029, 0]}
                                scale={[1.34795344, 1.34795332, 1.34795344]}
                            >
                                <mesh
                                    name="Object_12"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_12.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_tree_c_01001_5"
                                position={[9.44405079, 1.00570321, 6.89412212]}
                                rotation={[0, -0.48993029, 0]}
                                scale={2.05248213}
                            >
                                <mesh
                                    name="Object_14"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_14.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_tree_a_03004_6"
                                position={[
                                    -13.74654007, -7.82410622, -27.67049789,
                                ]}
                                rotation={[0, 0.38293643, 0]}
                                scale={1.5684377}
                            >
                                <mesh
                                    name="Object_16"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_16.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_tree_a_03003_7"
                                position={[
                                    15.86955833, -8.71146011, -23.4112339,
                                ]}
                                rotation={[0, 0.38293643, 0]}
                                scale={1.5684377}
                            >
                                <mesh
                                    name="Object_18"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_18.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_tree_a_03002_8"
                                position={[8.60610485, 1.20913541, 0.71734643]}
                                rotation={[0, 0.38293643, 0]}
                                scale={1.5684377}
                            >
                                <mesh
                                    name="Object_20"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_20.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_tree_a_03001_9"
                                position={[
                                    3.56690931, 4.27042913, -10.35189438,
                                ]}
                                rotation={[0, 0.38293643, 0]}
                                scale={[1.46301305, 1.46301293, 1.46301305]}
                            >
                                <mesh
                                    name="Object_22"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_22.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08011_10"
                                position={[1.80754411, 4.30304527, -3.89641857]}
                                rotation={[0, 1.18458355, 0]}
                            >
                                <mesh
                                    name="Object_24"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_24.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08010_11"
                                position={[0.98455328, 4.30304527, -5.16072321]}
                                rotation={[0, 0.58293467, 0]}
                            >
                                <mesh
                                    name="Object_26"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_26.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08009_12"
                                position={[1.33362877, 3.20305943, -1.77263713]}
                                rotation={[0, 0.81978717, 0]}
                            >
                                <mesh
                                    name="Object_28"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_28.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08008_13"
                                position={[-3.26778507, 2.14719772, 0.88825977]}
                                rotation={[0, 1.08721497, 0]}
                            >
                                <mesh
                                    name="Object_30"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_30.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08007_14"
                                position={[-1.84227026, 2.14719772, 0.18728945]}
                                rotation={[0, 0.17184649, 0]}
                            >
                                <mesh
                                    name="Object_32"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_32.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08006_15"
                                position={[6.34390783, 1.24405789, 8.50670624]}
                                rotation={[0, 1.32837575, 0]}
                            >
                                <mesh
                                    name="Object_34"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_34.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08005_16"
                                position={[3.27225685, 1.24405789, 8.11084843]}
                                rotation={[0, 1.53313766, 0]}
                            >
                                <mesh
                                    name="Object_36"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_36.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08004_17"
                                position={[0.86126548, 1.24405789, 8.54319286]}
                            >
                                <mesh
                                    name="Object_38"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_38.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08003_18"
                                position={[-0.45836949, 1.24405789, 2.5321517]}
                                rotation={[0, -0.05038721, 0]}
                            >
                                <mesh
                                    name="Object_40"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_40.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08002_19"
                                position={[-1.44492841, 1.24405789, 7.22864437]}
                                rotation={[0, 0.23634043, 0]}
                            >
                                <mesh
                                    name="Object_42"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_42.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_08001_20"
                                position={[-4.02977943, 1.24405789, 8.39777756]}
                                rotation={[0, -0.48572875, 0]}
                            >
                                <mesh
                                    name="Object_44"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_44.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_07006_21"
                                position={[4.78559256, 3.17232275, -2.69301677]}
                                rotation={[0, -0.28486292, 0]}
                                scale={[2.24775004, 2.24774981, 2.24775004]}
                            >
                                <mesh
                                    name="Object_46"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_46.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_07005_22"
                                position={[
                                    -3.01421738, 4.29810286, -6.77722073,
                                ]}
                                rotation={[0, 0.25925526, 0]}
                                scale={[1.65695643, 1.6569562, 1.65695643]}
                            >
                                <mesh
                                    name="Object_48"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_48.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_07004_23"
                                position={[-1.17373288, 2.123631, -2.32437634]}
                                rotation={[0, 0.02988565, 0]}
                            >
                                <mesh
                                    name="Object_50"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_50.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_07003_24"
                                position={[8.36806583, 1.24062562, 8.25863552]}
                                rotation={[0, 0.02988565, 0]}
                            >
                                <mesh
                                    name="Object_52"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_52.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_07002_25"
                                position={[-7.97611952, 1.24062562, 7.84917736]}
                                rotation={[-Math.PI, 1.44155328, -Math.PI]}
                            >
                                <mesh
                                    name="Object_54"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_54.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_07001_26"
                                position={[-2.12511253, 1.24062562, 2.85444236]}
                                rotation={[0, 0.77155929, 0]}
                            >
                                <mesh
                                    name="Object_56"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_56.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_04003_27"
                                position={[4.42046595, 3.15702224, -4.46268559]}
                                rotation={[0, -1.09233093, 0]}
                                scale={1.28675067}
                            >
                                <mesh
                                    name="Object_58"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_58.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_04002_28"
                                position={[
                                    -4.08797359, 2.06185102, -2.66459394,
                                ]}
                                rotation={[0, 1.50014014, 0]}
                                scale={1.28675067}
                            >
                                <mesh
                                    name="Object_60"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_60.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_rock_04001_29"
                                position={[3.34714341, 1.2988441, -0.78152972]}
                                scale={1.28675067}
                            >
                                <mesh
                                    name="Object_62"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_62.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02012_30"
                                position={[
                                    -12.03724194, -8.72046566, -20.98039627,
                                ]}
                                rotation={[0, 0.55278292, 0]}
                                scale={[2.54468179, 2.54468203, 2.54468179]}
                            >
                                <mesh
                                    name="Object_64"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_64.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02011_31"
                                position={[
                                    -11.06862259, -7.64028311, 1.25040078,
                                ]}
                                rotation={[0, 0.55278292, 0]}
                                scale={2.05248213}
                            >
                                <mesh
                                    name="Object_66"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_66.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02010_32"
                                position={[
                                    -12.37115669, -7.64028311, 0.07758445,
                                ]}
                                rotation={[0, 0.55278292, 0]}
                                scale={[2.54468179, 2.54468203, 2.54468179]}
                            >
                                <mesh
                                    name="Object_68"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_68.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02009_33"
                                position={[1.18370819, 1.02859962, 3.60882807]}
                                rotation={[0, 0.55278292, 0]}
                                scale={1.17340195}
                            >
                                <mesh
                                    name="Object_70"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_70.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02008_34"
                                position={[-5.68988419, 1.12974298, 8.23552799]}
                                rotation={[0, 0.55278292, 0]}
                                scale={[1.22600853, 1.22600877, 1.22600853]}
                            >
                                <mesh
                                    name="Object_72"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_72.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02007_35"
                                position={[-6.22103882, 1.02859962, 6.93796778]}
                                rotation={[0, 0.55278292, 0]}
                                scale={[1.87611485, 1.87611496, 1.87611485]}
                            >
                                <mesh
                                    name="Object_74"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_74.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02006_36"
                                position={[2.08105826, 1.02859962, 5.13852835]}
                                rotation={[0, 0.55278292, 0]}
                                scale={[1.42600787, 1.42600799, 1.42600787]}
                            >
                                <mesh
                                    name="Object_76"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_76.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02005_37"
                                position={[0.5586006, 2.00097036, 0.75373459]}
                                rotation={[0, 0.55278292, 0]}
                                scale={[1.42600787, 1.42600799, 1.42600787]}
                            >
                                <mesh
                                    name="Object_78"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_78.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02004_38"
                                position={[
                                    -0.47535038, 2.00097036, -0.16278195,
                                ]}
                                rotation={[0, 0.55278292, 0]}
                                scale={2.05248213}
                            >
                                <mesh
                                    name="Object_80"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_80.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02003_39"
                                position={[
                                    -4.02868557, 4.20672703, -10.07073784,
                                ]}
                                rotation={[0, 0.02222202, 0]}
                                scale={2.05248213}
                            >
                                <mesh
                                    name="Object_82"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_82.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02002_40"
                                position={[3.98664474, 4.20672703, -8.09387875]}
                                rotation={[0, -0.49118617, 0]}
                                scale={1.54543352}
                            >
                                <mesh
                                    name="Object_84"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_84.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_plant_02001_41"
                                position={[2.63758421, 4.20672703, -8.70316315]}
                                rotation={[0, -0.49118617, 0]}
                                scale={2.05248213}
                            >
                                <mesh
                                    name="Object_86"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_86.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01009_42"
                                position={[
                                    -12.11793709, -9.90759277, -2.83597994,
                                ]}
                            >
                                <mesh
                                    name="Object_88"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_88.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01008_43"
                                position={[
                                    -13.94105053, -8.84986687, 0.57717943,
                                ]}
                            >
                                <mesh
                                    name="Object_90"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_90.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01007_44"
                                position={[
                                    16.03779602, -9.90759277, -22.88688469,
                                ]}
                            >
                                <mesh
                                    name="Object_92"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_92.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01006_45"
                                position={[
                                    11.61858559, -8.84986687, -24.95218468,
                                ]}
                            >
                                <mesh
                                    name="Object_94"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_94.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01005_46"
                                position={[
                                    -9.65407372, -9.90759277, -22.64639854,
                                ]}
                            >
                                <mesh
                                    name="Object_96"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_96.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01004_47"
                                position={[
                                    -11.06721497, -8.84986687, -26.51534081,
                                ]}
                            >
                                <mesh
                                    name="Object_98"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_98.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01003_48"
                                position={[-2.0347743, 0.90954483, -2.78227496]}
                            >
                                <mesh
                                    name="Object_100"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_100.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01002_49"
                                position={[2.94614291, 1.96727109, -5.40098381]}
                            >
                                <mesh
                                    name="Object_102"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_102.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01001_50"
                                position={[
                                    -1.45449758, 3.06719971, -7.40279055,
                                ]}
                            >
                                <mesh
                                    name="Object_104"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_104.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_land_01_51"
                                position={[-1.37505341, 0, 4.95077848]}
                            >
                                <mesh
                                    name="Object_106"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_106.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_build_mine_gold_53"
                                position={[6.32216358, 1.23841023, 5.44987488]}
                                rotation={[0, 0.52391478, 0]}
                            >
                                <mesh
                                    name="Object_108"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_108.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_build_lumber_house_60"
                                position={[-6.36436701, 1.23841023, 3.98765826]}
                                rotation={[0, -0.67688583, 0]}
                            >
                                <mesh
                                    name="Object_110"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_110.geometry}
                                    material={materials.spw_gradient}
                                />
                                <group name="a_axe_59">
                                    <group
                                        name="Cube010_54"
                                        position={[
                                            4.23574972, 0.29854769, -1.85321283,
                                        ]}
                                        rotation={[0, Math.PI / 2, 0]}
                                        scale={[1, 1, 0.5]}
                                    >
                                        <mesh
                                            name="Object_113"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Object_113.geometry}
                                            material={
                                                materials["spw_gradient.002"]
                                            }
                                        />
                                    </group>
                                    <group
                                        name="Cube011_55"
                                        position={[
                                            4.48099661, 0.29854769, 0.6741522,
                                        ]}
                                        scale={[1, 1, 0.5]}
                                    >
                                        <mesh
                                            name="Object_115"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Object_115.geometry}
                                            material={
                                                materials["spw_gradient.002"]
                                            }
                                        />
                                    </group>
                                    <group
                                        name="Cube017_56"
                                        position={[1.77333546, 3.38227725, 0]}
                                    >
                                        <mesh
                                            name="Object_117"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Object_117.geometry}
                                            material={
                                                materials["spw_gradient.002"]
                                            }
                                        />
                                    </group>
                                    <group
                                        name="wood001_57"
                                        position={[
                                            3.53744578, 0.30345973, 0.00235524,
                                        ]}
                                    >
                                        <mesh
                                            name="Object_119"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Object_119.geometry}
                                            material={
                                                materials["spw_gradient.002"]
                                            }
                                        />
                                    </group>
                                    <group
                                        name="wood002_58"
                                        position={[
                                            2.92523909, 0.30345973, 0.00235524,
                                        ]}
                                    >
                                        <mesh
                                            name="Object_121"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Object_121.geometry}
                                            material={
                                                materials["spw_gradient.002"]
                                            }
                                        />
                                    </group>
                                </group>
                            </group>
                            <group
                                name="spw_build_house_12001_61"
                                position={[
                                    -15.16556549, -7.68252087, 1.99048746,
                                ]}
                                rotation={[0, Math.PI / 2, 0]}
                            >
                                <mesh
                                    name="Object_123"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_123.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_build_house_12_62"
                                position={[
                                    11.11073017, -7.68252087, -24.31287003,
                                ]}
                            >
                                <mesh
                                    name="Object_125"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_125.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_build_house_03001_63"
                                position={[
                                    16.53457832, -10.1300602, -2.70720434,
                                ]}
                                rotation={[0, -Math.PI / 2, 0]}
                            >
                                <mesh
                                    name="Object_127"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_127.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_build_house_03_64"
                                position={[
                                    -11.36147785, -7.68151426, -24.32120514,
                                ]}
                            >
                                <mesh
                                    name="Object_129"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_129.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="spw_build_farmhouse_67"
                                position={[-0.6745947, 4.3056097, -7.94467449]}
                                rotation={[0, 0.61380613, 0]}
                            >
                                <mesh
                                    name="Object_131"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_131.geometry}
                                    material={materials.spw_gradient}
                                />
                                <group name="a_farmhouse_66">
                                    <group
                                        name="spw_build_brewery_machine002_65"
                                        position={[0, 2.45114231, -1.22538328]}
                                        rotation={[Math.PI / 2, 0, 0]}
                                    >
                                        <mesh
                                            name="Object_134"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Object_134.geometry}
                                            material={
                                                materials["spw_gradient.004"]
                                            }
                                        />
                                    </group>
                                </group>
                            </group>
                            <group
                                name="Cube019_68"
                                position={[
                                    -11.8503561, -13.05120182, 11.94951248,
                                ]}
                                rotation={[-Math.PI, -0.02468261, -Math.PI]}
                                scale={1.81581688}
                            >
                                <mesh
                                    name="Object_136"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_136.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube015_69"
                                position={[
                                    9.25819016, -13.05120182, 12.11011124,
                                ]}
                                rotation={[0, -1.55686693, 0]}
                                scale={1.81581688}
                            >
                                <mesh
                                    name="Object_138"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_138.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube012_70"
                                position={[
                                    -14.62480545, -13.05120182, -30.46905708,
                                ]}
                                rotation={[0, 0.01392954, 0]}
                                scale={1.81581688}
                            >
                                <mesh
                                    name="Object_140"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_140.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube009_71"
                                position={[
                                    -14.54018784, -13.05120182, -7.9198966,
                                ]}
                                rotation={[-Math.PI, 1.5568671, -Math.PI]}
                                scale={1.81581688}
                            >
                                <mesh
                                    name="Object_142"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_142.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube008_72"
                                position={[
                                    25.51861191, -13.05120182, -9.27391624,
                                ]}
                                rotation={[0, -Math.PI / 2, 0]}
                                scale={1.81581688}
                            >
                                <mesh
                                    name="Object_144"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_144.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube007_73"
                                position={[
                                    28.21225739, -13.05120182, -26.94317436,
                                ]}
                                rotation={[-Math.PI, -3.3e-7, -Math.PI]}
                                scale={1.81581688}
                            >
                                <mesh
                                    name="Object_146"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_146.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube006_74"
                                position={[
                                    8.01882172, -13.05120182, -27.17264748,
                                ]}
                                rotation={[0, Math.PI / 2, 0]}
                                scale={1.81581688}
                            >
                                <mesh
                                    name="Object_148"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_148.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube005_75"
                                position={[
                                    2.97046185, -13.05120182, -9.50338745,
                                ]}
                                scale={1.81581688}
                            >
                                <mesh
                                    name="Object_150"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_150.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube004_76"
                                position={[
                                    0.26849145, 17.85866547, 32.99281693,
                                ]}
                            >
                                <mesh
                                    name="Object_152"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_152.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube003_77"
                                position={[
                                    -12.20613003, 19.47196579, 17.86250877,
                                ]}
                                rotation={[0, Math.PI / 2, 0]}
                            >
                                <mesh
                                    name="Object_154"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_154.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube002_78"
                                position={[
                                    15.0229187, 17.66960144, 15.87995815,
                                ]}
                            >
                                <mesh
                                    name="Object_156"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_156.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube001_79"
                                position={[
                                    -11.15443516, 14.72462749, -13.01541328,
                                ]}
                                rotation={[0, -Math.PI / 2, 0]}
                            >
                                <mesh
                                    name="Object_158"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_158.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="Cube_80"
                                position={[
                                    11.53798294, 14.72462749, -11.66449547,
                                ]}
                            >
                                <mesh
                                    name="Object_160"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_160.geometry}
                                    material={materials.spw_gradient}
                                />
                            </group>
                            <group
                                name="wood2b002_81"
                                position={[-5.10456991, 2.25774145, 2.52574778]}
                            >
                                <mesh
                                    name="Object_162"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_162.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="wood2b001_82"
                                position={[-2.93106747, 2.25774145, 4.27220917]}
                            >
                                <mesh
                                    name="Object_164"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_164.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="wood2b_83"
                                position={[-2.55768561, 2.25774145, 6.41603947]}
                                scale={0}
                            >
                                <mesh
                                    name="Object_166"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_166.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="wood2002_84"
                                position={[-4.09666395, 2.25768638, 3.5074966]}
                            >
                                <mesh
                                    name="Object_168"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_168.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="wood2001_85"
                                position={[-1.74132681, 2.25768638, 5.40006638]}
                            >
                                <mesh
                                    name="Object_170"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_170.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="wood2_86"
                                position={[-3.17622685, 2.25768638, 7.18582535]}
                                scale={0}
                            >
                                <mesh
                                    name="Object_172"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_172.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="wood003_87"
                                position={[-3.85018659, 2.09364104, 6.01088333]}
                                scale={0}
                            >
                                <mesh
                                    name="Object_174"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_174.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="wood_88"
                                position={[-3.85018659, 2.09364104, 6.01088333]}
                            >
                                <mesh
                                    name="Object_176"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_176.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="Cube013_89"
                                position={[-3.34351492, 5.9456501, 6.41498566]}
                                rotation={[0, 0, -0.30856246]}
                            >
                                <mesh
                                    name="Object_178"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_178.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="Cube014_90"
                                position={[-3.79906559, 4.44958115, 6.04893923]}
                                rotation={[0, 0, 1.80203379]}
                            >
                                <mesh
                                    name="Object_180"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_180.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="Cube016_91"
                                position={[-4.98200369, 5.49587345, 5.09842014]}
                                rotation={[0, 0, -2.17442744]}
                            >
                                <mesh
                                    name="Object_182"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_182.geometry}
                                    material={materials["spw_gradient.002"]}
                                />
                            </group>
                            <group
                                name="spw_build_mine_coal004_92"
                                position={[6.31191063, 4.87564278, 5.43212891]}
                            >
                                <mesh
                                    name="Object_184"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_184.geometry}
                                    material={materials["spw_gradient.003"]}
                                />
                            </group>
                            <group
                                name="spw_build_mine_coal003_93"
                                position={[8.09760284, 6.17224503, 4.39988947]}
                            >
                                <mesh
                                    name="Object_186"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_186.geometry}
                                    material={materials["spw_gradient.003"]}
                                />
                            </group>
                            <group
                                name="spw_build_mine_coal002_94"
                                position={[8.09782791, 4.15495205, 4.40027666]}
                            >
                                <mesh
                                    name="Object_188"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_188.geometry}
                                    material={materials["spw_gradient.003"]}
                                />
                            </group>
                            <group
                                name="spw_build_mine_coal001_95"
                                position={[6.31242275, 6.17224598, 5.43183327]}
                            >
                                <mesh
                                    name="Object_190"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_190.geometry}
                                    material={materials["spw_gradient.003"]}
                                />
                            </group>
                            <group
                                name="Cylinder024_96"
                                position={[0.77039027, 9.81435966, -5.89388561]}
                            >
                                <mesh
                                    name="Object_192"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_192.geometry}
                                    material={materials["spw_gradient.004"]}
                                />
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </a.group>
    );
}
