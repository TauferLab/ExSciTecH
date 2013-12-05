// Three.js - http://github.com/mrdoob/three.js
'use strict';
var THREE = THREE || {
    REVISION: "49"
};
self.Int32Array || (self.Int32Array = Array, self.Float32Array = Array);
(function () {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) {
        window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"]
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (b) {
        var c = Date.now(),
            f = Math.max(0, 16 - (c - a)),
            h = window.setTimeout(function () {
                b(c + f)
            }, f);
        a = c + f;
        return h
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (a) {
        clearTimeout(a)
    }
})();
THREE.Clock = function (a) {
    this.autoStart = a !== void 0 ? a : true;
    this.elapsedTime = this.oldTime = this.startTime = 0;
    this.running = false
};
THREE.Clock.prototype.start = function () {
    this.oldTime = this.startTime = Date.now();
    this.running = true
};
THREE.Clock.prototype.stop = function () {
    this.getElapsedTime();
    this.running = false
};
THREE.Clock.prototype.getElapsedTime = function () {
    return this.elapsedTime = this.elapsedTime + this.getDelta()
};
THREE.Clock.prototype.getDelta = function () {
    var a = 0;
    this.autoStart && !this.running && this.start();
    if (this.running) {
        var b = Date.now(),
            a = 0.001 * (b - this.oldTime);
        this.oldTime = b;
        this.elapsedTime = this.elapsedTime + a
    }
    return a
};
THREE.Color = function (a) {
    a !== void 0 && this.setHex(a);
    return this
};
THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    copy: function (a) {
        this.r = a.r;
        this.g = a.g;
        this.b = a.b;
        return this
    },
    copyGammaToLinear: function (a) {
        this.r = a.r * a.r;
        this.g = a.g * a.g;
        this.b = a.b * a.b;
        return this
    },
    copyLinearToGamma: function (a) {
        this.r = Math.sqrt(a.r);
        this.g = Math.sqrt(a.g);
        this.b = Math.sqrt(a.b);
        return this
    },
    convertGammaToLinear: function () {
        var a = this.r,
            b = this.g,
            c = this.b;
        this.r = a * a;
        this.g = b * b;
        this.b = c * c;
        return this
    },
    convertLinearToGamma: function () {
        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);
        return this
    },
    setRGB: function (a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c;
        return this
    },
    setHSV: function (a, b, c) {
        var d, e, f;
        if (c === 0) this.r = this.g = this.b = 0;
        else {
            d = Math.floor(a * 6);
            e = a * 6 - d;
            a = c * (1 - b);
            f = c * (1 - b * e);
            b = c * (1 - b * (1 - e));
            switch (d) {
                case 1:
                    this.r = f;
                    this.g = c;
                    this.b = a;
                    break;
                case 2:
                    this.r = a;
                    this.g = c;
                    this.b = b;
                    break;
                case 3:
                    this.r = a;
                    this.g = f;
                    this.b = c;
                    break;
                case 4:
                    this.r = b;
                    this.g = a;
                    this.b = c;
                    break;
                case 5:
                    this.r = c;
                    this.g = a;
                    this.b = f;
                    break;
                case 6:
                case 0:
                    this.r = c;
                    this.g = b;
                    this.b = a
            }
        }
        return this
    },
    setHex: function (a) {
        a = Math.floor(a);
        this.r = (a >> 16 & 255) / 255;
        this.g = (a >> 8 & 255) / 255;
        this.b = (a & 255) / 255;
        return this
    },
    lerpSelf: function (a, b) {
        this.r = this.r + (a.r - this.r) * b;
        this.g = this.g + (a.g - this.g) * b;
        this.b = this.b + (a.b - this.b) * b;
        return this
    },
    getHex: function () {
        return Math.floor(this.r * 255) << 16 ^ Math.floor(this.g * 255) << 8 ^ Math.floor(this.b * 255)
    },
    getContextStyle: function () {
        return "rgb(" + Math.floor(this.r * 255) + "," + Math.floor(this.g * 255) + "," + Math.floor(this.b * 255) + ")"
    },
    clone: function () {
        return (new THREE.Color).setRGB(this.r, this.g, this.b)
    }
};
THREE.Vector2 = function (a, b) {
    this.x = a || 0;
    this.y = b || 0
};
THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    set: function (a, b) {
        this.x = a;
        this.y = b;
        return this
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        return this
    },
    add: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this
    },
    addSelf: function (a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
        return this
    },
    sub: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this
    },
    subSelf: function (a) {
        this.x = this.x - a.x;
        this.y = this.y - a.y;
        return this
    },
    multiplyScalar: function (a) {
        this.x = this.x * a;
        this.y = this.y * a;
        return this
    },
    divideScalar: function (a) {
        if (a) {
            this.x = this.x / a;
            this.y = this.y / a
        } else this.set(0, 0);
        return this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y
    },
    length: function () {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function (a) {
        var b = this.x - a.x,
            a = this.y - a.y;
        return b * b + a * a
    },
    setLength: function (a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function (a, b) {
        this.x = this.x + (a.x - this.x) * b;
        this.y = this.y + (a.y - this.y) * b;
        return this
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y
    },
    isZero: function () {
        return this.lengthSq() < 1.0E-4
    },
    clone: function () {
        return new THREE.Vector2(this.x, this.y)
    }
};
THREE.Vector3 = function (a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
};
THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function (a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
        return this
    },
    setX: function (a) {
        this.x = a;
        return this
    },
    setY: function (a) {
        this.y = a;
        return this
    },
    setZ: function (a) {
        this.z = a;
        return this
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this
    },
    add: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this
    },
    addSelf: function (a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
        this.z = this.z + a.z;
        return this
    },
    addScalar: function (a) {
        this.x = this.x + a;
        this.y = this.y + a;
        this.z = this.z + a;
        return this
    },
    sub: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this
    },
    subSelf: function (a) {
        this.x = this.x - a.x;
        this.y = this.y - a.y;
        this.z = this.z - a.z;
        return this
    },
    multiply: function (a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this
    },
    multiplySelf: function (a) {
        this.x = this.x * a.x;
        this.y = this.y * a.y;
        this.z = this.z * a.z;
        return this
    },
    multiplyScalar: function (a) {
        this.x = this.x * a;
        this.y = this.y * a;
        this.z = this.z * a;
        return this
    },
    divideSelf: function (a) {
        this.x = this.x / a.x;
        this.y = this.y / a.y;
        this.z = this.z / a.z;
        return this
    },
    divideScalar: function (a) {
        if (a) {
            this.x = this.x / a;
            this.y = this.y / a;
            this.z = this.z / a
        } else this.z = this.y = this.x = 0;
        return this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function () {
        return Math.sqrt(this.lengthSq())
    },
    lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    setLength: function (a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function (a, b) {
        this.x = this.x + (a.x - this.x) * b;
        this.y = this.y + (a.y - this.y) * b;
        this.z = this.z + (a.z - this.z) * b;
        return this
    },
    cross: function (a, b) {
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        return this
    },
    crossSelf: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z;
        this.x = c * a.z - d * a.y;
        this.y = d * a.x - b * a.z;
        this.z = b * a.y - c * a.x;
        return this
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function (a) {
        return (new THREE.Vector3).sub(this,
        a).lengthSq()
    },
    getPositionFromMatrix: function (a) {
        this.x = a.elements[12];
        this.y = a.elements[13];
        this.z = a.elements[14];
        return this
    },
    getRotationFromMatrix: function (a, b) {
        var c = b ? b.x : 1,
            d = b ? b.y : 1,
            e = b ? b.z : 1,
            f = a.elements[0] / c,
            h = a.elements[4] / d,
            c = a.elements[1] / c,
            d = a.elements[5] / d,
            i = a.elements[9] / e,
            l = a.elements[10] / e;
        this.y = Math.asin(a.elements[8] / e);
        e = Math.cos(this.y);
        if (Math.abs(e) > 1.0E-5) {
            this.x = Math.atan2(-i / e, l / e);
            this.z = Math.atan2(-h / e, f / e)
        } else {
            this.x = 0;
            this.z = Math.atan2(c, d)
        }
        return this
    },
    getScaleFromMatrix: function (a) {
        var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
            c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
            a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        this.x = b;
        this.y = c;
        this.z = a
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y && a.z === this.z
    },
    isZero: function () {
        return this.lengthSq() < 1.0E-4
    },
    clone: function () {
        return new THREE.Vector3(this.x, this.y, this.z)
    }
};
THREE.Vector4 = function (a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = d !== void 0 ? d : 1
};
THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function (a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w !== void 0 ? a.w : 1;
        return this
    },
    add: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this
    },
    addSelf: function (a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
        this.z = this.z + a.z;
        this.w = this.w + a.w;
        return this
    },
    sub: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this
    },
    subSelf: function (a) {
        this.x = this.x - a.x;
        this.y = this.y - a.y;
        this.z = this.z - a.z;
        this.w = this.w - a.w;
        return this
    },
    multiplyScalar: function (a) {
        this.x = this.x * a;
        this.y = this.y * a;
        this.z = this.z * a;
        this.w = this.w * a;
        return this
    },
    divideScalar: function (a) {
        if (a) {
            this.x = this.x / a;
            this.y = this.y / a;
            this.z = this.z / a;
            this.w = this.w / a
        } else {
            this.z = this.y = this.x = 0;
            this.w = 1
        }
        return this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
    },
    lengthSq: function () {
        return this.dot(this)
    },
    length: function () {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    setLength: function (a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function (a, b) {
        this.x = this.x + (a.x - this.x) * b;
        this.y = this.y + (a.y - this.y) * b;
        this.z = this.z + (a.z - this.z) * b;
        this.w = this.w + (a.w - this.w) * b;
        return this
    },
    clone: function () {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    }
};
THREE.Frustum = function () {
    this.planes = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4]
};
THREE.Frustum.prototype.setFromMatrix = function (a) {
    var b, c = this.planes,
        d = a.elements,
        a = d[0];
    b = d[1];
    var e = d[2],
        f = d[3],
        h = d[4],
        i = d[5],
        l = d[6],
        k = d[7],
        j = d[8],
        m = d[9],
        n = d[10],
        o = d[11],
        s = d[12],
        p = d[13],
        q = d[14],
        d = d[15];
    c[0].set(f - a, k - h, o - j, d - s);
    c[1].set(f + a, k + h, o + j, d + s);
    c[2].set(f + b, k + i, o + m, d + p);
    c[3].set(f - b, k - i, o - m, d - p);
    c[4].set(f - e, k - l, o - n, d - q);
    c[5].set(f + e, k + l, o + n, d + q);
    for (a = 0; a < 6; a++) {
        b = c[a];
        b.divideScalar(Math.sqrt(b.x * b.x + b.y * b.y + b.z * b.z))
    }
};
THREE.Frustum.prototype.contains = function (a) {
    for (var b = this.planes, c = a.matrixWorld, d = c.elements, c = -a.geometry.boundingSphere.radius * c.getMaxScaleOnAxis(), e = 0; e < 6; e++) {
        a = b[e].x * d[12] + b[e].y * d[13] + b[e].z * d[14] + b[e].w;
        if (a <= c) return false
    }
    return true
};
THREE.Frustum.__v1 = new THREE.Vector3;
THREE.Ray = function (a, b) {
    function c(a, b, c) {
        s.sub(c, a);
        w = s.dot(b);
        A = p.add(a, q.copy(b).multiplyScalar(w));
        return y = c.distanceTo(A)
    }
    function d(a, b, c, d) {
        s.sub(d, b);
        p.sub(c, b);
        q.sub(a, b);
        u = s.dot(s);
        H = s.dot(p);
        B = s.dot(q);
        K = p.dot(p);
        N = p.dot(q);
        Y = 1 / (u * K - H * H);
        ca = (K * B - H * N) * Y;
        I = (u * N - H * B) * Y;
        return ca >= 0 && I >= 0 && ca + I < 1
    }
    this.origin = a || new THREE.Vector3;
    this.direction = b || new THREE.Vector3;
    var e = 1.0E-4;
    this.setPrecision = function (a) {
        e = a
    };
    var f = new THREE.Vector3,
        h = new THREE.Vector3,
        i = new THREE.Vector3,
        l = new THREE.Vector3,
        k = new THREE.Vector3,
        j = new THREE.Vector3,
        m = new THREE.Vector3,
        n = new THREE.Vector3,
        o = new THREE.Vector3;
    this.intersectObject = function (a) {
        var b, s = [];
        if (a instanceof THREE.Particle) {
            var p = c(this.origin, this.direction, a.matrixWorld.getPosition());
            if (p > a.scale.x) return [];
            b = {
                distance: p,
                point: a.position,
                face: null,
                object: a
            };
            s.push(b)
        } else if (a instanceof THREE.Mesh) {
            var p = c(this.origin, this.direction, a.matrixWorld.getPosition()),
                g = THREE.Frustum.__v1.set(a.matrixWorld.getColumnX().length(), a.matrixWorld.getColumnY().length(),
                a.matrixWorld.getColumnZ().length());
            if (p > a.geometry.boundingSphere.radius * Math.max(g.x, Math.max(g.y, g.z))) return s;
            var q, u, y = a.geometry,
                w = y.vertices,
                A;
            a.matrixRotationWorld.extractRotation(a.matrixWorld);
            p = 0;
            for (g = y.faces.length; p < g; p++) {
                b = y.faces[p];
                k.copy(this.origin);
                j.copy(this.direction);
                A = a.matrixWorld;
                m = A.multiplyVector3(m.copy(b.centroid)).subSelf(k);
                n = a.matrixRotationWorld.multiplyVector3(n.copy(b.normal));
                q = j.dot(n);
                if (!(Math.abs(q) < e)) {
                    u = n.dot(m) / q;
                    if (!(u < 0) && (a.doubleSided || (a.flipSided ? q > 0 : q < 0))) {
                        o.add(k, j.multiplyScalar(u));
                        if (b instanceof THREE.Face3) {
                            f = A.multiplyVector3(f.copy(w[b.a]));
                            h = A.multiplyVector3(h.copy(w[b.b]));
                            i = A.multiplyVector3(i.copy(w[b.c]));
                            if (d(o, f, h, i)) {
                                b = {
                                    distance: k.distanceTo(o),
                                    point: o.clone(),
                                    face: b,
                                    object: a
                                };
                                s.push(b)
                            }
                        } else if (b instanceof THREE.Face4) {
                            f = A.multiplyVector3(f.copy(w[b.a]));
                            h = A.multiplyVector3(h.copy(w[b.b]));
                            i = A.multiplyVector3(i.copy(w[b.c]));
                            l = A.multiplyVector3(l.copy(w[b.d]));
                            if (d(o, f, h, l) || d(o, h, i, l)) {
                                b = {
                                    distance: k.distanceTo(o),
                                    point: o.clone(),
                                    face: b,
                                    object: a
                                };
                                s.push(b)
                            }
                        }
                    }
                }
            }
        }
        return s
    };
    this.intersectObjects = function (a) {
        for (var b = [], c = 0, d = a.length; c < d; c++) Array.prototype.push.apply(b, this.intersectObject(a[c]));
        b.sort(function (a, b) {
            return a.distance - b.distance
        });
        return b
    };
    var s = new THREE.Vector3,
        p = new THREE.Vector3,
        q = new THREE.Vector3,
        w, A, y, u, H, B, K, N, Y, ca, I
};
THREE.Rectangle = function () {
    function a() {
        f = d - b;
        h = e - c
    }
    var b, c, d, e, f, h, i = true;
    this.getX = function () {
        return b
    };
    this.getY = function () {
        return c
    };
    this.getWidth = function () {
        return f
    };
    this.getHeight = function () {
        return h
    };
    this.getLeft = function () {
        return b
    };
    this.getTop = function () {
        return c
    };
    this.getRight = function () {
        return d
    };
    this.getBottom = function () {
        return e
    };
    this.set = function (f, h, j, m) {
        i = false;
        b = f;
        c = h;
        d = j;
        e = m;
        a()
    };
    this.addPoint = function (f, h) {
        if (i) {
            i = false;
            b = f;
            c = h;
            d = f;
            e = h
        } else {
            b = b < f ? b : f;
            c = c < h ? c : h;
            d = d > f ? d : f;
            e = e > h ? e : h
        }
        a()
    };
    this.add3Points = function (f, h, j, m, n, o) {
        if (i) {
            i = false;
            b = f < j ? f < n ? f : n : j < n ? j : n;
            c = h < m ? h < o ? h : o : m < o ? m : o;
            d = f > j ? f > n ? f : n : j > n ? j : n;
            e = h > m ? h > o ? h : o : m > o ? m : o
        } else {
            b = f < j ? f < n ? f < b ? f : b : n < b ? n : b : j < n ? j < b ? j : b : n < b ? n : b;
            c = h < m ? h < o ? h < c ? h : c : o < c ? o : c : m < o ? m < c ? m : c : o < c ? o : c;
            d = f > j ? f > n ? f > d ? f : d : n > d ? n : d : j > n ? j > d ? j : d : n > d ? n : d;
            e = h > m ? h > o ? h > e ? h : e : o > e ? o : e : m > o ? m > e ? m : e : o > e ? o : e
        }
        a()
    };
    this.addRectangle = function (f) {
        if (i) {
            i = false;
            b = f.getLeft();
            c = f.getTop();
            d = f.getRight();
            e = f.getBottom()
        } else {
            b = b < f.getLeft() ? b : f.getLeft();
            c = c < f.getTop() ? c : f.getTop();
            d = d > f.getRight() ? d : f.getRight();
            e = e > f.getBottom() ? e : f.getBottom()
        }
        a()
    };
    this.inflate = function (f) {
        b = b - f;
        c = c - f;
        d = d + f;
        e = e + f;
        a()
    };
    this.minSelf = function (f) {
        b = b > f.getLeft() ? b : f.getLeft();
        c = c > f.getTop() ? c : f.getTop();
        d = d < f.getRight() ? d : f.getRight();
        e = e < f.getBottom() ? e : f.getBottom();
        a()
    };
    this.intersects = function (a) {
        return d < a.getLeft() || b > a.getRight() || e < a.getTop() || c > a.getBottom() ? false : true
    };
    this.empty = function () {
        i = true;
        e = d = c = b = 0;
        a()
    };
    this.isEmpty = function () {
        return i
    }
};
THREE.Math = {
    clamp: function (a, b, c) {
        return a < b ? b : a > c ? c : a
    },
    clampBottom: function (a, b) {
        return a < b ? b : a
    },
    mapLinear: function (a, b, c, d, e) {
        return d + (a - b) * (e - d) / (c - b)
    },
    random16: function () {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    },
    randInt: function (a, b) {
        return a + Math.floor(Math.random() * (b - a + 1))
    },
    randFloat: function (a, b) {
        return a + Math.random() * (b - a)
    },
    randFloatSpread: function (a) {
        return a * (0.5 - Math.random())
    },
    sign: function (a) {
        return a < 0 ? -1 : a > 0 ? 1 : 0
    }
};
THREE.Matrix3 = function () {
    this.elements = new Float32Array(9)
};
THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    getInverse: function (a) {
        var b = a.elements,
            a = b[10] * b[5] - b[6] * b[9],
            c = -b[10] * b[1] + b[2] * b[9],
            d = b[6] * b[1] - b[2] * b[5],
            e = -b[10] * b[4] + b[6] * b[8],
            f = b[10] * b[0] - b[2] * b[8],
            h = -b[6] * b[0] + b[2] * b[4],
            i = b[9] * b[4] - b[5] * b[8],
            l = -b[9] * b[0] + b[1] * b[8],
            k = b[5] * b[0] - b[1] * b[4],
            b = b[0] * a + b[1] * e + b[2] * i;
        b === 0 && console.warn("Matrix3.getInverse(): determinant == 0");
        var b = 1 / b,
            j = this.elements;
        j[0] = b * a;
        j[1] = b * c;
        j[2] = b * d;
        j[3] = b * e;
        j[4] = b * f;
        j[5] = b * h;
        j[6] = b * i;
        j[7] = b * l;
        j[8] = b * k;
        return this
    },
    transpose: function () {
        var a, b = this.elements;
        a = b[1];
        b[1] = b[3];
        b[3] = a;
        a = b[2];
        b[2] = b[6];
        b[6] = a;
        a = b[5];
        b[5] = b[7];
        b[7] = a;
        return this
    },
    transposeIntoArray: function (a) {
        var b = this.m;
        a[0] = b[0];
        a[1] = b[3];
        a[2] = b[6];
        a[3] = b[1];
        a[4] = b[4];
        a[5] = b[7];
        a[6] = b[2];
        a[7] = b[5];
        a[8] = b[8];
        return this
    }
};
THREE.Matrix4 = function (a, b, c, d, e, f, h, i, l, k, j, m, n, o, s, p) {
    this.elements = new Float32Array(16);
    this.set(a !== void 0 ? a : 1, b || 0, c || 0, d || 0, e || 0, f !== void 0 ? f : 1, h || 0, i || 0, l || 0, k || 0, j !== void 0 ? j : 1, m || 0, n || 0, o || 0, s || 0, p !== void 0 ? p : 1)
};
THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function (a, b, c, d, e, f, h, i, l, k, j, m, n, o, s, p) {
        var q = this.elements;
        q[0] = a;
        q[4] = b;
        q[8] = c;
        q[12] = d;
        q[1] = e;
        q[5] = f;
        q[9] = h;
        q[13] = i;
        q[2] = l;
        q[6] = k;
        q[10] = j;
        q[14] = m;
        q[3] = n;
        q[7] = o;
        q[11] = s;
        q[15] = p;
        return this
    },
    identity: function () {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    copy: function (a) {
        a = a.elements;
        this.set(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]);
        return this
    },
    lookAt: function (a, b, c) {
        var d = this.elements,
            e = THREE.Matrix4.__v1,
            f = THREE.Matrix4.__v2,
            h = THREE.Matrix4.__v3;
        h.sub(a, b).normalize();
        if (h.length() === 0) h.z = 1;
        e.cross(c, h).normalize();
        if (e.length() === 0) {
            h.x = h.x + 1.0E-4;
            e.cross(c, h).normalize()
        }
        f.cross(h, e);
        d[0] = e.x;
        d[4] = f.x;
        d[8] = h.x;
        d[1] = e.y;
        d[5] = f.y;
        d[9] = h.y;
        d[2] = e.z;
        d[6] = f.z;
        d[10] = h.z;
        return this
    },
    multiply: function (a, b) {
        var c = a.elements,
            d = b.elements,
            e = this.elements,
            f = c[0],
            h = c[4],
            i = c[8],
            l = c[12],
            k = c[1],
            j = c[5],
            m = c[9],
            n = c[13],
            o = c[2],
            s = c[6],
            p = c[10],
            q = c[14],
            w = c[3],
            A = c[7],
            y = c[11],
            c = c[15],
            u = d[0],
            H = d[4],
            B = d[8],
            K = d[12],
            N = d[1],
            Y = d[5],
            ca = d[9],
            I = d[13],
            ba = d[2],
            ja = d[6],
            ya = d[10],
            D = d[14],
            g = d[3],
            Na = d[7],
            za = d[11],
            d = d[15];
        e[0] = f * u + h * N + i * ba + l * g;
        e[4] = f * H + h * Y + i * ja + l * Na;
        e[8] = f * B + h * ca + i * ya + l * za;
        e[12] = f * K + h * I + i * D + l * d;
        e[1] = k * u + j * N + m * ba + n * g;
        e[5] = k * H + j * Y + m * ja + n * Na;
        e[9] = k * B + j * ca + m * ya + n * za;
        e[13] = k * K + j * I + m * D + n * d;
        e[2] = o * u + s * N + p * ba + q * g;
        e[6] = o * H + s * Y + p * ja + q * Na;
        e[10] = o * B + s * ca + p * ya + q * za;
        e[14] = o * K + s * I + p * D + q * d;
        e[3] = w * u + A * N + y * ba + c * g;
        e[7] = w * H + A * Y + y * ja + c * Na;
        e[11] = w * B + A * ca + y * ya + c * za;
        e[15] = w * K + A * I + y * D + c * d;
        return this
    },
    multiplySelf: function (a) {
        return this.multiply(this,
        a)
    },
    multiplyToArray: function (a, b, c) {
        var d = this.elements;
        this.multiply(a, b);
        c[0] = d[0];
        c[1] = d[1];
        c[2] = d[2];
        c[3] = d[3];
        c[4] = d[4];
        c[5] = d[5];
        c[6] = d[6];
        c[7] = d[7];
        c[8] = d[8];
        c[9] = d[9];
        c[10] = d[10];
        c[11] = d[11];
        c[12] = d[12];
        c[13] = d[13];
        c[14] = d[14];
        c[15] = d[15];
        return this
    },
    multiplyScalar: function (a) {
        var b = this.elements;
        b[0] = b[0] * a;
        b[4] = b[4] * a;
        b[8] = b[8] * a;
        b[12] = b[12] * a;
        b[1] = b[1] * a;
        b[5] = b[5] * a;
        b[9] = b[9] * a;
        b[13] = b[13] * a;
        b[2] = b[2] * a;
        b[6] = b[6] * a;
        b[10] = b[10] * a;
        b[14] = b[14] * a;
        b[3] = b[3] * a;
        b[7] = b[7] * a;
        b[11] = b[11] * a;
        b[15] = b[15] * a;
        return this
    },
    multiplyVector3: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = 1 / (b[3] * c + b[7] * d + b[11] * e + b[15]);
        a.x = (b[0] * c + b[4] * d + b[8] * e + b[12]) * f;
        a.y = (b[1] * c + b[5] * d + b[9] * e + b[13]) * f;
        a.z = (b[2] * c + b[6] * d + b[10] * e + b[14]) * f;
        return a
    },
    multiplyVector4: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = a.w;
        a.x = b[0] * c + b[4] * d + b[8] * e + b[12] * f;
        a.y = b[1] * c + b[5] * d + b[9] * e + b[13] * f;
        a.z = b[2] * c + b[6] * d + b[10] * e + b[14] * f;
        a.w = b[3] * c + b[7] * d + b[11] * e + b[15] * f;
        return a
    },
    rotateAxis: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z;
        a.x = c * b[0] + d * b[4] + e * b[8];
        a.y = c * b[1] + d * b[5] + e * b[9];
        a.z = c * b[2] + d * b[6] + e * b[10];
        a.normalize();
        return a
    },
    crossVector: function (a) {
        var b = this.elements,
            c = new THREE.Vector4;
        c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w;
        c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w;
        c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w;
        c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] * a.z + b[15] * a.w : 1;
        return c
    },
    determinant: function () {
        var a = this.elements,
            b = a[0],
            c = a[4],
            d = a[8],
            e = a[12],
            f = a[1],
            h = a[5],
            i = a[9],
            l = a[13],
            k = a[2],
            j = a[6],
            m = a[10],
            n = a[14],
            o = a[3],
            s = a[7],
            p = a[11],
            a = a[15];
        return e * i * j * o - d * l * j * o - e * h * m * o + c * l * m * o + d * h * n * o - c * i * n * o - e * i * k * s + d * l * k * s + e * f * m * s - b * l * m * s - d * f * n * s + b * i * n * s + e * h * k * p - c * l * k * p - e * f * j * p + b * l * j * p + c * f * n * p - b * h * n * p - d * h * k * a + c * i * k * a + d * f * j * a - b * i * j * a - c * f * m * a + b * h * m * a
    },
    transpose: function () {
        var a = this.elements,
            b;
        b = a[1];
        a[1] = a[4];
        a[4] = b;
        b = a[2];
        a[2] = a[8];
        a[8] = b;
        b = a[6];
        a[6] = a[9];
        a[9] = b;
        b = a[3];
        a[3] = a[12];
        a[12] = b;
        b = a[7];
        a[7] = a[13];
        a[13] = b;
        b = a[11];
        a[11] = a[14];
        a[14] = b;
        return this
    },
    flattenToArray: function (a) {
        var b = this.elements;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        a[9] = b[9];
        a[10] = b[10];
        a[11] = b[11];
        a[12] = b[12];
        a[13] = b[13];
        a[14] = b[14];
        a[15] = b[15];
        return a
    },
    flattenToArrayOffset: function (a, b) {
        var c = this.elements;
        a[b] = c[0];
        a[b + 1] = c[1];
        a[b + 2] = c[2];
        a[b + 3] = c[3];
        a[b + 4] = c[4];
        a[b + 5] = c[5];
        a[b + 6] = c[6];
        a[b + 7] = c[7];
        a[b + 8] = c[8];
        a[b + 9] = c[9];
        a[b + 10] = c[10];
        a[b + 11] = c[11];
        a[b + 12] = c[12];
        a[b + 13] = c[13];
        a[b + 14] = c[14];
        a[b + 15] = c[15];
        return a
    },
    getPosition: function () {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[12], a[13],
        a[14])
    },
    setPosition: function (a) {
        var b = this.elements;
        b[12] = a.x;
        b[13] = a.y;
        b[14] = a.z;
        return this
    },
    getColumnX: function () {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[0], a[1], a[2])
    },
    getColumnY: function () {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[4], a[5], a[6])
    },
    getColumnZ: function () {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[8], a[9], a[10])
    },
    getInverse: function (a) {
        var b = this.elements,
            c = a.elements,
            d = c[0],
            e = c[4],
            f = c[8],
            h = c[12],
            i = c[1],
            l = c[5],
            k = c[9],
            j = c[13],
            m = c[2],
            n = c[6],
            o = c[10],
            s = c[14],
            p = c[3],
            q = c[7],
            w = c[11],
            c = c[15];
        b[0] = k * s * q - j * o * q + j * n * w - l * s * w - k * n * c + l * o * c;
        b[4] = h * o * q - f * s * q - h * n * w + e * s * w + f * n * c - e * o * c;
        b[8] = f * j * q - h * k * q + h * l * w - e * j * w - f * l * c + e * k * c;
        b[12] = h * k * n - f * j * n - h * l * o + e * j * o + f * l * s - e * k * s;
        b[1] = j * o * p - k * s * p - j * m * w + i * s * w + k * m * c - i * o * c;
        b[5] = f * s * p - h * o * p + h * m * w - d * s * w - f * m * c + d * o * c;
        b[9] = h * k * p - f * j * p - h * i * w + d * j * w + f * i * c - d * k * c;
        b[13] = f * j * m - h * k * m + h * i * o - d * j * o - f * i * s + d * k * s;
        b[2] = l * s * p - j * n * p + j * m * q - i * s * q - l * m * c + i * n * c;
        b[6] = h * n * p - e * s * p - h * m * q + d * s * q + e * m * c - d * n * c;
        b[10] = e * j * p - h * l * p + h * i * q - d * j * q - e * i * c + d * l * c;
        b[14] = h * l * m - e * j * m - h * i * n + d * j * n + e * i * s - d * l * s;
        b[3] = k * n * p - l * o * p - k * m * q + i * o * q + l * m * w - i * n * w;
        b[7] = e * o * p - f * n * p + f * m * q - d * o * q - e * m * w + d * n * w;
        b[11] = f * l * p - e * k * p - f * i * q + d * k * q + e * i * w - d * l * w;
        b[15] = e * k * m - f * l * m + f * i * n - d * k * n - e * i * o + d * l * o;
        this.multiplyScalar(1 / a.determinant());
        return this
    },
    setRotationFromEuler: function (a, b) {
        var c = this.elements,
            d = a.x,
            e = a.y,
            f = a.z,
            h = Math.cos(d),
            d = Math.sin(d),
            i = Math.cos(e),
            e = Math.sin(e),
            l = Math.cos(f),
            f = Math.sin(f);
        switch (b) {
            case "YXZ":
                var k = i * l,
                    j = i * f,
                    m = e * l,
                    n = e * f;
                c[0] = k + n * d;
                c[4] = m * d - j;
                c[8] = h * e;
                c[1] = h * f;
                c[5] = h * l;
                c[9] = -d;
                c[2] = j * d - m;
                c[6] = n + k * d;
                c[10] = h * i;
                break;
            case "ZXY":
                k = i * l;
                j = i * f;
                m = e * l;
                n = e * f;
                c[0] = k - n * d;
                c[4] = -h * f;
                c[8] = m + j * d;
                c[1] = j + m * d;
                c[5] = h * l;
                c[9] = n - k * d;
                c[2] = -h * e;
                c[6] = d;
                c[10] = h * i;
                break;
            case "ZYX":
                k = h * l;
                j = h * f;
                m = d * l;
                n = d * f;
                c[0] = i * l;
                c[4] = m * e - j;
                c[8] = k * e + n;
                c[1] = i * f;
                c[5] = n * e + k;
                c[9] = j * e - m;
                c[2] = -e;
                c[6] = d * i;
                c[10] = h * i;
                break;
            case "YZX":
                k = h * i;
                j = h * e;
                m = d * i;
                n = d * e;
                c[0] = i * l;
                c[4] = n - k * f;
                c[8] = m * f + j;
                c[1] = f;
                c[5] = h * l;
                c[9] = -d * l;
                c[2] = -e * l;
                c[6] = j * f + m;
                c[10] = k - n * f;
                break;
            case "XZY":
                k = h * i;
                j = h * e;
                m = d * i;
                n = d * e;
                c[0] = i * l;
                c[4] = -f;
                c[8] = e * l;
                c[1] = k * f + n;
                c[5] = h * l;
                c[9] = j * f - m;
                c[2] = m * f - j;
                c[6] = d * l;
                c[10] = n * f + k;
                break;
            default:
                k = h * l;
                j = h * f;
                m = d * l;
                n = d * f;
                c[0] = i * l;
                c[4] = -i * f;
                c[8] = e;
                c[1] = j + m * e;
                c[5] = k - n * e;
                c[9] = -d * i;
                c[2] = n - k * e;
                c[6] = m + j * e;
                c[10] = h * i
        }
        return this
    },
    setRotationFromQuaternion: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = a.w,
            h = c + c,
            i = d + d,
            l = e + e,
            a = c * h,
            k = c * i,
            c = c * l,
            j = d * i,
            d = d * l,
            e = e * l,
            h = f * h,
            i = f * i,
            f = f * l;
        b[0] = 1 - (j + e);
        b[4] = k - f;
        b[8] = c + i;
        b[1] = k + f;
        b[5] = 1 - (a + e);
        b[9] = d - h;
        b[2] = c - i;
        b[6] = d + h;
        b[10] = 1 - (a + j);
        return this
    },
    compose: function (a, b, c) {
        var d = this.elements,
            e = THREE.Matrix4.__m1,
            f = THREE.Matrix4.__m2;
        e.identity();
        e.setRotationFromQuaternion(b);
        f.makeScale(c.x, c.y, c.z);
        this.multiply(e, f);
        d[12] = a.x;
        d[13] = a.y;
        d[14] = a.z;
        return this
    },
    decompose: function (a, b, c) {
        var d = this.elements,
            e = THREE.Matrix4.__v1,
            f = THREE.Matrix4.__v2,
            h = THREE.Matrix4.__v3;
        e.set(d[0], d[1], d[2]);
        f.set(d[4], d[5], d[6]);
        h.set(d[8], d[9], d[10]);
        a = a instanceof THREE.Vector3 ? a : new THREE.Vector3;
        b = b instanceof THREE.Quaternion ? b : new THREE.Quaternion;
        c = c instanceof THREE.Vector3 ? c : new THREE.Vector3;
        c.x = e.length();
        c.y = f.length();
        c.z = h.length();
        a.x = d[12];
        a.y = d[13];
        a.z = d[14];
        d = THREE.Matrix4.__m1;
        d.copy(this);
        d.elements[0] = d.elements[0] / c.x;
        d.elements[1] = d.elements[1] / c.x;
        d.elements[2] = d.elements[2] / c.x;
        d.elements[4] = d.elements[4] / c.y;
        d.elements[5] = d.elements[5] / c.y;
        d.elements[6] = d.elements[6] / c.y;
        d.elements[8] = d.elements[8] / c.z;
        d.elements[9] = d.elements[9] / c.z;
        d.elements[10] = d.elements[10] / c.z;
        b.setFromRotationMatrix(d);
        return [a, b, c]
    },
    extractPosition: function (a) {
        var b = this.elements,
            a = a.elements;
        b[12] = a[12];
        b[13] = a[13];
        b[14] = a[14];
        return this
    },
    extractRotation: function (a) {
        var b = this.elements,
            a = a.elements,
            c = THREE.Matrix4.__v1,
            d = 1 / c.set(a[0], a[1], a[2]).length(),
            e = 1 / c.set(a[4], a[5], a[6]).length(),
            c = 1 / c.set(a[8], a[9], a[10]).length();
        b[0] = a[0] * d;
        b[1] = a[1] * d;
        b[2] = a[2] * d;
        b[4] = a[4] * e;
        b[5] = a[5] * e;
        b[6] = a[6] * e;
        b[8] = a[8] * c;
        b[9] = a[9] * c;
        b[10] = a[10] * c;
        return this
    },
    translate: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            a = a.z;
        b[12] = b[0] * c + b[4] * d + b[8] * a + b[12];
        b[13] = b[1] * c + b[5] * d + b[9] * a + b[13];
        b[14] = b[2] * c + b[6] * d + b[10] * a + b[14];
        b[15] = b[3] * c + b[7] * d + b[11] * a + b[15];
        return this
    },
    rotateX: function (a) {
        var b = this.elements,
            c = b[4],
            d = b[5],
            e = b[6],
            f = b[7],
            h = b[8],
            i = b[9],
            l = b[10],
            k = b[11],
            j = Math.cos(a),
            a = Math.sin(a);
        b[4] = j * c + a * h;
        b[5] = j * d + a * i;
        b[6] = j * e + a * l;
        b[7] = j * f + a * k;
        b[8] = j * h - a * c;
        b[9] = j * i - a * d;
        b[10] = j * l - a * e;
        b[11] = j * k - a * f;
        return this
    },
    rotateY: function (a) {
        var b = this.elements,
            c = b[0],
            d = b[1],
            e = b[2],
            f = b[3],
            h = b[8],
            i = b[9],
            l = b[10],
            k = b[11],
            j = Math.cos(a),
            a = Math.sin(a);
        b[0] = j * c - a * h;
        b[1] = j * d - a * i;
        b[2] = j * e - a * l;
        b[3] = j * f - a * k;
        b[8] = j * h + a * c;
        b[9] = j * i + a * d;
        b[10] = j * l + a * e;
        b[11] = j * k + a * f;
        return this
    },
    rotateZ: function (a) {
        var b = this.elements,
            c = b[0],
            d = b[1],
            e = b[2],
            f = b[3],
            h = b[4],
            i = b[5],
            l = b[6],
            k = b[7],
            j = Math.cos(a),
            a = Math.sin(a);
        b[0] = j * c + a * h;
        b[1] = j * d + a * i;
        b[2] = j * e + a * l;
        b[3] = j * f + a * k;
        b[4] = j * h - a * c;
        b[5] = j * i - a * d;
        b[6] = j * l - a * e;
        b[7] = j * k - a * f;
        return this
    },
    rotateByAxis: function (a, b) {
        var c = this.elements;
        if (a.x === 1 && a.y === 0 && a.z === 0) return this.rotateX(b);
        if (a.x === 0 && a.y === 1 && a.z === 0) return this.rotateY(b);
        if (a.x === 0 && a.y === 0 && a.z === 1) return this.rotateZ(b);
        var d = a.x,
            e = a.y,
            f = a.z,
            h = Math.sqrt(d * d + e * e + f * f),
            d = d / h,
            e = e / h,
            f = f / h,
            h = d * d,
            i = e * e,
            l = f * f,
            k = Math.cos(b),
            j = Math.sin(b),
            m = 1 - k,
            n = d * e * m,
            o = d * f * m,
            m = e * f * m,
            d = d * j,
            s = e * j,
            j = f * j,
            f = h + (1 - h) * k,
            h = n + j,
            e = o - s,
            n = n - j,
            i = i + (1 - i) * k,
            j = m + d,
            o = o + s,
            m = m - d,
            l = l + (1 - l) * k,
            k = c[0],
            d = c[1],
            s = c[2],
            p = c[3],
            q = c[4],
            w = c[5],
            A = c[6],
            y = c[7],
            u = c[8],
            H = c[9],
            B = c[10],
            K = c[11];
        c[0] = f * k + h * q + e * u;
        c[1] = f * d + h * w + e * H;
        c[2] = f * s + h * A + e * B;
        c[3] = f * p + h * y + e * K;
        c[4] = n * k + i * q + j * u;
        c[5] = n * d + i * w + j * H;
        c[6] = n * s + i * A + j * B;
        c[7] = n * p + i * y + j * K;
        c[8] = o * k + m * q + l * u;
        c[9] = o * d + m * w + l * H;
        c[10] = o * s + m * A + l * B;
        c[11] = o * p + m * y + l * K;
        return this
    },
    scale: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            a = a.z;
        b[0] = b[0] * c;
        b[4] = b[4] * d;
        b[8] = b[8] * a;
        b[1] = b[1] * c;
        b[5] = b[5] * d;
        b[9] = b[9] * a;
        b[2] = b[2] * c;
        b[6] = b[6] * d;
        b[10] = b[10] * a;
        b[3] = b[3] * c;
        b[7] = b[7] * d;
        b[11] = b[11] * a;
        return this
    },
    getMaxScaleOnAxis: function () {
        var a = this.elements;
        return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], Math.max(a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10])))
    },
    makeTranslation: function (a, b, c) {
        this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
        return this
    },
    makeRotationX: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(1, 0, 0, 0, 0, b, - a, 0, 0, a, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationY: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(b, 0, a, 0, 0, 1, 0, 0, - a, 0, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationZ: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(b, - a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationAxis: function (a, b) {
        var c = Math.cos(b),
            d = Math.sin(b),
            e = 1 - c,
            f = a.x,
            h = a.y,
            i = a.z,
            l = e * f,
            k = e * h;
        this.set(l * f + c, l * h - d * i, l * i + d * h, 0, l * h + d * i, k * h + c, k * i - d * f, 0, l * i - d * h, k * i + d * f, e * i * i + c, 0, 0, 0, 0, 1);
        return this
    },
    makeScale: function (a, b, c) {
        this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
        return this
    },
    makeFrustum: function (a, b, c, d, e, f) {
        var h = this.elements;
        h[0] = 2 * e / (b - a);
        h[4] = 0;
        h[8] = (b + a) / (b - a);
        h[12] = 0;
        h[1] = 0;
        h[5] = 2 * e / (d - c);
        h[9] = (d + c) / (d - c);
        h[13] = 0;
        h[2] = 0;
        h[6] = 0;
        h[10] = -(f + e) / (f - e);
        h[14] = -2 * f * e / (f - e);
        h[3] = 0;
        h[7] = 0;
        h[11] = -1;
        h[15] = 0;
        return this
    },
    makePerspective: function (a, b, c, d) {
        var a = c * Math.tan(a * Math.PI / 360),
            e = -a;
        return this.makeFrustum(e * b, a * b, e, a, c, d)
    },
    makeOrthographic: function (a,
    b, c, d, e, f) {
        var h = this.elements,
            i = b - a,
            l = c - d,
            k = f - e;
        h[0] = 2 / i;
        h[4] = 0;
        h[8] = 0;
        h[12] = -((b + a) / i);
        h[1] = 0;
        h[5] = 2 / l;
        h[9] = 0;
        h[13] = -((c + d) / l);
        h[2] = 0;
        h[6] = 0;
        h[10] = -2 / k;
        h[14] = -((f + e) / k);
        h[3] = 0;
        h[7] = 0;
        h[11] = 0;
        h[15] = 1;
        return this
    },
    clone: function () {
        var a = this.elements;
        return new THREE.Matrix4(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
    }
};
THREE.Matrix4.__v1 = new THREE.Vector3;
THREE.Matrix4.__v2 = new THREE.Vector3;
THREE.Matrix4.__v3 = new THREE.Vector3;
THREE.Matrix4.__m1 = new THREE.Matrix4;
THREE.Matrix4.__m2 = new THREE.Matrix4;
THREE.Object3D = function () {
    this.id = THREE.Object3DCount++;
    this.name = "";
    this.parent = void 0;
    this.children = [];
    this.up = new THREE.Vector3(0, 1, 0);
    this.position = new THREE.Vector3;
    this.rotation = new THREE.Vector3;
    this.eulerOrder = "XYZ";
    this.scale = new THREE.Vector3(1, 1, 1);
    this.flipSided = this.doubleSided = false;
    this.renderDepth = null;
    this.rotationAutoUpdate = true;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixRotationWorld = new THREE.Matrix4;
    this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = true;
    this.quaternion = new THREE.Quaternion;
    this.useQuaternion = false;
    this.boundRadius = 0;
    this.boundRadiusScale = 1;
    this.visible = true;
    this.receiveShadow = this.castShadow = false;
    this.frustumCulled = true;
    this._vector = new THREE.Vector3
};
THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: function (a) {
        this.matrix.multiply(a, this.matrix);
        this.scale.getScaleFromMatrix(this.matrix);
        this.rotation.getRotationFromMatrix(this.matrix, this.scale);
        this.position.getPositionFromMatrix(this.matrix)
    },
    translate: function (a, b) {
        this.matrix.rotateAxis(b);
        this.position.addSelf(b.multiplyScalar(a))
    },
    translateX: function (a) {
        this.translate(a, this._vector.set(1, 0, 0))
    },
    translateY: function (a) {
        this.translate(a, this._vector.set(0, 1, 0))
    },
    translateZ: function (a) {
        this.translate(a,
        this._vector.set(0, 0, 1))
    },
    lookAt: function (a) {
        this.matrix.lookAt(a, this.position, this.up);
        this.rotationAutoUpdate && this.rotation.getRotationFromMatrix(this.matrix)
    },
    add: function (a) {
        if (a === this) console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");
        else if (a instanceof THREE.Object3D) {
            a.parent !== void 0 && a.parent.remove(a);
            a.parent = this;
            this.children.push(a);
            for (var b = this; b.parent !== void 0;) b = b.parent;
            b !== void 0 && b instanceof THREE.Scene && b.__addObject(a)
        }
    },
    remove: function (a) {
        var b = this.children.indexOf(a);
        if (b !== -1) {
            a.parent = void 0;
            this.children.splice(b, 1);
            for (b = this; b.parent !== void 0;) b = b.parent;
            b !== void 0 && b instanceof THREE.Scene && b.__removeObject(a)
        }
    },
    getChildByName: function (a, b) {
        var c, d, e;
        c = 0;
        for (d = this.children.length; c < d; c++) {
            e = this.children[c];
            if (e.name === a) return e;
            if (b) {
                e = e.getChildByName(a, b);
                if (e !== void 0) return e
            }
        }
    },
    updateMatrix: function () {
        this.matrix.setPosition(this.position);
        this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation,
        this.eulerOrder);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) {
            this.matrix.scale(this.scale);
            this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z))
        }
        this.matrixWorldNeedsUpdate = true
    },
    updateMatrixWorld: function (a) {
        this.matrixAutoUpdate && this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || a) {
            this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix);
            this.matrixWorldNeedsUpdate = false;
            a = true
        }
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
    }
};
THREE.Object3DCount = 0;
THREE.Projector = function () {
    function a() {
        var a = l[i] = l[i] || new THREE.RenderableVertex;
        i++;
        return a
    }
    function b(a, b) {
        return b.z - a.z
    }
    function c(a, b) {
        var c = 0,
            d = 1,
            g = a.z + a.w,
            e = b.z + b.w,
            f = -a.z + a.w,
            h = -b.z + b.w;
        if (g >= 0 && e >= 0 && f >= 0 && h >= 0) return true;
        if (g < 0 && e < 0 || f < 0 && h < 0) return false;
        g < 0 ? c = Math.max(c, g / (g - e)) : e < 0 && (d = Math.min(d, g / (g - e)));
        f < 0 ? c = Math.max(c, f / (f - h)) : h < 0 && (d = Math.min(d, f / (f - h)));
        if (d < c) return false;
        a.lerpSelf(b, c);
        b.lerpSelf(a, 1 - d);
        return true
    }
    var d, e, f = [],
        h, i, l = [],
        k, j, m = [],
        n, o = [],
        s, p, q = [],
        w, A, y = [],
        u = {
            objects: [],
            sprites: [],
            lights: [],
            elements: []
        }, H = new THREE.Vector3,
        B = new THREE.Vector4,
        K = new THREE.Matrix4,
        N = new THREE.Matrix4,
        Y = new THREE.Frustum,
        ca = new THREE.Vector4,
        I = new THREE.Vector4;
    this.projectVector = function (a, b) {
        b.matrixWorldInverse.getInverse(b.matrixWorld);
        K.multiply(b.projectionMatrix, b.matrixWorldInverse);
        K.multiplyVector3(a);
        return a
    };
    this.unprojectVector = function (a, b) {
        b.projectionMatrixInverse.getInverse(b.projectionMatrix);
        K.multiply(b.matrixWorld, b.projectionMatrixInverse);
        K.multiplyVector3(a);
        return a
    };
    this.pickingRay = function (a, b) {
        var c;
        a.z = -1;
        c = new THREE.Vector3(a.x, a.y, 1);
        this.unprojectVector(a, b);
        this.unprojectVector(c, b);
        c.subSelf(a).normalize();
        return new THREE.Ray(a, c)
    };
    this.projectGraph = function (a, c) {
        e = 0;
        u.objects.length = 0;
        u.sprites.length = 0;
        u.lights.length = 0;
        var h = function (a) {
            if (a.visible !== false) {
                if ((a instanceof THREE.Mesh || a instanceof THREE.Line) && (a.frustumCulled === false || Y.contains(a))) {
                    H.copy(a.matrixWorld.getPosition());
                    K.multiplyVector3(H);
                    var b = f[e] = f[e] || new THREE.RenderableObject;
                    e++;
                    d = b;
                    d.object = a;
                    d.z = H.z;
                    u.objects.push(d)
                } else a instanceof THREE.Light && u.lights.push(a);
                for (var b = 0, c = a.children.length; b < c; b++) h(a.children[b])
            }
        };
        h(a);
        c && u.objects.sort(b);
        return u
    };
    this.projectScene = function (d, e, f) {
        var D = e.near,
            g = e.far,
            H = false,
            za, Da, $, R, J, Z, Q, pa, O, sa, Ga, Ha, La, Oa, Ta;
        A = p = n = j = 0;
        u.elements.length = 0;
        if (e.parent === void 0) {
            console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it...");
            d.add(e)
        }
        d.updateMatrixWorld();
        e.matrixWorldInverse.getInverse(e.matrixWorld);
        K.multiply(e.projectionMatrix,
        e.matrixWorldInverse);
        Y.setFromMatrix(K);
        u = this.projectGraph(d, false);
        d = 0;
        for (za = u.objects.length; d < za; d++) {
            O = u.objects[d].object;
            sa = O.matrixWorld;
            i = 0;
            if (O instanceof THREE.Mesh) {
                Ga = O.geometry;
                Ha = O.geometry.materials;
                R = Ga.vertices;
                La = Ga.faces;
                Oa = Ga.faceVertexUvs;
                Ga = O.matrixRotationWorld.extractRotation(sa);
                Da = 0;
                for ($ = R.length; Da < $; Da++) {
                    h = a();
                    h.positionWorld.copy(R[Da]);
                    sa.multiplyVector3(h.positionWorld);
                    h.positionScreen.copy(h.positionWorld);
                    K.multiplyVector4(h.positionScreen);
                    h.positionScreen.x = h.positionScreen.x / h.positionScreen.w;
                    h.positionScreen.y = h.positionScreen.y / h.positionScreen.w;
                    h.visible = h.positionScreen.z > D && h.positionScreen.z < g
                }
                R = 0;
                for (Da = La.length; R < Da; R++) {
                    $ = La[R];
                    if ($ instanceof THREE.Face3) {
                        J = l[$.a];
                        Z = l[$.b];
                        Q = l[$.c];
                        if (J.visible && Z.visible && Q.visible) {
                            H = (Q.positionScreen.x - J.positionScreen.x) * (Z.positionScreen.y - J.positionScreen.y) - (Q.positionScreen.y - J.positionScreen.y) * (Z.positionScreen.x - J.positionScreen.x) < 0;
                            if (O.doubleSided || H != O.flipSided) {
                                pa = m[j] = m[j] || new THREE.RenderableFace3;
                                j++;
                                k = pa;
                                k.v1.copy(J);
                                k.v2.copy(Z);
                                k.v3.copy(Q)
                            } else continue
                        } else continue
                    } else if ($ instanceof THREE.Face4) {
                        J = l[$.a];
                        Z = l[$.b];
                        Q = l[$.c];
                        pa = l[$.d];
                        if (J.visible && Z.visible && Q.visible && pa.visible) {
                            H = (pa.positionScreen.x - J.positionScreen.x) * (Z.positionScreen.y - J.positionScreen.y) - (pa.positionScreen.y - J.positionScreen.y) * (Z.positionScreen.x - J.positionScreen.x) < 0 || (Z.positionScreen.x - Q.positionScreen.x) * (pa.positionScreen.y - Q.positionScreen.y) - (Z.positionScreen.y - Q.positionScreen.y) * (pa.positionScreen.x - Q.positionScreen.x) < 0;
                            if (O.doubleSided || H != O.flipSided) {
                                Ta = o[n] = o[n] || new THREE.RenderableFace4;
                                n++;
                                k = Ta;
                                k.v1.copy(J);
                                k.v2.copy(Z);
                                k.v3.copy(Q);
                                k.v4.copy(pa)
                            } else continue
                        } else continue
                    }
                    k.normalWorld.copy($.normal);
                    !H && (O.flipSided || O.doubleSided) && k.normalWorld.negate();
                    Ga.multiplyVector3(k.normalWorld);
                    k.centroidWorld.copy($.centroid);
                    sa.multiplyVector3(k.centroidWorld);
                    k.centroidScreen.copy(k.centroidWorld);
                    K.multiplyVector3(k.centroidScreen);
                    Q = $.vertexNormals;
                    J = 0;
                    for (Z = Q.length; J < Z; J++) {
                        pa = k.vertexNormalsWorld[J];
                        pa.copy(Q[J]);
                        !H && (O.flipSided || O.doubleSided) && pa.negate();
                        Ga.multiplyVector3(pa)
                    }
                    J = 0;
                    for (Z = Oa.length; J < Z; J++) if (Ta = Oa[J][R]) {
                        Q = 0;
                        for (pa = Ta.length; Q < pa; Q++) k.uvs[J][Q] = Ta[Q]
                    }
                    k.material = O.material;
                    k.faceMaterial = $.materialIndex !== null ? Ha[$.materialIndex] : null;
                    k.z = k.centroidScreen.z;
                    u.elements.push(k)
                }
            } else if (O instanceof THREE.Line) {
                N.multiply(K, sa);
                R = O.geometry.vertices;
                J = a();
                J.positionScreen.copy(R[0]);
                N.multiplyVector4(J.positionScreen);
                sa = O.type === THREE.LinePieces ? 2 : 1;
                Da = 1;
                for ($ = R.length; Da < $; Da++) {
                    J = a();
                    J.positionScreen.copy(R[Da]);
                    N.multiplyVector4(J.positionScreen);
                    if (!((Da + 1) % sa > 0)) {
                        Z = l[i - 2];
                        ca.copy(J.positionScreen);
                        I.copy(Z.positionScreen);
                        if (c(ca, I)) {
                            ca.multiplyScalar(1 / ca.w);
                            I.multiplyScalar(1 / I.w);
                            Ha = q[p] = q[p] || new THREE.RenderableLine;
                            p++;
                            s = Ha;
                            s.v1.positionScreen.copy(ca);
                            s.v2.positionScreen.copy(I);
                            s.z = Math.max(ca.z, I.z);
                            s.material = O.material;
                            u.elements.push(s)
                        }
                    }
                }
            }
        }
        d = 0;
        for (za = u.sprites.length; d < za; d++) {
            O = u.sprites[d].object;
            sa = O.matrixWorld;
            if (O instanceof THREE.Particle) {
                B.set(sa.elements[12],
                sa.elements[13], sa.elements[14], 1);
                K.multiplyVector4(B);
                B.z = B.z / B.w;
                if (B.z > 0 && B.z < 1) {
                    D = y[A] = y[A] || new THREE.RenderableParticle;
                    A++;
                    w = D;
                    w.x = B.x / B.w;
                    w.y = B.y / B.w;
                    w.z = B.z;
                    w.rotation = O.rotation.z;
                    w.scale.x = O.scale.x * Math.abs(w.x - (B.x + e.projectionMatrix.elements[0]) / (B.w + e.projectionMatrix.elements[12]));
                    w.scale.y = O.scale.y * Math.abs(w.y - (B.y + e.projectionMatrix.elements[5]) / (B.w + e.projectionMatrix.elements[13]));
                    w.material = O.material;
                    u.elements.push(w)
                }
            }
        }
        f && u.elements.sort(b);
        return u
    }
};
THREE.Quaternion = function (a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = d !== void 0 ? d : 1
};
THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    set: function (a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w;
        return this
    },
    setFromEuler: function (a) {
        var b = Math.PI / 360,
            c = a.x * b,
            d = a.y * b,
            e = a.z * b,
            a = Math.cos(d),
            d = Math.sin(d),
            b = Math.cos(-e),
            e = Math.sin(-e),
            f = Math.cos(c),
            c = Math.sin(c),
            h = a * b,
            i = d * e;
        this.w = h * f - i * c;
        this.x = h * c + i * f;
        this.y = d * b * f + a * e * c;
        this.z = a * e * f - d * b * c;
        return this
    },
    setFromAxisAngle: function (a, b) {
        var c = b / 2,
            d = Math.sin(c);
        this.x = a.x * d;
        this.y = a.y * d;
        this.z = a.z * d;
        this.w = Math.cos(c);
        return this
    },
    setFromRotationMatrix: function (a) {
        var b = Math.pow(a.determinant(), 1 / 3);
        this.w = Math.sqrt(Math.max(0, b + a.elements[0] + a.elements[5] + a.elements[10])) / 2;
        this.x = Math.sqrt(Math.max(0, b + a.elements[0] - a.elements[5] - a.elements[10])) / 2;
        this.y = Math.sqrt(Math.max(0, b - a.elements[0] + a.elements[5] - a.elements[10])) / 2;
        this.z = Math.sqrt(Math.max(0, b - a.elements[0] - a.elements[5] + a.elements[10])) / 2;
        this.x = a.elements[6] - a.elements[9] < 0 ? -Math.abs(this.x) : Math.abs(this.x);
        this.y = a.elements[8] - a.elements[2] < 0 ? -Math.abs(this.y) : Math.abs(this.y);
        this.z = a.elements[1] - a.elements[4] < 0 ? -Math.abs(this.z) : Math.abs(this.z);
        this.normalize();
        return this
    },
    calculateW: function () {
        this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z));
        return this
    },
    inverse: function () {
        this.x = this.x * -1;
        this.y = this.y * -1;
        this.z = this.z * -1;
        return this
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function () {
        var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        if (a === 0) this.w = this.z = this.y = this.x = 0;
        else {
            a = 1 / a;
            this.x = this.x * a;
            this.y = this.y * a;
            this.z = this.z * a;
            this.w = this.w * a
        }
        return this
    },
    multiply: function (a, b) {
        this.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x;
        this.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y;
        this.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z;
        this.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w;
        return this
    },
    multiplySelf: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            e = this.w,
            f = a.x,
            h = a.y,
            i = a.z,
            a = a.w;
        this.x = b * a + e * f + c * i - d * h;
        this.y = c * a + e * h + d * f - b * i;
        this.z = d * a + e * i + b * h - c * f;
        this.w = e * a - b * f - c * h - d * i;
        return this
    },
    multiplyVector3: function (a, b) {
        b || (b = a);
        var c = a.x,
            d = a.y,
            e = a.z,
            f = this.x,
            h = this.y,
            i = this.z,
            l = this.w,
            k = l * c + h * e - i * d,
            j = l * d + i * c - f * e,
            m = l * e + f * d - h * c,
            c = -f * c - h * d - i * e;
        b.x = k * l + c * -f + j * -i - m * -h;
        b.y = j * l + c * -h + m * -f - k * -i;
        b.z = m * l + c * -i + k * -h - j * -f;
        return b
    },
    clone: function () {
        return new THREE.Quaternion(this.x, this.y, this.z, this.w)
    }
};
THREE.Quaternion.slerp = function (a, b, c, d) {
    var e = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
    if (e < 0) {
        c.w = -b.w;
        c.x = -b.x;
        c.y = -b.y;
        c.z = -b.z;
        e = -e
    } else c.copy(b);
    if (Math.abs(e) >= 1) {
        c.w = a.w;
        c.x = a.x;
        c.y = a.y;
        c.z = a.z;
        return c
    }
    var f = Math.acos(e),
        e = Math.sqrt(1 - e * e);
    if (Math.abs(e) < 0.001) {
        c.w = 0.5 * (a.w + b.w);
        c.x = 0.5 * (a.x + b.x);
        c.y = 0.5 * (a.y + b.y);
        c.z = 0.5 * (a.z + b.z);
        return c
    }
    b = Math.sin((1 - d) * f) / e;
    d = Math.sin(d * f) / e;
    c.w = a.w * b + c.w * d;
    c.x = a.x * b + c.x * d;
    c.y = a.y * b + c.y * d;
    c.z = a.z * b + c.z * d;
    return c
};
THREE.Vertex = function () {
    console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.")
};
THREE.Face3 = function (a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3;
    this.vertexNormals = d instanceof Array ? d : [];
    this.color = e instanceof THREE.Color ? e : new THREE.Color;
    this.vertexColors = e instanceof Array ? e : [];
    this.vertexTangents = [];
    this.materialIndex = f;
    this.centroid = new THREE.Vector3
};
THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function () {
        var a = new THREE.Face3(this.a, this.b, this.c);
        a.normal.copy(this.normal);
        a.color.copy(this.color);
        a.centroid.copy(this.centroid);
        a.materialIndex = this.materialIndex;
        var b, c;
        b = 0;
        for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        b = 0;
        for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        b = 0;
        for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
};
THREE.Face4 = function (a, b, c, d, e, f, h) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3;
    this.vertexNormals = e instanceof Array ? e : [];
    this.color = f instanceof THREE.Color ? f : new THREE.Color;
    this.vertexColors = f instanceof Array ? f : [];
    this.vertexTangents = [];
    this.materialIndex = h;
    this.centroid = new THREE.Vector3
};
THREE.Face4.prototype = {
    constructor: THREE.Face4,
    clone: function () {
        var a = new THREE.Face4(this.a, this.b, this.c, this.d);
        a.normal.copy(this.normal);
        a.color.copy(this.color);
        a.centroid.copy(this.centroid);
        a.materialIndex = this.materialIndex;
        var b, c;
        b = 0;
        for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        b = 0;
        for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        b = 0;
        for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
};
THREE.UV = function (a, b) {
    this.u = a || 0;
    this.v = b || 0
};
THREE.UV.prototype = {
    constructor: THREE.UV,
    set: function (a, b) {
        this.u = a;
        this.v = b;
        return this
    },
    copy: function (a) {
        this.u = a.u;
        this.v = a.v;
        return this
    },
    lerpSelf: function (a, b) {
        this.u = this.u + (a.u - this.u) * b;
        this.v = this.v + (a.v - this.v) * b;
        return this
    },
    clone: function () {
        return new THREE.UV(this.u, this.v)
    }
};
THREE.Geometry = function () {
    this.id = THREE.GeometryCount++;
    this.vertices = [];
    this.colors = [];
    this.materials = [];
    this.faces = [];
    this.faceUvs = [
        []
    ];
    this.faceVertexUvs = [
        []
    ];
    this.morphTargets = [];
    this.morphColors = [];
    this.morphNormals = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.dynamic = this.hasTangents = false
};
THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    applyMatrix: function (a) {
        var b = new THREE.Matrix4;
        b.extractRotation(a);
        for (var c = 0, d = this.vertices.length; c < d; c++) a.multiplyVector3(this.vertices[c]);
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            var e = this.faces[c];
            b.multiplyVector3(e.normal);
            for (var f = 0, h = e.vertexNormals.length; f < h; f++) b.multiplyVector3(e.vertexNormals[f]);
            a.multiplyVector3(e.centroid)
        }
    },
    computeCentroids: function () {
        var a, b, c;
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            c.centroid.set(0,
            0, 0);
            if (c instanceof THREE.Face3) {
                c.centroid.addSelf(this.vertices[c.a]);
                c.centroid.addSelf(this.vertices[c.b]);
                c.centroid.addSelf(this.vertices[c.c]);
                c.centroid.divideScalar(3)
            } else if (c instanceof THREE.Face4) {
                c.centroid.addSelf(this.vertices[c.a]);
                c.centroid.addSelf(this.vertices[c.b]);
                c.centroid.addSelf(this.vertices[c.c]);
                c.centroid.addSelf(this.vertices[c.d]);
                c.centroid.divideScalar(4)
            }
        }
    },
    computeFaceNormals: function () {
        var a, b, c, d, e, f, h = new THREE.Vector3,
            i = new THREE.Vector3;
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            d = this.vertices[c.a];
            e = this.vertices[c.b];
            f = this.vertices[c.c];
            h.sub(f, e);
            i.sub(d, e);
            h.crossSelf(i);
            h.isZero() || h.normalize();
            c.normal.copy(h)
        }
    },
    computeVertexNormals: function () {
        var a, b, c, d;
        if (this.__tmpVertices === void 0) {
            d = this.__tmpVertices = Array(this.vertices.length);
            a = 0;
            for (b = this.vertices.length; a < b; a++) d[a] = new THREE.Vector3;
            a = 0;
            for (b = this.faces.length; a < b; a++) {
                c = this.faces[a];
                if (c instanceof THREE.Face3) c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
                else if (c instanceof THREE.Face4) c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
            }
        } else {
            d = this.__tmpVertices;
            a = 0;
            for (b = this.vertices.length; a < b; a++) d[a].set(0, 0, 0)
        }
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            if (c instanceof THREE.Face3) {
                d[c.a].addSelf(c.normal);
                d[c.b].addSelf(c.normal);
                d[c.c].addSelf(c.normal)
            } else if (c instanceof THREE.Face4) {
                d[c.a].addSelf(c.normal);
                d[c.b].addSelf(c.normal);
                d[c.c].addSelf(c.normal);
                d[c.d].addSelf(c.normal)
            }
        }
        a = 0;
        for (b = this.vertices.length; a < b; a++) d[a].normalize();
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            if (c instanceof THREE.Face3) {
                c.vertexNormals[0].copy(d[c.a]);
                c.vertexNormals[1].copy(d[c.b]);
                c.vertexNormals[2].copy(d[c.c])
            } else if (c instanceof THREE.Face4) {
                c.vertexNormals[0].copy(d[c.a]);
                c.vertexNormals[1].copy(d[c.b]);
                c.vertexNormals[2].copy(d[c.c]);
                c.vertexNormals[3].copy(d[c.d])
            }
        }
    },
    computeMorphNormals: function () {
        var a, b, c, d, e;
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            e = this.faces[c];
            e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone();
            if (!e.__originalVertexNormals) e.__originalVertexNormals = [];
            a = 0;
            for (b = e.vertexNormals.length; a < b; a++) e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone()
        }
        var f = new THREE.Geometry;
        f.faces = this.faces;
        a = 0;
        for (b = this.morphTargets.length; a < b; a++) {
            if (!this.morphNormals[a]) {
                this.morphNormals[a] = {};
                this.morphNormals[a].faceNormals = [];
                this.morphNormals[a].vertexNormals = [];
                var h = this.morphNormals[a].faceNormals,
                    i = this.morphNormals[a].vertexNormals,
                    l, k;
                c = 0;
                for (d = this.faces.length; c < d; c++) {
                    e = this.faces[c];
                    l = new THREE.Vector3;
                    k = e instanceof THREE.Face3 ? {
                        a: new THREE.Vector3,
                        b: new THREE.Vector3,
                        c: new THREE.Vector3
                    } : {
                        a: new THREE.Vector3,
                        b: new THREE.Vector3,
                        c: new THREE.Vector3,
                        d: new THREE.Vector3
                    };
                    h.push(l);
                    i.push(k)
                }
            }
            h = this.morphNormals[a];
            f.vertices = this.morphTargets[a].vertices;
            f.computeFaceNormals();
            f.computeVertexNormals();
            c = 0;
            for (d = this.faces.length; c < d; c++) {
                e = this.faces[c];
                l = h.faceNormals[c];
                k = h.vertexNormals[c];
                l.copy(e.normal);
                if (e instanceof THREE.Face3) {
                    k.a.copy(e.vertexNormals[0]);
                    k.b.copy(e.vertexNormals[1]);
                    k.c.copy(e.vertexNormals[2])
                } else {
                    k.a.copy(e.vertexNormals[0]);
                    k.b.copy(e.vertexNormals[1]);
                    k.c.copy(e.vertexNormals[2]);
                    k.d.copy(e.vertexNormals[3])
                }
            }
        }
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            e = this.faces[c];
            e.normal = e.__originalFaceNormal;
            e.vertexNormals = e.__originalVertexNormals
        }
    },
    computeTangents: function () {
        function a(a, b, c, d, g, e, f) {
            i = a.vertices[b];
            l = a.vertices[c];
            k = a.vertices[d];
            j = h[g];
            m = h[e];
            n = h[f];
            o = l.x - i.x;
            s = k.x - i.x;
            p = l.y - i.y;
            q = k.y - i.y;
            w = l.z - i.z;
            A = k.z - i.z;
            y = m.u - j.u;
            u = n.u - j.u;
            H = m.v - j.v;
            B = n.v - j.v;
            K = 1 / (y * B - u * H);
            I.set((B * o - H * s) * K, (B * p - H * q) * K, (B * w - H * A) * K);
            ba.set((y * s - u * o) * K, (y * q - u * p) * K, (y * A - u * w) * K);
            Y[b].addSelf(I);
            Y[c].addSelf(I);
            Y[d].addSelf(I);
            ca[b].addSelf(ba);
            ca[c].addSelf(ba);
            ca[d].addSelf(ba)
        }
        var b, c, d, e, f, h, i, l, k, j, m, n, o, s, p, q, w, A, y, u, H, B, K, N, Y = [],
            ca = [],
            I = new THREE.Vector3,
            ba = new THREE.Vector3,
            ja = new THREE.Vector3,
            ya = new THREE.Vector3,
            D = new THREE.Vector3;
        b = 0;
        for (c = this.vertices.length; b < c; b++) {
            Y[b] = new THREE.Vector3;
            ca[b] = new THREE.Vector3
        }
        b = 0;
        for (c = this.faces.length; b < c; b++) {
            f = this.faces[b];
            h = this.faceVertexUvs[0][b];
            if (f instanceof THREE.Face3) a(this, f.a, f.b, f.c, 0, 1, 2);
            else if (f instanceof THREE.Face4) {
                a(this, f.a, f.b, f.d, 0, 1, 3);
                a(this, f.b, f.c, f.d, 1, 2, 3)
            }
        }
        var g = ["a", "b", "c", "d"];
        b = 0;
        for (c = this.faces.length; b < c; b++) {
            f = this.faces[b];
            for (d = 0; d < f.vertexNormals.length; d++) {
                D.copy(f.vertexNormals[d]);
                e = f[g[d]];
                N = Y[e];
                ja.copy(N);
                ja.subSelf(D.multiplyScalar(D.dot(N))).normalize();
                ya.cross(f.vertexNormals[d], N);
                e = ya.dot(ca[e]);
                e = e < 0 ? -1 : 1;
                f.vertexTangents[d] = new THREE.Vector4(ja.x, ja.y, ja.z, e)
            }
        }
        this.hasTangents = true
    },
    computeBoundingBox: function () {
        if (!this.boundingBox) this.boundingBox = {
            min: new THREE.Vector3,
            max: new THREE.Vector3
        };
        if (this.vertices.length > 0) {
            var a;
            a = this.vertices[0];
            this.boundingBox.min.copy(a);
            this.boundingBox.max.copy(a);
            for (var b = this.boundingBox.min, c = this.boundingBox.max, d = 1, e = this.vertices.length; d < e; d++) {
                a = this.vertices[d];
                if (a.x < b.x) b.x = a.x;
                else if (a.x > c.x) c.x = a.x;
                if (a.y < b.y) b.y = a.y;
                else if (a.y > c.y) c.y = a.y;
                if (a.z < b.z) b.z = a.z;
                else if (a.z > c.z) c.z = a.z
            }
        } else {
            this.boundingBox.min.set(0, 0, 0);
            this.boundingBox.max.set(0, 0, 0)
        }
    },
    computeBoundingSphere: function () {
        if (!this.boundingSphere) this.boundingSphere = {
            radius: 0
        };
        for (var a, b = 0, c = 0, d = this.vertices.length; c < d; c++) {
            a = this.vertices[c].length();
            a > b && (b = a)
        }
        this.boundingSphere.radius = b
    },
    mergeVertices: function () {
        var a = {}, b = [],
            c = [],
            d, e = Math.pow(10, 4),
            f, h, i;
        f = 0;
        for (h = this.vertices.length; f < h; f++) {
            d = this.vertices[f];
            d = [Math.round(d.x * e), Math.round(d.y * e), Math.round(d.z * e)].join("_");
            if (a[d] === void 0) {
                a[d] = f;
                b.push(this.vertices[f]);
                c[f] = b.length - 1
            } else c[f] = c[a[d]]
        }
        f = 0;
        for (h = this.faces.length; f < h; f++) {
            e = this.faces[f];
            if (e instanceof THREE.Face3) {
                e.a = c[e.a];
                e.b = c[e.b];
                e.c = c[e.c]
            } else if (e instanceof THREE.Face4) {
                e.a = c[e.a];
                e.b = c[e.b];
                e.c = c[e.c];
                e.d = c[e.d];
                d = [e.a, e.b, e.c, e.d];
                for (a = 3; a > 0; a--) if (d.indexOf(e["abcd" [a]]) != a) {
                    d.splice(a, 1);
                    this.faces[f] = new THREE.Face3(d[0], d[1], d[2]);
                    e = 0;
                    for (d = this.faceVertexUvs.length; e < d; e++)(i = this.faceVertexUvs[e][f]) && i.splice(a, 1);
                    break
                }
            }
        }
        c = this.vertices.length - b.length;
        this.vertices = b;
        return c
    }
};
THREE.GeometryCount = 0;
THREE.Spline = function (a) {
    function b(a, b, c, d, e, f, h) {
        a = (c - a) * 0.5;
        d = (d - b) * 0.5;
        return (2 * (b - c) + a + d) * h + (-3 * (b - c) - 2 * a - d) * f + a * e + b
    }
    this.points = a;
    var c = [],
        d = {
            x: 0,
            y: 0,
            z: 0
        }, e, f, h, i, l, k, j, m, n;
    this.initFromArray = function (a) {
        this.points = [];
        for (var b = 0; b < a.length; b++) this.points[b] = {
            x: a[b][0],
            y: a[b][1],
            z: a[b][2]
        }
    };
    this.getPoint = function (a) {
        e = (this.points.length - 1) * a;
        f = Math.floor(e);
        h = e - f;
        c[0] = f === 0 ? f : f - 1;
        c[1] = f;
        c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
        c[3] = f > this.points.length - 3 ? this.points.length - 1 : f + 2;
        k = this.points[c[0]];
        j = this.points[c[1]];
        m = this.points[c[2]];
        n = this.points[c[3]];
        i = h * h;
        l = h * i;
        d.x = b(k.x, j.x, m.x, n.x, h, i, l);
        d.y = b(k.y, j.y, m.y, n.y, h, i, l);
        d.z = b(k.z, j.z, m.z, n.z, h, i, l);
        return d
    };
    this.getControlPointsArray = function () {
        var a, b, c = this.points.length,
            d = [];
        for (a = 0; a < c; a++) {
            b = this.points[a];
            d[a] = [b.x, b.y, b.z]
        }
        return d
    };
    this.getLength = function (a) {
        var b, c, d, e = b = b = 0,
            f = new THREE.Vector3,
            h = new THREE.Vector3,
            i = [],
            k = 0;
        i[0] = 0;
        a || (a = 100);
        c = this.points.length * a;
        f.copy(this.points[0]);
        for (a = 1; a < c; a++) {
            b = a / c;
            d = this.getPoint(b);
            h.copy(d);
            k = k + h.distanceTo(f);
            f.copy(d);
            b = (this.points.length - 1) * b;
            b = Math.floor(b);
            if (b != e) {
                i[b] = k;
                e = b
            }
        }
        i[i.length] = k;
        return {
            chunks: i,
            total: k
        }
    };
    this.reparametrizeByArcLength = function (a) {
        var b, c, d, e, f, h, i = [],
            k = new THREE.Vector3,
            j = this.getLength();
        i.push(k.copy(this.points[0]).clone());
        for (b = 1; b < this.points.length; b++) {
            c = j.chunks[b] - j.chunks[b - 1];
            h = Math.ceil(a * c / j.total);
            e = (b - 1) / (this.points.length - 1);
            f = b / (this.points.length - 1);
            for (c = 1; c < h - 1; c++) {
                d = e + c * (1 / h) * (f - e);
                d = this.getPoint(d);
                i.push(k.copy(d).clone())
            }
            i.push(k.copy(this.points[b]).clone())
        }
        this.points = i
    }
};
THREE.Camera = function () {
    THREE.Object3D.call(this);
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = new THREE.Matrix4;
    this.projectionMatrixInverse = new THREE.Matrix4
};
THREE.Camera.prototype = new THREE.Object3D;
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.lookAt = function (a) {
    this.matrix.lookAt(this.position, a, this.up);
    this.rotationAutoUpdate && this.rotation.getRotationFromMatrix(this.matrix)
};
THREE.OrthographicCamera = function (a, b, c, d, e, f) {
    THREE.Camera.call(this);
    this.left = a;
    this.right = b;
    this.top = c;
    this.bottom = d;
    this.near = e !== void 0 ? e : 0.1;
    this.far = f !== void 0 ? f : 2E3;
    this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = new THREE.Camera;
THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera;
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
    this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
};
THREE.PerspectiveCamera = function (a, b, c, d) {
    THREE.Camera.call(this);
    this.fov = a !== void 0 ? a : 50;
    this.aspect = b !== void 0 ? b : 1;
    this.near = c !== void 0 ? c : 0.1;
    this.far = d !== void 0 ? d : 2E3;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = new THREE.Camera;
THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera;
THREE.PerspectiveCamera.prototype.setLens = function (a, b) {
    this.fov = 2 * Math.atan((b !== void 0 ? b : 24) / (a * 2)) * (180 / Math.PI);
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function (a, b, c, d, e, f) {
    this.fullWidth = a;
    this.fullHeight = b;
    this.x = c;
    this.y = d;
    this.width = e;
    this.height = f;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
    if (this.fullWidth) {
        var a = this.fullWidth / this.fullHeight,
            b = Math.tan(this.fov * Math.PI / 360) * this.near,
            c = -b,
            d = a * c,
            a = Math.abs(a * b - d),
            c = Math.abs(b - c);
        this.projectionMatrix.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) * c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this.far)
    } else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
};
THREE.Light = function (a) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(a)
};
THREE.Light.prototype = new THREE.Object3D;
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.AmbientLight = function (a) {
    THREE.Light.call(this, a)
};
THREE.AmbientLight.prototype = new THREE.Light;
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function (a, b, c) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 1, 0);
    this.target = new THREE.Object3D;
    this.intensity = b !== void 0 ? b : 1;
    this.distance = c !== void 0 ? c : 0;
    this.onlyShadow = this.castShadow = false;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5E3;
    this.shadowCameraLeft = -500;
    this.shadowCameraTop = this.shadowCameraRight = 500;
    this.shadowCameraBottom = -500;
    this.shadowCameraVisible = false;
    this.shadowBias = 0;
    this.shadowDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowCascade = false;
    this.shadowCascadeOffset = new THREE.Vector3(0, 0, - 1E3);
    this.shadowCascadeCount = 2;
    this.shadowCascadeBias = [0, 0, 0];
    this.shadowCascadeWidth = [512, 512, 512];
    this.shadowCascadeHeight = [512, 512, 512];
    this.shadowCascadeNearZ = [-1, 0.99, 0.998];
    this.shadowCascadeFarZ = [0.99, 0.998, 1];
    this.shadowCascadeArray = [];
    this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.DirectionalLight.prototype = new THREE.Light;
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function (a, b, c) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 0, 0);
    this.intensity = b !== void 0 ? b : 1;
    this.distance = c !== void 0 ? c : 0
};
THREE.PointLight.prototype = new THREE.Light;
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.SpotLight = function (a, b, c, d, e) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 1, 0);
    this.target = new THREE.Object3D;
    this.intensity = b !== void 0 ? b : 1;
    this.distance = c !== void 0 ? c : 0;
    this.angle = d !== void 0 ? d : Math.PI / 2;
    this.exponent = e !== void 0 ? e : 10;
    this.onlyShadow = this.castShadow = false;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5E3;
    this.shadowCameraFov = 50;
    this.shadowCameraVisible = false;
    this.shadowBias = 0;
    this.shadowDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.SpotLight.prototype = new THREE.Light;
