import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WikipediaGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  // Helper function to create the flat Wikipedia jigsaw texture canvas
  const createGlobeTexture = () => {
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 2048;
    texCanvas.height = 1024;
    const tCtx = texCanvas.getContext('2d');
    if (!tCtx) return texCanvas;

    // Transparent background so openings look hollow
    tCtx.clearRect(0, 0, 2048, 1024);

    const rows = 8;
    const cols = 12;
    const cellW = 2048 / cols;
    const cellH = 1024 / rows;

    // Interlocking tabs mapping
    const hTabs = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.random() > 0.5 ? 1 : -1))
    );
    const vTabs = Array.from({ length: rows + 1 }, () =>
      Array.from({ length: cols }, () => (Math.random() > 0.5 ? 1 : -1))
    );

    const symbolMap: Record<string, string> = {
      '2,2': 'W',
      '2,5': '25', // Special blue piece
      '2,8': '維',
      '3,1': 'উ',
      '3,4': 'वि',
      '3,7': 'ви',
      '3,10': '위',
      '4,3': 'ウィ',
      '4,6': 'و',
      '4,9': 'ת',
      '5,2': 'Ա',
      '5,5': 'ვ',
      '5,8': 'วิ',
      '6,4': 'И',
      '6,7': 'उ',
      '6,10': 'W'
    };

    // Draws puzzle edge with Bezier bulb tabs
    const drawEdge = (p0: { x: number; y: number }, p1: { x: number; y: number }, tabType: number) => {
      if (tabType === 0) {
        tCtx.lineTo(p1.x, p1.y);
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

      const tabR = dist * 0.13;
      const tabH = dist * 0.16 * tabType;

      tCtx.lineTo(mx - ux * tabR * 1.2, my - uy * tabR * 1.2);
      
      const cx = mx + px * tabH;
      const cy = my + py * tabH;
      const c1x = mx - ux * tabR + px * tabH * 0.3;
      const c1y = my - uy * tabR + py * tabH * 0.3;
      const c2x = cx - ux * tabR * 1.45;
      const c2y = cy - uy * tabR * 1.45;
      const c3x = cx + ux * tabR * 1.45;
      const c3y = cy + uy * tabR * 1.45;
      const c4x = mx + ux * tabR + px * tabH * 0.3;
      const c4y = my + uy * tabR + py * tabH * 0.3;

      tCtx.bezierCurveTo(c1x, c1y, c2x, c2y, cx, cy);
      tCtx.bezierCurveTo(c3x, c3y, c4x, c4y, mx + ux * tabR * 1.2, my + uy * tabR * 1.2);
      tCtx.lineTo(p1.x, p1.y);
    };

    // Draw grid of puzzle pieces
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Jagged cut top/bottom opening like standard Wikipedia logo
        if (r === 0) continue;
        if (r === 1 && c % 3 === 0) continue;
        if (r === rows - 1 && c % 2 === 1) continue;

        const x0 = c * cellW;
        const y0 = r * cellH;
        const x1 = (c + 1) * cellW;
        const y1 = y0 + cellH;

        const p0 = { x: x0, y: y0 };
        const p1 = { x: x1, y: y0 };
        const p2 = { x: x1, y: y1 };
        const p3 = { x: x0, y: y1 };

        const tTab = r > 1 ? -hTabs[r - 1][c] : 0;
        const bTab = r < rows - 2 ? hTabs[r][c] : 0;
        const lTab = -vTabs[r][(c - 1 + cols) % cols];
        const rTab = vTabs[r][c];

        tCtx.beginPath();
        tCtx.moveTo(p0.x, p0.y);
        drawEdge(p0, p1, tTab);
        drawEdge(p1, p2, rTab);
        drawEdge(p2, p3, bTab);
        drawEdge(p3, p0, lTab);
        tCtx.closePath();

        const isSpecial25 = (r === 2 && c === 5);
        if (isSpecial25) {
          tCtx.fillStyle = '#0B5FA5'; // Wikipedia Anniversary Blue
        } else {
          tCtx.fillStyle = '#FFFFFF'; // Clean white pieces (as user requested)
        }
        tCtx.fill();

        // Stroke puzzle gaps
        tCtx.strokeStyle = '#D0D0D2';
        tCtx.lineWidth = 4;
        tCtx.stroke();

        // Draw multilingual symbols
        const symbol = symbolMap[`${r},${c}`];
        if (symbol) {
          const tx = x0 + cellW / 2;
          const ty = y0 + cellH / 2;

          if (isSpecial25) {
            tCtx.fillStyle = '#FFFFFF';
            tCtx.font = 'italic bold 58px "Georgia", serif';
          } else {
            tCtx.fillStyle = '#202020';
            tCtx.font = 'normal 52px "Georgia", serif';
          }
          tCtx.textAlign = 'center';
          tCtx.textBaseline = 'middle';
          tCtx.fillText(symbol, tx, ty);
        }
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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 295;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3. Canvas Texture
    const canvasTexture = createGlobeTexture();
    const texture = new THREE.CanvasTexture(canvasTexture);
    texture.colorSpace = THREE.SRGBColorSpace;

    // 4. Create Globe Spheres (Mesh)
    // Outer white puzzle sphere
    const geometry = new THREE.SphereGeometry(110, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 1.0,
      metalness: 0.0,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Inner dark hollow sphere
    const innerGeom = new THREE.SphereGeometry(109, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1d1d1f,
      roughness: 0.9,
      metalness: 0.0,
    });
    const innerGlobe = new THREE.Mesh(innerGeom, innerMat);
    scene.add(innerGlobe);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set(-150, 200, 150);
    scene.add(dirLight);

    // 6. Interaction Event Handlers
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const defaultSpeedY = 0.0035;
    const defaultSpeedX = 0.0003;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globe.rotation.y += deltaX * 0.005;
      globe.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      globe.rotation.y += deltaX * 0.005;
      globe.rotation.x += deltaY * 0.005;

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

    // 7. Render Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        globe.rotation.y += defaultSpeedY;
      }

      innerGlobe.rotation.copy(globe.rotation);
      renderer.render(scene, camera);
    };

    animate();

    // 8. Size Resize Handler
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
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
    <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[420px] h-[280px] xs:h-[320px] sm:h-[400px] md:h-[420px] mx-auto flex items-center justify-center bg-transparent select-none">
      <div className="absolute inset-0 rounded-full border border-amber-500/5 scale-95 pointer-events-none animate-pulse"></div>
      <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/5 scale-90 pointer-events-none rotate-12"></div>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />
    </div>
  );
}
