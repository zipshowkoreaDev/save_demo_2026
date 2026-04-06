import { useState, useEffect, useRef } from 'react';

const TOTAL_FRAMES = 121;
const FPS = 30;

const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
  require(`../../assets/woman-compressed/woman-${String(i).padStart(4, '0')}.webp`)
);

function IntroScene({ onComplete }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % TOTAL_FRAMES);
    }, 1000 / FPS);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="intro-overlay" onClick={onComplete}>
      <img
        className="intro-character"
        src={frames[frameIndex]}
        alt="인사하는 배움이"
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
