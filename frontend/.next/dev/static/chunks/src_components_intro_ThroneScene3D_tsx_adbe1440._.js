(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/intro/ThroneScene3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThroneScene3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function CameraRig() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "CameraRig.useFrame": ({ camera, clock })=>{
            const elapsed = clock.getElapsedTime();
            camera.position.x = Math.sin(elapsed * 0.12) * 0.95;
            camera.position.y = 3.45 + Math.sin(elapsed * 0.17) * 0.16;
            camera.position.z = 11.25 + Math.cos(elapsed * 0.13) * 0.42;
            camera.lookAt(0, 3.05, -0.15);
        }
    }["CameraRig.useFrame"]);
    return null;
}
_s(CameraRig, "xC67171NPRcCAzsbrenetil66NI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = CameraRig;
function CrownModel() {
    _s1();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const coreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const elapsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const radius = 1.34;
    const spikes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CrownModel.useMemo[spikes]": ()=>{
            const count = 9;
            return Array.from({
                length: count
            }, {
                "CrownModel.useMemo[spikes]": (_, index)=>({
                        angle: index / count * Math.PI * 2,
                        height: index % 2 === 0 ? 1 : 0.56,
                        tall: index % 2 === 0
                    })
            }["CrownModel.useMemo[spikes]"]);
        }
    }["CrownModel.useMemo[spikes]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "CrownModel.useFrame": (_, delta)=>{
            elapsed.current += delta;
            if (groupRef.current) {
                groupRef.current.rotation.y += delta * 0.24;
                groupRef.current.position.y = 6.1 + Math.sin(elapsed.current * 1.2) * 0.08;
            }
            if (coreRef.current) {
                const material = coreRef.current.material;
                material.emissiveIntensity = 0.38 + Math.sin(elapsed.current * 2.3) * 0.12;
            }
        }
    }["CrownModel.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: [
            0,
            6.1,
            0.3
        ],
        scale: 1.15,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                rotation: [
                    Math.PI / 2,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                        args: [
                            radius,
                            0.08,
                            18,
                            72
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#b8944d",
                        metalness: 1,
                        roughness: 0.18,
                        emissive: "#241507",
                        emissiveIntensity: 0.15
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                rotation: [
                    Math.PI / 2,
                    0,
                    0
                ],
                position: [
                    0,
                    -0.28,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                        args: [
                            radius * 0.92,
                            0.05,
                            14,
                            72
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#7a5b2a",
                        metalness: 0.95,
                        roughness: 0.28
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            spikes.map((spike, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        Math.sin(spike.angle) * radius,
                        spike.height / 2 + 0.02,
                        Math.cos(spike.angle) * radius
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                            args: [
                                spike.tall ? 0.08 : 0.05,
                                spike.height,
                                7
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: spike.tall ? '#d6ba7a' : '#a78244',
                            metalness: 1,
                            roughness: 0.14,
                            emissive: spike.tall ? '#5a3510' : '#1b1108',
                            emissiveIntensity: spike.tall ? 0.22 : 0.05
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: coreRef,
                position: [
                    0,
                    0.2,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.55,
                            24,
                            24
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#6f4316",
                        emissive: "#a15a1a",
                        transparent: true,
                        opacity: 0.08
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s1(CrownModel, "0rtOaiIZlKkq1JwcGH6iJrU50ow=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = CrownModel;
function FloatingAsset({ url, position, rotation, targetSize, bob, spin, startDelay }) {
    _s2();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { scene } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(url);
    const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FloatingAsset.useMemo[model]": ()=>scene.clone(true)
    }["FloatingAsset.useMemo[model]"], [
        scene
    ]);
    const normalizedScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FloatingAsset.useMemo[normalizedScale]": ()=>{
            const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(model);
            const size = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
            const maxDimension = Math.max(size.x, size.y, size.z);
            return maxDimension > 0 ? targetSize / maxDimension : 1;
        }
    }["FloatingAsset.useMemo[normalizedScale]"], [
        model,
        targetSize
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FloatingAsset.useEffect": ()=>{
            model.traverse({
                "FloatingAsset.useEffect": (child)=>{
                    if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        const material = child.material;
                        if (material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]) {
                            material.roughness = Math.min(1, material.roughness * 1.04);
                            material.metalness = Math.min(1, material.metalness + 0.06);
                        }
                    }
                }
            }["FloatingAsset.useEffect"]);
        }
    }["FloatingAsset.useEffect"], [
        model
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "FloatingAsset.useFrame": ({ clock })=>{
            if (!groupRef.current) return;
            const elapsed = clock.getElapsedTime();
            const entranceProgress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp((elapsed - startDelay) / 1.2, 0, 1);
            const eased = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].smoothstep(entranceProgress, 0, 1);
            groupRef.current.visible = entranceProgress > 0;
            groupRef.current.scale.setScalar(0.001 + eased);
            groupRef.current.position.y = position[1] - (1 - eased) * 0.65 + Math.sin(elapsed * 0.9 + spin) * bob;
            groupRef.current.rotation.y = rotation[1] + elapsed * spin;
            groupRef.current.rotation.z = rotation[2] + Math.sin(elapsed * 0.7 + spin) * 0.05;
        }
    }["FloatingAsset.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: position,
        rotation: rotation,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
            object: model,
            scale: normalizedScale
        }, void 0, false, {
            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
            lineNumber: 148,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
_s2(FloatingAsset, "Ada7scAOwf+sJU7v5b8eGKviswI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = FloatingAsset;
function SmokeWisps() {
    _s3();
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const count = 180;
    const { geometry, velocity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SmokeWisps.useMemo": ()=>{
            const positions = new Float32Array(count * 3);
            const velocity = new Float32Array(count * 3);
            for(let index = 0; index < count; index += 1){
                const angle = Math.random() * Math.PI * 2;
                const radius = 0.8 + Math.random() * 3.8;
                positions[index * 3] = Math.cos(angle) * radius;
                positions[index * 3 + 1] = 0.5 + Math.random() * 2.8;
                positions[index * 3 + 2] = Math.sin(angle) * radius * 0.7;
                velocity[index * 3] = (Math.random() - 0.5) * 0.0012;
                velocity[index * 3 + 1] = 0.0015 + Math.random() * 0.0022;
                velocity[index * 3 + 2] = (Math.random() - 0.5) * 0.0012;
            }
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
            return {
                geometry,
                velocity
            };
        }
    }["SmokeWisps.useMemo"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "SmokeWisps.useFrame": ()=>{
            if (!pointsRef.current) return;
            const positions = pointsRef.current.geometry.attributes.position.array;
            for(let index = 0; index < count; index += 1){
                positions[index * 3] += velocity[index * 3];
                positions[index * 3 + 1] += velocity[index * 3 + 1];
                positions[index * 3 + 2] += velocity[index * 3 + 2];
                if (positions[index * 3 + 1] > 5.4) {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = 0.7 + Math.random() * 3.6;
                    positions[index * 3] = Math.cos(angle) * radius;
                    positions[index * 3 + 1] = 0.45;
                    positions[index * 3 + 2] = Math.sin(angle) * radius * 0.7;
                }
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    }["SmokeWisps.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        geometry: geometry,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
            color: "#9f8570",
            size: 0.18,
            transparent: true,
            opacity: 0.14,
            depthWrite: false,
            sizeAttenuation: true
        }, void 0, false, {
            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
            lineNumber: 201,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
_s3(SmokeWisps, "D5oinwIlrFjXGLGk+bpK8/OFa9A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c3 = SmokeWisps;
function Sword({ position, rotation, scale = 1, bladeHeight = 1.8, bladeWidth = 0.08 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        rotation: rotation,
        scale: scale,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    bladeHeight * 0.5,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            bladeWidth,
                            bladeHeight,
                            0.12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#7d7b78",
                        metalness: 0.82,
                        roughness: 0.32
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    bladeHeight + 0.14,
                    0
                ],
                rotation: [
                    0,
                    0,
                    Math.PI
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                        args: [
                            bladeWidth * 1.35,
                            0.34,
                            5
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#8a8783",
                        metalness: 0.88,
                        roughness: 0.28
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.06,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.32,
                            0.08,
                            0.18
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#5c4020",
                        metalness: 0.55,
                        roughness: 0.68
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.17,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.05,
                            0.05,
                            0.34,
                            10
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#3c2615",
                        metalness: 0.22,
                        roughness: 0.85
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_c4 = Sword;
function ThroneModel() {
    _s4();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const swords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ThroneModel.useMemo[swords]": ()=>{
            const backFan = Array.from({
                length: 23
            }, {
                "ThroneModel.useMemo[swords].backFan": (_, index)=>{
                    const spread = -1 + index / 22 * 2;
                    const centerBias = 1 - Math.abs(spread);
                    return {
                        position: [
                            spread * 2.75,
                            3.15 + Math.abs(spread) * 0.95,
                            -1.2 + centerBias * 0.22
                        ],
                        rotation: [
                            0.05,
                            spread * 0.06,
                            spread * -0.88
                        ],
                        scale: 0.86 + centerBias * 0.24,
                        bladeHeight: 2.2 + centerBias * 2.2,
                        bladeWidth: 0.06 + centerBias * 0.02
                    };
                }
            }["ThroneModel.useMemo[swords].backFan"]);
            const sideWalls = Array.from({
                length: 16
            }, {
                "ThroneModel.useMemo[swords].sideWalls": (_, index)=>{
                    const left = index < 8;
                    const localIndex = left ? index : index - 8;
                    const rise = localIndex / 7;
                    return {
                        position: [
                            left ? -2.95 + rise * 0.3 : 2.95 - rise * 0.3,
                            1.05 + localIndex * 0.56,
                            0.55 - rise * 0.9
                        ],
                        rotation: [
                            0.12,
                            left ? 0.24 : -0.24,
                            left ? -1.18 + rise * 0.16 : 1.18 - rise * 0.16
                        ],
                        scale: 0.84,
                        bladeHeight: 1.55 + rise * 1.2,
                        bladeWidth: 0.07
                    };
                }
            }["ThroneModel.useMemo[swords].sideWalls"]);
            const lowerFan = Array.from({
                length: 12
            }, {
                "ThroneModel.useMemo[swords].lowerFan": (_, index)=>{
                    const spread = -1 + index / 11 * 2;
                    return {
                        position: [
                            spread * 2.4,
                            1.45 + Math.abs(spread) * 0.28,
                            -0.15
                        ],
                        rotation: [
                            0.14,
                            0,
                            spread * -0.58
                        ],
                        scale: 0.78,
                        bladeHeight: 1.55,
                        bladeWidth: 0.07
                    };
                }
            }["ThroneModel.useMemo[swords].lowerFan"]);
            const crownHalo = Array.from({
                length: 10
            }, {
                "ThroneModel.useMemo[swords].crownHalo": (_, index)=>{
                    const spread = -1 + index / 9 * 2;
                    const centerBias = 1 - Math.abs(spread);
                    return {
                        position: [
                            spread * 1.55,
                            5.15 + centerBias * 0.9,
                            -0.96 - centerBias * 0.1
                        ],
                        rotation: [
                            0.08,
                            spread * 0.08,
                            spread * -0.42
                        ],
                        scale: 0.64 + centerBias * 0.08,
                        bladeHeight: 1.6 + centerBias * 1.35,
                        bladeWidth: 0.05
                    };
                }
            }["ThroneModel.useMemo[swords].crownHalo"]);
            const seatDaggers = Array.from({
                length: 8
            }, {
                "ThroneModel.useMemo[swords].seatDaggers": (_, index)=>{
                    const spread = -1 + index / 7 * 2;
                    return {
                        position: [
                            spread * 1.18,
                            2.18 + Math.abs(spread) * 0.12,
                            0.18
                        ],
                        rotation: [
                            0.6,
                            0,
                            spread * -0.18
                        ],
                        scale: 0.48,
                        bladeHeight: 1.2,
                        bladeWidth: 0.05
                    };
                }
            }["ThroneModel.useMemo[swords].seatDaggers"]);
            return [
                ...backFan,
                ...sideWalls,
                ...lowerFan,
                ...crownHalo,
                ...seatDaggers
            ];
        }
    }["ThroneModel.useMemo[swords]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ThroneModel.useFrame": ({ clock })=>{
            if (!groupRef.current) return;
            const elapsed = clock.getElapsedTime();
            groupRef.current.rotation.y = Math.sin(elapsed * 0.18) * 0.05;
            groupRef.current.position.y = Math.sin(elapsed * 0.42) * 0.05 - 0.18;
        }
    }["ThroneModel.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: [
            0,
            -0.18,
            0
        ],
        scale: 1.08,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.18,
                    0.08
                ],
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            5.2,
                            0.42,
                            3.5
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#261912",
                        metalness: 0.08,
                        roughness: 0.92
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.52,
                    1.18
                ],
                rotation: [
                    -0.4,
                    0,
                    0
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            3.1,
                            0.16,
                            1.2
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#342219",
                        metalness: 0.12,
                        roughness: 0.88
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.86,
                    0.62
                ],
                rotation: [
                    -0.18,
                    0,
                    0
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            2.05,
                            0.22,
                            1.65
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#433025",
                        metalness: 0.14,
                        roughness: 0.84
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    1.58,
                    0.14
                ],
                rotation: [
                    0.28,
                    0,
                    0
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            1.82,
                            0.24,
                            1.06
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 339,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#3b2920",
                        metalness: 0.12,
                        roughness: 0.86
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    3.05,
                    -0.98
                ],
                rotation: [
                    0.08,
                    0,
                    0
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            1.3,
                            4.45,
                            0.34
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#382824",
                        metalness: 0.22,
                        roughness: 0.74
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 343,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    4.15,
                    -1.12
                ],
                rotation: [
                    0.06,
                    0,
                    0
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.8,
                            3.4,
                            0.22
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#2d201b",
                        metalness: 0.24,
                        roughness: 0.78
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -1.56,
                    1.42,
                    0.38
                ],
                rotation: [
                    0.08,
                    0.04,
                    -0.32
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.26,
                            1.95,
                            0.3
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#4a3220",
                        metalness: 0.16,
                        roughness: 0.82
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 353,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    1.56,
                    1.42,
                    0.38
                ],
                rotation: [
                    0.08,
                    -0.04,
                    0.32
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.26,
                            1.95,
                            0.3
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#4a3220",
                        metalness: 0.16,
                        roughness: 0.82
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -0.95,
                    1.84,
                    0.34
                ],
                rotation: [
                    0,
                    0.04,
                    -0.16
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            1.22,
                            0.14,
                            0.26
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#573928",
                        metalness: 0.16,
                        roughness: 0.74
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 364,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 362,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.95,
                    1.84,
                    0.34
                ],
                rotation: [
                    0,
                    -0.04,
                    0.16
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            1.22,
                            0.14,
                            0.26
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#573928",
                        metalness: 0.16,
                        roughness: 0.74
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 368,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 366,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    5.22,
                    -1.04
                ],
                rotation: [
                    0.08,
                    0,
                    0
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.92,
                            0.16,
                            0.26
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#4b3628",
                        metalness: 0.26,
                        roughness: 0.68
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    2.42,
                    -0.84
                ],
                rotation: [
                    0.52,
                    0,
                    0
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                        args: [
                            0.58,
                            1.08,
                            4
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 377,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#2a1c15",
                        metalness: 0.14,
                        roughness: 0.88
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 376,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    2.08,
                    0.44
                ],
                rotation: [
                    0.16,
                    0,
                    0
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            1.02,
                            0.14,
                            0.78
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#4d382b",
                        metalness: 0.12,
                        roughness: 0.84
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    2.68,
                    0.08
                ],
                rotation: [
                    0.72,
                    0,
                    0
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.34,
                            1.1,
                            0.16
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#53382a",
                        metalness: 0.14,
                        roughness: 0.82
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 386,
                columnNumber: 7
            }, this),
            swords.map((sword, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sword, {
                    position: sword.position,
                    rotation: sword.rotation,
                    scale: sword.scale,
                    bladeHeight: sword.bladeHeight,
                    bladeWidth: sword.bladeWidth
                }, index, false, {
                    fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                    lineNumber: 392,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
        lineNumber: 322,
        columnNumber: 5
    }, this);
}
_s4(ThroneModel, "o/0I8kiXUSxeACRuQ0isfTLOYzE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c5 = ThroneModel;
function Dragon({ radius, speed, phase, altitude, scale }) {
    _s5();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const leftWingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rightWingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tailRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wingShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dragon.useMemo[wingShape]": ()=>{
            const shape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"]();
            shape.moveTo(0, 0);
            shape.lineTo(1.9, 0.24);
            shape.lineTo(3.3, 1.35);
            shape.lineTo(1.4, 0.78);
            shape.lineTo(0.25, 0.34);
            shape.closePath();
            return shape;
        }
    }["Dragon.useMemo[wingShape]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Dragon.useFrame": ({ clock })=>{
            const elapsed = clock.getElapsedTime() * speed + phase;
            const x = Math.cos(elapsed) * radius;
            const z = Math.sin(elapsed) * (radius * 0.48);
            const y = altitude + Math.sin(elapsed * 1.6) * 0.34;
            if (groupRef.current) {
                groupRef.current.position.set(x, y, z);
                const nextX = Math.cos(elapsed + 0.02) * radius;
                const nextZ = Math.sin(elapsed + 0.02) * (radius * 0.48);
                groupRef.current.lookAt(nextX, y + 0.08, nextZ);
                groupRef.current.rotation.z = Math.sin(elapsed * 1.3) * 0.12;
            }
            const flap = Math.sin(clock.getElapsedTime() * 7 + phase) * 0.55;
            if (leftWingRef.current) leftWingRef.current.rotation.z = flap - 0.18;
            if (rightWingRef.current) rightWingRef.current.rotation.z = -flap + 0.18;
            if (tailRef.current) tailRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 4 + phase) * 0.28;
        }
    }["Dragon.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        scale: scale,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                        args: [
                            0.16,
                            1.1,
                            6,
                            10
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 446,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#1b130f",
                        metalness: 0.04,
                        roughness: 0.96
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 445,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.72,
                    0.06,
                    0
                ],
                rotation: [
                    0,
                    0,
                    -Math.PI / 2
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                        args: [
                            0.18,
                            0.54,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 451,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#201711",
                        roughness: 0.94
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 450,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: tailRef,
                position: [
                    -0.88,
                    -0.03,
                    0
                ],
                rotation: [
                    0,
                    0,
                    Math.PI / 2
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                        args: [
                            0.12,
                            0.92,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 456,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#1c130f",
                        roughness: 0.94
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 457,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 455,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: leftWingRef,
                position: [
                    -0.15,
                    0.08,
                    0.18
                ],
                rotation: [
                    0.2,
                    0.18,
                    -0.3
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    rotation: [
                        0,
                        0,
                        Math.PI
                    ],
                    castShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shapeGeometry", {
                            args: [
                                wingShape
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                            lineNumber: 462,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: "#241710",
                            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                            roughness: 0.95
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                            lineNumber: 463,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                    lineNumber: 461,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 460,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: rightWingRef,
                position: [
                    -0.15,
                    0.08,
                    -0.18
                ],
                rotation: [
                    -0.2,
                    -0.18,
                    0.3
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    rotation: [
                        0,
                        Math.PI,
                        Math.PI
                    ],
                    castShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shapeGeometry", {
                            args: [
                                wingShape
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                            lineNumber: 469,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: "#241710",
                            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                            roughness: 0.95
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                            lineNumber: 470,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                    lineNumber: 468,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 467,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
        lineNumber: 444,
        columnNumber: 5
    }, this);
}
_s5(Dragon, "hg5/uluh6Wdhc/P52X3e4Nv7O6Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c6 = Dragon;
function Embers() {
    _s6();
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const count = 320;
    const { geometry, velocity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Embers.useMemo": ()=>{
            const positions = new Float32Array(count * 3);
            const velocity = new Float32Array(count * 3);
            for(let index = 0; index < count; index += 1){
                const theta = Math.random() * Math.PI * 2;
                const radius = 1 + Math.random() * 5;
                positions[index * 3] = Math.cos(theta) * radius;
                positions[index * 3 + 1] = -1.4 + Math.random() * 6.4;
                positions[index * 3 + 2] = Math.sin(theta) * radius * 0.65;
                velocity[index * 3] = (Math.random() - 0.5) * 0.0025;
                velocity[index * 3 + 1] = 0.008 + Math.random() * 0.012;
                velocity[index * 3 + 2] = (Math.random() - 0.5) * 0.0025;
            }
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
            return {
                geometry,
                velocity
            };
        }
    }["Embers.useMemo"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Embers.useFrame": ()=>{
            if (!pointsRef.current) return;
            const positions = pointsRef.current.geometry.attributes.position.array;
            for(let index = 0; index < count; index += 1){
                positions[index * 3] += velocity[index * 3];
                positions[index * 3 + 1] += velocity[index * 3 + 1];
                positions[index * 3 + 2] += velocity[index * 3 + 2];
                if (positions[index * 3 + 1] > 6.1) {
                    const theta = Math.random() * Math.PI * 2;
                    const radius = 0.9 + Math.random() * 4.4;
                    positions[index * 3] = Math.cos(theta) * radius;
                    positions[index * 3 + 1] = -1.5;
                    positions[index * 3 + 2] = Math.sin(theta) * radius * 0.65;
                }
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    }["Embers.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        geometry: geometry,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
            color: "#c08a46",
            size: 0.05,
            transparent: true,
            opacity: 0.75,
            sizeAttenuation: true
        }, void 0, false, {
            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
            lineNumber: 526,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
        lineNumber: 525,
        columnNumber: 5
    }, this);
}
_s6(Embers, "D5oinwIlrFjXGLGk+bpK8/OFa9A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c7 = Embers;
function Stage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    '#090604'
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 534,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                attach: "fog",
                args: [
                    '#090604',
                    10,
                    20
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 535,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.22,
                color: "#6d5436"
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 537,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    2.2,
                    8.4,
                    6
                ],
                intensity: 1.75,
                color: "#f2d7a8",
                castShadow: true
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 538,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("spotLight", {
                position: [
                    -5.2,
                    7.4,
                    4.2
                ],
                angle: 0.34,
                penumbra: 0.7,
                intensity: 1.9,
                color: "#8a5627"
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 539,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("spotLight", {
                position: [
                    4.8,
                    6.4,
                    2.6
                ],
                angle: 0.28,
                penumbra: 0.8,
                intensity: 0.95,
                color: "#6d3c18"
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 540,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    0,
                    5.2,
                    1.5
                ],
                intensity: 2.7,
                distance: 12,
                color: "#d0a06a"
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 541,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    0,
                    1.5,
                    3.6
                ],
                intensity: 1.55,
                distance: 9,
                color: "#4f2b12"
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 542,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    0,
                    3.8,
                    -2.2
                ],
                intensity: 0.75,
                distance: 8,
                color: "#b8c0d2"
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    4.9,
                    5.4,
                    4.1
                ],
                intensity: 1.45,
                distance: 10,
                color: "#e0b178"
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                rotation: [
                    -Math.PI / 2,
                    0,
                    0
                ],
                position: [
                    0,
                    -0.48,
                    0
                ],
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            11,
                            64
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 547,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#130d09",
                        roughness: 0.96,
                        metalness: 0.08
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 546,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                rotation: [
                    -Math.PI / 2,
                    0,
                    0
                ],
                position: [
                    0,
                    -0.44,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                        args: [
                            2.4,
                            6.2,
                            64
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 552,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#4b2e16",
                        transparent: true,
                        opacity: 0.18,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 553,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 551,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThroneModel, {}, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 556,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CrownModel, {}, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 557,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dragon, {
                radius: 7.4,
                speed: 0.36,
                phase: 0.2,
                altitude: 5.7,
                scale: 0.86
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 558,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dragon, {
                radius: 6.2,
                speed: -0.42,
                phase: 1.8,
                altitude: 4.8,
                scale: 0.62
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 559,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dragon, {
                radius: 8.1,
                speed: 0.28,
                phase: 3.4,
                altitude: 6.3,
                scale: 0.72
            }, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 560,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingAsset, {
                        url: "/models/iron_throne_from_game_of_thrones.glb",
                        position: [
                            0,
                            4.05,
                            2.95
                        ],
                        rotation: [
                            0.1,
                            0.15,
                            0
                        ],
                        targetSize: 1.7,
                        bob: 0.08,
                        spin: 0.3,
                        startDelay: 1.0
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 562,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingAsset, {
                        url: "/models/game_of_thrones_wildlings_dagger.glb",
                        position: [
                            -3.2,
                            3.35,
                            3.25
                        ],
                        rotation: [
                            0.62,
                            -0.34,
                            -1.18
                        ],
                        targetSize: 0.9,
                        bob: 0.09,
                        spin: 0.34,
                        startDelay: 1.55
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 571,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingAsset, {
                        url: "/models/game_of_thrones_wildlings_dagger.glb",
                        position: [
                            3.2,
                            3.35,
                            3.25
                        ],
                        rotation: [
                            0.62,
                            0.34,
                            1.18
                        ],
                        targetSize: 0.9,
                        bob: 0.09,
                        spin: -0.34,
                        startDelay: 2.0
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 580,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingAsset, {
                        url: "/models/game_of_thrones_astrolabe.glb",
                        position: [
                            -2.2,
                            4.55,
                            3.5
                        ],
                        rotation: [
                            0.2,
                            0.52,
                            -0.16
                        ],
                        targetSize: 1.35,
                        bob: 0.06,
                        spin: 0.28,
                        startDelay: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 589,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingAsset, {
                        url: "/models/game_of_thrones_astrolabe.glb",
                        position: [
                            2.2,
                            2.05,
                            3.5
                        ],
                        rotation: [
                            0.2,
                            -0.52,
                            0.16
                        ],
                        targetSize: 1.35,
                        bob: 0.06,
                        spin: -0.28,
                        startDelay: 1.15
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                        lineNumber: 598,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 561,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Embers, {}, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 608,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SmokeWisps, {}, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 609,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraRig, {}, void 0, false, {
                fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
                lineNumber: 610,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c8 = Stage;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload('/models/iron_throne_from_game_of_thrones.glb');
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload('/models/game_of_thrones_astrolabe.glb');
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload('/models/game_of_thrones_wildlings_dagger.glb');
function ThroneScene3D() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        camera: {
            position: [
                0,
                3.45,
                11.25
            ],
            fov: 29
        },
        gl: {
            antialias: true,
            alpha: true
        },
        shadows: true,
        style: {
            background: 'transparent'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stage, {}, void 0, false, {
            fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
            lineNumber: 627,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/intro/ThroneScene3D.tsx",
        lineNumber: 621,
        columnNumber: 5
    }, this);
}
_c9 = ThroneScene3D;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "CameraRig");
__turbopack_context__.k.register(_c1, "CrownModel");
__turbopack_context__.k.register(_c2, "FloatingAsset");
__turbopack_context__.k.register(_c3, "SmokeWisps");
__turbopack_context__.k.register(_c4, "Sword");
__turbopack_context__.k.register(_c5, "ThroneModel");
__turbopack_context__.k.register(_c6, "Dragon");
__turbopack_context__.k.register(_c7, "Embers");
__turbopack_context__.k.register(_c8, "Stage");
__turbopack_context__.k.register(_c9, "ThroneScene3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/intro/ThroneScene3D.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/intro/ThroneScene3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_intro_ThroneScene3D_tsx_adbe1440._.js.map