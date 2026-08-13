import { useEffect, useRef } from "react";
import * as THREE from "three";

// "Crystalized Bar Chart" — frosted-glass pillars of varying heights that
// slowly rotate and lean toward the cursor. Built with raw three.js for
// performance and zero extra dependencies. Honors prefers-reduced-motion.
export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf8fafc, 14, 30);

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 3.5, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lighting — soft, premium, key + fill + rim
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(6, 12, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x1e40af, 0.9);
    rim.position.set(-8, 4, -6);
    scene.add(rim);
    const gold = new THREE.PointLight(0xf59e0b, 0.8, 30);
    gold.position.set(2, 6, 4);
    scene.add(gold);

    // Crystallized pillars — a bar chart of frosted glass
    const group = new THREE.Group();
    const heights = [3.2, 4.8, 2.6, 6.2, 4.1, 5.4, 3.6, 7.1, 4.9, 3.0];
    const barCount = heights.length;
    const spacing = 1.55;
    const pillars = [];

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.92,
      thickness: 1.2,
      ior: 1.45,
      transparent: true,
      opacity: 0.85,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });

    heights.forEach((h, i) => {
      const geo = new THREE.BoxGeometry(0.85, h, 0.85);
      const mesh = new THREE.Mesh(geo, glassMaterial.clone());
      mesh.position.x = (i - (barCount - 1) / 2) * spacing;
      mesh.position.y = h / 2 - 2.2;
      mesh.userData.baseX = mesh.position.x;
      mesh.userData.baseY = mesh.position.y;
      mesh.userData.height = h;
      // subtle per-bar tint
      const tint = i % 3 === 0 ? 0x1e40af : i % 3 === 1 ? 0xf8fafc : 0xf59e0b;
      mesh.material.color.setHex(tint === 0xf8fafc ? 0xffffff : tint);
      mesh.material.opacity = tint === 0xf59e0b ? 0.55 : 0.82;
      pillars.push(mesh);
      group.add(mesh);

      // thin base reflection plane per bar (soft ground glow)
      const ringGeo = new THREE.RingGeometry(0.4, 0.6, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x1e40af, transparent: true, opacity: 0.08, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(mesh.position.x, -2.25, 0);
      group.add(ring);
    });

    // floating particles
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x1e40af, size: 0.06, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    scene.add(group);

    // Mouse parallax
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      const t = clock.getElapsedTime();
      if (!reduce) {
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        group.rotation.y = mouse.x * 0.4;
        group.rotation.x = mouse.y * 0.12;
        camera.position.x = mouse.x * 0.6;
        camera.position.y = 3.5 - mouse.y * 0.4;
        camera.lookAt(0, 0.5, 0);

        pillars.forEach((m, i) => {
          const wave = Math.sin(t * 0.8 + i * 0.5) * 0.18;
          m.position.y = m.userData.baseY + wave;
          m.rotation.z = Math.sin(t * 0.5 + i) * 0.03 + mouse.x * 0.04;
          m.material.opacity = (m.userData.height > 5 ? 0.82 : 0.55) + Math.sin(t + i) * 0.04;
        });
        particles.rotation.y = t * 0.02;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
      pillars.forEach((m) => { m.geometry.dispose(); m.material.dispose(); });
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}