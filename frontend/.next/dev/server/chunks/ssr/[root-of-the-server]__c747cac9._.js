module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/components/intro/SplashScreen.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bg": "SplashScreen-module__i3kWda__bg",
  "divider": "SplashScreen-module__i3kWda__divider",
  "dot": "SplashScreen-module__i3kWda__dot",
  "enterBtn": "SplashScreen-module__i3kWda__enterBtn",
  "exitOverlay": "SplashScreen-module__i3kWda__exitOverlay",
  "finalReveal": "SplashScreen-module__i3kWda__finalReveal",
  "heroAtmosphere": "SplashScreen-module__i3kWda__heroAtmosphere",
  "heroCard": "SplashScreen-module__i3kWda__heroCard",
  "heroImage": "SplashScreen-module__i3kWda__heroImage",
  "heroShine": "SplashScreen-module__i3kWda__heroShine",
  "heroStage": "SplashScreen-module__i3kWda__heroStage",
  "heroVignette": "SplashScreen-module__i3kWda__heroVignette",
  "houseName": "SplashScreen-module__i3kWda__houseName",
  "housesRow": "SplashScreen-module__i3kWda__housesRow",
  "ornament": "SplashScreen-module__i3kWda__ornament",
  "overlay": "SplashScreen-module__i3kWda__overlay",
  "revealFrame": "SplashScreen-module__i3kWda__revealFrame",
  "revealGlow": "SplashScreen-module__i3kWda__revealGlow",
  "revealPiece": "SplashScreen-module__i3kWda__revealPiece",
  "root": "SplashScreen-module__i3kWda__root",
  "subtitle": "SplashScreen-module__i3kWda__subtitle",
  "title": "SplashScreen-module__i3kWda__title",
});
}),
"[project]/src/components/intro/SplashScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplashScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/intro/SplashScreen.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
const TITLE_CHARS = 'IRON\u00A0THRONE'.split('');
const HOUSES = [
    'House Stark',
    'House Lannister',
    'House Targaryen',
    'House Tyrell'
];
const HERO_DUST = [
    {
        left: '8%',
        top: '20%',
        delay: 0.5,
        duration: 7.8,
        scale: 0.8
    },
    {
        left: '18%',
        top: '68%',
        delay: 1.2,
        duration: 9.2,
        scale: 1.1
    },
    {
        left: '29%',
        top: '34%',
        delay: 0.9,
        duration: 8.6,
        scale: 0.7
    },
    {
        left: '41%',
        top: '58%',
        delay: 1.8,
        duration: 10.4,
        scale: 1.2
    },
    {
        left: '54%',
        top: '24%',
        delay: 0.3,
        duration: 8.1,
        scale: 0.9
    },
    {
        left: '63%',
        top: '72%',
        delay: 1.5,
        duration: 9.8,
        scale: 1.05
    },
    {
        left: '76%',
        top: '40%',
        delay: 0.7,
        duration: 8.9,
        scale: 0.85
    },
    {
        left: '87%',
        top: '18%',
        delay: 1.9,
        duration: 10.8,
        scale: 1.15
    }
];
const HERO_IMAGE = '/images/ui/ironthrone.jpg';
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
    const [exiting, setExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleEnter = ()=>{
        setExiting(true);
        setTimeout(()=>router.push('/simulation'), 900);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].root,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bg
            }, void 0, false, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroStage,
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
                    duration: 6.2,
                    times: [
                        0,
                        0.14,
                        0.8,
                        1
                    ]
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroCard,
                        style: {
                            transformPerspective: 1400
                        },
                        initial: {
                            scale: 1.2,
                            rotateX: 9,
                            rotateY: -12,
                            y: 46
                        },
                        animate: {
                            scale: [
                                1.2,
                                1.04,
                                1.08
                            ],
                            rotateX: [
                                9,
                                2,
                                -2.2
                            ],
                            rotateY: [
                                -12,
                                4,
                                -3
                            ],
                            y: [
                                46,
                                2,
                                -14
                            ]
                        },
                        transition: {
                            duration: 7.2,
                            ease: [
                                0.2,
                                0.9,
                                0.2,
                                1
                            ],
                            times: [
                                0,
                                0.66,
                                1
                            ]
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroImage,
                                style: {
                                    backgroundImage: `url(${HERO_IMAGE})`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroDustLayer,
                                children: HERO_DUST.map((particle, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroDust,
                                        style: {
                                            left: particle.left,
                                            top: particle.top,
                                            scale: `${particle.scale}`
                                        },
                                        initial: {
                                            opacity: 0,
                                            x: -10,
                                            y: 18
                                        },
                                        animate: {
                                            opacity: [
                                                0,
                                                0.22,
                                                0.12,
                                                0
                                            ],
                                            x: [
                                                -10,
                                                34,
                                                76
                                            ],
                                            y: [
                                                18,
                                                -8,
                                                -34
                                            ]
                                        },
                                        transition: {
                                            duration: particle.duration,
                                            delay: particle.delay,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: 'easeInOut'
                                        }
                                    }, `${particle.left}-${particle.top}-${index}`, false, {
                                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroShine,
                                initial: {
                                    opacity: 0,
                                    x: '-64%'
                                },
                                animate: {
                                    opacity: [
                                        0,
                                        0.44,
                                        0
                                    ],
                                    x: [
                                        '-64%',
                                        '22%',
                                        '88%'
                                    ]
                                },
                                transition: {
                                    duration: 1.7,
                                    delay: 1.15,
                                    times: [
                                        0,
                                        0.45,
                                        1
                                    ]
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroVignette
                            }, void 0, false, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroAtmosphere,
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
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].overlay,
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
                    duration: 6.2,
                    times: [
                        0,
                        0.16,
                        0.84,
                        1
                    ]
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ornament,
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
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                        children: TITLE_CHARS.map((char, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
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
                                lineNumber: 177,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
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
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].divider,
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
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].housesRow,
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
                        children: HOUSES.map((house, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].houseName,
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
                                    i < HOUSES.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dot,
                                        children: "◆"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, house, true, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ornament,
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
                        lineNumber: 240,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].finalReveal,
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
                    duration: 8.8,
                    times: [
                        0,
                        0.56,
                        0.72,
                        1
                    ]
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].revealFrame,
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
                            delay: 6.1,
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
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].revealPiece,
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
                                        delay: 6.2 + index * 0.13,
                                        ease: [
                                            0.22,
                                            1,
                                            0.36,
                                            1
                                        ]
                                    }
                                }, piece.id, false, {
                                    fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].revealGlow,
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
                                    delay: 7.15,
                                    times: [
                                        0,
                                        0.45,
                                        1
                                    ]
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/intro/SplashScreen.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].enterBtn,
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
                            delay: 7.55
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
                        lineNumber: 307,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/intro/SplashScreen.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            exiting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$intro$2f$SplashScreen$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].exitOverlay,
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
                lineNumber: 322,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/intro/SplashScreen.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c747cac9._.js.map