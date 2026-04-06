import { useEffect, useRef } from 'react';

const TOTAL = 121;
const FPS   = 30;

const frameContext = require.context(
  '../../assets/woman-compressed',
  false,
  /^\.\/woman-\d{4}\.webp$/
);
const framePaths = frameContext.keys().sort().map(k => frameContext(k));

function IntroScene({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const images = framePaths.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameIdx = 0;
    let lastTime = 0;
    let rafId;

    function draw(ts) {
      rafId = requestAnimationFrame(draw);
      if (ts - lastTime < 1000 / FPS) return;
      lastTime = ts;
      const img = images[frameIdx];
      if (img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      frameIdx = (frameIdx + 1) % TOTAL;
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="intro-overlay" onClick={onComplete}>
      <canvas
        ref={canvasRef}
        className="intro-character"
        width={1920}
        height={1080}
      />
      <div className="intro-dialog">
        우리 동네 지도를 탐험해보세요.<br />
        화면을 터치해 움직이며<br />
        숨겨진 안전 표지판을 찾아보세요.
      </div>
    </div>
  );
}

export default IntroScene;
