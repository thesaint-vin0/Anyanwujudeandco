import { useEffect, useRef } from "react";

// Custom cursor with smooth-follow ring + dot. Disabled on touch devices.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    let dx = rx, dy = ry;
    let raf;

    const move = (e) => {
      dx = e.clientX;
      dy = e.clientY;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const enterInteractive = () => {
      ring.style.width = "54px";
      ring.style.height = "54px";
      ring.style.background = "rgba(255,255,255,0.15)";
    };
    const leaveInteractive = () => {
      ring.style.width = "34px";
      ring.style.height = "34px";
      ring.style.background = "transparent";
    };

    window.addEventListener("mousemove", move);
    loop();
    document.querySelectorAll("a, button, input, textarea, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", enterInteractive);
      el.addEventListener("mouseleave", leaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.querySelectorAll("a, button, input, textarea, [role='button']").forEach((el) => {
        el.removeEventListener("mouseenter", enterInteractive);
        el.removeEventListener("mouseleave", leaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}