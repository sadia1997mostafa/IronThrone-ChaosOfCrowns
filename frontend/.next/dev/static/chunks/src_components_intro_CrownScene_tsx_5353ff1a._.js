(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/intro/CrownScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CrownScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
// ─── Crown geometry built entirely from Three.js primitives ───────────────────
function Crown() {
    _s();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const coreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const elapsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const RADIUS = 2.35;
    // 9 alternating tall / short spikes
    const spikes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Crown.useMemo[spikes]": ()=>{
            const count = 9;
            return Array.from({
                length: count
            }, {
                "Crown.useMemo[spikes]": (_, i)=>({
                        angle: i / count * Math.PI * 2,
                        height: i % 2 === 0 ? 1.75 : 0.9,
                        tall: i % 2 === 0
                    })
            }["Crown.useMemo[spikes]"]);
        }
    }["Crown.useMemo[spikes]"], []);
    // 8 jewels around the ring, alternating colors
    const jewels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Crown.useMemo[jewels]": ()=>[
                '#cc0000',
                '#ff8800',
                '#ffcc00',
                '#ff4400',
                '#cc0000',
                '#aa7700',
                '#ffcc00',
                '#ff4400'
            ]
    }["Crown.useMemo[jewels]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Crown.useFrame": (_, delta)=>{
            elapsed.current += delta;
            // slow rotation
            if (groupRef.current) groupRef.current.rotation.y += delta * 0.28;
            // pulsing inner fire glow
            if (coreRef.current) {
                ;
                coreRef.current.material.emissiveIntensity = 0.55 + Math.sin(elapsed.current * 2.8) * 0.35;
            }
        }
    }["Crown.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
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
                            RADIUS,
                            0.13,
                            20,
                            80
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/CrownScene.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#c9a630",
                        metalness: 1,
                        roughness: 0.1,
                        emissive: "#3a2400",
                        emissiveIntensity: 0.35
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/CrownScene.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 46,
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
                    -0.46,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                        args: [
                            RADIUS * 0.95,
                            0.08,
                            16,
                            80
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/CrownScene.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#a07828",
                        metalness: 1,
                        roughness: 0.2
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/CrownScene.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            spikes.map(({ angle, height, tall }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        Math.sin(angle) * RADIUS,
                        height / 2 + 0.04,
                        Math.cos(angle) * RADIUS
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                            args: [
                                tall ? 0.13 : 0.09,
                                height,
                                8
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/CrownScene.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: tall ? '#ffe066' : '#c9a630',
                            metalness: 1,
                            roughness: 0.08,
                            emissive: tall ? '#ff4400' : '#1a0e00',
                            emissiveIntensity: tall ? 0.65 : 0.1
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/CrownScene.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/intro/CrownScene.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)),
            jewels.map((color, i)=>{
                const angle = i / jewels.length * Math.PI * 2;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        Math.sin(angle) * RADIUS,
                        0.09,
                        Math.cos(angle) * RADIUS
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                            args: [
                                0.1,
                                16,
                                16
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/CrownScene.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: color,
                            emissive: color,
                            emissiveIntensity: 3,
                            roughness: 0.05,
                            metalness: 0.2
                        }, void 0, false, {
                            fileName: "[project]/src/components/intro/CrownScene.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this)
                    ]
                }, `jewel-${i}`, true, {
                    fileName: "[project]/src/components/intro/CrownScene.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: coreRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            1.18,
                            32,
                            32
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/CrownScene.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#ff1a00",
                        emissive: "#ff2200",
                        emissiveIntensity: 0.6,
                        transparent: true,
                        opacity: 0.1
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/CrownScene.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.45,
                            32,
                            32
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/CrownScene.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#ffaa00",
                        emissive: "#ffbb00",
                        emissiveIntensity: 4,
                        transparent: true,
                        opacity: 0.07
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/CrownScene.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/intro/CrownScene.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(Crown, "jyQG1uE3T5Ww1TDVBdAR7DY0X/g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Crown;
// ─── Rising ember particles ────────────────────────────────────────────────────
function Embers() {
    _s1();
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const COUNT = 500;
    const { geometry, vel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Embers.useMemo": ()=>{
            const positions = new Float32Array(COUNT * 3);
            const vel = new Float32Array(COUNT * 3);
            for(let i = 0; i < COUNT; i++){
                const theta = Math.random() * Math.PI * 2;
                const r = 1 + Math.random() * 4.5;
                positions[i * 3 + 0] = Math.cos(theta) * r;
                positions[i * 3 + 1] = (Math.random() - 0.35) * 7;
                positions[i * 3 + 2] = Math.sin(theta) * r;
                vel[i * 3 + 0] = (Math.random() - 0.5) * 0.007;
                vel[i * 3 + 1] = 0.006 + Math.random() * 0.018;
                vel[i * 3 + 2] = (Math.random() - 0.5) * 0.007;
            }
            const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
            return {
                geometry: geo,
                vel
            };
        }
    }["Embers.useMemo"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Embers.useFrame": ()=>{
            if (!pointsRef.current) return;
            const pos = pointsRef.current.geometry.attributes.position.array;
            for(let i = 0; i < COUNT; i++){
                pos[i * 3 + 0] += vel[i * 3 + 0];
                pos[i * 3 + 1] += vel[i * 3 + 1];
                pos[i * 3 + 2] += vel[i * 3 + 2];
                // respawn ember at bottom when it floats off the top
                if (pos[i * 3 + 1] > 5) {
                    const theta = Math.random() * Math.PI * 2;
                    const r = 1 + Math.random() * 3;
                    pos[i * 3 + 0] = Math.cos(theta) * r;
                    pos[i * 3 + 1] = -3.5;
                    pos[i * 3 + 2] = Math.sin(theta) * r;
                }
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    }["Embers.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        geometry: geometry,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
            color: "#ff7700",
            size: 0.045,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.82
        }, void 0, false, {
            fileName: "[project]/src/components/intro/CrownScene.tsx",
            lineNumber: 179,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/intro/CrownScene.tsx",
        lineNumber: 178,
        columnNumber: 5
    }, this);
}
_s1(Embers, "vcLm7sTTpP89COAguTBZqZcmA38=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = Embers;
// ─── Pulsating dynamic fire lights ────────────────────────────────────────────
function FireLights() {
    _s2();
    const centerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const elapsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "FireLights.useFrame": (_, delta)=>{
            elapsed.current += delta;
            if (centerRef.current) {
                centerRef.current.intensity = 4 + Math.sin(elapsed.current * 3.2) * 2;
            }
        }
    }["FireLights.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: centerRef,
                position: [
                    0,
                    0,
                    0
                ],
                color: "#ff4400",
                distance: 12
            }, void 0, false, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    0,
                    5,
                    0
                ],
                color: "#ff9900",
                intensity: 2,
                distance: 14
            }, void 0, false, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    5,
                    -1,
                    -2
                ],
                color: "#ffcc44",
                intensity: 1.2,
                distance: 10
            }, void 0, false, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    -5,
                    -1,
                    -2
                ],
                color: "#cc2200",
                intensity: 1.2,
                distance: 10
            }, void 0, false, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s2(FireLights, "6lS/kc7aW9EWbj8d/BaalUJMRfs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = FireLights;
function CrownScene() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        camera: {
            position: [
                0,
                1.3,
                8.5
            ],
            fov: 42
        },
        style: {
            background: 'transparent'
        },
        gl: {
            antialias: true,
            alpha: true
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.08,
                color: "#ff5500"
            }, void 0, false, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FireLights, {}, void 0, false, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Crown, {}, void 0, false, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Embers, {}, void 0, false, {
                fileName: "[project]/src/components/intro/CrownScene.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/intro/CrownScene.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
_c3 = CrownScene;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Crown");
__turbopack_context__.k.register(_c1, "Embers");
__turbopack_context__.k.register(_c2, "FireLights");
__turbopack_context__.k.register(_c3, "CrownScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/intro/CrownScene.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/intro/CrownScene.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_intro_CrownScene_tsx_5353ff1a._.js.map