import { useState, useEffect, useRef } from 'react';
import sprite from '../../assets/woman-sprite.webp';

const TOTAL_FRAMES = 121;
const COLS         = 11;
const ROWS         = 11;
const FW           = 480;
const FH           = 270;
const FPS          = 30;

function IntroScene({ onComplete }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % TOTAL_FRAMES);
    }, 1000 / FPS);

    return () => clearInterval(intervalRef.current);
  }, []);

  const col = frameIndex % COLS;
  const row = Math.floor(frameIndex / COLS);

  return (
    <div className="intro-overlay" onClick={onComplete}>
      <div
        className="intro-character"
        style={{
          backgroundImage:    `url(${sprite})`,
          backgroundSize:     `${COLS * 100}% auto`,
          backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
          backgroundRepeat:   'no-repeat',
        }}
        role="img"
        aria-label="인사하는 배움이"
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
