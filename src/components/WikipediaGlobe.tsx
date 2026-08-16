import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WikipediaGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  // Helper function to create high-resolution, 360° seamless Wikipedia jigsaw puzzle texture
  const createGlobeTexture = () => {
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 4096;
    texCanvas.height = 2048;
    const tCtx = texCanvas.getContext('2d', { alpha: true });
    if (!tCtx) return texCanvas;

    tCtx.clearRect(0, 0, 4096, 2048);

    const rows = 8;
    const cols = 16;
    const cellW = 4096 / cols;
    const cellH = 2048 / rows;

    // Interlocking tabs mapping for consistent puzzle joints across 360°
    const getHTab = (r: number, c: number) => ((r * 5 + c * 7) % 2 === 0 ? 1 : -1);
    const getVTab = (r: number, c: number) => ((r * 11 + c * 3) % 2 === 0 ? 1 : -1);

    // Multilingual Wikipedia symbols arranged around the globe
    const symbolMap: Record<string, string> = {
      // Upper band
      '2,2': 'W',
      '2,4': 'ウィ',
      '2,6': '維',
      '2,8': 'ው',
      '2,10': 'Ω',
      '2,13': 'Й',
      // Mid-upper band
      '3,1': 'উ',
      '3,3': 'ви',
      '3,5': 'वि',
      '3,7': '25', // Anniversary highlight piece
      '3,9': '위',
      '3,11': 'و',
      '3,14': 'ת',
      // Mid-lower band
      '4,0': 'ሀ',
      '4,2': 'Ա',
      '4,4': 'ვ',
      '4,6': 'วิ',
      '4,8': 'ي',
      '4,10': 'ק',
      '4,12': 'ر',
      '4,15': 'ழ',
      // Lower band
      '5,1': 'И',
      '5,3': 'उ',
      '5,5': 'ᐁ',
      '5,7': 'ವಿ',
      '5,9': 'ഉ',
      '5,11': 'W',
      '5,13': 'ד',
      '5,15': 'శ',
    };

    // Helper: Draws curved jigsaw interlocking tabs
    const drawEdge = (
      ctx: CanvasRenderingContext2D,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      tabType: number
    ) => {
      if (tabType === 0) {
        ctx.lineTo(p1.x, p1.y);
        return;
      }
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ux = dx / dist;
      const uy = dy / dist;
      const px = -uy;
      const py = ux;

      const mx = (p0.x + p1.x) / 2;
      const my = (p0.y + p1.y) / 2;

      const tabR = dist * 0.09;
      const tabH = dist * 0.12 * tabType;

      ctx.lineTo(mx - ux * tabR * 1.15, my - uy * tabR * 1.15);

      const cx = mx + px * tabH;
      const cy = my + py * tabH;
      const c1x = mx - ux * tabR * 0.8 + px * tabH * 0.25;
      const c1y = my - uy * tabR * 0.8 + py * tabH * 0.25;
      const c2x = cx - ux * tabR * 1.35;
      const c2y = cy - uy * tabR * 1.35;
      const c3x = cx + ux * tabR * 1.35;
      const c3y = cy + uy * tabR * 1.35;
      const c4x = mx + ux * tabR * 0.8 + px * tabH * 0.25;
      const c4y = my + uy * tabR * 0.8 + py * tabH * 0.25;

      ctx.bezierCurveTo(c1x, c1y, c2x, c2y, cx, cy);
      ctx.bezierCurveTo(c3x, c3y, c4x, c4y, mx + ux * tabR * 1.15, my + uy * tabR * 1.15);
      ctx.lineTo(p1.x, p1.y);
    };

    // Render individual 3D puzzle pieces
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Open jagged crown top (Wikipedia signature missing puzzle pieces)
        if (r === 0) continue;
        if (r === 1 && (c === 0 || c === 3 || c === 5 || c === 8 || c === 11 || c === 14)) continue;
        if (r === rows - 1 && (c % 2 === 1 || c === 4 || c === 10)) continue;

        const x0 = c * cellW;
        const y0 = r * cellH;
        const x1 = (c + 1) * cellW;
        const y1 = y0 + cellH;

        const p0 = { x: x0, y: y0 };
        const p1 = { x: x1, y: y0 };
        const p2 = { x: x1, y: y1 };
        const p3 = { x: x0, y: y1 };

        const tTab = r > 1 ? -getHTab(r - 1, c) : 0;
        const bTab = r < rows - 2 ? getHTab(r, c) : 0;
        const lTab = -getVTab(r, (c - 1 + cols) % cols);
        const rTab = getVTab(r, c);

        tCtx.save();
        tCtx.beginPath();
        tCtx.moveTo(p0.x, p0.y);
        drawEdge(tCtx, p0, p1, tTab);
        drawEdge(tCtx, p1, p2, rTab);
        drawEdge(tCtx, p2, p3, bTab);
        drawEdge(tCtx, p3, p0, lTab);
        tCtx.closePath();

        const isSpecial25 = r === 3 && c === 7;
        if (isSpecial25) {
          tCtx.fillStyle = '#0B5FA5'; // Wikipedia Anniversary Blue
        } else {
          tCtx.fillStyle = '#F8F9FA'; // Authentic smooth Wikipedia pearl white
        }
        tCtx.fill();

        // Subtle, elegant light grey puzzle grooves
        tCtx.strokeStyle = isSpecial25 ? '#064478' : '#C8C9CE';
        tCtx.lineWidth = 3.5;
        tCtx.lineCap = 'round';
        tCtx.lineJoin = 'round';
        tCtx.stroke();

        // Draw multilingual symbols
        const symbol = symbolMap[`${r},${c}`];
        if (symbol) {
          const tx = x0 + cellW / 2;
          const ty = y0 + cellH / 2;

          if (isSpecial25) {
            tCtx.fillStyle = '#FFFFFF';
            tCtx.font = 'italic bold 94px "Linux Libertine", "Georgia", serif';
          } else {
            tCtx.fillStyle = '#232528';
            tCtx.font = 'normal 88px "Linux Libertine", "Hoefler Text", "Georgia", "Songti SC", "Hiragino Mincho ProN", "Times New Roman", serif';
          }

          tCtx.textAlign = 'center';
          tCtx.textBaseline = 'middle';
          tCtx.fillText(symbol, tx, ty);
        }

        tCtx.restore();
      }
    }

    return texCanvas;
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 420;
    const height = mount.clientHeight || 420;

    // 1. Create Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 310;

    // 2. Anti-Aliased WebGL 3D Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // 3. Texture setup with Max Anisotropy for sharp angles
    const canvasTexture = createGlobeTexture();
    const texture = new THREE.CanvasTexture(canvasTexture);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 4. Globe Object Group (Tilted to iconic Wikipedia axial angle)
    const globeGroup = new THREE.Group();
    globeGroup.rotation.z = -0.15; // Natural Wikipedia axial tilt
    globeGroup.rotation.x = 0.08;
    scene.add(globeGroup);

    // Outer puzzle globe with high geometry density (128 x 128)
    const geometry = new THREE.SphereGeometry(110, 128, 128);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.95,
      metalness: 0.0,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const globe = new THREE.Mesh(geometry, material);
    globeGroup.add(globe);

    // Inner dark hollow sphere visible through crown jigsaw gaps
    const innerGeom = new THREE.SphereGeometry(108.6, 64, 64);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1f2124,
      roughness: 0.95,
      metalness: 0.0,
    });
    const innerGlobe = new THREE.Mesh(innerGeom, innerMat);
    globeGroup.add(innerGlobe);

    // 5. Studio Multi-Point Lighting (Smooth 3D depth, no glare spots)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdfe3ea, 0.5);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.45);
    keyLight.position.set(-180, 220, 180);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf5f7fb, 0.25);
    fillLight.position.set(200, -100, 100);
    scene.add(fillLight);

    // 6. Interactive 3D Dragging & Physics Momentum
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocityX = 0;
    let velocityY = 0;
    const idleSpeedY = 0.0035; // Continuous smooth 360° rotation
    const damping = 0.93;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      velocityX = 0;
      velocityY = 0;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      velocityX = deltaX * 0.005;
      velocityY = deltaY * 0.005;

      globe.rotation.y += velocityX;
      globe.rotation.x += velocityY;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        velocityX = 0;
        velocityY = 0;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      velocityX = deltaX * 0.005;
      velocityY = deltaY * 0.005;

      globe.rotation.y += velocityX;
      globe.rotation.x += velocityY;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Continuous 3D Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        velocityX *= damping;
        velocityY *= damping;

        if (Math.abs(velocityX) < 0.0001) velocityX = 0;
        if (Math.abs(velocityY) < 0.0001) velocityY = 0;

        globe.rotation.y += idleSpeedY + velocityX;
        globe.rotation.x += velocityY;

        // Smoothly restore horizontal axis
        globe.rotation.x *= 0.98;
      }

      innerGlobe.rotation.copy(globe.rotation);
      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
      }
    });
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      geometry.dispose();
      material.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[420px] md:max-w-[460px] h-[300px] xs:h-[340px] sm:h-[420px] md:h-[460px] mx-auto flex items-center justify-center bg-transparent select-none">
      {/* Ambient background glow aura */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/5 filter blur-3xl pointer-events-none" />
      <div className="absolute inset-0 rounded-full border border-gray-200/30 scale-95 pointer-events-none" />
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10 transition-transform duration-300 hover:scale-[1.02]"
        title="Interactive 3D Wikipedia Globe - Drag to rotate"
      />
    </div>
  );
}