THREE.SpotLight.prototype.constructor = THREE.SpotLight;
THREE.Material = function (a) {
    a = a || {};
    this.id = THREE.MaterialCount++;
    this.name = "";
    this.opacity = a.opacity !== void 0 ? a.opacity : 1;
    this.transparent = a.transparent !== void 0 ? a.transparent : false;
    this.blending = a.blending !== void 0 ? a.blending : THREE.NormalBlending;
    this.blendSrc = a.blendSrc !== void 0 ? a.blendSrc : THREE.SrcAlphaFactor;
    this.blendDst = a.blendDst !== void 0 ? a.blendDst : THREE.OneMinusSrcAlphaFactor;
    this.blendEquation = a.blendEquation !== void 0 ? a.blendEquation : THREE.AddEquation;
    this.depthTest = a.depthTest !== void 0 ? a.depthTest : true;
    this.depthWrite = a.depthWrite !== void 0 ? a.depthWrite : true;
    this.polygonOffset = a.polygonOffset !== void 0 ? a.polygonOffset : false;
    this.polygonOffsetFactor = a.polygonOffsetFactor !== void 0 ? a.polygonOffsetFactor : 0;
    this.polygonOffsetUnits = a.polygonOffsetUnits !== void 0 ? a.polygonOffsetUnits : 0;
    this.alphaTest = a.alphaTest !== void 0 ? a.alphaTest : 0;
    this.overdraw = a.overdraw !== void 0 ? a.overdraw : false;
    this.needsUpdate = this.visible = true
};
THREE.MaterialCount = 0;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.AdditiveAlphaBlending = 5;
THREE.CustomBlending = 6;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.LineBasicMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.linewidth = a.linewidth !== void 0 ? a.linewidth : 1;
    this.linecap = a.linecap !== void 0 ? a.linecap : "round";
    this.linejoin = a.linejoin !== void 0 ? a.linejoin : "round";
    this.vertexColors = a.vertexColors ? a.vertexColors : false;
    this.fog = a.fog !== void 0 ? a.fog : true
};
THREE.LineBasicMaterial.prototype = new THREE.Material;
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.MeshBasicMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.map = a.map !== void 0 ? a.map : null;
    this.lightMap = a.lightMap !== void 0 ? a.lightMap : null;
    this.envMap = a.envMap !== void 0 ? a.envMap : null;
    this.combine = a.combine !== void 0 ? a.combine : THREE.MultiplyOperation;
    this.reflectivity = a.reflectivity !== void 0 ? a.reflectivity : 1;
    this.refractionRatio = a.refractionRatio !== void 0 ? a.refractionRatio : 0.98;
    this.fog = a.fog !== void 0 ? a.fog : true;
    this.shading = a.shading !== void 0 ? a.shading : THREE.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1;
    this.wireframeLinecap = a.wireframeLinecap !== void 0 ? a.wireframeLinecap : "round";
    this.wireframeLinejoin = a.wireframeLinejoin !== void 0 ? a.wireframeLinejoin : "round";
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : THREE.NoColors;
    this.skinning = a.skinning !== void 0 ? a.skinning : false;
    this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets : false
};
THREE.MeshBasicMaterial.prototype = new THREE.Material;
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.ambient = a.ambient !== void 0 ? new THREE.Color(a.ambient) : new THREE.Color(16777215);
    this.emissive = a.emissive !== void 0 ? new THREE.Color(a.emissive) : new THREE.Color(0);
    this.wrapAround = a.wrapAround !== void 0 ? a.wrapAround : false;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.map = a.map !== void 0 ? a.map : null;
    this.lightMap = a.lightMap !== void 0 ? a.lightMap : null;
    this.envMap = a.envMap !== void 0 ? a.envMap : null;
    this.combine = a.combine !== void 0 ? a.combine : THREE.MultiplyOperation;
    this.reflectivity = a.reflectivity !== void 0 ? a.reflectivity : 1;
    this.refractionRatio = a.refractionRatio !== void 0 ? a.refractionRatio : 0.98;
    this.fog = a.fog !== void 0 ? a.fog : true;
    this.shading = a.shading !== void 0 ? a.shading : THREE.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1;
    this.wireframeLinecap = a.wireframeLinecap !== void 0 ? a.wireframeLinecap : "round";
    this.wireframeLinejoin = a.wireframeLinejoin !== void 0 ? a.wireframeLinejoin : "round";
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : THREE.NoColors;
    this.skinning = a.skinning !== void 0 ? a.skinning : false;
    this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets : false;
    this.morphNormals = a.morphNormals !== void 0 ? a.morphNormals : false
};
THREE.MeshLambertMaterial.prototype = new THREE.Material;
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.ambient = a.ambient !== void 0 ? new THREE.Color(a.ambient) : new THREE.Color(16777215);
    this.emissive = a.emissive !== void 0 ? new THREE.Color(a.emissive) : new THREE.Color(0);
    this.specular = a.specular !== void 0 ? new THREE.Color(a.specular) : new THREE.Color(1118481);
    this.shininess = a.shininess !== void 0 ? a.shininess : 30;
    this.metal = a.metal !== void 0 ? a.metal : false;
    this.perPixel = a.perPixel !== void 0 ? a.perPixel : false;
    this.wrapAround = a.wrapAround !== void 0 ? a.wrapAround : false;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.map = a.map !== void 0 ? a.map : null;
    this.lightMap = a.lightMap !== void 0 ? a.lightMap : null;
    this.envMap = a.envMap !== void 0 ? a.envMap : null;
    this.combine = a.combine !== void 0 ? a.combine : THREE.MultiplyOperation;
    this.reflectivity = a.reflectivity !== void 0 ? a.reflectivity : 1;
    this.refractionRatio = a.refractionRatio !== void 0 ? a.refractionRatio : 0.98;
    this.fog = a.fog !== void 0 ? a.fog : true;
    this.shading = a.shading !== void 0 ? a.shading : THREE.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1;
    this.wireframeLinecap = a.wireframeLinecap !== void 0 ? a.wireframeLinecap : "round";
    this.wireframeLinejoin = a.wireframeLinejoin !== void 0 ? a.wireframeLinejoin : "round";
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : THREE.NoColors;
    this.skinning = a.skinning !== void 0 ? a.skinning : false;
    this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets : false;
    this.morphNormals = a.morphNormals !== void 0 ? a.morphNormals : false
};
THREE.MeshPhongMaterial.prototype = new THREE.Material;
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.shading = a.shading !== void 0 ? a.shading : THREE.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1
};
THREE.MeshDepthMaterial.prototype = new THREE.Material;
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.shading = a.shading ? a.shading : THREE.FlatShading;
    this.wireframe = a.wireframe ? a.wireframe : false;
    this.wireframeLinewidth = a.wireframeLinewidth ? a.wireframeLinewidth : 1
};
THREE.MeshNormalMaterial.prototype = new THREE.Material;
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshFaceMaterial = function () {};
THREE.ParticleBasicMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.map = a.map !== void 0 ? a.map : null;
    this.size = a.size !== void 0 ? a.size : 1;
    this.sizeAttenuation = a.sizeAttenuation !== void 0 ? a.sizeAttenuation : true;
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : false;
    this.fog = a.fog !== void 0 ? a.fog : true
};
THREE.ParticleBasicMaterial.prototype = new THREE.Material;
THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial;
THREE.ShaderMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.fragmentShader = a.fragmentShader !== void 0 ? a.fragmentShader : "void main() {}";
    this.vertexShader = a.vertexShader !== void 0 ? a.vertexShader : "void main() {}";
    this.uniforms = a.uniforms !== void 0 ? a.uniforms : {};
    this.attributes = a.attributes;
    this.shading = a.shading !== void 0 ? a.shading : THREE.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1;
    this.fog = a.fog !== void 0 ? a.fog : false;
    this.lights = a.lights !== void 0 ? a.lights : false;
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : THREE.NoColors;
    this.skinning = a.skinning !== void 0 ? a.skinning : false;
    this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets : false;
    this.morphNormals = a.morphNormals !== void 0 ? a.morphNormals : false
};
THREE.ShaderMaterial.prototype = new THREE.Material;
THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial;
THREE.Texture = function (a, b, c, d, e, f, h, i) {
    this.id = THREE.TextureCount++;
    this.image = a;
    this.mapping = b !== void 0 ? b : new THREE.UVMapping;
    this.wrapS = c !== void 0 ? c : THREE.ClampToEdgeWrapping;
    this.wrapT = d !== void 0 ? d : THREE.ClampToEdgeWrapping;
    this.magFilter = e !== void 0 ? e : THREE.LinearFilter;
    this.minFilter = f !== void 0 ? f : THREE.LinearMipMapLinearFilter;
    this.format = h !== void 0 ? h : THREE.RGBAFormat;
    this.type = i !== void 0 ? i : THREE.UnsignedByteType;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.generateMipmaps = true;
    this.needsUpdate = this.premultiplyAlpha = false;
    this.onUpdate = null
};
THREE.Texture.prototype = {
    constructor: THREE.Texture,
    clone: function () {
        var a = new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter, this.format, this.type);
        a.offset.copy(this.offset);
        a.repeat.copy(this.repeat);
        return a
    }
};
THREE.TextureCount = 0;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.UVMapping = function () {};
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;
THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;
THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;
THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
THREE.DataTexture = function (a, b, c, d, e, f, h, i, l, k) {
    THREE.Texture.call(this, null, f, h, i, l, k, d, e);
    this.image = {
        data: a,
        width: b,
        height: c
    }
};
THREE.DataTexture.prototype = new THREE.Texture;
THREE.DataTexture.prototype.constructor = THREE.DataTexture;
THREE.DataTexture.prototype.clone = function () {
    var a = new THREE.DataTexture(this.image.data, this.image.width, this.image.height, this.format, this.type, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    return a
};
THREE.Particle = function (a) {
    THREE.Object3D.call(this);
    this.material = a
};
THREE.Particle.prototype = new THREE.Object3D;
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.ParticleSystem = function (a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = b !== void 0 ? b : new THREE.ParticleBasicMaterial({
        color: Math.random() * 16777215
    });
    this.sortParticles = false;
    if (this.geometry) {
        this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
        this.boundRadius = a.boundingSphere.radius
    }
    this.frustumCulled = false
};
THREE.ParticleSystem.prototype = new THREE.Object3D;
THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem;
THREE.Line = function (a, b, c) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = b !== void 0 ? b : new THREE.LineBasicMaterial({
        color: Math.random() * 16777215
    });
    this.type = c !== void 0 ? c : THREE.LineStrip;
    this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D;
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function (a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = b !== void 0 ? b : new THREE.MeshBasicMaterial({
        color: Math.random() * 16777215,
        wireframe: true
    });
    if (this.geometry) {
        this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
        this.boundRadius = a.boundingSphere.radius;
        if (this.geometry.morphTargets.length) {
            this.morphTargetBase = -1;
            this.morphTargetForcedOrder = [];
            this.morphTargetInfluences = [];
            this.morphTargetDictionary = {};
            for (var c = 0; c < this.geometry.morphTargets.length; c++) {
                this.morphTargetInfluences.push(0);
                this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c
            }
        }
    }
};
THREE.Mesh.prototype = new THREE.Object3D;
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
    if (this.morphTargetDictionary[a] !== void 0) return this.morphTargetDictionary[a];
    console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
    return 0
};
THREE.Ribbon = function (a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = b
};
THREE.Ribbon.prototype = new THREE.Object3D;
THREE.Ribbon.prototype.constructor = THREE.Ribbon;
THREE.LOD = function () {
    THREE.Object3D.call(this);
    this.LODs = []
};
THREE.LOD.prototype = new THREE.Object3D;
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.supr = THREE.Object3D.prototype;
THREE.LOD.prototype.addLevel = function (a, b) {
    b === void 0 && (b = 0);
    for (var b = Math.abs(b), c = 0; c < this.LODs.length; c++) if (b < this.LODs[c].visibleAtDistance) break;
    this.LODs.splice(c, 0, {
        visibleAtDistance: b,
        object3D: a
    });
    this.add(a)
};
THREE.LOD.prototype.update = function (a) {
    if (this.LODs.length > 1) {
        a.matrixWorldInverse.getInverse(a.matrixWorld);
        a = a.matrixWorldInverse;
        a = -(a.elements[2] * this.matrixWorld.elements[12] + a.elements[6] * this.matrixWorld.elements[13] + a.elements[10] * this.matrixWorld.elements[14] + a.elements[14]);
        this.LODs[0].object3D.visible = true;
        for (var b = 1; b < this.LODs.length; b++) if (a >= this.LODs[b].visibleAtDistance) {
            this.LODs[b - 1].object3D.visible = false;
            this.LODs[b].object3D.visible = true
        } else break;
        for (; b < this.LODs.length; b++) this.LODs[b].object3D.visible = false
    }
};
THREE.Sprite = function (a) {
    THREE.Object3D.call(this);
    this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.map = a.map !== void 0 ? a.map : new THREE.Texture;
    this.blending = a.blending !== void 0 ? a.blending : THREE.NormalBlending;
    this.blendSrc = a.blendSrc !== void 0 ? a.blendSrc : THREE.SrcAlphaFactor;
    this.blendDst = a.blendDst !== void 0 ? a.blendDst : THREE.OneMinusSrcAlphaFactor;
    this.blendEquation = a.blendEquation !== void 0 ? a.blendEquation : THREE.AddEquation;
    this.useScreenCoordinates = a.useScreenCoordinates !== void 0 ? a.useScreenCoordinates : true;
    this.mergeWith3D = a.mergeWith3D !== void 0 ? a.mergeWith3D : !this.useScreenCoordinates;
    this.affectedByDistance = a.affectedByDistance !== void 0 ? a.affectedByDistance : !this.useScreenCoordinates;
    this.scaleByViewport = a.scaleByViewport !== void 0 ? a.scaleByViewport : !this.affectedByDistance;
    this.alignment = a.alignment instanceof THREE.Vector2 ? a.alignment : THREE.SpriteAlignment.center;
    this.rotation3d = this.rotation;
    this.rotation = 0;
    this.opacity = 1;
    this.uvOffset = new THREE.Vector2(0, 0);
    this.uvScale = new THREE.Vector2(1, 1)
};
THREE.Sprite.prototype = new THREE.Object3D;
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.updateMatrix = function () {
    this.matrix.setPosition(this.position);
    this.rotation3d.set(0, 0, this.rotation);
    this.matrix.setRotationFromEuler(this.rotation3d);
    if (this.scale.x !== 1 || this.scale.y !== 1) {
        this.matrix.scale(this.scale);
        this.boundRadiusScale = Math.max(this.scale.x, this.scale.y)
    }
    this.matrixWorldNeedsUpdate = true
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, - 1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, - 1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, - 1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Scene = function () {
    THREE.Object3D.call(this);
    this.overrideMaterial = this.fog = null;
    this.matrixAutoUpdate = false;
    this.__objects = [];
    this.__lights = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = []
};
THREE.Scene.prototype = new THREE.Object3D;
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.__addObject = function (a) {
    if (a instanceof THREE.Light) this.__lights.indexOf(a) === -1 && this.__lights.push(a);
    else if (!(a instanceof THREE.Camera) && this.__objects.indexOf(a) === -1) {
        this.__objects.push(a);
        this.__objectsAdded.push(a);
        var b = this.__objectsRemoved.indexOf(a);
        b !== -1 && this.__objectsRemoved.splice(b, 1)
    }
    for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b])
};
THREE.Scene.prototype.__removeObject = function (a) {
    if (a instanceof THREE.Light) {
        var b = this.__lights.indexOf(a);
        b !== -1 && this.__lights.splice(b, 1)
    } else if (!(a instanceof THREE.Camera)) {
        b = this.__objects.indexOf(a);
        if (b !== -1) {
            this.__objects.splice(b, 1);
            this.__objectsRemoved.push(a);
            b = this.__objectsAdded.indexOf(a);
            b !== -1 && this.__objectsAdded.splice(b, 1)
        }
    }
    for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b])
};
THREE.Fog = function (a, b, c) {
    this.color = new THREE.Color(a);
    this.near = b !== void 0 ? b : 1;
    this.far = c !== void 0 ? c : 1E3
};
THREE.FogExp2 = function (a, b) {
    this.color = new THREE.Color(a);
    this.density = b !== void 0 ? b : 2.5E-4
};
THREE.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );\n} else {\ngl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;\n}\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
    map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
    map_vertex: "#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment: "#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
    lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nlVector = normalize( lVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - mPosition.xyz ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
    lights_phong_pars_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvarying vec3 vWorldPosition;\n#endif",
    lights_phong_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvWorldPosition = mPosition.xyz;\n#endif",
    lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * modelViewMatrix * gl_Position;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
    default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",
    morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\nvec3 transformedNormal = normalMatrix * morphedNormal;\n#else\nvec3 transformedNormal = normalMatrix * normal;\n#endif",
    shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
    shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n#ifdef USE_MORPHTARGETS\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( morphed, 1.0 );\n#else\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );\n#endif\n}\n#endif",
    alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
    linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
};
THREE.UniformsUtils = {
    merge: function (a) {
        var b, c, d, e = {};
        for (b = 0; b < a.length; b++) {
            d = this.clone(a[b]);
            for (c in d) e[c] = d[c]
        }
        return e
    },
    clone: function (a) {
        var b, c, d, e = {};
        for (b in a) {
            e[b] = {};
            for (c in a[b]) {
                d = a[b][c];
                e[b][c] = d instanceof THREE.Color || d instanceof THREE.Vector2 || d instanceof THREE.Vector3 || d instanceof THREE.Vector4 || d instanceof THREE.Matrix4 || d instanceof THREE.Texture ? d.clone() : d instanceof Array ? d.slice() : d
            }
        }
        return e
    }
};
THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0, 0, 1, 1)
        },
        lightMap: {
            type: "t",
            value: 2,
            texture: null
        },
        envMap: {
            type: "t",
            value: 1,
            texture: null
        },
        flipEnvMap: {
            type: "f",
            value: -1
        },
        useRefract: {
            type: "i",
            value: 0
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: 0.98
        },
        combine: {
            type: "i",
            value: 0
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    fog: {
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLightDirection: {
            type: "fv",
            value: []
        },
        directionalLightColor: {
            type: "fv",
            value: []
        },
        pointLightColor: {
            type: "fv",
            value: []
        },
        pointLightPosition: {
            type: "fv",
            value: []
        },
        pointLightDistance: {
            type: "fv1",
            value: []
        },
        spotLightColor: {
            type: "fv",
            value: []
        },
        spotLightPosition: {
            type: "fv",
            value: []
        },
        spotLightDirection: {
            type: "fv",
            value: []
        },
        spotLightDistance: {
            type: "fv1",
            value: []
        },
        spotLightAngle: {
            type: "fv1",
            value: []
        },
        spotLightExponent: {
            type: "fv1",
            value: []
        }
    },
    particle: {
        psColor: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    shadowmap: {
        shadowMap: {
            type: "tv",
            value: 6,
            texture: []
        },
        shadowMapSize: {
            type: "v2v",
            value: []
        },
        shadowBias: {
            type: "fv1",
            value: []
        },
        shadowDarkness: {
            type: "fv1",
            value: []
        },
        shadowMatrix: {
            type: "m4v",
            value: []
        }
    }
};
THREE.ShaderLib = {
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2E3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalMatrix * normal;\ngl_Position = projectionMatrix * mvPosition;\n}",
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
    },
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex,
        THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment,
        THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1,
                1, 1)
            }
        }]),
        vertexShader: ["varying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex,
        THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif", THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
        THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif",
        THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        vertexShader: ["varying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.morphnormal_vertex, "vNormal = transformedNormal;", THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
        THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;\nuniform float scale;",
        THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
        fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
    }
};
THREE.WebGLRenderer = function (a) {
    function b(a, b) {
        var c = a.vertices.length,
            d = b.material;
        if (d.attributes) {
            if (a.__webglCustomAttributesList === void 0) a.__webglCustomAttributesList = [];
            for (var e in d.attributes) {
                var f = d.attributes[e];
                if (!f.__webglInitialized || f.createUniqueBuffers) {
                    f.__webglInitialized = true;
                    var h = 1;
                    f.type === "v2" ? h = 2 : f.type === "v3" ? h = 3 : f.type === "v4" ? h = 4 : f.type === "c" && (h = 3);
                    f.size = h;
                    f.array = new Float32Array(c * h);
                    f.buffer = g.createBuffer();
                    f.buffer.belongsToAttribute = e;
                    f.needsUpdate = true
                }
                a.__webglCustomAttributesList.push(f)
            }
        }
    }

    function c(a, b) {
        if (a.material && !(a.material instanceof THREE.MeshFaceMaterial)) return a.material;
        if (b.materialIndex >= 0) return a.geometry.materials[b.materialIndex]
    }
    function d(a) {
        return a instanceof THREE.MeshBasicMaterial && !a.envMap || a instanceof THREE.MeshDepthMaterial ? false : a && a.shading !== void 0 && a.shading === THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading
    }
    function e(a) {
        return a.map || a.lightMap || a instanceof THREE.ShaderMaterial ? true : false
    }
    function f(a, b, c) {
        var d, e, f, h, i = a.vertices;
        h = i.length;
        var k = a.colors,
            j = k.length,
            l = a.__vertexArray,
            n = a.__colorArray,
            o = a.__sortArray,
            m = a.verticesNeedUpdate,
            p = a.colorsNeedUpdate,
            s = a.__webglCustomAttributesList;
        if (c.sortParticles) {
            Ub.copy(qb);
            Ub.multiplySelf(c.matrixWorld);
            for (d = 0; d < h; d++) {
                e = i[d];
                Ra.copy(e);
                Ub.multiplyVector3(Ra);
                o[d] = [Ra.z, d]
            }
            o.sort(function (a, b) {
                return b[0] - a[0]
            });
            for (d = 0; d < h; d++) {
                e = i[o[d][1]];
                f = d * 3;
                l[f] = e.x;
                l[f + 1] = e.y;
                l[f + 2] = e.z
            }
            for (d = 0; d < j; d++) {
                f = d * 3;
                e = k[o[d][1]];
                n[f] = e.r;
                n[f + 1] = e.g;
                n[f + 2] = e.b
            }
            if (s) {
                k = 0;
                for (j = s.length; k < j; k++) {
                    i = s[k];
                    if (i.boundTo === void 0 || i.boundTo === "vertices") {
                        f = 0;
                        e = i.value.length;
                        if (i.size === 1) for (d = 0; d < e; d++) {
                            h = o[d][1];
                            i.array[d] = i.value[h]
                        } else if (i.size === 2) for (d = 0; d < e; d++) {
                            h = o[d][1];
                            h = i.value[h];
                            i.array[f] = h.x;
                            i.array[f + 1] = h.y;
                            f = f + 2
                        } else if (i.size === 3) if (i.type === "c") for (d = 0; d < e; d++) {
                            h = o[d][1];
                            h = i.value[h];
                            i.array[f] = h.r;
                            i.array[f + 1] = h.g;
                            i.array[f + 2] = h.b;
                            f = f + 3
                        } else for (d = 0; d < e; d++) {
                            h = o[d][1];
                            h = i.value[h];
                            i.array[f] = h.x;
                            i.array[f + 1] = h.y;
                            i.array[f + 2] = h.z;
                            f = f + 3
                        } else if (i.size === 4) for (d = 0; d < e; d++) {
                            h = o[d][1];
                            h = i.value[h];
                            i.array[f] = h.x;
                            i.array[f + 1] = h.y;
                            i.array[f + 2] = h.z;
                            i.array[f + 3] = h.w;
                            f = f + 4
                        }
                    }
                }
            }
        } else {
            if (m) for (d = 0; d < h; d++) {
                e = i[d];
                f = d * 3;
                l[f] = e.x;
                l[f + 1] = e.y;
                l[f + 2] = e.z
            }
            if (p) for (d = 0; d < j; d++) {
                e = k[d];
                f = d * 3;
                n[f] = e.r;
                n[f + 1] = e.g;
                n[f + 2] = e.b
            }
            if (s) {
                k = 0;
                for (j = s.length; k < j; k++) {
                    i = s[k];
                    if (i.needsUpdate && (i.boundTo === void 0 || i.boundTo === "vertices")) {
                        e = i.value.length;
                        f = 0;
                        if (i.size === 1) for (d = 0; d < e; d++) i.array[d] = i.value[d];
                        else if (i.size === 2) for (d = 0; d < e; d++) {
                            h = i.value[d];
                            i.array[f] = h.x;
                            i.array[f + 1] = h.y;
                            f = f + 2
                        } else if (i.size === 3) if (i.type === "c") for (d = 0; d < e; d++) {
                            h = i.value[d];
                            i.array[f] = h.r;
                            i.array[f + 1] = h.g;
                            i.array[f + 2] = h.b;
                            f = f + 3
                        } else for (d = 0; d < e; d++) {
                            h = i.value[d];
                            i.array[f] = h.x;
                            i.array[f + 1] = h.y;
                            i.array[f + 2] = h.z;
                            f = f + 3
                        } else if (i.size === 4) for (d = 0; d < e; d++) {
                            h = i.value[d];
                            i.array[f] = h.x;
                            i.array[f + 1] = h.y;
                            i.array[f + 2] = h.z;
                            i.array[f + 3] = h.w;
                            f = f + 4
                        }
                    }
                }
            }
        }
        if (m || c.sortParticles) {
            g.bindBuffer(g.ARRAY_BUFFER, a.__webglVertexBuffer);
            g.bufferData(g.ARRAY_BUFFER, l, b)
        }
        if (p || c.sortParticles) {
            g.bindBuffer(g.ARRAY_BUFFER, a.__webglColorBuffer);
            g.bufferData(g.ARRAY_BUFFER,
            n, b)
        }
        if (s) {
            k = 0;
            for (j = s.length; k < j; k++) {
                i = s[k];
                if (i.needsUpdate || c.sortParticles) {
                    g.bindBuffer(g.ARRAY_BUFFER, i.buffer);
                    g.bufferData(g.ARRAY_BUFFER, i.array, b)
                }
            }
        }
    }
    function h(a, b) {
        return b.z - a.z
    }
    function i(a, b, c) {
        if (a.length) for (var d = 0, e = a.length; d < e; d++) {
            J = za = null;
            $ = R = pa = Q = Oa = La = O = -1;
            rb = true;
            a[d].render(b, c, jc, kc);
            J = za = null;
            $ = R = pa = Q = Oa = La = O = -1;
            rb = true
        }
    }
    function l(a, b, c, d, e, g, f, h) {
        var i, k, j, l;
        if (b) {
            k = a.length - 1;
            l = b = -1
        } else {
            k = 0;
            b = a.length;
            l = 1
        }
        for (var n = k; n !== b; n = n + l) {
            i = a[n];
            if (i.render) {
                k = i.object;
                j = i.buffer;
                if (h) i = h;
                else {
                    i = i[c];
                    if (!i) continue;
                    f && D.setBlending(i.blending, i.blendEquation, i.blendSrc, i.blendDst);
                    D.setDepthTest(i.depthTest);
                    D.setDepthWrite(i.depthWrite);
                    p(i.polygonOffset, i.polygonOffsetFactor, i.polygonOffsetUnits)
                }
                D.setObjectFaces(k);
                j instanceof THREE.BufferGeometry ? D.renderBufferDirect(d, e, g, i, j, k) : D.renderBuffer(d, e, g, i, j, k)
            }
        }
    }
    function k(a, b, c, d, e, g, f) {
        for (var h, i, k = 0, j = a.length; k < j; k++) {
            h = a[k];
            i = h.object;
            if (i.visible) {
                if (f) h = f;
                else {
                    h = h[b];
                    if (!h) continue;
                    g && D.setBlending(h.blending,
                    h.blendEquation, h.blendSrc, h.blendDst);
                    D.setDepthTest(h.depthTest);
                    D.setDepthWrite(h.depthWrite);
                    p(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits)
                }
                D.renderImmediateObject(c, d, e, h, i)
            }
        }
    }
    function j(a, b, c) {
        a.push({
            buffer: b,
            object: c,
            opaque: null,
            transparent: null
        })
    }
    function m(a) {
        for (var b in a.attributes) if (a.attributes[b].needsUpdate) return true;
        return false
    }
    function n(a) {
        for (var b in a.attributes) a.attributes[b].needsUpdate = false
    }
    function o(a, b, c, d, e) {
        if (!d.program || d.needsUpdate) {
            D.initMaterial(d,
            b, c, e);
            d.needsUpdate = false
        }
        if (d.morphTargets && !e.__webglMorphTargetInfluences) {
            e.__webglMorphTargetInfluences = new Float32Array(D.maxMorphTargets);
            for (var f = 0, h = D.maxMorphTargets; f < h; f++) e.__webglMorphTargetInfluences[f] = 0
        }
        var i = false,
            f = d.program,
            h = f.uniforms,
            k = d.uniforms;
        if (f !== za) {
            g.useProgram(f);
            za = f;
            i = true
        }
        if (d.id !== $) {
            $ = d.id;
            i = true
        }
        if (i || a !== J) {
            g.uniformMatrix4fv(h.projectionMatrix, false, a._projectionMatrixArray);
            a !== J && (J = a)
        }
        if (i) {
            if (c && d.fog) {
                k.fogColor.value = c.color;
                if (c instanceof THREE.Fog) {
                    k.fogNear.value = c.near;
                    k.fogFar.value = c.far
                } else if (c instanceof THREE.FogExp2) k.fogDensity.value = c.density
            }
            if (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d.lights) {
                if (rb) {
                    for (var j, l = 0, n = 0, o = 0, m, p, s, q = lc, y = q.directional.colors, A = q.directional.positions, B = q.point.colors, K = q.point.positions, N = q.point.distances, Y = q.spot.colors, O = q.spot.positions, ba = q.spot.distances, ja = q.spot.directions, ca = q.spot.angles, Q = q.spot.exponents, Z = 0, I = 0, R = 0, la = s = 0, c = la = 0, i = b.length; c < i; c++) {
                        j = b[c];
                        if (!j.onlyShadow) {
                            m = j.color;
                            p = j.intensity;
                            s = j.distance;
                            if (j instanceof THREE.AmbientLight) if (D.gammaInput) {
                                l = l + m.r * m.r;
                                n = n + m.g * m.g;
                                o = o + m.b * m.b
                            } else {
                                l = l + m.r;
                                n = n + m.g;
                                o = o + m.b
                            } else if (j instanceof THREE.DirectionalLight) {
                                s = Z * 3;
                                if (D.gammaInput) {
                                    y[s] = m.r * m.r * p * p;
                                    y[s + 1] = m.g * m.g * p * p;
                                    y[s + 2] = m.b * m.b * p * p
                                } else {
                                    y[s] = m.r * p;
                                    y[s + 1] = m.g * p;
                                    y[s + 2] = m.b * p
                                }
                                Ca.copy(j.matrixWorld.getPosition());
                                Ca.subSelf(j.target.matrixWorld.getPosition());
                                Ca.normalize();
                                A[s] = Ca.x;
                                A[s + 1] = Ca.y;
                                A[s + 2] = Ca.z;
                                Z = Z + 1
                            } else if (j instanceof THREE.PointLight) {
                                la = I * 3;
                                if (D.gammaInput) {
                                    B[la] = m.r * m.r * p * p;
                                    B[la + 1] = m.g * m.g * p * p;
                                    B[la + 2] = m.b * m.b * p * p
                                } else {
                                    B[la] = m.r * p;
                                    B[la + 1] = m.g * p;
                                    B[la + 2] = m.b * p
                                }
                                m = j.matrixWorld.getPosition();
                                K[la] = m.x;
                                K[la + 1] = m.y;
                                K[la + 2] = m.z;
                                N[I] = s;
                                I = I + 1
                            } else if (j instanceof THREE.SpotLight) {
                                la = R * 3;
                                if (D.gammaInput) {
                                    Y[la] = m.r * m.r * p * p;
                                    Y[la + 1] = m.g * m.g * p * p;
                                    Y[la + 2] = m.b * m.b * p * p
                                } else {
                                    Y[la] = m.r * p;
                                    Y[la + 1] = m.g * p;
                                    Y[la + 2] = m.b * p
                                }
                                m = j.matrixWorld.getPosition();
                                O[la] = m.x;
                                O[la + 1] = m.y;
                                O[la + 2] = m.z;
                                ba[R] = s;
                                Ca.copy(m);
                                Ca.subSelf(j.target.matrixWorld.getPosition());
                                Ca.normalize();
                                ja[la] = Ca.x;
                                ja[la + 1] = Ca.y;
                                ja[la + 2] = Ca.z;
                                ca[R] = Math.cos(j.angle);
                                Q[R] = j.exponent;
                                R = R + 1
                            }
                        }
                    }
                    c = Z * 3;
                    for (i = y.length; c < i; c++) y[c] = 0;
                    c = I * 3;
                    for (i = B.length; c < i; c++) B[c] = 0;
                    c = R * 3;
                    for (i = Y.length; c < i; c++) Y[c] = 0;
                    q.directional.length = Z;
                    q.point.length = I;
                    q.spot.length = R;
                    q.ambient[0] = l;
                    q.ambient[1] = n;
                    q.ambient[2] = o;
                    rb = false
                }
                c = lc;
                k.ambientLightColor.value = c.ambient;
                k.directionalLightColor.value = c.directional.colors;
                k.directionalLightDirection.value = c.directional.positions;
                k.pointLightColor.value = c.point.colors;
                k.pointLightPosition.value = c.point.positions;
                k.pointLightDistance.value = c.point.distances;
                k.spotLightColor.value = c.spot.colors;
                k.spotLightPosition.value = c.spot.positions;
                k.spotLightDistance.value = c.spot.distances;
                k.spotLightDirection.value = c.spot.directions;
                k.spotLightAngle.value = c.spot.angles;
                k.spotLightExponent.value = c.spot.exponents
            }
            if (d instanceof THREE.MeshBasicMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.MeshPhongMaterial) {
                k.opacity.value = d.opacity;
                D.gammaInput ? k.diffuse.value.copyGammaToLinear(d.color) : k.diffuse.value = d.color;
                (k.map.texture = d.map) && k.offsetRepeat.value.set(d.map.offset.x, d.map.offset.y, d.map.repeat.x, d.map.repeat.y);
                k.lightMap.texture = d.lightMap;
                k.envMap.texture = d.envMap;
                k.flipEnvMap.value = d.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1;
                k.reflectivity.value = d.reflectivity;
                k.refractionRatio.value = d.refractionRatio;
                k.combine.value = d.combine;
                k.useRefract.value = d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping
            }
            if (d instanceof THREE.LineBasicMaterial) {
                k.diffuse.value = d.color;
                k.opacity.value = d.opacity
            } else if (d instanceof THREE.ParticleBasicMaterial) {
                k.psColor.value = d.color;
                k.opacity.value = d.opacity;
                k.size.value = d.size;
                k.scale.value = H.height / 2;
                k.map.texture = d.map
            } else if (d instanceof THREE.MeshPhongMaterial) {
                k.shininess.value = d.shininess;
                if (D.gammaInput) {
                    k.ambient.value.copyGammaToLinear(d.ambient);
                    k.emissive.value.copyGammaToLinear(d.emissive);
                    k.specular.value.copyGammaToLinear(d.specular)
                } else {
                    k.ambient.value = d.ambient;
                    k.emissive.value = d.emissive;
                    k.specular.value = d.specular
                }
                d.wrapAround && k.wrapRGB.value.copy(d.wrapRGB)
            } else if (d instanceof THREE.MeshLambertMaterial) {
                if (D.gammaInput) {
                    k.ambient.value.copyGammaToLinear(d.ambient);
                    k.emissive.value.copyGammaToLinear(d.emissive)
                } else {
                    k.ambient.value = d.ambient;
                    k.emissive.value = d.emissive
                }
                d.wrapAround && k.wrapRGB.value.copy(d.wrapRGB)
            } else if (d instanceof THREE.MeshDepthMaterial) {
                k.mNear.value = a.near;
                k.mFar.value = a.far;
                k.opacity.value = d.opacity
            } else if (d instanceof THREE.MeshNormalMaterial) k.opacity.value = d.opacity;
            if (e.receiveShadow && !d._shadowPass && k.shadowMatrix) {
                i = c = 0;
                for (j = b.length; i < j; i++) {
                    l = b[i];
                    if (l.castShadow && (l instanceof THREE.SpotLight || l instanceof THREE.DirectionalLight && !l.shadowCascade)) {
                        k.shadowMap.texture[c] = l.shadowMap;
                        k.shadowMapSize.value[c] = l.shadowMapSize;
                        k.shadowMatrix.value[c] = l.shadowMatrix;
                        k.shadowDarkness.value[c] = l.shadowDarkness;
                        k.shadowBias.value[c] = l.shadowBias;
                        c++
                    }
                }
            }
            b = d.uniformsList;
            k = 0;
            for (c = b.length; k < c; k++) if (l = f.uniforms[b[k][1]]) {
                i = b[k][0];
                n = i.type;
                j = i.value;
                switch (n) {
                    case "i":
                        g.uniform1i(l,
                        j);
                        break;
                    case "f":
                        g.uniform1f(l, j);
                        break;
                    case "v2":
                        g.uniform2f(l, j.x, j.y);
                        break;
                    case "v3":
                        g.uniform3f(l, j.x, j.y, j.z);
                        break;
                    case "v4":
                        g.uniform4f(l, j.x, j.y, j.z, j.w);
                        break;
                    case "c":
                        g.uniform3f(l, j.r, j.g, j.b);
                        break;
                    case "fv1":
                        g.uniform1fv(l, j);
                        break;
                    case "fv":
                        g.uniform3fv(l, j);
                        break;
                    case "v2v":
                        if (!i._array) i._array = new Float32Array(2 * j.length);
                        n = 0;
                        for (o = j.length; n < o; n++) {
                            q = n * 2;
                            i._array[q] = j[n].x;
                            i._array[q + 1] = j[n].y
                        }
                        g.uniform2fv(l, i._array);
                        break;
                    case "v3v":
                        if (!i._array) i._array = new Float32Array(3 * j.length);
                        n = 0;
                        for (o = j.length; n < o; n++) {
                            q = n * 3;
                            i._array[q] = j[n].x;
                            i._array[q + 1] = j[n].y;
                            i._array[q + 2] = j[n].z
                        }
                        g.uniform3fv(l, i._array);
                        break;
                    case "v4v":
                        if (!i._array) i._array = new Float32Array(4 * j.length);
                        n = 0;
                        for (o = j.length; n < o; n++) {
                            q = n * 4;
                            i._array[q] = j[n].x;
                            i._array[q + 1] = j[n].y;
                            i._array[q + 2] = j[n].z;
                            i._array[q + 3] = j[n].w
                        }
                        g.uniform4fv(l, i._array);
                        break;
                    case "m4":
                        if (!i._array) i._array = new Float32Array(16);
                        j.flattenToArray(i._array);
                        g.uniformMatrix4fv(l, false, i._array);
                        break;
                    case "m4v":
                        if (!i._array) i._array = new Float32Array(16 * j.length);
                        n = 0;
                        for (o = j.length; n < o; n++) j[n].flattenToArrayOffset(i._array, n * 16);
                        g.uniformMatrix4fv(l, false, i._array);
                        break;
                    case "t":
                        g.uniform1i(l, j);
                        l = i.texture;
                        if (!l) continue;
                        if (l.image instanceof Array && l.image.length === 6) {
                            i = l;
                            if (i.image.length === 6) if (i.needsUpdate) {
                                if (!i.image.__webglTextureCube) i.image.__webglTextureCube = g.createTexture();
                                g.activeTexture(g.TEXTURE0 + j);
                                g.bindTexture(g.TEXTURE_CUBE_MAP, i.image.__webglTextureCube);
                                j = [];
                                for (l = 0; l < 6; l++) {
                                    n = j;
                                    o = l;
                                    if (D.autoScaleCubemaps) {
                                        q = i.image[l];
                                        A = yc;
                                        if (!(q.width <= A && q.height <= A)) {
                                            B = Math.max(q.width, q.height);
                                            y = Math.floor(q.width * A / B);
                                            A = Math.floor(q.height * A / B);
                                            B = document.createElement("canvas");
                                            B.width = y;
                                            B.height = A;
                                            B.getContext("2d").drawImage(q, 0, 0, q.width, q.height, 0, 0, y, A);
                                            q = B
                                        }
                                    } else q = i.image[l];
                                    n[o] = q
                                }
                                l = j[0];
                                n = (l.width & l.width - 1) === 0 && (l.height & l.height - 1) === 0;
                                o = u(i.format);
                                q = u(i.type);
                                w(g.TEXTURE_CUBE_MAP, i, n);
                                for (l = 0; l < 6; l++) g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X + l, 0, o, o, q, j[l]);
                                i.generateMipmaps && n && g.generateMipmap(g.TEXTURE_CUBE_MAP);
                                i.needsUpdate = false;
                                if (i.onUpdate) i.onUpdate()
                            } else {
                                g.activeTexture(g.TEXTURE0 + j);
                                g.bindTexture(g.TEXTURE_CUBE_MAP, i.image.__webglTextureCube)
                            }
                        } else if (l instanceof THREE.WebGLRenderTargetCube) {
                            i = l;
                            g.activeTexture(g.TEXTURE0 + j);
                            g.bindTexture(g.TEXTURE_CUBE_MAP, i.__webglTexture)
                        } else D.setTexture(l, j);
                        break;
                    case "tv":
                        if (!i._array) {
                            i._array = [];
                            n = 0;
                            for (o = i.texture.length; n < o; n++) i._array[n] = j + n
                        }
                        g.uniform1iv(l, i._array);
                        n = 0;
                        for (o = i.texture.length; n < o; n++)(l = i.texture[n]) && D.setTexture(l, i._array[n])
                }
            }
            if ((d instanceof
            THREE.ShaderMaterial || d instanceof THREE.MeshPhongMaterial || d.envMap) && h.cameraPosition !== null) {
                b = a.matrixWorld.getPosition();
                g.uniform3f(h.cameraPosition, b.x, b.y, b.z)
            }(d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.ShaderMaterial || d.skinning) && h.viewMatrix !== null && g.uniformMatrix4fv(h.viewMatrix, false, a._viewMatrixArray);
            d.skinning && g.uniformMatrix4fv(h.boneGlobalMatrices, false, e.boneMatrices)
        }
        g.uniformMatrix4fv(h.modelViewMatrix, false, e._modelViewMatrix.elements);
        h.normalMatrix && g.uniformMatrix3fv(h.normalMatrix, false, e._normalMatrix.elements);
        h.objectMatrix !== null && g.uniformMatrix4fv(h.objectMatrix, false, e.matrixWorld.elements);
        return f
    }
    function s(a, b) {
        a._modelViewMatrix.multiply(b.matrixWorldInverse, a.matrixWorld);
        a._normalMatrix.getInverse(a._modelViewMatrix);
        a._normalMatrix.transpose()
    }
    function p(a, b, c) {
        if (Ta !== a) {
            a ? g.enable(g.POLYGON_OFFSET_FILL) : g.disable(g.POLYGON_OFFSET_FILL);
            Ta = a
        }
        if (a && (Vb !== b || Wb !== c)) {
            g.polygonOffset(b, c);
            Vb = b;
            Wb = c
        }
    }
    function q(a,
    b) {
        var c;
        a === "fragment" ? c = g.createShader(g.FRAGMENT_SHADER) : a === "vertex" && (c = g.createShader(g.VERTEX_SHADER));
        g.shaderSource(c, b);
        g.compileShader(c);
        if (!g.getShaderParameter(c, g.COMPILE_STATUS)) {
            console.error(g.getShaderInfoLog(c));
            console.error(b);
            return null
        }
        return c
    }
    function w(a, b, c) {
        if (c) {
            g.texParameteri(a, g.TEXTURE_WRAP_S, u(b.wrapS));
            g.texParameteri(a, g.TEXTURE_WRAP_T, u(b.wrapT));
            g.texParameteri(a, g.TEXTURE_MAG_FILTER, u(b.magFilter));
            g.texParameteri(a, g.TEXTURE_MIN_FILTER, u(b.minFilter))
        } else {
            g.texParameteri(a,
            g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
            g.texParameteri(a, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
            g.texParameteri(a, g.TEXTURE_MAG_FILTER, y(b.magFilter));
            g.texParameteri(a, g.TEXTURE_MIN_FILTER, y(b.minFilter))
        }
    }
    function A(a, b) {
        g.bindRenderbuffer(g.RENDERBUFFER, a);
        if (b.depthBuffer && !b.stencilBuffer) {
            g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, b.width, b.height);
            g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, a)
        } else if (b.depthBuffer && b.stencilBuffer) {
            g.renderbufferStorage(g.RENDERBUFFER,
            g.DEPTH_STENCIL, b.width, b.height);
            g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_STENCIL_ATTACHMENT, g.RENDERBUFFER, a)
        } else g.renderbufferStorage(g.RENDERBUFFER, g.RGBA4, b.width, b.height)
    }
    function y(a) {
        switch (a) {
            case THREE.NearestFilter:
            case THREE.NearestMipMapNearestFilter:
            case THREE.NearestMipMapLinearFilter:
                return g.NEAREST;
            default:
                return g.LINEAR
        }
    }
    function u(a) {
        switch (a) {
            case THREE.RepeatWrapping:
                return g.REPEAT;
            case THREE.ClampToEdgeWrapping:
                return g.CLAMP_TO_EDGE;
            case THREE.MirroredRepeatWrapping:
                return g.MIRRORED_REPEAT;
            case THREE.NearestFilter:
                return g.NEAREST;
            case THREE.NearestMipMapNearestFilter:
                return g.NEAREST_MIPMAP_NEAREST;
            case THREE.NearestMipMapLinearFilter:
                return g.NEAREST_MIPMAP_LINEAR;
            case THREE.LinearFilter:
                return g.LINEAR;
            case THREE.LinearMipMapNearestFilter:
                return g.LINEAR_MIPMAP_NEAREST;
            case THREE.LinearMipMapLinearFilter:
                return g.LINEAR_MIPMAP_LINEAR;
            case THREE.ByteType:
                return g.BYTE;
            case THREE.UnsignedByteType:
                return g.UNSIGNED_BYTE;
            case THREE.ShortType:
                return g.SHORT;
            case THREE.UnsignedShortType:
                return g.UNSIGNED_SHORT;
            case THREE.IntType:
                return g.INT;
            case THREE.UnsignedIntType:
                return g.UNSIGNED_INT;
            case THREE.FloatType:
                return g.FLOAT;
            case THREE.AlphaFormat:
                return g.ALPHA;
            case THREE.RGBFormat:
                return g.RGB;
            case THREE.RGBAFormat:
                return g.RGBA;
            case THREE.LuminanceFormat:
                return g.LUMINANCE;
            case THREE.LuminanceAlphaFormat:
                return g.LUMINANCE_ALPHA;
            case THREE.AddEquation:
                return g.FUNC_ADD;
            case THREE.SubtractEquation:
                return g.FUNC_SUBTRACT;
            case THREE.ReverseSubtractEquation:
                return g.FUNC_REVERSE_SUBTRACT;
            case THREE.ZeroFactor:
                return g.ZERO;
            case THREE.OneFactor:
                return g.ONE;
            case THREE.SrcColorFactor:
                return g.SRC_COLOR;
            case THREE.OneMinusSrcColorFactor:
                return g.ONE_MINUS_SRC_COLOR;
            case THREE.SrcAlphaFactor:
                return g.SRC_ALPHA;
            case THREE.OneMinusSrcAlphaFactor:
                return g.ONE_MINUS_SRC_ALPHA;
            case THREE.DstAlphaFactor:
                return g.DST_ALPHA;
            case THREE.OneMinusDstAlphaFactor:
                return g.ONE_MINUS_DST_ALPHA;
            case THREE.DstColorFactor:
                return g.DST_COLOR;
            case THREE.OneMinusDstColorFactor:
                return g.ONE_MINUS_DST_COLOR;
            case THREE.SrcAlphaSaturateFactor:
                return g.SRC_ALPHA_SATURATE
        }
        return 0
    }
    var a = a || {}, H = a.canvas !== void 0 ? a.canvas : document.createElement("canvas"),
        B = a.precision !== void 0 ? a.precision : "highp",
        K = a.alpha !== void 0 ? a.alpha : true,
        N = a.premultipliedAlpha !== void 0 ? a.premultipliedAlpha : true,
        Y = a.antialias !== void 0 ? a.antialias : false,
        ca = a.stencil !== void 0 ? a.stencil : true,
        I = a.preserveDrawingBuffer !== void 0 ? a.preserveDrawingBuffer : false,
        ba = a.clearColor !== void 0 ? new THREE.Color(a.clearColor) : new THREE.Color(0),
        ja = a.clearAlpha !== void 0 ? a.clearAlpha : 0,
        ya = a.maxLights !== void 0 ? a.maxLights : 4;
    this.domElement = H;
    this.context = null;
    this.autoUpdateScene = this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = true;
    this.shadowMapEnabled = this.physicallyBasedShading = this.gammaOutput = this.gammaInput = false;
    this.shadowMapCullFrontFaces = this.shadowMapSoft = this.shadowMapAutoUpdate = true;
    this.shadowMapCascade = this.shadowMapDebug = false;
    this.maxMorphTargets = 8;
    this.maxMorphNormals = 4;
    this.autoScaleCubemaps = true;
    this.renderPluginsPre = [];
    this.renderPluginsPost = [];
    this.info = {
        memory: {
            programs: 0,
            geometries: 0,
            textures: 0
        },
        render: {
            calls: 0,
            vertices: 0,
            faces: 0,
            points: 0
        }
    };
    var D = this,
        g, Na = [],
        za = null,
        Da = null,
        $ = -1,
        R = null,
        J = null,
        Z = 0,
        Q = -1,
        pa = -1,
        O = -1,
        sa = -1,
        Ga = -1,
        Ha = -1,
        La = -1,
        Oa = -1,
        Ta = null,
        Vb = null,
        Wb = null,
        Db = null,
        Eb = 0,
        Fb = 0,
        Xb = 0,
        Gb = 0,
        jc = 0,
        kc = 0,
        Yb = new THREE.Frustum,
        qb = new THREE.Matrix4,
        Ub = new THREE.Matrix4,
        Ra = new THREE.Vector4,
        Ca = new THREE.Vector3,
        rb = true,
        lc = {
            ambient: [0, 0, 0],
            directional: {
                length: 0,
                colors: [],
                positions: []
            },
            point: {
                length: 0,
                colors: [],
                positions: [],
                distances: []
            },
            spot: {
                length: 0,
                colors: [],
                positions: [],
                distances: [],
                directions: [],
                angles: [],
                exponents: []
            }
        };
    g = function () {
        var a;
        try {
            if (!(a = H.getContext("experimental-webgl", {
                alpha: K,
                premultipliedAlpha: N,
                antialias: Y,
                stencil: ca,
                preserveDrawingBuffer: I
            }))) throw "Error creating WebGL context.";
        } catch (b) {
            console.error(b)
        }
        a.getExtension("OES_texture_float");
        return a
    }();
    g.clearColor(0, 0, 0, 1);
    g.clearDepth(1);
    g.clearStencil(0);
    g.enable(g.DEPTH_TEST);
    g.depthFunc(g.LEQUAL);
    g.frontFace(g.CCW);
    g.cullFace(g.BACK);
    g.enable(g.CULL_FACE);
    g.enable(g.BLEND);
    g.blendEquation(g.FUNC_ADD);
    g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
    g.clearColor(ba.r, ba.g, ba.b, ja);
    this.context = g;
    var Zb = g.getParameter(g.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    g.getParameter(g.MAX_TEXTURE_SIZE);
    var yc = g.getParameter(g.MAX_CUBE_MAP_TEXTURE_SIZE);
    this.getContext = function () {
        return g
    };
    this.supportsVertexTextures = function () {
        return Zb > 0
    };
    this.setSize = function (a, b) {
        H.width = a;
        H.height = b;
        this.setViewport(0, 0, H.width, H.height)
    };
    this.setViewport = function (a, b, c, d) {
        Eb = a;
        Fb = b;
        Xb = c;
        Gb = d;
        g.viewport(Eb, Fb, Xb, Gb)
    };
    this.setScissor = function (a, b, c, d) {
        g.scissor(a, b, c, d)
    };
    this.enableScissorTest = function (a) {
        a ? g.enable(g.SCISSOR_TEST) : g.disable(g.SCISSOR_TEST)
    };
    this.setClearColorHex = function (a, b) {
        ba.setHex(a);
        ja = b;
        g.clearColor(ba.r, ba.g, ba.b, ja)
    };
    this.setClearColor = function (a, b) {
        ba.copy(a);
        ja = b;
        g.clearColor(ba.r, ba.g, ba.b, ja)
    };
    this.getClearColor = function () {
        return ba
    };
    this.getClearAlpha = function () {
        return ja
    };
    this.clear = function (a, b, c) {
        var d = 0;
        if (a === void 0 || a) d = d | g.COLOR_BUFFER_BIT;
        if (b === void 0 || b) d = d | g.DEPTH_BUFFER_BIT;
        if (c === void 0 || c) d = d | g.STENCIL_BUFFER_BIT;
        g.clear(d)
    };
    this.clearTarget = function (a, b, c, d) {
        this.setRenderTarget(a);
        this.clear(b, c, d)
    };
    this.addPostPlugin = function (a) {
        a.init(this);
        this.renderPluginsPost.push(a)
    };
    this.addPrePlugin = function (a) {
        a.init(this);
        this.renderPluginsPre.push(a)
    };
    this.deallocateObject = function (a) {
        if (a.__webglInit) {
            a.__webglInit = false;
            delete a._modelViewMatrix;
            delete a._normalMatrix;
            delete a._normalMatrixArray;
            delete a._modelViewMatrixArray;
            delete a._objectMatrixArray;
            if (a instanceof THREE.Mesh) for (var b in a.geometry.geometryGroups) {
                var c = a.geometry.geometryGroups[b];
                g.deleteBuffer(c.__webglVertexBuffer);
                g.deleteBuffer(c.__webglNormalBuffer);
                g.deleteBuffer(c.__webglTangentBuffer);
                g.deleteBuffer(c.__webglColorBuffer);
                g.deleteBuffer(c.__webglUVBuffer);
                g.deleteBuffer(c.__webglUV2Buffer);
                g.deleteBuffer(c.__webglSkinVertexABuffer);
                g.deleteBuffer(c.__webglSkinVertexBBuffer);
                g.deleteBuffer(c.__webglSkinIndicesBuffer);
                g.deleteBuffer(c.__webglSkinWeightsBuffer);
                g.deleteBuffer(c.__webglFaceBuffer);
                g.deleteBuffer(c.__webglLineBuffer);
                var d = void 0,
                    e = void 0;
                if (c.numMorphTargets) {
                    d = 0;
                    for (e = c.numMorphTargets; d < e; d++) g.deleteBuffer(c.__webglMorphTargetsBuffers[d])
                }
                if (c.numMorphNormals) {
                    d = 0;
                    for (e = c.numMorphNormals; d < e; d++) g.deleteBuffer(c.__webglMorphNormalsBuffers[d])
                }
                if (c.__webglCustomAttributesList) {
                    d = void 0;
                    for (d in c.__webglCustomAttributesList) g.deleteBuffer(c.__webglCustomAttributesList[d].buffer)
                }
                D.info.memory.geometries--
            } else if (a instanceof
            THREE.Line) {
                a = a.geometry;
                g.deleteBuffer(a.__webglVertexBuffer);
                g.deleteBuffer(a.__webglColorBuffer);
                D.info.memory.geometries--
            }
        }
    };
    this.deallocateTexture = function (a) {
        if (a.__webglInit) {
            a.__webglInit = false;
            g.deleteTexture(a.__webglTexture);
            D.info.memory.textures--
        }
    };
    this.deallocateRenderTarget = function (a) {
        if (a && a.__webglTexture) {
            g.deleteTexture(a.__webglTexture);
            if (a instanceof THREE.WebGLRenderTargetCube) for (var b = 0; b < 6; b++) {
                g.deleteFramebuffer(a.__webglFramebuffer[b]);
                g.deleteRenderbuffer(a.__webglRenderbuffer[b])
            } else {
                g.deleteFramebuffer(a.__webglFramebuffer);
                g.deleteRenderbuffer(a.__webglRenderbuffer)
            }
        }
    };
    this.updateShadowMap = function (a, b) {
        za = null;
        $ = R = Oa = La = O = -1;
        rb = true;
        pa = Q = -1;
        this.shadowMapPlugin.update(a, b)
    };
    this.renderBufferImmediate = function (a, b, c) {
        if (!a.__webglVertexBuffer) a.__webglVertexBuffer = g.createBuffer();
        if (!a.__webglNormalBuffer) a.__webglNormalBuffer = g.createBuffer();
        if (a.hasPos) {
            g.bindBuffer(g.ARRAY_BUFFER, a.__webglVertexBuffer);
            g.bufferData(g.ARRAY_BUFFER, a.positionArray, g.DYNAMIC_DRAW);
            g.enableVertexAttribArray(b.attributes.position);
            g.vertexAttribPointer(b.attributes.position, 3, g.FLOAT, false, 0, 0)
        }
        if (a.hasNormal) {
            g.bindBuffer(g.ARRAY_BUFFER, a.__webglNormalBuffer);
            if (c === THREE.FlatShading) {
                var d, e, f, h, i, k, j, l, n, m, o = a.count * 3;
                for (m = 0; m < o; m = m + 9) {
                    c = a.normalArray;
                    d = c[m];
                    e = c[m + 1];
                    f = c[m + 2];
                    h = c[m + 3];
                    k = c[m + 4];
                    l = c[m + 5];
                    i = c[m + 6];
                    j = c[m + 7];
                    n = c[m + 8];
                    d = (d + h + i) / 3;
                    e = (e + k + j) / 3;
                    f = (f + l + n) / 3;
                    c[m] = d;
                    c[m + 1] = e;
                    c[m + 2] = f;
                    c[m + 3] = d;
                    c[m + 4] = e;
                    c[m + 5] = f;
                    c[m + 6] = d;
                    c[m + 7] = e;
                    c[m + 8] = f
                }
            }
            g.bufferData(g.ARRAY_BUFFER, a.normalArray, g.DYNAMIC_DRAW);
            g.enableVertexAttribArray(b.attributes.normal);
            g.vertexAttribPointer(b.attributes.normal, 3, g.FLOAT, false, 0, 0)
        }
        g.drawArrays(g.TRIANGLES, 0, a.count);
        a.count = 0
    };
    this.renderBufferDirect = function (a, b, c, d, e, f) {
        if (d.visible !== false) {
            c = o(a, b, c, d, f);
            a = c.attributes;
            b = false;
            d = e.id * 16777215 + c.id * 2 + (d.wireframe ? 1 : 0);
            if (d !== R) {
                R = d;
                b = true
            }
            if (f instanceof THREE.Mesh) {
                f = e.offsets;
                d = 0;
                for (c = f.length; d < c; ++d) {
                    if (b) {
                        g.bindBuffer(g.ARRAY_BUFFER, e.vertexPositionBuffer);
                        g.vertexAttribPointer(a.position, e.vertexPositionBuffer.itemSize, g.FLOAT, false, 0, f[d].index * 12);
                        if (a.normal >= 0 && e.vertexNormalBuffer) {
                            g.bindBuffer(g.ARRAY_BUFFER, e.vertexNormalBuffer);
                            g.vertexAttribPointer(a.normal, e.vertexNormalBuffer.itemSize, g.FLOAT, false, 0, f[d].index * 12)
                        }
                        if (a.uv >= 0 && e.vertexUvBuffer) if (e.vertexUvBuffer) {
                            g.bindBuffer(g.ARRAY_BUFFER, e.vertexUvBuffer);
                            g.vertexAttribPointer(a.uv, e.vertexUvBuffer.itemSize, g.FLOAT, false, 0, f[d].index * 8);
                            g.enableVertexAttribArray(a.uv)
                        } else g.disableVertexAttribArray(a.uv);
                        if (a.color >= 0 && e.vertexColorBuffer) {
                            g.bindBuffer(g.ARRAY_BUFFER, e.vertexColorBuffer);
                            g.vertexAttribPointer(a.color, e.vertexColorBuffer.itemSize, g.FLOAT, false, 0, f[d].index * 16)
                        }
                        g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, e.vertexIndexBuffer)
                    }
                    g.drawElements(g.TRIANGLES, f[d].count, g.UNSIGNED_SHORT, f[d].start * 2);
                    D.info.render.calls++;
                    D.info.render.vertices = D.info.render.vertices + f[d].count;
                    D.info.render.faces = D.info.render.faces + f[d].count / 3
                }
            }
        }
    };
    this.renderBuffer = function (a, b, c, d, e, f) {
        if (d.visible !== false) {
            var h, i, c = o(a, b, c, d, f),
                b = c.attributes,
                a = false,
                c = e.id * 16777215 + c.id * 2 + (d.wireframe ? 1 : 0);
            if (c !== R) {
                R = c;
                a = true
            }
            if (!d.morphTargets && b.position >= 0) {
                if (a) {
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglVertexBuffer);
                    g.vertexAttribPointer(b.position, 3, g.FLOAT, false, 0, 0)
                }
            } else if (f.morphTargetBase) {
                c = d.program.attributes;
                if (f.morphTargetBase !== -1) {
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[f.morphTargetBase]);
                    g.vertexAttribPointer(c.position, 3, g.FLOAT, false, 0, 0)
                } else if (c.position >= 0) {
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglVertexBuffer);
                    g.vertexAttribPointer(c.position, 3, g.FLOAT, false, 0,
                    0)
                }
                if (f.morphTargetForcedOrder.length) {
                    h = 0;
                    var k = f.morphTargetForcedOrder;
                    for (i = f.morphTargetInfluences; h < d.numSupportedMorphTargets && h < k.length;) {
                        g.bindBuffer(g.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[k[h]]);
                        g.vertexAttribPointer(c["morphTarget" + h], 3, g.FLOAT, false, 0, 0);
                        if (d.morphNormals) {
                            g.bindBuffer(g.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[k[h]]);
                            g.vertexAttribPointer(c["morphNormal" + h], 3, g.FLOAT, false, 0, 0)
                        }
                        f.__webglMorphTargetInfluences[h] = i[k[h]];
                        h++
                    }
                } else {
                    var k = [],
                        j = -1,
                        l = 0;
                    i = f.morphTargetInfluences;
                    var n, m = i.length;
                    h = 0;
                    for (f.morphTargetBase !== -1 && (k[f.morphTargetBase] = true); h < d.numSupportedMorphTargets;) {
                        for (n = 0; n < m; n++) if (!k[n] && i[n] > j) {
                            l = n;
                            j = i[l]
                        }
                        g.bindBuffer(g.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[l]);
                        g.vertexAttribPointer(c["morphTarget" + h], 3, g.FLOAT, false, 0, 0);
                        if (d.morphNormals) {
                            g.bindBuffer(g.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[l]);
                            g.vertexAttribPointer(c["morphNormal" + h], 3, g.FLOAT, false, 0, 0)
                        }
                        f.__webglMorphTargetInfluences[h] = j;
                        k[l] = 1;
                        j = -1;
                        h++
                    }
                }
                d.program.uniforms.morphTargetInfluences !== null && g.uniform1fv(d.program.uniforms.morphTargetInfluences, f.__webglMorphTargetInfluences)
            }
            if (a) {
                if (e.__webglCustomAttributesList) {
                    h = 0;
                    for (i = e.__webglCustomAttributesList.length; h < i; h++) {
                        c = e.__webglCustomAttributesList[h];
                        if (b[c.buffer.belongsToAttribute] >= 0) {
                            g.bindBuffer(g.ARRAY_BUFFER, c.buffer);
                            g.vertexAttribPointer(b[c.buffer.belongsToAttribute], c.size, g.FLOAT, false, 0, 0)
                        }
                    }
                }
                if (b.color >= 0) {
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglColorBuffer);
                    g.vertexAttribPointer(b.color, 3, g.FLOAT, false, 0, 0)
                }
                if (b.normal >= 0) {
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglNormalBuffer);
                    g.vertexAttribPointer(b.normal, 3, g.FLOAT, false, 0, 0)
                }
                if (b.tangent >= 0) {
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglTangentBuffer);
                    g.vertexAttribPointer(b.tangent, 4, g.FLOAT, false, 0, 0)
                }
                if (b.uv >= 0) if (e.__webglUVBuffer) {
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglUVBuffer);
                    g.vertexAttribPointer(b.uv, 2, g.FLOAT, false, 0, 0);
                    g.enableVertexAttribArray(b.uv)
                } else g.disableVertexAttribArray(b.uv);
                if (b.uv2 >= 0) if (e.__webglUV2Buffer) {
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglUV2Buffer);
                    g.vertexAttribPointer(b.uv2, 2, g.FLOAT, false, 0, 0);
                    g.enableVertexAttribArray(b.uv2)
                } else g.disableVertexAttribArray(b.uv2);
                if (d.skinning && b.skinVertexA >= 0 && b.skinVertexB >= 0 && b.skinIndex >= 0 && b.skinWeight >= 0) {
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglSkinVertexABuffer);
                    g.vertexAttribPointer(b.skinVertexA, 4, g.FLOAT, false, 0, 0);
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglSkinVertexBBuffer);
                    g.vertexAttribPointer(b.skinVertexB, 4, g.FLOAT, false, 0, 0);
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglSkinIndicesBuffer);
                    g.vertexAttribPointer(b.skinIndex,
                    4, g.FLOAT, false, 0, 0);
                    g.bindBuffer(g.ARRAY_BUFFER, e.__webglSkinWeightsBuffer);
                    g.vertexAttribPointer(b.skinWeight, 4, g.FLOAT, false, 0, 0)
                }
            }
            if (f instanceof THREE.Mesh) {
                if (d.wireframe) {
                    d = d.wireframeLinewidth;
                    if (d !== Db) {
                        g.lineWidth(d);
                        Db = d
                    }
                    a && g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer);
                    g.drawElements(g.LINES, e.__webglLineCount, g.UNSIGNED_SHORT, 0)
                } else {
                    a && g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer);
                    g.drawElements(g.TRIANGLES, e.__webglFaceCount, g.UNSIGNED_SHORT, 0)
                }
                D.info.render.calls++;
                D.info.render.vertices = D.info.render.vertices + e.__webglFaceCount;
                D.info.render.faces = D.info.render.faces + e.__webglFaceCount / 3
            } else if (f instanceof THREE.Line) {
                f = f.type === THREE.LineStrip ? g.LINE_STRIP : g.LINES;
                d = d.linewidth;
                if (d !== Db) {
                    g.lineWidth(d);
                    Db = d
                }
                g.drawArrays(f, 0, e.__webglLineCount);
                D.info.render.calls++
            }
        }
    };
    this.render = function (a, b, c, d) {
        var e, f, j, n, m = a.__lights,
            o = a.fog;
        $ = -1;
        rb = true;
        if (b.parent === void 0) {
            a.add(b)
        }
        this.autoUpdateScene && a.updateMatrixWorld();
        if (!b._viewMatrixArray) b._viewMatrixArray = new Float32Array(16);
        if (!b._projectionMatrixArray) b._projectionMatrixArray = new Float32Array(16);
        b.matrixWorldInverse.getInverse(b.matrixWorld);
        b.matrixWorldInverse.flattenToArray(b._viewMatrixArray);
        b.projectionMatrix.flattenToArray(b._projectionMatrixArray);
        qb.multiply(b.projectionMatrix, b.matrixWorldInverse);
        Yb.setFromMatrix(qb);
        this.autoUpdateObjects && this.initWebGLObjects(a);
        i(this.renderPluginsPre, a, b);
        D.info.render.calls = 0;
        D.info.render.vertices = 0;
        D.info.render.faces = 0;
        D.info.render.points = 0;
        this.setRenderTarget(c);
        (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
        n = a.__webglObjects;
        d = 0;
        for (e = n.length; d < e; d++) {
            f = n[d];
            j = f.object;
            f.render = false;
            if (j.visible && (!(j instanceof THREE.Mesh || j instanceof THREE.ParticleSystem) || !j.frustumCulled || Yb.contains(j))) {
                s(j, b);
                var q = f,
                    u = q.object,
                    y = q.buffer,
                    w = void 0,
                    w = w = void 0,
                    w = u.material;
                if (w instanceof THREE.MeshFaceMaterial) {
                    w = y.materialIndex;
                    if (w >= 0) {
                        w = u.geometry.materials[w];
                        if (w.transparent) {
                            q.transparent = w;
                            q.opaque = null
                        } else {
                            q.opaque = w;
                            q.transparent = null
                        }
                    }
                } else if (w) if (w.transparent) {
                    q.transparent = w;
                    q.opaque = null
                } else {
                    q.opaque = w;
                    q.transparent = null
                }
                f.render = true;
                if (this.sortObjects) if (j.renderDepth) f.z = j.renderDepth;
                else {
                    Ra.copy(j.matrixWorld.getPosition());
                    qb.multiplyVector3(Ra);
                    f.z = Ra.z
                }
            }
        }
        this.sortObjects && n.sort(h);
        n = a.__webglObjectsImmediate;
        d = 0;
        for (e = n.length; d < e; d++) {
            f = n[d];
            j = f.object;
            if (j.visible) {
                s(j, b);
                j = f.object.material;
                if (j.transparent) {
                    f.transparent = j;
                    f.opaque = null
                } else {
                    f.opaque = j;
                    f.transparent = null
                }
            }
        }
        if (a.overrideMaterial) {
            d = a.overrideMaterial;
            this.setBlending(d.blending, d.blendEquation, d.blendSrc, d.blendDst);
            this.setDepthTest(d.depthTest);
            this.setDepthWrite(d.depthWrite);
            p(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits);
            l(a.__webglObjects, false, "", b, m, o, true, d);
            k(a.__webglObjectsImmediate, "", b, m, o, false, d)
        } else {
            this.setBlending(THREE.NormalBlending);
            l(a.__webglObjects, true, "opaque", b, m, o, false);
            k(a.__webglObjectsImmediate, "opaque", b, m, o, false);
            l(a.__webglObjects, false, "transparent", b, m, o, true);
            k(a.__webglObjectsImmediate, "transparent", b, m, o, true)
        }
        i(this.renderPluginsPost, a, b);
        if (c && c.generateMipmaps && c.minFilter !== THREE.NearestFilter && c.minFilter !== THREE.LinearFilter) if (c instanceof THREE.WebGLRenderTargetCube) {
            g.bindTexture(g.TEXTURE_CUBE_MAP, c.__webglTexture);
            g.generateMipmap(g.TEXTURE_CUBE_MAP);
            g.bindTexture(g.TEXTURE_CUBE_MAP, null)
        } else {
            g.bindTexture(g.TEXTURE_2D, c.__webglTexture);
            g.generateMipmap(g.TEXTURE_2D);
            g.bindTexture(g.TEXTURE_2D,
            null)
        }
        this.setDepthTest(true);
        this.setDepthWrite(true)
    };
    this.renderImmediateObject = function (a, b, c, d, e) {
        var f = o(a, b, c, d, e);
        R = -1;
        D.setObjectFaces(e);
        e.immediateRenderCallback ? e.immediateRenderCallback(f, g, Yb) : e.render(function (a) {
            D.renderBufferImmediate(a, f, d.shading)
        })
    };
    this.initWebGLObjects = function (a) {
        if (!a.__webglObjects) {
            a.__webglObjects = [];
            a.__webglObjectsImmediate = [];
            a.__webglSprites = [];
            a.__webglFlares = []
        }
        for (; a.__objectsAdded.length;) {
            var h = a.__objectsAdded[0],
                i = a,
                k = void 0,
                l = void 0,
                o = void 0;
            if (!h.__webglInit) {
                h.__webglInit = true;
                h._modelViewMatrix = new THREE.Matrix4;
                h._normalMatrix = new THREE.Matrix3;
                if (h instanceof THREE.Mesh) {
                    l = h.geometry;
                    if (l instanceof THREE.Geometry) {
                        if (l.geometryGroups === void 0) {
                            var q = l,
                                p = void 0,
                                s = void 0,
                                u = void 0,
                                w = void 0,
                                y = void 0,
                                A = void 0,
                                B = void 0,
                                H = {}, K = q.morphTargets.length,
                                Y = q.morphNormals.length;
                            q.geometryGroups = {};
                            p = 0;
                            for (s = q.faces.length; p < s; p++) {
                                u = q.faces[p];
                                w = u.materialIndex;
                                A = w !== void 0 ? w : -1;
                                H[A] === void 0 && (H[A] = {
                                    hash: A,
                                    counter: 0
                                });
                                B = H[A].hash + "_" + H[A].counter;
                                q.geometryGroups[B] === void 0 && (q.geometryGroups[B] = {
                                    faces3: [],
                                    faces4: [],
                                    materialIndex: w,
                                    vertices: 0,
                                    numMorphTargets: K,
                                    numMorphNormals: Y
                                });
                                y = u instanceof THREE.Face3 ? 3 : 4;
                                if (q.geometryGroups[B].vertices + y > 65535) {
                                    H[A].counter = H[A].counter + 1;
                                    B = H[A].hash + "_" + H[A].counter;
                                    q.geometryGroups[B] === void 0 && (q.geometryGroups[B] = {
                                        faces3: [],
                                        faces4: [],
                                        materialIndex: w,
                                        vertices: 0,
                                        numMorphTargets: K,
                                        numMorphNormals: Y
                                    })
                                }
                                u instanceof THREE.Face3 ? q.geometryGroups[B].faces3.push(p) : q.geometryGroups[B].faces4.push(p);
                                q.geometryGroups[B].vertices = q.geometryGroups[B].vertices + y
                            }
                            q.geometryGroupsList = [];
                            var J = void 0;
                            for (J in q.geometryGroups) {
                                q.geometryGroups[J].id = Z++;
                                q.geometryGroupsList.push(q.geometryGroups[J])
                            }
                        }
                        for (k in l.geometryGroups) {
                            o = l.geometryGroups[k];
                            if (!o.__webglVertexBuffer) {
                                var N = o;
                                N.__webglVertexBuffer = g.createBuffer();
                                N.__webglNormalBuffer = g.createBuffer();
                                N.__webglTangentBuffer = g.createBuffer();
                                N.__webglColorBuffer = g.createBuffer();
                                N.__webglUVBuffer = g.createBuffer();
                                N.__webglUV2Buffer = g.createBuffer();
                                N.__webglSkinVertexABuffer = g.createBuffer();
                                N.__webglSkinVertexBBuffer = g.createBuffer();
                                N.__webglSkinIndicesBuffer = g.createBuffer();
                                N.__webglSkinWeightsBuffer = g.createBuffer();
                                N.__webglFaceBuffer = g.createBuffer();
                                N.__webglLineBuffer = g.createBuffer();
                                var O = void 0,
                                    R = void 0;
                                if (N.numMorphTargets) {
                                    N.__webglMorphTargetsBuffers = [];
                                    O = 0;
                                    for (R = N.numMorphTargets; O < R; O++) N.__webglMorphTargetsBuffers.push(g.createBuffer())
                                }
                                if (N.numMorphNormals) {
                                    N.__webglMorphNormalsBuffers = [];
                                    O = 0;
                                    for (R = N.numMorphNormals; O < R; O++) N.__webglMorphNormalsBuffers.push(g.createBuffer())
                                }
                                D.info.memory.geometries++;
                                var I = o,
                                    ba = h,
                                    ja = ba.geometry,
                                    ca = I.faces3,
                                    $ = I.faces4,
                                    Q = ca.length * 3 + $.length * 4,
                                    za = ca.length * 1 + $.length * 2,
                                    pa = ca.length * 3 + $.length * 4,
                                    ya = c(ba, I),
                                    Na = e(ya),
                                    la = d(ya),
                                    Da = ya.vertexColors ? ya.vertexColors : false;
                                I.__vertexArray = new Float32Array(Q * 3);
                                if (la) I.__normalArray = new Float32Array(Q * 3);
                                if (ja.hasTangents) I.__tangentArray = new Float32Array(Q * 4);
                                if (Da) I.__colorArray = new Float32Array(Q * 3);
                                if (Na) {
                                    if (ja.faceUvs.length > 0 || ja.faceVertexUvs.length > 0) I.__uvArray = new Float32Array(Q * 2);
                                    if (ja.faceUvs.length > 1 || ja.faceVertexUvs.length > 1) I.__uv2Array = new Float32Array(Q * 2)
                                }
                                if (ba.geometry.skinWeights.length && ba.geometry.skinIndices.length) {
                                    I.__skinVertexAArray = new Float32Array(Q * 4);
                                    I.__skinVertexBArray = new Float32Array(Q * 4);
                                    I.__skinIndexArray = new Float32Array(Q * 4);
                                    I.__skinWeightArray = new Float32Array(Q * 4)
                                }
                                I.__faceArray = new Uint16Array(za * 3);
                                I.__lineArray = new Uint16Array(pa * 2);
                                var sa = void 0,
                                    Ca = void 0;
                                if (I.numMorphTargets) {
                                    I.__morphTargetsArrays = [];
                                    sa = 0;
                                    for (Ca = I.numMorphTargets; sa < Ca; sa++) I.__morphTargetsArrays.push(new Float32Array(Q * 3))
                                }
                                if (I.numMorphNormals) {
                                    I.__morphNormalsArrays = [];
                                    sa = 0;
                                    for (Ca = I.numMorphNormals; sa < Ca; sa++) I.__morphNormalsArrays.push(new Float32Array(Q * 3))
                                }
                                I.__webglFaceCount = za * 3;
                                I.__webglLineCount = pa * 2;
                                if (ya.attributes) {
                                    if (I.__webglCustomAttributesList === void 0) I.__webglCustomAttributesList = [];
                                    var Ga = void 0;
                                    for (Ga in ya.attributes) {
                                        var La = ya.attributes[Ga],
                                            Ma = {}, Oa;
                                        for (Oa in La) Ma[Oa] = La[Oa];
                                        if (!Ma.__webglInitialized || Ma.createUniqueBuffers) {
                                            Ma.__webglInitialized = true;
                                            var Ha = 1;
                                            Ma.type === "v2" ? Ha = 2 : Ma.type === "v3" ? Ha = 3 : Ma.type === "v4" ? Ha = 4 : Ma.type === "c" && (Ha = 3);
                                            Ma.size = Ha;
                                            Ma.array = new Float32Array(Q * Ha);
                                            Ma.buffer = g.createBuffer();
                                            Ma.buffer.belongsToAttribute = Ga;
                                            La.needsUpdate = true;
                                            Ma.__original = La
                                        }
                                        I.__webglCustomAttributesList.push(Ma)
                                    }
                                }
                                I.__inittedArrays = true;
                                l.verticesNeedUpdate = true;
                                l.morphTargetsNeedUpdate = true;
                                l.elementsNeedUpdate = true;
                                l.uvsNeedUpdate = true;
                                l.normalsNeedUpdate = true;
                                l.tangetsNeedUpdate = true;
                                l.colorsNeedUpdate = true
                            }
                        }
                    }
                } else if (h instanceof THREE.Line) {
                    l = h.geometry;
                    if (!l.__webglVertexBuffer) {
                        var Ta = l;
                        Ta.__webglVertexBuffer = g.createBuffer();
                        Ta.__webglColorBuffer = g.createBuffer();
                        D.info.memory.geometries++;
                        var Ra = l,
                            rb = h,
                            qb = Ra.vertices.length;
                        Ra.__vertexArray = new Float32Array(qb * 3);
                        Ra.__colorArray = new Float32Array(qb * 3);
                        Ra.__webglLineCount = qb;
                        b(Ra, rb);
                        l.verticesNeedUpdate = true;
                        l.colorsNeedUpdate = true
                    }
                } else if (h instanceof THREE.ParticleSystem) {
                    l = h.geometry;
                    if (!l.__webglVertexBuffer) {
                        var Db = l;
                        Db.__webglVertexBuffer = g.createBuffer();
                        Db.__webglColorBuffer = g.createBuffer();
                        D.info.geometries++;
                        var Mb = l,
                            Ub = h,
                            Eb = Mb.vertices.length;
                        Mb.__vertexArray = new Float32Array(Eb * 3);
                        Mb.__colorArray = new Float32Array(Eb * 3);
                        Mb.__sortArray = [];
                        Mb.__webglParticleCount = Eb;
                        b(Mb, Ub);
                        l.verticesNeedUpdate = true;
                        l.colorsNeedUpdate = true
                    }
                }
            }
            if (!h.__webglActive) {
                if (h instanceof THREE.Mesh) {
                    l = h.geometry;
                    if (l instanceof THREE.BufferGeometry) j(i.__webglObjects, l, h);
                    else for (k in l.geometryGroups) {
                        o = l.geometryGroups[k];
                        j(i.__webglObjects, o, h)
                    }
                } else if (h instanceof THREE.Line) {
                    l = h.geometry;
                    j(i.__webglObjects, l, h)
                }
                h.__webglActive = true
            }
            a.__objectsAdded.splice(0, 1)
        }
        for (; a.__objectsRemoved.length;) {
            var mc = a.__objectsRemoved[0];
            if (mc instanceof THREE.Mesh || mc instanceof THREE.Line) for (var Fb = a.__webglObjects, Xb = mc, nc = Fb.length - 1; nc >= 0; nc--) Fb[nc].object === Xb && Fb.splice(nc, 1);
            mc.__webglActive = false;
            a.__objectsRemoved.splice(0, 1)
        }
        for (var Gb = 0, Yb = a.__webglObjects.length; Gb < Yb; Gb++) {
            var Va = a.__webglObjects[Gb].object,
                V = Va.geometry,
                $b = void 0,
                Nb = void 0,
                Ea = void 0;
            if (Va instanceof THREE.Mesh) if (V instanceof THREE.BufferGeometry) {
                V.verticesNeedUpdate = false;
                V.elementsNeedUpdate = false;
                V.uvsNeedUpdate = false;
                V.normalsNeedUpdate = false;
                V.colorsNeedUpdate = false
            } else {
                for (var zc = 0, jc = V.geometryGroupsList.length; zc < jc; zc++) {
                    $b = V.geometryGroupsList[zc];
                    Ea = c(Va, $b);
                    Nb = Ea.attributes && m(Ea);
                    if (V.verticesNeedUpdate || V.morphTargetsNeedUpdate || V.elementsNeedUpdate || V.uvsNeedUpdate || V.normalsNeedUpdate || V.colorsNeedUpdate || V.tangetsNeedUpdate || Nb) {
                        var M = $b,
                            kc = Va,
                            Ia = g.DYNAMIC_DRAW,
                            lc = !V.dynamic,
                            Hb = Ea;
                        if (M.__inittedArrays) {
                            var Vb = d(Hb),
                                Ac = Hb.vertexColors ? Hb.vertexColors : false,
                                Wb = e(Hb),
                                oc = Vb === THREE.SmoothShading,
                                v = void 0,
                                C = void 0,
                                Sa = void 0,
                                z = void 0,
                                Ob = void 0,
                                sb = void 0,
                                Ua = void 0,
                                pc = void 0,
                                lb = void 0,
                                Pb = void 0,
                                Qb = void 0,
                                E = void 0,
                                F = void 0,
                                G = void 0,
                                W = void 0,
                                Wa = void 0,
                                Xa = void 0,
                                Ya = void 0,
                                ac = void 0,
                                Za = void 0,
                                $a = void 0,
                                ab = void 0,
                                bc = void 0,
                                bb = void 0,
                                cb = void 0,
                                db = void 0,
                                cc = void 0,
                                eb = void 0,
                                fb = void 0,
                                gb = void 0,
                                dc = void 0,
                                hb = void 0,
                                ib = void 0,
                                jb = void 0,
                                ec = void 0,
                                tb = void 0,
                                ub = void 0,
                                vb = void 0,
                                qc = void 0,
                                wb = void 0,
                                xb = void 0,
                                yb = void 0,
                                rc = void 0,
                                S = void 0,
                                Zb = void 0,
                                zb = void 0,
                                Rb = void 0,
                                Sb = void 0,
                                ta = void 0,
                                Ic = void 0,
                                qa = void 0,
                                ra = void 0,
                                Ab = void 0,
                                mb = void 0,
                                ka = 0,
                                oa = 0,
                                nb = 0,
                                ob = 0,
                                Pa = 0,
                                xa = 0,
                                X = 0,
                                Aa = 0,
                                ma = 0,
                                x = 0,
                                L = 0,
                                t = 0,
                                Ja = void 0,
                                ua = M.__vertexArray,
                                fc = M.__uvArray,
                                gc = M.__uv2Array,
                                Qa = M.__normalArray,
                                da = M.__tangentArray,
                                va = M.__colorArray,
                                ea = M.__skinVertexAArray,
                                fa = M.__skinVertexBArray,
                                ga = M.__skinIndexArray,
                                ha = M.__skinWeightArray,
                                Bc = M.__morphTargetsArrays,
                                Cc = M.__morphNormalsArrays,
                                Dc = M.__webglCustomAttributesList,
                                r = void 0,
                                kb = M.__faceArray,
                                Ka = M.__lineArray,
                                Ba = kc.geometry,
                                yc = Ba.elementsNeedUpdate,
                                Jc = Ba.uvsNeedUpdate,
                                Nc = Ba.normalsNeedUpdate,
                                Oc = Ba.tangetsNeedUpdate,
                                Pc = Ba.colorsNeedUpdate,
                                Qc = Ba.morphTargetsNeedUpdate,
                                Ib = Ba.vertices,
                                T = M.faces3,
                                U = M.faces4,
                                na = Ba.faces,
                                Ec = Ba.faceVertexUvs[0],
                                Fc = Ba.faceVertexUvs[1],
                                Jb = Ba.skinVerticesA,
                                Kb = Ba.skinVerticesB,
                                Lb = Ba.skinIndices,
                                Bb = Ba.skinWeights,
                                Cb = Ba.morphTargets,
                                sc = Ba.morphNormals;
                            if (Ba.verticesNeedUpdate) {
                                v = 0;
                                for (C = T.length; v < C; v++) {
                                    z = na[T[v]];
                                    E = Ib[z.a];
                                    F = Ib[z.b];
                                    G = Ib[z.c];
                                    ua[oa] = E.x;
                                    ua[oa + 1] = E.y;
                                    ua[oa + 2] = E.z;
                                    ua[oa + 3] = F.x;
                                    ua[oa + 4] = F.y;
                                    ua[oa + 5] = F.z;
                                    ua[oa + 6] = G.x;
                                    ua[oa + 7] = G.y;
                                    ua[oa + 8] = G.z;
                                    oa = oa + 9
                                }
                                v = 0;
                                for (C = U.length; v < C; v++) {
                                    z = na[U[v]];
                                    E = Ib[z.a];
                                    F = Ib[z.b];
                                    G = Ib[z.c];
                                    W = Ib[z.d];
                                    ua[oa] = E.x;
                                    ua[oa + 1] = E.y;
                                    ua[oa + 2] = E.z;
                                    ua[oa + 3] = F.x;
                                    ua[oa + 4] = F.y;
                                    ua[oa + 5] = F.z;
                                    ua[oa + 6] = G.x;
                                    ua[oa + 7] = G.y;
                                    ua[oa + 8] = G.z;
                                    ua[oa + 9] = W.x;
                                    ua[oa + 10] = W.y;
                                    ua[oa + 11] = W.z;
                                    oa = oa + 12
                                }
                                g.bindBuffer(g.ARRAY_BUFFER, M.__webglVertexBuffer);
                                g.bufferData(g.ARRAY_BUFFER, ua, Ia)
                            }
                            if (Qc) {
                                ta = 0;
                                for (Ic = Cb.length; ta < Ic; ta++) {
                                    v = L = 0;
                                    for (C = T.length; v < C; v++) {
                                        Ab = T[v];
                                        z = na[Ab];
                                        E = Cb[ta].vertices[z.a];
                                        F = Cb[ta].vertices[z.b];
                                        G = Cb[ta].vertices[z.c];
                                        qa = Bc[ta];
                                        qa[L] = E.x;
                                        qa[L + 1] = E.y;
                                        qa[L + 2] = E.z;
                                        qa[L + 3] = F.x;
                                        qa[L + 4] = F.y;
                                        qa[L + 5] = F.z;
                                        qa[L + 6] = G.x;
                                        qa[L + 7] = G.y;
                                        qa[L + 8] = G.z;
                                        if (Hb.morphNormals) {
                                            if (oc) {
                                                mb = sc[ta].vertexNormals[Ab];
                                                Za = mb.a;
                                                $a = mb.b;
                                                ab = mb.c
                                            } else ab = $a = Za = sc[ta].faceNormals[Ab];
                                            ra = Cc[ta];
                                            ra[L] = Za.x;
                                            ra[L + 1] = Za.y;
                                            ra[L + 2] = Za.z;
                                            ra[L + 3] = $a.x;
                                            ra[L + 4] = $a.y;
                                            ra[L + 5] = $a.z;
                                            ra[L + 6] = ab.x;
                                            ra[L + 7] = ab.y;
                                            ra[L + 8] = ab.z
                                        }
                                        L = L + 9
                                    }
                                    v = 0;
                                    for (C = U.length; v < C; v++) {
                                        Ab = U[v];
                                        z = na[Ab];
                                        E = Cb[ta].vertices[z.a];
                                        F = Cb[ta].vertices[z.b];
                                        G = Cb[ta].vertices[z.c];
                                        W = Cb[ta].vertices[z.d];
                                        qa = Bc[ta];
                                        qa[L] = E.x;
                                        qa[L + 1] = E.y;
                                        qa[L + 2] = E.z;
                                        qa[L + 3] = F.x;
                                        qa[L + 4] = F.y;
                                        qa[L + 5] = F.z;
                                        qa[L + 6] = G.x;
                                        qa[L + 7] = G.y;
                                        qa[L + 8] = G.z;
                                        qa[L + 9] = W.x;
                                        qa[L + 10] = W.y;
                                        qa[L + 11] = W.z;
                                        if (Hb.morphNormals) {
                                            if (oc) {
                                                mb = sc[ta].vertexNormals[Ab];
                                                Za = mb.a;
                                                $a = mb.b;
                                                ab = mb.c;
                                                bc = mb.d
                                            } else bc = ab = $a = Za = sc[ta].faceNormals[Ab];
                                            ra = Cc[ta];
                                            ra[L] = Za.x;
                                            ra[L + 1] = Za.y;
                                            ra[L + 2] = Za.z;
                                            ra[L + 3] = $a.x;
                                            ra[L + 4] = $a.y;
                                            ra[L + 5] = $a.z;
                                            ra[L + 6] = ab.x;
                                            ra[L + 7] = ab.y;
                                            ra[L + 8] = ab.z;
                                            ra[L + 9] = bc.x;
                                            ra[L + 10] = bc.y;
                                            ra[L + 11] = bc.z
                                        }
                                        L = L + 12
                                    }
                                    g.bindBuffer(g.ARRAY_BUFFER,
                                    M.__webglMorphTargetsBuffers[ta]);
                                    g.bufferData(g.ARRAY_BUFFER, Bc[ta], Ia);
                                    if (Hb.morphNormals) {
                                        g.bindBuffer(g.ARRAY_BUFFER, M.__webglMorphNormalsBuffers[ta]);
                                        g.bufferData(g.ARRAY_BUFFER, Cc[ta], Ia)
                                    }
                                }
                            }
                            if (Bb.length) {
                                v = 0;
                                for (C = T.length; v < C; v++) {
                                    z = na[T[v]];
                                    eb = Bb[z.a];
                                    fb = Bb[z.b];
                                    gb = Bb[z.c];
                                    ha[x] = eb.x;
                                    ha[x + 1] = eb.y;
                                    ha[x + 2] = eb.z;
                                    ha[x + 3] = eb.w;
                                    ha[x + 4] = fb.x;
                                    ha[x + 5] = fb.y;
                                    ha[x + 6] = fb.z;
                                    ha[x + 7] = fb.w;
                                    ha[x + 8] = gb.x;
                                    ha[x + 9] = gb.y;
                                    ha[x + 10] = gb.z;
                                    ha[x + 11] = gb.w;
                                    hb = Lb[z.a];
                                    ib = Lb[z.b];
                                    jb = Lb[z.c];
                                    ga[x] = hb.x;
                                    ga[x + 1] = hb.y;
                                    ga[x + 2] = hb.z;
                                    ga[x + 3] = hb.w;
                                    ga[x + 4] = ib.x;
                                    ga[x + 5] = ib.y;
                                    ga[x + 6] = ib.z;
                                    ga[x + 7] = ib.w;
                                    ga[x + 8] = jb.x;
                                    ga[x + 9] = jb.y;
                                    ga[x + 10] = jb.z;
                                    ga[x + 11] = jb.w;
                                    tb = Jb[z.a];
                                    ub = Jb[z.b];
                                    vb = Jb[z.c];
                                    ea[x] = tb.x;
                                    ea[x + 1] = tb.y;
                                    ea[x + 2] = tb.z;
                                    ea[x + 3] = 1;
                                    ea[x + 4] = ub.x;
                                    ea[x + 5] = ub.y;
                                    ea[x + 6] = ub.z;
                                    ea[x + 7] = 1;
                                    ea[x + 8] = vb.x;
                                    ea[x + 9] = vb.y;
                                    ea[x + 10] = vb.z;
                                    ea[x + 11] = 1;
                                    wb = Kb[z.a];
                                    xb = Kb[z.b];
                                    yb = Kb[z.c];
                                    fa[x] = wb.x;
                                    fa[x + 1] = wb.y;
                                    fa[x + 2] = wb.z;
                                    fa[x + 3] = 1;
                                    fa[x + 4] = xb.x;
                                    fa[x + 5] = xb.y;
                                    fa[x + 6] = xb.z;
                                    fa[x + 7] = 1;
                                    fa[x + 8] = yb.x;
                                    fa[x + 9] = yb.y;
                                    fa[x + 10] = yb.z;
                                    fa[x + 11] = 1;
                                    x = x + 12
                                }
                                v = 0;
                                for (C = U.length; v < C; v++) {
                                    z = na[U[v]];
                                    eb = Bb[z.a];
                                    fb = Bb[z.b];
                                    gb = Bb[z.c];
                                    dc = Bb[z.d];
                                    ha[x] = eb.x;
                                    ha[x + 1] = eb.y;
                                    ha[x + 2] = eb.z;
                                    ha[x + 3] = eb.w;
                                    ha[x + 4] = fb.x;
                                    ha[x + 5] = fb.y;
                                    ha[x + 6] = fb.z;
                                    ha[x + 7] = fb.w;
                                    ha[x + 8] = gb.x;
                                    ha[x + 9] = gb.y;
                                    ha[x + 10] = gb.z;
                                    ha[x + 11] = gb.w;
                                    ha[x + 12] = dc.x;
                                    ha[x + 13] = dc.y;
                                    ha[x + 14] = dc.z;
                                    ha[x + 15] = dc.w;
                                    hb = Lb[z.a];
                                    ib = Lb[z.b];
                                    jb = Lb[z.c];
                                    ec = Lb[z.d];
                                    ga[x] = hb.x;
                                    ga[x + 1] = hb.y;
                                    ga[x + 2] = hb.z;
                                    ga[x + 3] = hb.w;
                                    ga[x + 4] = ib.x;
                                    ga[x + 5] = ib.y;
                                    ga[x + 6] = ib.z;
                                    ga[x + 7] = ib.w;
                                    ga[x + 8] = jb.x;
                                    ga[x + 9] = jb.y;
                                    ga[x + 10] = jb.z;
                                    ga[x + 11] = jb.w;
                                    ga[x + 12] = ec.x;
                                    ga[x + 13] = ec.y;
                                    ga[x + 14] = ec.z;
                                    ga[x + 15] = ec.w;
                                    tb = Jb[z.a];
                                    ub = Jb[z.b];
                                    vb = Jb[z.c];
                                    qc = Jb[z.d];
                                    ea[x] = tb.x;
                                    ea[x + 1] = tb.y;
                                    ea[x + 2] = tb.z;
                                    ea[x + 3] = 1;
                                    ea[x + 4] = ub.x;
                                    ea[x + 5] = ub.y;
                                    ea[x + 6] = ub.z;
                                    ea[x + 7] = 1;
                                    ea[x + 8] = vb.x;
                                    ea[x + 9] = vb.y;
                                    ea[x + 10] = vb.z;
                                    ea[x + 11] = 1;
                                    ea[x + 12] = qc.x;
                                    ea[x + 13] = qc.y;
                                    ea[x + 14] = qc.z;
                                    ea[x + 15] = 1;
                                    wb = Kb[z.a];
                                    xb = Kb[z.b];
                                    yb = Kb[z.c];
                                    rc = Kb[z.d];
                                    fa[x] = wb.x;
                                    fa[x + 1] = wb.y;
                                    fa[x + 2] = wb.z;
                                    fa[x + 3] = 1;
                                    fa[x + 4] = xb.x;
                                    fa[x + 5] = xb.y;
                                    fa[x + 6] = xb.z;
                                    fa[x + 7] = 1;
                                    fa[x + 8] = yb.x;
                                    fa[x + 9] = yb.y;
                                    fa[x + 10] = yb.z;
                                    fa[x + 11] = 1;
                                    fa[x + 12] = rc.x;
                                    fa[x + 13] = rc.y;
                                    fa[x + 14] = rc.z;
                                    fa[x + 15] = 1;
                                    x = x + 16
                                }
                                if (x > 0) {
                                    g.bindBuffer(g.ARRAY_BUFFER, M.__webglSkinVertexABuffer);
                                    g.bufferData(g.ARRAY_BUFFER, ea, Ia);
                                    g.bindBuffer(g.ARRAY_BUFFER, M.__webglSkinVertexBBuffer);
                                    g.bufferData(g.ARRAY_BUFFER, fa, Ia);
                                    g.bindBuffer(g.ARRAY_BUFFER, M.__webglSkinIndicesBuffer);
                                    g.bufferData(g.ARRAY_BUFFER, ga, Ia);
                                    g.bindBuffer(g.ARRAY_BUFFER, M.__webglSkinWeightsBuffer);
                                    g.bufferData(g.ARRAY_BUFFER, ha, Ia)
                                }
                            }
                            if (Pc && Ac) {
                                v = 0;
                                for (C = T.length; v < C; v++) {
                                    z = na[T[v]];
                                    Ua = z.vertexColors;
                                    pc = z.color;
                                    if (Ua.length === 3 && Ac === THREE.VertexColors) {
                                        bb = Ua[0];
                                        cb = Ua[1];
                                        db = Ua[2]
                                    } else db = cb = bb = pc;
                                    va[ma] = bb.r;
                                    va[ma + 1] = bb.g;
                                    va[ma + 2] = bb.b;
                                    va[ma + 3] = cb.r;
                                    va[ma + 4] = cb.g;
                                    va[ma + 5] = cb.b;
                                    va[ma + 6] = db.r;
                                    va[ma + 7] = db.g;
                                    va[ma + 8] = db.b;
                                    ma = ma + 9
                                }
                                v = 0;
                                for (C = U.length; v < C; v++) {
                                    z = na[U[v]];
                                    Ua = z.vertexColors;
                                    pc = z.color;
                                    if (Ua.length === 4 && Ac === THREE.VertexColors) {
                                        bb = Ua[0];
                                        cb = Ua[1];
                                        db = Ua[2];
                                        cc = Ua[3]
                                    } else cc = db = cb = bb = pc;
                                    va[ma] = bb.r;
                                    va[ma + 1] = bb.g;
                                    va[ma + 2] = bb.b;
                                    va[ma + 3] = cb.r;
                                    va[ma + 4] = cb.g;
                                    va[ma + 5] = cb.b;
                                    va[ma + 6] = db.r;
                                    va[ma + 7] = db.g;
                                    va[ma + 8] = db.b;
                                    va[ma + 9] = cc.r;
                                    va[ma + 10] = cc.g;
                                    va[ma + 11] = cc.b;
                                    ma = ma + 12
                                }
                                if (ma > 0) {
                                    g.bindBuffer(g.ARRAY_BUFFER, M.__webglColorBuffer);
                                    g.bufferData(g.ARRAY_BUFFER, va, Ia)
                                }
                            }
                            if (Oc && Ba.hasTangents) {
                                v = 0;
                                for (C = T.length; v < C; v++) {
                                    z = na[T[v]];
                                    lb = z.vertexTangents;
                                    Wa = lb[0];
                                    Xa = lb[1];
                                    Ya = lb[2];
                                    da[X] = Wa.x;
                                    da[X + 1] = Wa.y;
                                    da[X + 2] = Wa.z;
                                    da[X + 3] = Wa.w;
                                    da[X + 4] = Xa.x;
                                    da[X + 5] = Xa.y;
                                    da[X + 6] = Xa.z;
                                    da[X + 7] = Xa.w;
                                    da[X + 8] = Ya.x;
                                    da[X + 9] = Ya.y;
                                    da[X + 10] = Ya.z;
                                    da[X + 11] = Ya.w;
                                    X = X + 12
                                }
                                v = 0;
                                for (C = U.length; v < C; v++) {
                                    z = na[U[v]];
                                    lb = z.vertexTangents;
                                    Wa = lb[0];
                                    Xa = lb[1];
                                    Ya = lb[2];
                                    ac = lb[3];
                                    da[X] = Wa.x;
                                    da[X + 1] = Wa.y;
                                    da[X + 2] = Wa.z;
                                    da[X + 3] = Wa.w;
                                    da[X + 4] = Xa.x;
                                    da[X + 5] = Xa.y;
                                    da[X + 6] = Xa.z;
                                    da[X + 7] = Xa.w;
                                    da[X + 8] = Ya.x;
                                    da[X + 9] = Ya.y;
                                    da[X + 10] = Ya.z;
                                    da[X + 11] = Ya.w;
                                    da[X + 12] = ac.x;
                                    da[X + 13] = ac.y;
                                    da[X + 14] = ac.z;
                                    da[X + 15] = ac.w;
                                    X = X + 16
                                }
                                g.bindBuffer(g.ARRAY_BUFFER, M.__webglTangentBuffer);
                                g.bufferData(g.ARRAY_BUFFER, da, Ia)
                            }
                            if (Nc && Vb) {
                                v = 0;
                                for (C = T.length; v < C; v++) {
                                    z = na[T[v]];
                                    Ob = z.vertexNormals;
                                    sb = z.normal;
                                    if (Ob.length === 3 && oc) for (S = 0; S < 3; S++) {
                                        zb = Ob[S];
                                        Qa[xa] = zb.x;
                                        Qa[xa + 1] = zb.y;
                                        Qa[xa + 2] = zb.z;
                                        xa = xa + 3
                                    } else for (S = 0; S < 3; S++) {
                                        Qa[xa] = sb.x;
                                        Qa[xa + 1] = sb.y;
                                        Qa[xa + 2] = sb.z;
                                        xa = xa + 3
                                    }
                                }
                                v = 0;
                                for (C = U.length; v < C; v++) {
                                    z = na[U[v]];
                                    Ob = z.vertexNormals;
                                    sb = z.normal;
                                    if (Ob.length === 4 && oc) for (S = 0; S < 4; S++) {
                                        zb = Ob[S];
                                        Qa[xa] = zb.x;
                                        Qa[xa + 1] = zb.y;
                                        Qa[xa + 2] = zb.z;
                                        xa = xa + 3
                                    } else for (S = 0; S < 4; S++) {
                                        Qa[xa] = sb.x;
                                        Qa[xa + 1] = sb.y;
                                        Qa[xa + 2] = sb.z;
                                        xa = xa + 3
                                    }
                                }
                                g.bindBuffer(g.ARRAY_BUFFER, M.__webglNormalBuffer);
                                g.bufferData(g.ARRAY_BUFFER, Qa, Ia)
                            }
                            if (Jc && Ec && Wb) {
                                v = 0;
                                for (C = T.length; v < C; v++) {
                                    Sa = T[v];
                                    z = na[Sa];
                                    Pb = Ec[Sa];
                                    if (Pb !== void 0) for (S = 0; S < 3; S++) {
                                        Rb = Pb[S];
                                        fc[nb] = Rb.u;
                                        fc[nb + 1] = Rb.v;
                                        nb = nb + 2
                                    }
                                }
                                v = 0;
                                for (C = U.length; v < C; v++) {
                                    Sa = U[v];
                                    z = na[Sa];
                                    Pb = Ec[Sa];
                                    if (Pb !== void 0) for (S = 0; S < 4; S++) {
                                        Rb = Pb[S];
                                        fc[nb] = Rb.u;
                                        fc[nb + 1] = Rb.v;
                                        nb = nb + 2
                                    }
                                }
                                if (nb > 0) {
                                    g.bindBuffer(g.ARRAY_BUFFER, M.__webglUVBuffer);
                                    g.bufferData(g.ARRAY_BUFFER, fc, Ia)
                                }
                            }
                            if (Jc && Fc && Wb) {
                                v = 0;
                                for (C = T.length; v < C; v++) {
                                    Sa = T[v];
                                    z = na[Sa];
                                    Qb = Fc[Sa];
                                    if (Qb !== void 0) for (S = 0; S < 3; S++) {
                                        Sb = Qb[S];
                                        gc[ob] = Sb.u;
                                        gc[ob + 1] = Sb.v;
                                        ob = ob + 2
                                    }
                                }
                                v = 0;
                                for (C = U.length; v < C; v++) {
                                    Sa = U[v];
                                    z = na[Sa];
                                    Qb = Fc[Sa];
                                    if (Qb !== void 0) for (S = 0; S < 4; S++) {
                                        Sb = Qb[S];
                                        gc[ob] = Sb.u;
                                        gc[ob + 1] = Sb.v;
                                        ob = ob + 2
                                    }
                                }
                                if (ob > 0) {
                                    g.bindBuffer(g.ARRAY_BUFFER, M.__webglUV2Buffer);
                                    g.bufferData(g.ARRAY_BUFFER, gc, Ia)
                                }
                            }
                            if (yc) {
                                v = 0;
                                for (C = T.length; v < C; v++) {
                                    z = na[T[v]];
                                    kb[Pa] = ka;
                                    kb[Pa + 1] = ka + 1;
                                    kb[Pa + 2] = ka + 2;
                                    Pa = Pa + 3;
                                    Ka[Aa] = ka;
                                    Ka[Aa + 1] = ka + 1;
                                    Ka[Aa + 2] = ka;
                                    Ka[Aa + 3] = ka + 2;
                                    Ka[Aa + 4] = ka + 1;
                                    Ka[Aa + 5] = ka + 2;
                                    Aa = Aa + 6;
                                    ka = ka + 3
                                }
                                v = 0;
                                for (C = U.length; v < C; v++) {
                                    z = na[U[v]];
                                    kb[Pa] = ka;
                                    kb[Pa + 1] = ka + 1;
                                    kb[Pa + 2] = ka + 3;
                                    kb[Pa + 3] = ka + 1;
                                    kb[Pa + 4] = ka + 2;
                                    kb[Pa + 5] = ka + 3;
                                    Pa = Pa + 6;
                                    Ka[Aa] = ka;
                                    Ka[Aa + 1] = ka + 1;
                                    Ka[Aa + 2] = ka;
                                    Ka[Aa + 3] = ka + 3;
                                    Ka[Aa + 4] = ka + 1;
                                    Ka[Aa + 5] = ka + 2;
                                    Ka[Aa + 6] = ka + 2;
                                    Ka[Aa + 7] = ka + 3;
                                    Aa = Aa + 8;
                                    ka = ka + 4
                                }
                                g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, M.__webglFaceBuffer);
                                g.bufferData(g.ELEMENT_ARRAY_BUFFER, kb, Ia);
                                g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, M.__webglLineBuffer);
                                g.bufferData(g.ELEMENT_ARRAY_BUFFER, Ka, Ia)
                            }
                            if (Dc) {
                                S = 0;
                                for (Zb = Dc.length; S < Zb; S++) {
                                    r = Dc[S];
                                    if (r.__original.needsUpdate) {
                                        t = 0;
                                        if (r.size === 1) if (r.boundTo === void 0 || r.boundTo === "vertices") {
                                            v = 0;
                                            for (C = T.length; v < C; v++) {
                                                z = na[T[v]];
                                                r.array[t] = r.value[z.a];
                                                r.array[t + 1] = r.value[z.b];
                                                r.array[t + 2] = r.value[z.c];
                                                t = t + 3
                                            }
                                            v = 0;
                                            for (C = U.length; v < C; v++) {
                                                z = na[U[v]];
                                                r.array[t] = r.value[z.a];
                                                r.array[t + 1] = r.value[z.b];
                                                r.array[t + 2] = r.value[z.c];
                                                r.array[t + 3] = r.value[z.d];
                                                t = t + 4
                                            }
                                        } else {
                                            if (r.boundTo === "faces") {
                                                v = 0;
                                                for (C = T.length; v < C; v++) {
                                                    Ja = r.value[T[v]];
                                                    r.array[t] = Ja;
                                                    r.array[t + 1] = Ja;
                                                    r.array[t + 2] = Ja;
                                                    t = t + 3
                                                }
                                                v = 0;
                                                for (C = U.length; v < C; v++) {
                                                    Ja = r.value[U[v]];
                                                    r.array[t] = Ja;
                                                    r.array[t + 1] = Ja;
                                                    r.array[t + 2] = Ja;
                                                    r.array[t + 3] = Ja;
                                                    t = t + 4
                                                }
                                            }
                                        } else if (r.size === 2) if (r.boundTo === void 0 || r.boundTo === "vertices") {
                                            v = 0;
                                            for (C = T.length; v < C; v++) {
                                                z = na[T[v]];
                                                E = r.value[z.a];
                                                F = r.value[z.b];
                                                G = r.value[z.c];
                                                r.array[t] = E.x;
                                                r.array[t + 1] = E.y;
                                                r.array[t + 2] = F.x;
                                                r.array[t + 3] = F.y;
                                                r.array[t + 4] = G.x;
                                                r.array[t + 5] = G.y;
                                                t = t + 6
                                            }
                                            v = 0;
                                            for (C = U.length; v < C; v++) {
                                                z = na[U[v]];
                                                E = r.value[z.a];
                                                F = r.value[z.b];
                                                G = r.value[z.c];
                                                W = r.value[z.d];
                                                r.array[t] = E.x;
                                                r.array[t + 1] = E.y;
                                                r.array[t + 2] = F.x;
                                                r.array[t + 3] = F.y;
                                                r.array[t + 4] = G.x;
                                                r.array[t + 5] = G.y;
                                                r.array[t + 6] = W.x;
                                                r.array[t + 7] = W.y;
                                                t = t + 8
                                            }
                                        } else {
                                            if (r.boundTo === "faces") {
                                                v = 0;
                                                for (C = T.length; v < C; v++) {
                                                    G = F = E = Ja = r.value[T[v]];
                                                    r.array[t] = E.x;
                                                    r.array[t + 1] = E.y;
                                                    r.array[t + 2] = F.x;
                                                    r.array[t + 3] = F.y;
                                                    r.array[t + 4] = G.x;
                                                    r.array[t + 5] = G.y;
                                                    t = t + 6
                                                }
                                                v = 0;
                                                for (C = U.length; v < C; v++) {
                                                    W = G = F = E = Ja = r.value[U[v]];
                                                    r.array[t] = E.x;
                                                    r.array[t + 1] = E.y;
                                                    r.array[t + 2] = F.x;
                                                    r.array[t + 3] = F.y;
                                                    r.array[t + 4] = G.x;
                                                    r.array[t + 5] = G.y;
                                                    r.array[t + 6] = W.x;
                                                    r.array[t + 7] = W.y;
                                                    t = t + 8
                                                }
                                            }
                                        } else if (r.size === 3) {
                                            var P;
                                            P = r.type === "c" ? ["r", "g", "b"] : ["x", "y", "z"];
                                            if (r.boundTo === void 0 || r.boundTo === "vertices") {
                                                v = 0;
                                                for (C = T.length; v < C; v++) {
                                                    z = na[T[v]];
                                                    E = r.value[z.a];
                                                    F = r.value[z.b];
                                                    G = r.value[z.c];
                                                    r.array[t] = E[P[0]];
                                                    r.array[t + 1] = E[P[1]];
                                                    r.array[t + 2] = E[P[2]];
                                                    r.array[t + 3] = F[P[0]];
                                                    r.array[t + 4] = F[P[1]];
                                                    r.array[t + 5] = F[P[2]];
                                                    r.array[t + 6] = G[P[0]];
                                                    r.array[t + 7] = G[P[1]];
                                                    r.array[t + 8] = G[P[2]];
                                                    t = t + 9
                                                }
                                                v = 0;
                                                for (C = U.length; v < C; v++) {
                                                    z = na[U[v]];
                                                    E = r.value[z.a];
                                                    F = r.value[z.b];
                                                    G = r.value[z.c];
                                                    W = r.value[z.d];
                                                    r.array[t] = E[P[0]];
                                                    r.array[t + 1] = E[P[1]];
                                                    r.array[t + 2] = E[P[2]];
                                                    r.array[t + 3] = F[P[0]];
                                                    r.array[t + 4] = F[P[1]];
                                                    r.array[t + 5] = F[P[2]];
                                                    r.array[t + 6] = G[P[0]];
                                                    r.array[t + 7] = G[P[1]];
                                                    r.array[t + 8] = G[P[2]];
                                                    r.array[t + 9] = W[P[0]];
                                                    r.array[t + 10] = W[P[1]];
                                                    r.array[t + 11] = W[P[2]];
                                                    t = t + 12
                                                }
                                            } else if (r.boundTo === "faces") {
                                                v = 0;
                                                for (C = T.length; v < C; v++) {
                                                    G = F = E = Ja = r.value[T[v]];
                                                    r.array[t] = E[P[0]];
                                                    r.array[t + 1] = E[P[1]];
                                                    r.array[t + 2] = E[P[2]];
                                                    r.array[t + 3] = F[P[0]];
                                                    r.array[t + 4] = F[P[1]];
                                                    r.array[t + 5] = F[P[2]];
                                                    r.array[t + 6] = G[P[0]];
                                                    r.array[t + 7] = G[P[1]];
                                                    r.array[t + 8] = G[P[2]];
                                                    t = t + 9
                                                }
                                                v = 0;
                                                for (C = U.length; v < C; v++) {
                                                    W = G = F = E = Ja = r.value[U[v]];
                                                    r.array[t] = E[P[0]];
                                                    r.array[t + 1] = E[P[1]];
                                                    r.array[t + 2] = E[P[2]];
                                                    r.array[t + 3] = F[P[0]];
                                                    r.array[t + 4] = F[P[1]];
                                                    r.array[t + 5] = F[P[2]];
                                                    r.array[t + 6] = G[P[0]];
                                                    r.array[t + 7] = G[P[1]];
                                                    r.array[t + 8] = G[P[2]];
                                                    r.array[t + 9] = W[P[0]];
                                                    r.array[t + 10] = W[P[1]];
                                                    r.array[t + 11] = W[P[2]];
                                                    t = t + 12
                                                }
                                            }
                                        } else if (r.size === 4) if (r.boundTo === void 0 || r.boundTo === "vertices") {
                                            v = 0;
                                            for (C = T.length; v < C; v++) {
                                                z = na[T[v]];
                                                E = r.value[z.a];
                                                F = r.value[z.b];
                                                G = r.value[z.c];
                                                r.array[t] = E.x;
                                                r.array[t + 1] = E.y;
                                                r.array[t + 2] = E.z;
                                                r.array[t + 3] = E.w;
                                                r.array[t + 4] = F.x;
                                                r.array[t + 5] = F.y;
                                                r.array[t + 6] = F.z;
                                                r.array[t + 7] = F.w;
                                                r.array[t + 8] = G.x;
                                                r.array[t + 9] = G.y;
                                                r.array[t + 10] = G.z;
                                                r.array[t + 11] = G.w;
                                                t = t + 12
                                            }
                                            v = 0;
                                            for (C = U.length; v < C; v++) {
                                                z = na[U[v]];
                                                E = r.value[z.a];
                                                F = r.value[z.b];
                                                G = r.value[z.c];
                                                W = r.value[z.d];
                                                r.array[t] = E.x;
                                                r.array[t + 1] = E.y;
                                                r.array[t + 2] = E.z;
                                                r.array[t + 3] = E.w;
                                                r.array[t + 4] = F.x;
                                                r.array[t + 5] = F.y;
                                                r.array[t + 6] = F.z;
                                                r.array[t + 7] = F.w;
                                                r.array[t + 8] = G.x;
                                                r.array[t + 9] = G.y;
                                                r.array[t + 10] = G.z;
                                                r.array[t + 11] = G.w;
                                                r.array[t + 12] = W.x;
                                                r.array[t + 13] = W.y;
                                                r.array[t + 14] = W.z;
                                                r.array[t + 15] = W.w;
                                                t = t + 16
                                            }
                                        } else if (r.boundTo === "faces") {
                                            v = 0;
                                            for (C = T.length; v < C; v++) {
                                                G = F = E = Ja = r.value[T[v]];
                                                r.array[t] = E.x;
                                                r.array[t + 1] = E.y;
                                                r.array[t + 2] = E.z;
                                                r.array[t + 3] = E.w;
                                                r.array[t + 4] = F.x;
                                                r.array[t + 5] = F.y;
                                                r.array[t + 6] = F.z;
                                                r.array[t + 7] = F.w;
                                                r.array[t + 8] = G.x;
                                                r.array[t + 9] = G.y;
                                                r.array[t + 10] = G.z;
                                                r.array[t + 11] = G.w;
                                                t = t + 12
                                            }
                                            v = 0;
                                            for (C = U.length; v < C; v++) {
                                                W = G = F = E = Ja = r.value[U[v]];
                                                r.array[t] = E.x;
                                                r.array[t + 1] = E.y;
                                                r.array[t + 2] = E.z;
                                                r.array[t + 3] = E.w;
                                                r.array[t + 4] = F.x;
                                                r.array[t + 5] = F.y;
                                                r.array[t + 6] = F.z;
                                                r.array[t + 7] = F.w;
                                                r.array[t + 8] = G.x;
                                                r.array[t + 9] = G.y;
                                                r.array[t + 10] = G.z;
                                                r.array[t + 11] = G.w;
                                                r.array[t + 12] = W.x;
                                                r.array[t + 13] = W.y;
                                                r.array[t + 14] = W.z;
                                                r.array[t + 15] = W.w;
                                                t = t + 16
                                            }
                                        }
                                        g.bindBuffer(g.ARRAY_BUFFER, r.buffer);
                                        g.bufferData(g.ARRAY_BUFFER, r.array, Ia)
                                    }
                                }
                            }
                            if (lc) {
                                delete M.__inittedArrays;
                                delete M.__colorArray;
                                delete M.__normalArray;
                                delete M.__tangentArray;
                                delete M.__uvArray;
                                delete M.__uv2Array;
                                delete M.__faceArray;
                                delete M.__vertexArray;
                                delete M.__lineArray;
                                delete M.__skinVertexAArray;
                                delete M.__skinVertexBArray;
                                delete M.__skinIndexArray;
                                delete M.__skinWeightArray
                            }
                        }
                    }
                }
                V.verticesNeedUpdate = false;
                V.morphTargetsNeedUpdate = false;
                V.elementsNeedUpdate = false;
                V.uvsNeedUpdate = false;
                V.normalsNeedUpdate = false;
                V.colorsNeedUpdate = false;
                V.tangetsNeedUpdate = false;
                Ea.attributes && n(Ea)
            } else if (Va instanceof
            THREE.Line) {
                Ea = c(Va, $b);
                Nb = Ea.attributes && m(Ea);
                if (V.verticesNeedUpdate || V.colorsNeedUpdate || Nb) {
                    var pb = V,
                        Gc = g.DYNAMIC_DRAW,
                        hc = void 0,
                        ic = void 0,
                        tc = void 0,
                        ia = void 0,
                        uc = void 0,
                        Kc = pb.vertices,
                        Lc = pb.colors,
                        Rc = Kc.length,
                        Sc = Lc.length,
                        vc = pb.__vertexArray,
                        wc = pb.__colorArray,
                        Tc = pb.colorsNeedUpdate,
                        Hc = pb.__webglCustomAttributesList,
                        xc = void 0,
                        Mc = void 0,
                        wa = void 0,
                        Tb = void 0,
                        Fa = void 0,
                        aa = void 0;
                    if (pb.verticesNeedUpdate) {
                        for (hc = 0; hc < Rc; hc++) {
                            tc = Kc[hc];
                            ia = hc * 3;
                            vc[ia] = tc.x;
                            vc[ia + 1] = tc.y;
                            vc[ia + 2] = tc.z
                        }
                        g.bindBuffer(g.ARRAY_BUFFER,
                        pb.__webglVertexBuffer);
                        g.bufferData(g.ARRAY_BUFFER, vc, Gc)
                    }
                    if (Tc) {
                        for (ic = 0; ic < Sc; ic++) {
                            uc = Lc[ic];
                            ia = ic * 3;
                            wc[ia] = uc.r;
                            wc[ia + 1] = uc.g;
                            wc[ia + 2] = uc.b
                        }
                        g.bindBuffer(g.ARRAY_BUFFER, pb.__webglColorBuffer);
                        g.bufferData(g.ARRAY_BUFFER, wc, Gc)
                    }
                    if (Hc) {
                        xc = 0;
                        for (Mc = Hc.length; xc < Mc; xc++) {
                            aa = Hc[xc];
                            if (aa.needsUpdate && (aa.boundTo === void 0 || aa.boundTo === "vertices")) {
                                ia = 0;
                                Tb = aa.value.length;
                                if (aa.size === 1) for (wa = 0; wa < Tb; wa++) aa.array[wa] = aa.value[wa];
                                else if (aa.size === 2) for (wa = 0; wa < Tb; wa++) {
                                    Fa = aa.value[wa];
                                    aa.array[ia] = Fa.x;
                                    aa.array[ia + 1] = Fa.y;
                                    ia = ia + 2
                                } else if (aa.size === 3) if (aa.type === "c") for (wa = 0; wa < Tb; wa++) {
                                    Fa = aa.value[wa];
                                    aa.array[ia] = Fa.r;
                                    aa.array[ia + 1] = Fa.g;
                                    aa.array[ia + 2] = Fa.b;
                                    ia = ia + 3
                                } else for (wa = 0; wa < Tb; wa++) {
                                    Fa = aa.value[wa];
                                    aa.array[ia] = Fa.x;
                                    aa.array[ia + 1] = Fa.y;
                                    aa.array[ia + 2] = Fa.z;
                                    ia = ia + 3
                                } else if (aa.size === 4) for (wa = 0; wa < Tb; wa++) {
                                    Fa = aa.value[wa];
                                    aa.array[ia] = Fa.x;
                                    aa.array[ia + 1] = Fa.y;
                                    aa.array[ia + 2] = Fa.z;
                                    aa.array[ia + 3] = Fa.w;
                                    ia = ia + 4
                                }
                                g.bindBuffer(g.ARRAY_BUFFER, aa.buffer);
                                g.bufferData(g.ARRAY_BUFFER, aa.array, Gc)
                            }
                        }
                    }
                }
                V.verticesNeedUpdate = false;
                V.colorsNeedUpdate = false;
                Ea.attributes && n(Ea)
            } else if (Va instanceof THREE.ParticleSystem) {
                Ea = c(Va, $b);
                Nb = Ea.attributes && m(Ea);
                (V.verticesNeedUpdate || V.colorsNeedUpdate || Va.sortParticles || Nb) && f(V, g.DYNAMIC_DRAW, Va);
                V.verticesNeedUpdate = false;
                V.colorsNeedUpdate = false;
                Ea.attributes && n(Ea)
            }
        }
    };
    this.initMaterial = function (a, b, c, d) {
        var e, f, h;
        a instanceof THREE.MeshDepthMaterial ? h = "depth" : a instanceof THREE.MeshNormalMaterial ? h = "normal" : a instanceof THREE.MeshBasicMaterial ? h = "basic" : a instanceof THREE.MeshLambertMaterial ? h = "lambert" : a instanceof THREE.MeshPhongMaterial ? h = "phong" : a instanceof THREE.LineBasicMaterial ? h = "basic" : a instanceof THREE.ParticleBasicMaterial && (h = "particle_basic");
        if (h) {
            var i = THREE.ShaderLib[h];
            a.uniforms = THREE.UniformsUtils.clone(i.uniforms);
            a.vertexShader = i.vertexShader;
            a.fragmentShader = i.fragmentShader
        }
        var k, j, l, n, m;
        k = n = m = i = 0;
        for (j = b.length; k < j; k++) {
            l = b[k];
            if (!l.onlyShadow) {
                l instanceof THREE.DirectionalLight && n++;
                l instanceof THREE.PointLight && m++;
                l instanceof THREE.SpotLight && i++
            }
        }
        if (m + i + n <= ya) {
            j = n;
            l = m;
            n = i
        } else {
            j = Math.ceil(ya * n / (m + n));
            n = l = ya - j
        }
        var o = 0,
            i = 0;
        for (m = b.length; i < m; i++) {
            k = b[i];
            if (k.castShadow) {
                k instanceof THREE.SpotLight && o++;
                k instanceof THREE.DirectionalLight && !k.shadowCascade && o++
            }
        }
        var p;
        a: {
            m = a.fragmentShader;
            k = a.vertexShader;
            var i = a.uniforms,
                b = a.attributes,
                c = {
                    map: !! a.map,
                    envMap: !! a.envMap,
                    lightMap: !! a.lightMap,
                    vertexColors: a.vertexColors,
                    fog: c,
                    useFog: a.fog,
                    sizeAttenuation: a.sizeAttenuation,
                    skinning: a.skinning,
                    maxBones: 50,
                    morphTargets: a.morphTargets,
                    morphNormals: a.morphNormals,
                    maxMorphTargets: this.maxMorphTargets,
                    maxMorphNormals: this.maxMorphNormals,
                    maxDirLights: j,
                    maxPointLights: l,
                    maxSpotLights: n,
                    maxShadows: o,
                    shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
                    shadowMapSoft: this.shadowMapSoft,
                    shadowMapDebug: this.shadowMapDebug,
                    shadowMapCascade: this.shadowMapCascade,
                    alphaTest: a.alphaTest,
                    metal: a.metal,
                    perPixel: a.perPixel,
                    wrapAround: a.wrapAround,
                    doubleSided: d && d.doubleSided
                }, s, d = [];
            if (h) d.push(h);
            else {
                d.push(m);
                d.push(k)
            }
            for (s in c) {
                d.push(s);
                d.push(c[s])
            }
            h = d.join();
            s = 0;
            for (d = Na.length; s < d; s++) if (Na[s].code === h) {
                p = Na[s].program;
                break a
            }
            s = g.createProgram();
            d = ["precision " + B + " float;", Zb > 0 ? "#define VERTEX_TEXTURES" : "", D.gammaInput ? "#define GAMMA_INPUT" : "", D.gammaOutput ? "#define GAMMA_OUTPUT" : "", D.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_SHADOWS " + c.maxShadows, "#define MAX_BONES " + c.maxBones, c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.skinning ? "#define USE_SKINNING" : "", c.morphTargets ? "#define USE_MORPHTARGETS" : "", c.morphNormals ? "#define USE_MORPHNORMALS" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", c.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
            j = ["precision " + B + " float;", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_SHADOWS " + c.maxShadows, c.alphaTest ? "#define ALPHATEST " + c.alphaTest : "", D.gammaInput ? "#define GAMMA_INPUT" : "", D.gammaOutput ? "#define GAMMA_OUTPUT" : "", D.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", c.useFog && c.fog ? "#define USE_FOG" : "", c.useFog && c.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "", c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.metal ? "#define METAL" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");
            g.attachShader(s, q("fragment", j + m));
            g.attachShader(s, q("vertex", d + k));
            g.linkProgram(s);
            g.getProgramParameter(s, g.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + g.getProgramParameter(s, g.VALIDATE_STATUS) + ", gl error [" + g.getError() + "]");
            s.uniforms = {};
            s.attributes = {};
            var u, d = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "objectMatrix", "cameraPosition", "boneGlobalMatrices", "morphTargetInfluences"];
            for (u in i) d.push(u);
            u = d;
            d = 0;
            for (i = u.length; d < i; d++) {
                m = u[d];
                s.uniforms[m] = g.getUniformLocation(s, m)
            }
            d = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"];
            for (u = 0; u < c.maxMorphTargets; u++) d.push("morphTarget" + u);
            for (u = 0; u < c.maxMorphNormals; u++) d.push("morphNormal" + u);
            for (p in b) d.push(p);
            p = d;
            u = 0;
            for (b = p.length; u < b; u++) {
                c = p[u];
                s.attributes[c] = g.getAttribLocation(s, c)
            }
            s.id = Na.length;
            Na.push({
                program: s,
                code: h
            });
            D.info.memory.programs = Na.length;
            p = s
        }
        a.program = p;
        p = a.program.attributes;
        p.position >= 0 && g.enableVertexAttribArray(p.position);
        p.color >= 0 && g.enableVertexAttribArray(p.color);
        p.normal >= 0 && g.enableVertexAttribArray(p.normal);
        p.tangent >= 0 && g.enableVertexAttribArray(p.tangent);
        if (a.skinning && p.skinVertexA >= 0 && p.skinVertexB >= 0 && p.skinIndex >= 0 && p.skinWeight >= 0) {
            g.enableVertexAttribArray(p.skinVertexA);
            g.enableVertexAttribArray(p.skinVertexB);
            g.enableVertexAttribArray(p.skinIndex);
            g.enableVertexAttribArray(p.skinWeight)
        }
        if (a.attributes) for (f in a.attributes) p[f] !== void 0 && p[f] >= 0 && g.enableVertexAttribArray(p[f]);
        if (a.morphTargets) {
            a.numSupportedMorphTargets = 0;
            s = "morphTarget";
            for (f = 0; f < this.maxMorphTargets; f++) {
                u = s + f;
                if (p[u] >= 0) {
                    g.enableVertexAttribArray(p[u]);
                    a.numSupportedMorphTargets++
                }
            }
        }
        if (a.morphNormals) {
            a.numSupportedMorphNormals = 0;
            s = "morphNormal";
            for (f = 0; f < this.maxMorphNormals; f++) {
                u = s + f;
                if (p[u] >= 0) {
                    g.enableVertexAttribArray(p[u]);
                    a.numSupportedMorphNormals++
                }
            }
        }
        a.uniformsList = [];
        for (e in a.uniforms) a.uniformsList.push([a.uniforms[e], e])
    };
    this.setFaceCulling = function (a, b) {
        if (a) {
            !b || b === "ccw" ? g.frontFace(g.CCW) : g.frontFace(g.CW);
            a === "back" ? g.cullFace(g.BACK) : a === "front" ? g.cullFace(g.FRONT) : g.cullFace(g.FRONT_AND_BACK);
            g.enable(g.CULL_FACE)
        } else g.disable(g.CULL_FACE)
    };
    this.setObjectFaces = function (a) {
        if (Q !== a.doubleSided) {
            a.doubleSided ? g.disable(g.CULL_FACE) : g.enable(g.CULL_FACE);
            Q = a.doubleSided
        }
        if (pa !== a.flipSided) {
            a.flipSided ? g.frontFace(g.CW) : g.frontFace(g.CCW);
            pa = a.flipSided
        }
    };
    this.setDepthTest = function (a) {
        if (La !== a) {
            a ? g.enable(g.DEPTH_TEST) : g.disable(g.DEPTH_TEST);
            La = a
        }
    };
    this.setDepthWrite = function (a) {
        if (Oa !== a) {
            g.depthMask(a);
            Oa = a
        }
    };
    this.setBlending = function (a, b, c, d) {
        if (a !== O) {
            switch (a) {
                case THREE.NoBlending:
                    g.disable(g.BLEND);
                    break;
                case THREE.AdditiveBlending:
                    g.enable(g.BLEND);
                    g.blendEquation(g.FUNC_ADD);
                    g.blendFunc(g.SRC_ALPHA, g.ONE);
                    break;
                case THREE.SubtractiveBlending:
                    g.enable(g.BLEND);
                    g.blendEquation(g.FUNC_ADD);
                    g.blendFunc(g.ZERO, g.ONE_MINUS_SRC_COLOR);
                    break;
                case THREE.MultiplyBlending:
                    g.enable(g.BLEND);
                    g.blendEquation(g.FUNC_ADD);
                    g.blendFunc(g.ZERO, g.SRC_COLOR);
                    break;
                case THREE.CustomBlending:
                    g.enable(g.BLEND);
                    break;
                default:
                    g.enable(g.BLEND);
                    g.blendEquationSeparate(g.FUNC_ADD, g.FUNC_ADD);
                    g.blendFuncSeparate(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA, g.ONE, g.ONE_MINUS_SRC_ALPHA)
            }
            O = a
        }
        if (a === THREE.CustomBlending) {
            if (b !== sa) {
                g.blendEquation(u(b));
                sa = b
            }
            if (c !== Ga || d !== Ha) {
                g.blendFunc(u(c), u(d));
                Ga = c;
                Ha = d
            }
        } else Ha = Ga = sa = null
    };
    this.setTexture = function (a, b) {
        if (a.needsUpdate) {
            if (!a.__webglInit) {
                a.__webglInit = true;
                a.__webglTexture = g.createTexture();
                D.info.memory.textures++
            }
            g.activeTexture(g.TEXTURE0 + b);
            g.bindTexture(g.TEXTURE_2D, a.__webglTexture);
            g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
            a.premultiplyAlpha);
            var c = a.image,
                d = (c.width & c.width - 1) === 0 && (c.height & c.height - 1) === 0,
                e = u(a.format),
                f = u(a.type);
            w(g.TEXTURE_2D, a, d);
            a instanceof THREE.DataTexture ? g.texImage2D(g.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data) : g.texImage2D(g.TEXTURE_2D, 0, e, e, f, a.image);
            a.generateMipmaps && d && g.generateMipmap(g.TEXTURE_2D);
            a.needsUpdate = false;
            if (a.onUpdate) a.onUpdate()
        } else {
            g.activeTexture(g.TEXTURE0 + b);
            g.bindTexture(g.TEXTURE_2D, a.__webglTexture)
        }
    };
    this.setRenderTarget = function (a) {
        var b = a instanceof
        THREE.WebGLRenderTargetCube;
        if (a && !a.__webglFramebuffer) {
            if (a.depthBuffer === void 0) a.depthBuffer = true;
            if (a.stencilBuffer === void 0) a.stencilBuffer = true;
            a.__webglTexture = g.createTexture();
            var c = (a.width & a.width - 1) === 0 && (a.height & a.height - 1) === 0,
                d = u(a.format),
                e = u(a.type);
            if (b) {
                a.__webglFramebuffer = [];
                a.__webglRenderbuffer = [];
                g.bindTexture(g.TEXTURE_CUBE_MAP, a.__webglTexture);
                w(g.TEXTURE_CUBE_MAP, a, c);
                for (var f = 0; f < 6; f++) {
                    a.__webglFramebuffer[f] = g.createFramebuffer();
                    a.__webglRenderbuffer[f] = g.createRenderbuffer();
                    g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a.height, 0, d, e, null);
                    var h = a,
                        i = g.TEXTURE_CUBE_MAP_POSITIVE_X + f;
                    g.bindFramebuffer(g.FRAMEBUFFER, a.__webglFramebuffer[f]);
                    g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, i, h.__webglTexture, 0);
                    A(a.__webglRenderbuffer[f], a)
                }
                c && g.generateMipmap(g.TEXTURE_CUBE_MAP)
            } else {
                a.__webglFramebuffer = g.createFramebuffer();
                a.__webglRenderbuffer = g.createRenderbuffer();
                g.bindTexture(g.TEXTURE_2D, a.__webglTexture);
                w(g.TEXTURE_2D, a, c);
                g.texImage2D(g.TEXTURE_2D,
                0, d, a.width, a.height, 0, d, e, null);
                d = g.TEXTURE_2D;
                g.bindFramebuffer(g.FRAMEBUFFER, a.__webglFramebuffer);
                g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, d, a.__webglTexture, 0);
                A(a.__webglRenderbuffer, a);
                c && g.generateMipmap(g.TEXTURE_2D)
            }
            b ? g.bindTexture(g.TEXTURE_CUBE_MAP, null) : g.bindTexture(g.TEXTURE_2D, null);
            g.bindRenderbuffer(g.RENDERBUFFER, null);
            g.bindFramebuffer(g.FRAMEBUFFER, null)
        }
        if (a) {
            b = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer;
            c = a.width;
            a = a.height;
            e = d = 0
        } else {
            b = null;
            c = Xb;
            a = Gb;
            d = Eb;
            e = Fb
        }
        if (b !== Da) {
            g.bindFramebuffer(g.FRAMEBUFFER, b);
            g.viewport(d, e, c, a);
            Da = b
        }
        jc = c;
        kc = a
    }
};
THREE.WebGLRenderTarget = function (a, b, c) {
    this.width = a;
    this.height = b;
    c = c || {};
    this.wrapS = c.wrapS !== void 0 ? c.wrapS : THREE.ClampToEdgeWrapping;
    this.wrapT = c.wrapT !== void 0 ? c.wrapT : THREE.ClampToEdgeWrapping;
    this.magFilter = c.magFilter !== void 0 ? c.magFilter : THREE.LinearFilter;
    this.minFilter = c.minFilter !== void 0 ? c.minFilter : THREE.LinearMipMapLinearFilter;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.format = c.format !== void 0 ? c.format : THREE.RGBAFormat;
    this.type = c.type !== void 0 ? c.type : THREE.UnsignedByteType;
    this.depthBuffer = c.depthBuffer !== void 0 ? c.depthBuffer : true;
    this.stencilBuffer = c.stencilBuffer !== void 0 ? c.stencilBuffer : true;
    this.generateMipmaps = true
};
THREE.WebGLRenderTarget.prototype.clone = function () {
    var a = new THREE.WebGLRenderTarget(this.width, this.height);
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.format = this.format;
    a.type = this.type;
    a.depthBuffer = this.depthBuffer;
    a.stencilBuffer = this.stencilBuffer;
    return a
};
THREE.WebGLRenderTargetCube = function (a, b, c) {
    THREE.WebGLRenderTarget.call(this, a, b, c);
    this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = new THREE.WebGLRenderTarget;
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube;
THREE.RenderableVertex = function () {
    this.positionWorld = new THREE.Vector3;
    this.positionScreen = new THREE.Vector4;
    this.visible = true
};
THREE.RenderableVertex.prototype.copy = function (a) {
    this.positionWorld.copy(a.positionWorld);
    this.positionScreen.copy(a.positionScreen)
};
THREE.RenderableFace3 = function () {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.centroidWorld = new THREE.Vector3;
    this.centroidScreen = new THREE.Vector3;
    this.normalWorld = new THREE.Vector3;
    this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.faceMaterial = this.material = null;
    this.uvs = [
        []
    ];
    this.z = null
};
THREE.RenderableFace4 = function () {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.v4 = new THREE.RenderableVertex;
    this.centroidWorld = new THREE.Vector3;
    this.centroidScreen = new THREE.Vector3;
    this.normalWorld = new THREE.Vector3;
    this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.faceMaterial = this.material = null;
    this.uvs = [
        []
    ];
    this.z = null
};
THREE.RenderableObject = function () {
    this.z = this.object = null
};
THREE.RenderableLine = function () {
    this.z = null;
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.material = null
};
THREE.GeometryUtils = {
    merge: function (a, b) {
        for (var c, d, e = a.vertices.length, f = b instanceof THREE.Mesh ? b.geometry : b, h = a.vertices, i = f.vertices, l = a.faces, k = f.faces, j = a.faceVertexUvs[0], m = f.faceVertexUvs[0], n = {}, o = 0; o < a.materials.length; o++) n[a.materials[o].id] = o;
        if (b instanceof THREE.Mesh) {
            b.matrixAutoUpdate && b.updateMatrix();
            c = b.matrix;
            d = new THREE.Matrix4;
            d.extractRotation(c, b.scale)
        }
        for (var o = 0, s = i.length; o < s; o++) {
            var p = i[o].clone();
            c && c.multiplyVector3(p);
            h.push(p)
        }
        o = 0;
        for (s = k.length; o < s; o++) {
            var h = k[o],
                q, w, A = h.vertexNormals,
                y = h.vertexColors;
            h instanceof THREE.Face3 ? q = new THREE.Face3(h.a + e, h.b + e, h.c + e) : h instanceof THREE.Face4 && (q = new THREE.Face4(h.a + e, h.b + e, h.c + e, h.d + e));
            q.normal.copy(h.normal);
            d && d.multiplyVector3(q.normal);
            i = 0;
            for (p = A.length; i < p; i++) {
                w = A[i].clone();
                d && d.multiplyVector3(w);
                q.vertexNormals.push(w)
            }
            q.color.copy(h.color);
            i = 0;
            for (p = y.length; i < p; i++) {
                w = y[i];
                q.vertexColors.push(w.clone())
            }
            if (h.materialIndex !== void 0) {
                i = f.materials[h.materialIndex];
                p = i.id;
                y = n[p];
                if (y === void 0) {
                    y = a.materials.length;
                    n[p] = y;
                    a.materials.push(i)
                }
                q.materialIndex = y
            }
            q.centroid.copy(h.centroid);
            c && c.multiplyVector3(q.centroid);
            l.push(q)
        }
        o = 0;
        for (s = m.length; o < s; o++) {
            c = m[o];
            d = [];
            i = 0;
            for (p = c.length; i < p; i++) d.push(new THREE.UV(c[i].u, c[i].v));
            j.push(d)
        }
    },
    clone: function (a) {
        var b = new THREE.Geometry,
            c, d = a.vertices,
            e = a.faces,
            f = a.faceVertexUvs[0];
        if (a.materials) b.materials = a.materials.slice();
        a = 0;
        for (c = d.length; a < c; a++) b.vertices.push(d[a].clone());
        a = 0;
        for (c = e.length; a < c; a++) b.faces.push(e[a].clone());
        a = 0;
        for (c = f.length; a < c; a++) {
            for (var d = f[a], e = [], h = 0, i = d.length; h < i; h++) e.push(new THREE.UV(d[h].u, d[h].v));
            b.faceVertexUvs[0].push(e)
        }
        return b
    },
    randomPointInTriangle: function (a, b, c) {
        var d, e, f, h = new THREE.Vector3,
            i = THREE.GeometryUtils.__v1;
        d = THREE.GeometryUtils.random();
        e = THREE.GeometryUtils.random();
        if (d + e > 1) {
            d = 1 - d;
            e = 1 - e
        }
        f = 1 - d - e;
        h.copy(a);
        h.multiplyScalar(d);
        i.copy(b);
        i.multiplyScalar(e);
        h.addSelf(i);
        i.copy(c);
        i.multiplyScalar(f);
        h.addSelf(i);
        return h
    },
    randomPointInFace: function (a, b, c) {
        var d, e, f;
        if (a instanceof
        THREE.Face3) {
            d = b.vertices[a.a];
            e = b.vertices[a.b];
            f = b.vertices[a.c];
            return THREE.GeometryUtils.randomPointInTriangle(d, e, f)
        }
        if (a instanceof THREE.Face4) {
            d = b.vertices[a.a];
            e = b.vertices[a.b];
            f = b.vertices[a.c];
            var b = b.vertices[a.d],
                h;
            if (c) if (a._area1 && a._area2) {
                c = a._area1;
                h = a._area2
            } else {
                c = THREE.GeometryUtils.triangleArea(d, e, b);
                h = THREE.GeometryUtils.triangleArea(e, f, b);
                a._area1 = c;
                a._area2 = h
            } else {
                c = THREE.GeometryUtils.triangleArea(d, e, b);
                h = THREE.GeometryUtils.triangleArea(e, f, b)
            }
            return THREE.GeometryUtils.random() * (c + h) < c ? THREE.GeometryUtils.randomPointInTriangle(d, e, b) : THREE.GeometryUtils.randomPointInTriangle(e, f, b)
        }
    },
    randomPointsInGeometry: function (a, b) {
        function c(a) {
            function b(c, d) {
                if (d < c) return c;
                var e = c + Math.floor((d - c) / 2);
                return k[e] > a ? b(c, e - 1) : k[e] < a ? b(e + 1, d) : e
            }
            return b(0, k.length - 1)
        }
        var d, e, f = a.faces,
            h = a.vertices,
            i = f.length,
            l = 0,
            k = [],
            j, m, n, o;
        for (e = 0; e < i; e++) {
            d = f[e];
            if (d instanceof THREE.Face3) {
                j = h[d.a];
                m = h[d.b];
                n = h[d.c];
                d._area = THREE.GeometryUtils.triangleArea(j, m, n)
            } else if (d instanceof THREE.Face4) {
                j = h[d.a];
                m = h[d.b];
                n = h[d.c];
                o = h[d.d];
                d._area1 = THREE.GeometryUtils.triangleArea(j, m, o);
                d._area2 = THREE.GeometryUtils.triangleArea(m, n, o);
                d._area = d._area1 + d._area2
            }
            l = l + d._area;
            k[e] = l
        }
        d = [];
        for (e = 0; e < b; e++) {
            h = THREE.GeometryUtils.random() * l;
            h = c(h);
            d[e] = THREE.GeometryUtils.randomPointInFace(f[h], a, true)
        }
        return d
    },
    triangleArea: function (a, b, c) {
        var d, e = THREE.GeometryUtils.__v1;
        e.sub(a, b);
        d = e.length();
        e.sub(a, c);
        a = e.length();
        e.sub(b, c);
        c = e.length();
        b = 0.5 * (d + a + c);
        return Math.sqrt(b * (b - d) * (b - a) * (b - c))
    },
    center: function (a) {
        a.computeBoundingBox();
        var b = a.boundingBox,
            c = new THREE.Vector3;
        c.add(b.min, b.max);
        c.multiplyScalar(-0.5);
        a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x, c.y, c.z));
        a.computeBoundingBox();
        return c
    },
    normalizeUVs: function (a) {
        for (var a = a.faceVertexUvs[0], b = 0, c = a.length; b < c; b++) for (var d = a[b], e = 0, f = d.length; e < f; e++) {
            if (d[e].u !== 1) d[e].u = d[e].u - Math.floor(d[e].u);
            if (d[e].v !== 1) d[e].v = d[e].v - Math.floor(d[e].v)
        }
    },
    triangulateQuads: function (a) {
        var b, c, d, e, f = [],
            h = [],
            i = [];
        b = 0;
        for (c = a.faceUvs.length; b < c; b++) h[b] = [];
        b = 0;
        for (c = a.faceVertexUvs.length; b < c; b++) i[b] = [];
        b = 0;
        for (c = a.faces.length; b < c; b++) {
            d = a.faces[b];
            if (d instanceof THREE.Face4) {
                e = d.a;
                var l = d.b,
                    k = d.c,
                    j = d.d,
                    m = new THREE.Face3,
                    n = new THREE.Face3;
                m.color.copy(d.color);
                n.color.copy(d.color);
                m.materialIndex = d.materialIndex;
                n.materialIndex = d.materialIndex;
                m.a = e;
                m.b = l;
                m.c = j;
                n.a = l;
                n.b = k;
                n.c = j;
                if (d.vertexColors.length === 4) {
                    m.vertexColors[0] = d.vertexColors[0].clone();
                    m.vertexColors[1] = d.vertexColors[1].clone();
                    m.vertexColors[2] = d.vertexColors[3].clone();
                    n.vertexColors[0] = d.vertexColors[1].clone();
                    n.vertexColors[1] = d.vertexColors[2].clone();
                    n.vertexColors[2] = d.vertexColors[3].clone()
                }
                f.push(m, n);
                d = 0;
                for (e = a.faceVertexUvs.length; d < e; d++) if (a.faceVertexUvs[d].length) {
                    m = a.faceVertexUvs[d][b];
                    l = m[1];
                    k = m[2];
                    j = m[3];
                    m = [m[0].clone(), l.clone(), j.clone()];
                    l = [l.clone(), k.clone(), j.clone()];
                    i[d].push(m, l)
                }
                d = 0;
                for (e = a.faceUvs.length; d < e; d++) if (a.faceUvs[d].length) {
                    l = a.faceUvs[d][b];
                    h[d].push(l, l)
                }
            } else {
                f.push(d);
                d = 0;
                for (e = a.faceUvs.length; d < e; d++) h[d].push(a.faceUvs[d]);
                d = 0;
                for (e = a.faceVertexUvs.length; d < e; d++) i[d].push(a.faceVertexUvs[d])
            }
        }
        a.faces = f;
        a.faceUvs = h;
        a.faceVertexUvs = i;
        a.computeCentroids();
        a.computeFaceNormals();
        a.computeVertexNormals();
        a.hasTangents && a.computeTangents()
    },
    explode: function (a) {
        for (var b = [], c = 0, d = a.faces.length; c < d; c++) {
            var e = b.length,
                f = a.faces[c];
            if (f instanceof THREE.Face4) {
                var h = f.a,
                    i = f.b,
                    l = f.c,
                    h = a.vertices[h],
                    i = a.vertices[i],
                    l = a.vertices[l],
                    k = a.vertices[f.d];
                b.push(h.clone());
                b.push(i.clone());
                b.push(l.clone());
                b.push(k.clone());
                f.a = e;
                f.b = e + 1;
                f.c = e + 2;
                f.d = e + 3
            } else {
                h = f.a;
                i = f.b;
                l = f.c;
                h = a.vertices[h];
                i = a.vertices[i];
                l = a.vertices[l];
                b.push(h.clone());
                b.push(i.clone());
                b.push(l.clone());
                f.a = e;
                f.b = e + 1;
                f.c = e + 2
            }
        }
        a.vertices = b;
        delete a.__tmpVertices
    },
    tessellate: function (a, b) {
        var c, d, e, f, h, i, l, k, j, m, n, o, s, p, q, w, A, y, u, H = [],
            B = [];
        c = 0;
        for (d = a.faceVertexUvs.length; c < d; c++) B[c] = [];
        c = 0;
        for (d = a.faces.length; c < d; c++) {
            e = a.faces[c];
            if (e instanceof THREE.Face3) {
                f = e.a;
                h = e.b;
                i = e.c;
                k = a.vertices[f];
                j = a.vertices[h];
                m = a.vertices[i];
                o = k.distanceTo(j);
                s = j.distanceTo(m);
                n = k.distanceTo(m);
                if (o > b || s > b || n > b) {
                    l = a.vertices.length;
                    y = e.clone();
                    u = e.clone();
                    if (o >= s && o >= n) {
                        k = k.clone();
                        k.lerpSelf(j, 0.5);
                        y.a = f;
                        y.b = l;
                        y.c = i;
                        u.a = l;
                        u.b = h;
                        u.c = i;
                        if (e.vertexNormals.length === 3) {
                            f = e.vertexNormals[0].clone();
                            f.lerpSelf(e.vertexNormals[1], 0.5);
                            y.vertexNormals[1].copy(f);
                            u.vertexNormals[0].copy(f)
                        }
                        if (e.vertexColors.length === 3) {
                            f = e.vertexColors[0].clone();
                            f.lerpSelf(e.vertexColors[1], 0.5);
                            y.vertexColors[1].copy(f);
                            u.vertexColors[0].copy(f)
                        }
                        e = 0
                    } else if (s >= o && s >= n) {
                        k = j.clone();
                        k.lerpSelf(m, 0.5);
                        y.a = f;
                        y.b = h;
                        y.c = l;
                        u.a = l;
                        u.b = i;
                        u.c = f;
                        if (e.vertexNormals.length === 3) {
                            f = e.vertexNormals[1].clone();
                            f.lerpSelf(e.vertexNormals[2], 0.5);
                            y.vertexNormals[2].copy(f);
                            u.vertexNormals[0].copy(f);
                            u.vertexNormals[1].copy(e.vertexNormals[2]);
                            u.vertexNormals[2].copy(e.vertexNormals[0])
                        }
                        if (e.vertexColors.length === 3) {
                            f = e.vertexColors[1].clone();
                            f.lerpSelf(e.vertexColors[2], 0.5);
                            y.vertexColors[2].copy(f);
                            u.vertexColors[0].copy(f);
                            u.vertexColors[1].copy(e.vertexColors[2]);
                            u.vertexColors[2].copy(e.vertexColors[0])
                        }
                        e = 1
                    } else {
                        k = k.clone();
                        k.lerpSelf(m, 0.5);
                        y.a = f;
                        y.b = h;
                        y.c = l;
                        u.a = l;
                        u.b = h;
                        u.c = i;
                        if (e.vertexNormals.length === 3) {
                            f = e.vertexNormals[0].clone();
                            f.lerpSelf(e.vertexNormals[2], 0.5);
                            y.vertexNormals[2].copy(f);
                            u.vertexNormals[0].copy(f)
                        }
                        if (e.vertexColors.length === 3) {
                            f = e.vertexColors[0].clone();
                            f.lerpSelf(e.vertexColors[2], 0.5);
                            y.vertexColors[2].copy(f);
                            u.vertexColors[0].copy(f)
                        }
                        e = 2
                    }
                    H.push(y, u);
                    a.vertices.push(k);
                    f = 0;
                    for (h = a.faceVertexUvs.length; f < h; f++) if (a.faceVertexUvs[f].length) {
                        k = a.faceVertexUvs[f][c];
                        u = k[0];
                        i = k[1];
                        y = k[2];
                        if (e === 0) {
                            j = u.clone();
                            j.lerpSelf(i, 0.5);
                            k = [u.clone(), j.clone(), y.clone()];
                            i = [j.clone(), i.clone(), y.clone()]
                        } else if (e === 1) {
                            j = i.clone();
                            j.lerpSelf(y, 0.5);
                            k = [u.clone(), i.clone(), j.clone()];
                            i = [j.clone(), y.clone(), u.clone()]
                        } else {
                            j = u.clone();
                            j.lerpSelf(y, 0.5);
                            k = [u.clone(), i.clone(), j.clone()];
                            i = [j.clone(), i.clone(), y.clone()]
                        }
                        B[f].push(k, i)
                    }
                } else {
                    H.push(e);
                    f = 0;
                    for (h = a.faceVertexUvs.length; f < h; f++) B[f].push(a.faceVertexUvs[f][c])
                }
            } else {
                f = e.a;
                h = e.b;
                i = e.c;
                l = e.d;
                k = a.vertices[f];
                j = a.vertices[h];
                m = a.vertices[i];
                n = a.vertices[l];
                o = k.distanceTo(j);
                s = j.distanceTo(m);
                p = m.distanceTo(n);
                q = k.distanceTo(n);
                if (o > b || s > b || p > b || q > b) {
                    w = a.vertices.length;
                    A = a.vertices.length + 1;
                    y = e.clone();
                    u = e.clone();
                    if (o >= s && o >= p && o >= q || p >= s && p >= o && p >= q) {
                        o = k.clone();
                        o.lerpSelf(j, 0.5);
                        j = m.clone();
                        j.lerpSelf(n, 0.5);
                        y.a = f;
                        y.b = w;
                        y.c = A;
                        y.d = l;
                        u.a = w;
                        u.b = h;
                        u.c = i;
                        u.d = A;
                        if (e.vertexNormals.length === 4) {
                            f = e.vertexNormals[0].clone();
                            f.lerpSelf(e.vertexNormals[1], 0.5);
                            h = e.vertexNormals[2].clone();
                            h.lerpSelf(e.vertexNormals[3], 0.5);
                            y.vertexNormals[1].copy(f);
                            y.vertexNormals[2].copy(h);
                            u.vertexNormals[0].copy(f);
                            u.vertexNormals[3].copy(h)
                        }
                        if (e.vertexColors.length === 4) {
                            f = e.vertexColors[0].clone();
                            f.lerpSelf(e.vertexColors[1], 0.5);
                            h = e.vertexColors[2].clone();
                            h.lerpSelf(e.vertexColors[3], 0.5);
                            y.vertexColors[1].copy(f);
                            y.vertexColors[2].copy(h);
                            u.vertexColors[0].copy(f);
                            u.vertexColors[3].copy(h)
                        }
                        e = 0
                    } else {
                        o = j.clone();
                        o.lerpSelf(m, 0.5);
                        j = n.clone();
                        j.lerpSelf(k, 0.5);
                        y.a = f;
                        y.b = h;
                        y.c = w;
                        y.d = A;
                        u.a = A;
                        u.b = w;
                        u.c = i;
                        u.d = l;
                        if (e.vertexNormals.length === 4) {
                            f = e.vertexNormals[1].clone();
                            f.lerpSelf(e.vertexNormals[2], 0.5);
                            h = e.vertexNormals[3].clone();
                            h.lerpSelf(e.vertexNormals[0], 0.5);
                            y.vertexNormals[2].copy(f);
                            y.vertexNormals[3].copy(h);
                            u.vertexNormals[0].copy(h);
                            u.vertexNormals[1].copy(f)
                        }
                        if (e.vertexColors.length === 4) {
                            f = e.vertexColors[1].clone();
                            f.lerpSelf(e.vertexColors[2], 0.5);
                            h = e.vertexColors[3].clone();
                            h.lerpSelf(e.vertexColors[0], 0.5);
                            y.vertexColors[2].copy(f);
                            y.vertexColors[3].copy(h);
                            u.vertexColors[0].copy(h);
                            u.vertexColors[1].copy(f)
                        }
                        e = 1
                    }
                    H.push(y, u);
                    a.vertices.push(o, j);
                    f = 0;
                    for (h = a.faceVertexUvs.length; f < h; f++) if (a.faceVertexUvs[f].length) {
                        k = a.faceVertexUvs[f][c];
                        u = k[0];
                        i = k[1];
                        y = k[2];
                        k = k[3];
                        if (e === 0) {
                            j = u.clone();
                            j.lerpSelf(i, 0.5);
                            m = y.clone();
                            m.lerpSelf(k, 0.5);
                            u = [u.clone(), j.clone(), m.clone(), k.clone()];
                            i = [j.clone(), i.clone(), y.clone(), m.clone()]
                        } else {
                            j = i.clone();
                            j.lerpSelf(y, 0.5);
                            m = k.clone();
                            m.lerpSelf(u, 0.5);
                            u = [u.clone(), i.clone(), j.clone(), m.clone()];
                            i = [m.clone(), j.clone(), y.clone(), k.clone()]
                        }
                        B[f].push(u, i)
                    }
                } else {
                    H.push(e);
                    f = 0;
                    for (h = a.faceVertexUvs.length; f < h; f++) B[f].push(a.faceVertexUvs[f][c])
                }
            }
        }
        a.faces = H;
        a.faceVertexUvs = B
    }
};
THREE.GeometryUtils.random = THREE.Math.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3;
THREE.ImageUtils = {
    crossOrigin: "anonymous",
    loadTexture: function (a, b, c) {
        var d = new Image,
            e = new THREE.Texture(d, b);
        d.onload = function () {
            e.needsUpdate = true;
            c && c(this)
        };
        d.crossOrigin = this.crossOrigin;
        d.src = a;
        return e
    },
    loadTextureCube: function (a, b, c) {
        var d, e = [],
            f = new THREE.Texture(e, b),
            b = e.loadCount = 0;
        for (d = a.length; b < d; ++b) {
            e[b] = new Image;
            e[b].onload = function () {
                e.loadCount = e.loadCount + 1;
                if (e.loadCount === 6) f.needsUpdate = true;
                c && c(this)
            };
            e[b].crossOrigin = this.crossOrigin;
            e[b].src = a[b]
        }
        return f
    },
    getNormalMap: function (a,
    b) {
        var c = function (a) {
            var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
            return [a[0] / b, a[1] / b, a[2] / b]
        }, b = b | 1,
            d = a.width,
            e = a.height,
            f = document.createElement("canvas");
        f.width = d;
        f.height = e;
        var h = f.getContext("2d");
        h.drawImage(a, 0, 0);
        for (var i = h.getImageData(0, 0, d, e).data, l = h.createImageData(d, e), k = l.data, j = 0; j < d; j++) for (var m = 0; m < e; m++) {
            var n = m - 1 < 0 ? 0 : m - 1,
                o = m + 1 > e - 1 ? e - 1 : m + 1,
                s = j - 1 < 0 ? 0 : j - 1,
                p = j + 1 > d - 1 ? d - 1 : j + 1,
                q = [],
                w = [0, 0, i[(m * d + j) * 4] / 255 * b];
            q.push([-1, 0, i[(m * d + s) * 4] / 255 * b]);
            q.push([-1, - 1, i[(n * d + s) * 4] / 255 * b]);
            q.push([0, - 1, i[(n * d + j) * 4] / 255 * b]);
            q.push([1, - 1, i[(n * d + p) * 4] / 255 * b]);
            q.push([1, 0, i[(m * d + p) * 4] / 255 * b]);
            q.push([1, 1, i[(o * d + p) * 4] / 255 * b]);
            q.push([0, 1, i[(o * d + j) * 4] / 255 * b]);
            q.push([-1, 1, i[(o * d + s) * 4] / 255 * b]);
            n = [];
            s = q.length;
            for (o = 0; o < s; o++) {
                var p = q[o],
                    A = q[(o + 1) % s],
                    p = [p[0] - w[0], p[1] - w[1], p[2] - w[2]],
                    A = [A[0] - w[0], A[1] - w[1], A[2] - w[2]];
                n.push(c([p[1] * A[2] - p[2] * A[1], p[2] * A[0] - p[0] * A[2], p[0] * A[1] - p[1] * A[0]]))
            }
            q = [0, 0, 0];
            for (o = 0; o < n.length; o++) {
                q[0] = q[0] + n[o][0];
                q[1] = q[1] + n[o][1];
                q[2] = q[2] + n[o][2]
            }
            q[0] = q[0] / n.length;
            q[1] = q[1] / n.length;
            q[2] = q[2] / n.length;
            w = (m * d + j) * 4;
            k[w] = (q[0] + 1) / 2 * 255 | 0;
            k[w + 1] = (q[1] + 0.5) * 255 | 0;
            k[w + 2] = q[2] * 255 | 0;
            k[w + 3] = 255
        }
        h.putImageData(l, 0, 0);
        return f
    },
    generateDataTexture: function (a, b, c) {
        for (var d = a * b, e = new Uint8Array(3 * d), f = Math.floor(c.r * 255), h = Math.floor(c.g * 255), c = Math.floor(c.b * 255), i = 0; i < d; i++) {
            e[i * 3] = f;
            e[i * 3 + 1] = h;
            e[i * 3 + 2] = c
        }
        a = new THREE.DataTexture(e, a, b, THREE.RGBFormat);
        a.needsUpdate = true;
        return a
    }
};
THREE.SceneUtils = {
    showHierarchy: function (a, b) {
        THREE.SceneUtils.traverseHierarchy(a, function (a) {
            a.visible = b
        })
    },
    traverseHierarchy: function (a, b) {
        var c, d, e = a.children.length;
        for (d = 0; d < e; d++) {
            c = a.children[d];
            b(c);
            THREE.SceneUtils.traverseHierarchy(c, b)
        }
    },
    createMultiMaterialObject: function (a, b) {
        var c, d = b.length,
            e = new THREE.Object3D;
        for (c = 0; c < d; c++) {
            var f = new THREE.Mesh(a, b[c]);
            e.add(f)
        }
        return e
    },
    cloneObject: function (a) {
        var b;
        if (a instanceof THREE.Mesh) b = new THREE.Mesh(a.geometry, a.material);
        else if (a instanceof
        THREE.Line) b = new THREE.Line(a.geometry, a.material, a.type);
        else if (a instanceof THREE.Ribbon) b = new THREE.Ribbon(a.geometry, a.material);
        else if (a instanceof THREE.ParticleSystem) {
            b = new THREE.ParticleSystem(a.geometry, a.material);
            b.sortParticles = a.sortParticles
        } else if (a instanceof THREE.Particle) b = new THREE.Particle(a.material);
        else if (a instanceof THREE.Sprite) {
            b = new THREE.Sprite({});
            b.color.copy(a.color);
            b.map = a.map;
            b.blending = a.blending;
            b.useScreenCoordinates = a.useScreenCoordinates;
            b.mergeWith3D = a.mergeWith3D;
            b.affectedByDistance = a.affectedByDistance;
            b.scaleByViewport = a.scaleByViewport;
            b.alignment = a.alignment;
            b.rotation3d.copy(a.rotation3d);
            b.rotation = a.rotation;
            b.opacity = a.opacity;
            b.uvOffset.copy(a.uvOffset);
            b.uvScale.copy(a.uvScale)
        } else a instanceof THREE.LOD ? b = new THREE.LOD : a instanceof THREE.Object3D && (b = new THREE.Object3D);
        b.name = a.name;
        b.parent = a.parent;
        b.up.copy(a.up);
        b.position.copy(a.position);
        b.rotation instanceof THREE.Vector3 && b.rotation.copy(a.rotation);
        b.eulerOrder = a.eulerOrder;
        b.scale.copy(a.scale);
        b.dynamic = a.dynamic;
        b.doubleSided = a.doubleSided;
        b.flipSided = a.flipSided;
        b.renderDepth = a.renderDepth;
        b.rotationAutoUpdate = a.rotationAutoUpdate;
        b.matrix.copy(a.matrix);
        b.matrixWorld.copy(a.matrixWorld);
        b.matrixRotationWorld.copy(a.matrixRotationWorld);
        b.matrixAutoUpdate = a.matrixAutoUpdate;
        b.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate;
        b.quaternion.copy(a.quaternion);
        b.useQuaternion = a.useQuaternion;
        b.boundRadius = a.boundRadius;
        b.boundRadiusScale = a.boundRadiusScale;
        b.visible = a.visible;
        b.castShadow = a.castShadow;
        b.receiveShadow = a.receiveShadow;
        b.frustumCulled = a.frustumCulled;
        for (var c = 0; c < a.children.length; c++) {
            var d = THREE.SceneUtils.cloneObject(a.children[c]);
            b.children[c] = d;
            d.parent = b
        }
        if (a instanceof THREE.LOD) for (c = 0; c < a.LODs.length; c++) b.LODs[c] = {
            visibleAtDistance: a.LODs[c].visibleAtDistance,
            object3D: b.children[c]
        };
        return b
    },
    detach: function (a, b, c) {
        a.applyMatrix(b.matrixWorld);
        b.remove(a);
        c.add(a)
    },
    attach: function (a, b, c) {
        var d = new THREE.Matrix4;
        d.getInverse(c.matrixWorld);
        a.applyMatrix(d);
        b.remove(a);
        c.add(a)
    }
};
THREE.WebGLRenderer && (THREE.ShaderUtils = {
    lib: {
        fresnel: {
            uniforms: {
                mRefractionRatio: {
                    type: "f",
                    value: 1.02
                },
                mFresnelBias: {
                    type: "f",
                    value: 0.1
                },
                mFresnelPower: {
                    type: "f",
                    value: 2
                },
                mFresnelScale: {
                    type: "f",
                    value: 1
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
            vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
        },
        normal: {
            uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
                enableAO: {
                    type: "i",
                    value: 0
                },
                enableDiffuse: {
                    type: "i",
                    value: 0
                },
                enableSpecular: {
                    type: "i",
                    value: 0
                },
                enableReflection: {
                    type: "i",
                    value: 0
                },
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                },
                tNormal: {
                    type: "t",
                    value: 2,
                    texture: null
                },
                tSpecular: {
                    type: "t",
                    value: 3,
                    texture: null
                },
                tAO: {
                    type: "t",
                    value: 4,
                    texture: null
                },
                tDisplacement: {
                    type: "t",
                    value: 5,
                    texture: null
                },
                uNormalScale: {
                    type: "f",
                    value: 1
                },
                uDisplacementBias: {
                    type: "f",
                    value: 0
                },
                uDisplacementScale: {
                    type: "f",
                    value: 1
                },
                uDiffuseColor: {
                    type: "c",
                    value: new THREE.Color(16777215)
                },
                uSpecularColor: {
                    type: "c",
                    value: new THREE.Color(1118481)
                },
                uAmbientColor: {
                    type: "c",
                    value: new THREE.Color(16777215)
                },
                uShininess: {
                    type: "f",
                    value: 30
                },
                uOpacity: {
                    type: "f",
                    value: 1
                },
                uReflectivity: {
                    type: "f",
                    value: 0.5
                },
                uOffset: {
                    type: "v2",
                    value: new THREE.Vector2(0, 0)
                },
                uRepeat: {
                    type: "v2",
                    value: new THREE.Vector2(1, 1)
                },
                wrapRGB: {
                    type: "v3",
                    value: new THREE.Vector3(1, 1, 1)
                }
            }]),
            fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform float uNormalScale;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;",
            THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nfloat pointDistance = vPointLight[ i ].w;\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor) + totalSpecular;\nif ( enableReflection ) {\nvec3 wPos = cameraPosition - vViewPosition;\nvec3 vReflect = reflect( normalize( wPos ), normal );\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
            THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
            vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;",
            THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvViewPosition = -mvPosition.xyz;\nvNormal = normalMatrix * normal;\nvTangent = normalMatrix * tangent.xyz;\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvUv = uv * uRepeat + uOffset;\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( normalize( vNormal.xyz ) * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif",
            THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n")
        },
        cube: {
            uniforms: {
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                },
                tFlip: {
                    type: "f",
                    value: -1
                }
            },
            vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\n}"
        }
    }
});
THREE.BufferGeometry = function () {
    this.id = THREE.GeometryCount++;
    this.vertexColorArray = this.vertexUvArray = this.vertexNormalArray = this.vertexPositionArray = this.vertexIndexArray = this.vertexColorBuffer = this.vertexUvBuffer = this.vertexNormalBuffer = this.vertexPositionBuffer = this.vertexIndexBuffer = null;
    this.dynamic = false;
    this.boundingSphere = this.boundingBox = null;
    this.morphTargets = []
};
THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    computeBoundingBox: function () {},
    computeBoundingSphere: function () {}
};
THREE.CubeGeometry = function (a, b, c, d, e, f, h, i) {
    function l(a, b, c, h, i, j, l, n) {
        var m, o = d || 1,
            p = e || 1,
            q = i / 2,
            g = j / 2,
            s = k.vertices.length;
        if (a === "x" && b === "y" || a === "y" && b === "x") m = "z";
        else if (a === "x" && b === "z" || a === "z" && b === "x") {
            m = "y";
            p = f || 1
        } else if (a === "z" && b === "y" || a === "y" && b === "z") {
            m = "x";
            o = f || 1
        }
        var w = o + 1,
            y = p + 1,
            A = i / o,
            R = j / p,
            J = new THREE.Vector3;
        J[m] = l > 0 ? 1 : -1;
        for (i = 0; i < y; i++) for (j = 0; j < w; j++) {
            var Z = new THREE.Vector3;
            Z[a] = (j * A - q) * c;
            Z[b] = (i * R - g) * h;
            Z[m] = l;
            k.vertices.push(Z)
        }
        for (i = 0; i < p; i++) for (j = 0; j < o; j++) {
            a = new THREE.Face4(j + w * i + s, j + w * (i + 1) + s, j + 1 + w * (i + 1) + s, j + 1 + w * i + s);
            a.normal.copy(J);
            a.vertexNormals.push(J.clone(), J.clone(), J.clone(), J.clone());
            a.materialIndex = n;
            k.faces.push(a);
            k.faceVertexUvs[0].push([new THREE.UV(j / o, i / p), new THREE.UV(j / o, (i + 1) / p), new THREE.UV((j + 1) / o, (i + 1) / p), new THREE.UV((j + 1) / o, i / p)])
        }
    }
    THREE.Geometry.call(this);
    var k = this,
        j = a / 2,
        m = b / 2,
        n = c / 2,
        o, s, p, q, w, A;
    if (h !== void 0) {
        if (h instanceof Array) this.materials = h;
        else {
            this.materials = [];
            for (o = 0; o < 6; o++) this.materials.push(h)
        }
        o = 0;
        q = 1;
        s = 2;
        w = 3;
        p = 4;
        A = 5
    } else this.materials = [];
    this.sides = {
        px: true,
        nx: true,
        py: true,
        ny: true,
        pz: true,
        nz: true
    };
    if (i != void 0) for (var y in i) this.sides[y] !== void 0 && (this.sides[y] = i[y]);
    this.sides.px && l("z", "y", - 1, - 1, c, b, j, o);
    this.sides.nx && l("z", "y", 1, - 1, c, b, - j, q);
    this.sides.py && l("x", "z", 1, 1, a, c, m, s);
    this.sides.ny && l("x", "z", 1, - 1, a, c, - m, w);
    this.sides.pz && l("x", "y", 1, - 1, a, b, n, p);
    this.sides.nz && l("x", "y", - 1, - 1, a, b, - n, A);
    this.computeCentroids();
    this.mergeVertices()
};
THREE.CubeGeometry.prototype = new THREE.Geometry;
THREE.CubeGeometry.prototype.constructor = THREE.CubeGeometry;
THREE.CylinderGeometry = function (a, b, c, d, e, f) {
    THREE.Geometry.call(this);
    var a = a !== void 0 ? a : 20,
        b = b !== void 0 ? b : 20,
        c = c !== void 0 ? c : 100,
        h = c / 2,
        d = d || 8,
        e = e || 1,
        i, l, k = [],
        j = [];
    for (l = 0; l <= e; l++) {
        var m = [],
            n = [],
            o = l / e,
            s = o * (b - a) + a;
        for (i = 0; i <= d; i++) {
            var p = i / d,
                q = new THREE.Vector3;
            q.x = s * Math.sin(p * Math.PI * 2);
            q.y = -o * c + h;
            q.z = s * Math.cos(p * Math.PI * 2);
            this.vertices.push(q);
            m.push(this.vertices.length - 1);
            n.push(new THREE.UV(p, o))
        }
        k.push(m);
        j.push(n)
    }
    c = (b - a) / c;
    for (i = 0; i < d; i++) {
        if (a !== 0) {
            m = this.vertices[k[0][i]].clone();
            n = this.vertices[k[0][i + 1]].clone()
        } else {
            m = this.vertices[k[1][i]].clone();
            n = this.vertices[k[1][i + 1]].clone()
        }
        m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize();
        n.setY(Math.sqrt(n.x * n.x + n.z * n.z) * c).normalize();
        for (l = 0; l < e; l++) {
            var o = k[l][i],
                s = k[l + 1][i],
                p = k[l + 1][i + 1],
                q = k[l][i + 1],
                w = m.clone(),
                A = m.clone(),
                y = n.clone(),
                u = n.clone(),
                H = j[l][i].clone(),
                B = j[l + 1][i].clone(),
                K = j[l + 1][i + 1].clone(),
                N = j[l][i + 1].clone();
            this.faces.push(new THREE.Face4(o, s, p, q, [w, A, y, u]));
            this.faceVertexUvs[0].push([H, B, K, N])
        }
    }
    if (!f && a > 0) {
        this.vertices.push(new THREE.Vector3(0,
        h, 0));
        for (i = 0; i < d; i++) {
            o = k[0][i];
            s = k[0][i + 1];
            p = this.vertices.length - 1;
            w = new THREE.Vector3(0, 1, 0);
            A = new THREE.Vector3(0, 1, 0);
            y = new THREE.Vector3(0, 1, 0);
            H = j[0][i].clone();
            B = j[0][i + 1].clone();
            K = new THREE.UV(B.u, 0);
            this.faces.push(new THREE.Face3(o, s, p, [w, A, y]));
            this.faceVertexUvs[0].push([H, B, K])
        }
    }
    if (!f && b > 0) {
        this.vertices.push(new THREE.Vector3(0, - h, 0));
        for (i = 0; i < d; i++) {
            o = k[l][i + 1];
            s = k[l][i];
            p = this.vertices.length - 1;
            w = new THREE.Vector3(0, - 1, 0);
            A = new THREE.Vector3(0, - 1, 0);
            y = new THREE.Vector3(0, - 1, 0);
            H = j[l][i + 1].clone();
            B = j[l][i].clone();
            K = new THREE.UV(B.u, 1);
            this.faces.push(new THREE.Face3(o, s, p, [w, A, y]));
            this.faceVertexUvs[0].push([H, B, K])
        }
    }
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = new THREE.Geometry;
THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry;
THREE.PlaneGeometry = function (a, b, c, d) {
    THREE.Geometry.call(this);
    for (var e = a / 2, f = b / 2, c = c || 1, d = d || 1, h = c + 1, i = d + 1, l = a / c, k = b / d, j = new THREE.Vector3(0, 1, 0), a = 0; a < i; a++) for (b = 0; b < h; b++) this.vertices.push(new THREE.Vector3(b * l - e, 0, a * k - f));
    for (a = 0; a < d; a++) for (b = 0; b < c; b++) {
        e = new THREE.Face4(b + h * a, b + h * (a + 1), b + 1 + h * (a + 1), b + 1 + h * a);
        e.normal.copy(j);
        e.vertexNormals.push(j.clone(), j.clone(), j.clone(), j.clone());
        this.faces.push(e);
        this.faceVertexUvs[0].push([new THREE.UV(b / c, a / d), new THREE.UV(b / c, (a + 1) / d), new THREE.UV((b + 1) / c, (a + 1) / d), new THREE.UV((b + 1) / c, a / d)])
    }
    this.computeCentroids()
};
THREE.PlaneGeometry.prototype = new THREE.Geometry;
THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry;
THREE.SphereGeometry = function (a, b, c, d, e, f, h) {
    THREE.Geometry.call(this);
    var a = a || 50,
        d = d !== void 0 ? d : 0,
        e = e !== void 0 ? e : Math.PI * 2,
        f = f !== void 0 ? f : 0,
        h = h !== void 0 ? h : Math.PI,
        b = Math.max(3, Math.floor(b) || 8),
        c = Math.max(2, Math.floor(c) || 6),
        i, l, k = [],
        j = [];
    for (l = 0; l <= c; l++) {
        var m = [],
            n = [];
        for (i = 0; i <= b; i++) {
            var o = i / b,
                s = l / c,
                p = new THREE.Vector3;
            p.x = -a * Math.cos(d + o * e) * Math.sin(f + s * h);
            p.y = a * Math.cos(f + s * h);
            p.z = a * Math.sin(d + o * e) * Math.sin(f + s * h);
            this.vertices.push(p);
            m.push(this.vertices.length - 1);
            n.push(new THREE.UV(o,
            s))
        }
        k.push(m);
        j.push(n)
    }
    for (l = 0; l < c; l++) for (i = 0; i < b; i++) {
        var d = k[l][i + 1],
            e = k[l][i],
            f = k[l + 1][i],
            h = k[l + 1][i + 1],
            m = this.vertices[d].clone().normalize(),
            n = this.vertices[e].clone().normalize(),
            o = this.vertices[f].clone().normalize(),
            s = this.vertices[h].clone().normalize(),
            p = j[l][i + 1].clone(),
            q = j[l][i].clone(),
            w = j[l + 1][i].clone(),
            A = j[l + 1][i + 1].clone();
        if (Math.abs(this.vertices[d].y) == a) {
            this.faces.push(new THREE.Face3(d, f, h, [m, o, s]));
            this.faceVertexUvs[0].push([p, w, A])
        } else if (Math.abs(this.vertices[f].y) == a) {
            this.faces.push(new THREE.Face3(d, e, f, [m, n, o]));
            this.faceVertexUvs[0].push([p, q, w])
        } else {
            this.faces.push(new THREE.Face4(d, e, f, h, [m, n, o, s]));
            this.faceVertexUvs[0].push([p, q, w, A])
        }
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.boundingSphere = {
        radius: a
    }
};
THREE.SphereGeometry.prototype = new THREE.Geometry;
THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry;
THREE.PolyhedronGeometry = function (a, b, c, d) {
    function e(a) {
        var b = a.normalize().clone();
        b.index = l.vertices.push(b) - 1;
        var c = Math.atan2(a.z, - a.x) / 2 / Math.PI + 0.5,
            a = Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + 0.5;
        b.uv = new THREE.UV(c, a);
        return b
    }
    function f(a, b, c, d) {
        if (d < 1) {
            d = new THREE.Face3(a.index, b.index, c.index, [a.clone(), b.clone(), c.clone()]);
            d.centroid.addSelf(a).addSelf(b).addSelf(c).divideScalar(3);
            d.normal = d.centroid.clone().normalize();
            l.faces.push(d);
            d = Math.atan2(d.centroid.z, - d.centroid.x);
            l.faceVertexUvs[0].push([i(a.uv, a, d), i(b.uv, b, d), i(c.uv, c, d)])
        } else {
            d = d - 1;
            f(a, h(a, b), h(a, c), d);
            f(h(a, b), b, h(b, c), d);
            f(h(a, c), h(b, c), c, d);
            f(h(a, b), h(b, c), h(a, c), d)
        }
    }
    function h(a, b) {
        m[a.index] || (m[a.index] = []);
        m[b.index] || (m[b.index] = []);
        var c = m[a.index][b.index];
        c === void 0 && (m[a.index][b.index] = m[b.index][a.index] = c = e((new THREE.Vector3).add(a, b).divideScalar(2)));
        return c
    }
    function i(a, b, c) {
        c < 0 && a.u === 1 && (a = new THREE.UV(a.u - 1, a.v));
        b.x === 0 && b.z === 0 && (a = new THREE.UV(c / 2 / Math.PI + 0.5, a.v));
        return a
    }
    THREE.Geometry.call(this);
    for (var c = c || 1, d = d || 0, l = this, k = 0, j = a.length; k < j; k++) e(new THREE.Vector3(a[k][0], a[k][1], a[k][2]));
    for (var m = [], a = this.vertices, k = 0, j = b.length; k < j; k++) f(a[b[k][0]], a[b[k][1]], a[b[k][2]], d);
    this.mergeVertices();
    k = 0;
    for (j = this.vertices.length; k < j; k++) this.vertices[k].multiplyScalar(c);
    this.computeCentroids();
    this.boundingSphere = {
        radius: c
    }
};
THREE.PolyhedronGeometry.prototype = new THREE.Geometry;
THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry;
THREE.IcosahedronGeometry = function (a, b) {
    var c = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(this, [
        [-1, c, 0],
        [1, c, 0],
        [-1, - c, 0],
        [1, - c, 0],
        [0, - 1, c],
        [0, 1, c],
        [0, - 1, - c],
        [0, 1, - c],
        [c, 0, - 1],
        [c, 0, 1],
        [-c, 0, - 1],
        [-c, 0, 1]
    ], [
        [0, 11, 5],
        [0, 5, 1],
        [0, 1, 7],
        [0, 7, 10],
        [0, 10, 11],
        [1, 5, 9],
        [5, 11, 4],
        [11, 10, 2],
        [10, 7, 6],
        [7, 1, 8],
        [3, 9, 4],
        [3, 4, 2],
        [3, 2, 6],
        [3, 6, 8],
        [3, 8, 9],
        [4, 9, 5],
        [2, 4, 11],
        [6, 2, 10],
        [8, 6, 7],
        [9, 8, 1]
    ], a, b)
};
THREE.IcosahedronGeometry.prototype = new THREE.Geometry;
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry;