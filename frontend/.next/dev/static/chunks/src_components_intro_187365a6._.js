(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/intro/SplashScreen.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bg": "SplashScreen-module__i3kWda__bg",
  "divider": "SplashScreen-module__i3kWda__divider",
  "dot": "SplashScreen-module__i3kWda__dot",
  "emberRise": "SplashScreen-module__i3kWda__emberRise",
  "enterBtn": "SplashScreen-module__i3kWda__enterBtn",
  "exitOverlay": "SplashScreen-module__i3kWda__exitOverlay",
  "finalEmber": "SplashScreen-module__i3kWda__finalEmber",
  "finalFxLayer": "SplashScreen-module__i3kWda__finalFxLayer",
  "finalReveal": "SplashScreen-module__i3kWda__finalReveal",
  "finalSmokeA": "SplashScreen-module__i3kWda__finalSmokeA",
  "finalSmokeB": "SplashScreen-module__i3kWda__finalSmokeB",
  "fireBloom": "SplashScreen-module__i3kWda__fireBloom",
  "fireBridge": "SplashScreen-module__i3kWda__fireBridge",
  "heroAtmosphere": "SplashScreen-module__i3kWda__heroAtmosphere",
  "heroCanvas": "SplashScreen-module__i3kWda__heroCanvas",
  "heroStage": "SplashScreen-module__i3kWda__heroStage",
  "houseName": "SplashScreen-module__i3kWda__houseName",
  "housesRow": "SplashScreen-module__i3kWda__housesRow",
  "ornament": "SplashScreen-module__i3kWda__ornament",
  "overlay": "SplashScreen-module__i3kWda__overlay",
  "revealFrame": "SplashScreen-module__i3kWda__revealFrame",
  "revealGlow": "SplashScreen-module__i3kWda__revealGlow",
  "revealPiece": "SplashScreen-module__i3kWda__revealPiece",
  "root": "SplashScreen-module__i3kWda__root",
  "smokeShiftA": "SplashScreen-module__i3kWda__smokeShiftA",
  "smokeShiftB": "SplashScreen-module__i3kWda__smokeShiftB",
  "smokeVeil": "SplashScreen-module__i3kWda__smokeVeil",
  "subtitle": "SplashScreen-module__i3kWda__subtitle",
  "title": "SplashScreen-module__i3kWda__title",
});
}),
"[project]/src/components/intro/SplashScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplashScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/intro/SplashScreen.module.css [app-client] (css module)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const ThroneScene3D = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/intro/ThroneScene3D.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/intro/ThroneScene3D.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = ThroneScene3D;
const TITLE_CHARS = 'IRON\u00A0THRONE'.split('');
const HOUSES = [
    'House Stark',
    'House Lannister',
    'House Targaryen',
    'House Tyrell'
];
const REVEAL_IMAGE = '/images/ui/got-main-splash.png';
const REVEAL_COLS = 4;
const REVEAL_ROWS = 3;
const REVEAL_PIECES = Array.from({
    length: REVEAL_COLS * REVEAL_ROWS
}, (_, idx)=>{
    const col = idx % REVEAL_COLS;
    const row = Math.floor(idx / REVEAL_COLS);
    const left = col / REVEAL_COLS * 100;
    const right = (col + 1) / REVEAL_COLS * 100;
    const top = row / REVEAL_ROWS * 100;
    const bottom = (row + 1) / REVEAL_ROWS * 100;
    const fromLeft = col < REVEAL_COLS / 2;
    const horizontalDistance = fromLeft ? -(740 + col * 70) : 740 + (REVEAL_COLS - col) * 70;
    const verticalOffset = (row - 1) * 32;
    return {
        id: `piece-${row}-${col}`,
        clipPath: `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`,
        start: {
            x: horizontalDistance,
            y: verticalOffset,
            rotate: fromLeft ? -10 + row * 2 : 10 - row * 2,
            scale: 1.1
        }
    };
});
function SplashScreen() {
    _s();
    const [exiting, setExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleEnter = ()=>{
        setExiting(true);
        setTimeout(()=>router.push('/simulation'), 900);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].root,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bg
            }, void 0, false, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroStage,
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: [
                        0,
                        1,
                        1,
                        0
                    ]
                },
                transition: {
                    duration: 10.8,
                    times: [
                        0,
                        0.1,
                        0.82,
                        1
                    ]
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroCanvas,
                        initial: {
                            scale: 1.14,
                            y: 40
                        },
                        animate: {
                            scale: [
                                1.14,
                                1.02,
                                1.08
                            ],
                            y: [
                                40,
                                0,
                                -12
                            ]
                        },
                        transition: {
                            duration: 9.3,
                            ease: [
                                0.2,
                                0.9,
                                0.2,
                                1
                            ],
                            times: [
                                0,
                                0.7,
                                1
                            ]
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThroneScene3D, {}, void 0, false, {
                            fileName: "[project]/src/components/intro/SplashScreen.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroAtmosphere,
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: [
                                0,
                                0.8,
                                0.35
                            ]
                        },
                        transition: {
                            duration: 2.3,
                            delay: 0.9,
                            times: [
                                0,
                                0.55,
                                1
                            ]
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay,
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: [
                        0,
                        1,
                        1,
                        0
                    ]
                },
                transition: {
                    duration: 10.8,
                    times: [
                        0,
                        0.12,
                        0.79,
                        1
                    ]
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ornament,
                        initial: {
                            opacity: 0,
                            scaleX: 0
                        },
                        animate: {
                            opacity: 0.65,
                            scaleX: 1
                        },
                        transition: {
                            duration: 1,
                            delay: 1.4
                        },
                        children: "✦ ── ── ── ── ── ── ── ── ── ── ✦"
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: TITLE_CHARS.map((char, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                initial: {
                                    opacity: 0,
                                    y: -45,
                                    filter: 'blur(10px)'
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)'
                                },
                                transition: {
                                    duration: 0.55,
                                    delay: 1.75 + i * 0.075,
                                    ease: 'easeOut'
                                },
                                children: char
                            }, i, false, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                        initial: {
                            opacity: 0,
                            letterSpacing: '0.15em'
                        },
                        animate: {
                            opacity: 1,
                            letterSpacing: '0.5em'
                        },
                        transition: {
                            duration: 1.4,
                            delay: 3.0
                        },
                        children: "Chaos of Crowns"
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].divider,
                        initial: {
                            scaleX: 0
                        },
                        animate: {
                            scaleX: 1
                        },
                        transition: {
                            duration: 0.9,
                            delay: 3.5
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].housesRow,
                        initial: "hidden",
                        animate: "visible",
                        variants: {
                            visible: {
                                transition: {
                                    staggerChildren: 0.14,
                                    delayChildren: 3.7
                                }
                            },
                            hidden: {}
                        },
                        children: HOUSES.map((house, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].houseName,
                                variants: {
                                    hidden: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.4
                                        }
                                    }
                                },
                                children: [
                                    house,
                                    i < HOUSES.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dot,
                                        children: "◆"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, house, true, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ornament,
                        initial: {
                            opacity: 0,
                            scaleX: 0
                        },
                        animate: {
                            opacity: 0.65,
                            scaleX: 1
                        },
                        transition: {
                            duration: 1,
                            delay: 4.8
                        },
                        children: "✦ ── ── ── ── ── ── ── ── ── ── ✦"
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fireBridge,
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: [
                        0,
                        0,
                        1,
                        0.92,
                        0
                    ]
                },
                transition: {
                    duration: 11.4,
                    times: [
                        0,
                        0.62,
                        0.72,
                        0.84,
                        1
                    ]
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fireBloom,
                        initial: {
                            scale: 0.86,
                            opacity: 0
                        },
                        animate: {
                            scale: [
                                0.86,
                                1.08,
                                1.24
                            ],
                            opacity: [
                                0,
                                0.85,
                                0
                            ]
                        },
                        transition: {
                            duration: 2.2,
                            delay: 7.0,
                            times: [
                                0,
                                0.42,
                                1
                            ]
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].smokeVeil,
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: [
                                0,
                                0.76,
                                0.15,
                                0
                            ]
                        },
                        transition: {
                            duration: 2.5,
                            delay: 6.9,
                            times: [
                                0,
                                0.38,
                                0.8,
                                1
                            ]
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].finalReveal,
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: [
                        0,
                        0,
                        1,
                        1
                    ]
                },
                transition: {
                    duration: 12,
                    times: [
                        0,
                        0.69,
                        0.8,
                        1
                    ]
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].finalFxLayer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].finalSmokeA
                            }, void 0, false, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].finalSmokeB
                            }, void 0, false, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            Array.from({
                                length: 24
                            }, (_, i)=>{
                                const left = i * 17 % 100 + '%';
                                const delay = `${i % 8 * 0.22}s`;
                                const duration = `${2.4 + i % 5 * 0.45}s`;
                                const size = `${3 + i % 4 * 2}px`;
                                const particleStyle = {
                                    left,
                                    animationDelay: delay,
                                    animationDuration: duration,
                                    width: size,
                                    height: size
                                };
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].finalEmber,
                                    style: particleStyle
                                }, `fx-ember-${i}`, false, {
                                    fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                    lineNumber: 241,
                                    columnNumber: 20
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].revealFrame,
                        initial: {
                            scale: 1.06,
                            filter: 'blur(8px)'
                        },
                        animate: {
                            scale: 1,
                            filter: 'blur(0px)'
                        },
                        transition: {
                            duration: 1.2,
                            delay: 8.2,
                            ease: [
                                0.16,
                                1,
                                0.3,
                                1
                            ]
                        },
                        children: [
                            REVEAL_PIECES.map((piece, index)=>{
                                const pieceStyle = {
                                    clipPath: piece.clipPath,
                                    backgroundImage: `url(${REVEAL_IMAGE})`
                                };
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].revealPiece,
                                    style: pieceStyle,
                                    initial: {
                                        opacity: 0,
                                        x: piece.start.x,
                                        y: piece.start.y,
                                        rotate: piece.start.rotate,
                                        scale: piece.start.scale,
                                        filter: 'blur(8px)'
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0,
                                        y: 0,
                                        rotate: 0,
                                        scale: 1,
                                        filter: 'blur(0px)'
                                    },
                                    transition: {
                                        duration: 1.05,
                                        delay: 8.3 + index * 0.13,
                                        ease: [
                                            0.22,
                                            1,
                                            0.36,
                                            1
                                        ]
                                    }
                                }, piece.id, false, {
                                    fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].revealGlow,
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: [
                                        0,
                                        0.9,
                                        0.35
                                    ]
                                },
                                transition: {
                                    duration: 1.1,
                                    delay: 9.25,
                                    times: [
                                        0,
                                        0.45,
                                        1
                                    ]
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].enterBtn,
                        initial: {
                            opacity: 0,
                            y: 18
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.85,
                            delay: 9.65
                        },
                        whileHover: {
                            scale: 1.04
                        },
                        whileTap: {
                            scale: 0.96
                        },
                        onClick: handleEnter,
                        children: "Enter the Realm"
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            exiting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].exitOverlay,
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    duration: 0.85
                }
            }, void 0, false, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 310,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/intro/SplashScreen.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(SplashScreen, "k1M4Z9HtGvkmS7ijxv/a7F9GxHU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = SplashScreen;
var _c, _c1;
__turbopack_context__.k.register(_c, "ThroneScene3D");
__turbopack_context__.k.register(_c1, "SplashScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_intro_187365a6._.js.map