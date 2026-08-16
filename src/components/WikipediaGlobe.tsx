import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WikipediaGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  // Helper function to create ultra-high-resolution Wikipedia jigsaw texture (4096 x 2048)
  const createGlobeTexture = () => {
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 4096;
    texCanvas.height = 2048;
    const tCtx = texCanvas.getContext('2d', { alpha: true });
    if (!tCtx) return texCanvas;

    tCtx.clearRect(0, 0, 4096, 2048);

    const rows = 8;
    const cols = 12;
    const cellW = 4096 / cols;
    const cellH = 2048 / rows;

    // Deterministic tab layout for clean, consistent interlocking puzzle joints
    const hTabs = [
      [ 1, -1,  1,  1, -1,  1, -1,  1, -1,  1, -1,  1],
      [-1,  1, -1,  1, -1,  1,  1, -1,  1, -1,  1, -1],
      [ 1, -1,  1, -1,  1, -1, -1,  1, -1,  1, -1,  1],
      [-1,  1, -1,  1, -1,  1,  1, -1,  1, -1,  1, -1],
      [ 1, -1,  1, -1,  1, -1, -1,  1, -1,  1, -1,  1],
      [-1,  1, -1,  1, -1,  1,  1, -1,  1, -1,  1, -1],
      [ 1, -1,  1, -1,  1, -1, -1,  1, -1,  1, -1,  1],
      [-1,  1, -1,  1, -1,  1,  1, -1,  1, -1,  1, -1],
    ];

    const vTabs = [
      [ 1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1],
      [-1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1],
      [ 1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1],
      [-1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1],
      [ 1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1],
      [-1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1],
      [ 1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1],
      [-1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1],
      [ 1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1],
    ];

    const symbolMap: Record<string, string> = {
      '2,2': 'W',
      '2,5': '25', // Special anniversary highlight piece
      '2,8': '維',
      '2,10': 'Ω',
      '3,1': 'উ',
      '3,4': 'वि',
      '3,7': 'ви',
      '3,10': '위',
      '4,0': 'ሀ',
      '4,3': 'ウィ',
      '4,6': 'و',
      '4,9': 'ת',
      '5,2': 'Ա',
      '5,5': 'ვ',
      '5,8': 'วิ',
      '5,11': 'ي',
      '6,1': 'ᐁ',
      '6,4': 'И',
      '6,7': 'उ',
      '6,10': 'W',
    };

    // Helper: Draws curved Bezier jigsaw edge
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

      const tabR = dist * 0.135;
      const tabH = dist * 0.17 * tabType;

      ctx.lineTo(mx - ux * tabR * 1.25, my - uy * tabR * 1.25);

      const cx = mx + px * tabH;
      const cy = my + py * tabH;
      const c1x = mx - ux * tabR + px * tabH * 0.32;
      const c1y = my - uy * tabR + py * tabH * 0.32;
      const c2x = cx - ux * tabR * 1.45;
      const c2y = cy - uy * tabR * 1.45;
      const c3x = cx + ux * tabR * 1.45;
      const c3y = cy + uy * tabR * 1.45;
      const c4x = mx + ux * tabR + px * tabH * 0.32;
      const c4y = my + uy * tabR + py * tabH * 0.32;

      ctx.bezierCurveTo(c1x, c1y, c2x, c2y, cx, cy);
      ctx.bezierCurveTo(c3x, c3y, c4x, c4y, mx + ux * tabR * 1.25, my + uy * tabR * 1.25);
      ctx.lineTo(p1.x, p1.y);
    };

    // Render individual puzzle pieces
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Natural top/bottom jigsaw jagged missing openings (Wikipedia signature style)
        if (r === 0) continue;
        if (r === 1 && (c === 0 || c === 3 || c === 6 || c === 9)) continue;
        if (r === rows - 1 && (c === 1 || c === 4 || c === 7 || c === 10)) continue;

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

        tCtx.save();
        tCtx.beginPath();
        tCtx.moveTo(p0.x, p0.y);
        drawEdge(tCtx, p0, p1, tTab);
        drawEdge(tCtx, p1, p2, rTab);
        drawEdge(tCtx, p2, p3, bTab);
        drawEdge(tCtx, p3, p0, lTab);
        tCtx.closePath();

        const isSpecial25 = r === 2 && c === 5;
        if (isSpecial25) {
          const pieceGrad = tCtx.createLinearGradient(x0, y0, x1, y1);
          pieceGrad.addColorStop(0, '#1070C0');
          pieceGrad.addColorStop(1, '#084880');
          tCtx.fillStyle = pieceGrad;
        } else {
          // Soft subtle gradient for realistic piece curvature
          const pieceGrad = tCtx.createLinearGradient(x0, y0, x0, y1);
          pieceGrad.addColorStop(0, '#FFFFFF');
          pieceGrad.addColorStop(0.5, '#FDFDFD');
          pieceGrad.addColorStop(1, '#F2F3F5');
          tCtx.fillStyle = pieceGrad;
        }
        tCtx.fill();

        // Subtle embossed inner bevel highlight along edges
        tCtx.strokeStyle = isSpecial25 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)';
        tCtx.lineWidth = 4;
        tCtx.stroke();

        // Main puzzle groove border
        tCtx.strokeStyle = isSpecial25 ? '#05345E' : '#C8C9CE';
        tCtx.lineWidth = 7;
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
            tCtx.font = 'italic bold 112px "Linux Libertine", "Georgia", serif';
            tCtx.shadowColor = 'rgba(0, 0, 0, 0.25)';
            tCtx.shadowBlur = 8;
            tCtx.shadowOffsetY = 2;
          } else {
            tCtx.fillStyle = '#232527';
            tCtx.font = 'normal 104px "Linux Libertine", "Hoefler Text", "Georgia", "Songti SC", "Hiragino Mincho ProN", "Times New Roman", serif';
            tCtx.shadowColor = 'rgba(0, 0, 0, 0.08)';
            tCtx.shadowBlur = 4;
            tCtx.shadowOffsetY = 1;
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
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 300;

    // 2. High-Performance Anti-Aliased WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // 3. Texture setup with Max Anisotropy
    const canvasTexture = createGlobeTexture();
    const texture = new THREE.CanvasTexture(canvasTexture);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 4. Globe Object Group (Tilted to iconic Wikipedia angle)
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

    // Inner dark hollow sphere for realistic depth through jigsaw gaps
    const innerGeom = new THREE.SphereGeometry(108.8, 64, 64);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x161719,
      roughness: 0.95,
      metalness: 0.0,
    });
    const innerGlobe = new THREE.Mesh(innerGeom, innerMat);
    globeGroup.add(innerGlobe);

    // 5. Studio Multi-Point Lighting for clean 3D depth without glare spots
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd0d5dd, 0.45);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.55);
    keyLight.position.set(-180, 220, 180);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf2f4f8, 0.3);
    fillLight.position.set(200, -100, 100);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
    rimLight.position.set(0, 150, -200);
    scene.add(rimLight);

    // 6. Interactive Physics & Inertia Handlers
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocityX = 0;
    let velocityY = 0;
    const idleSpeedY = 0.003;
    const damping = 0.92;

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

      velocityX = deltaX * 0.006;
      velocityY = deltaY * 0.006;

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

      velocityX = deltaX * 0.006;
      velocityY = deltaY * 0.006;

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

    // 7. Render Loop with Smooth Inertia Decay
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Apply inertia decay smoothly
        velocityX *= damping;
        velocityY *= damping;

        if (Math.abs(velocityX) < 0.0001) velocityX = 0;
        if (Math.abs(velocityY) < 0.0001) velocityY = 0;

        globe.rotation.y += idleSpeedY + velocityX;
        globe.rotation.x += velocityY;

        // Softly relax X tilt towards baseline
        globe.rotation.x *= 0.98;
      }

      innerGlobe.rotation.copy(globe.rotation);
      renderer.render(scene, camera);
    };

    animate();

    // 8. Dynamic Responsive Resize Observer
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
      {/* Refined subtle ambient backdrop glow rings */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/5 filter blur-2xl pointer-events-none" />
      <div className="absolute inset-0 rounded-full border border-gray-200/40 scale-95 pointer-events-none" />
      <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/15 scale-90 pointer-events-none animate-[spin_60s_linear_infinite]" />
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10 transition-transform duration-300 hover:scale-[1.02]"
        title="Drag to rotate the Wikipedia globe"
      />
    </div>
  );
}
