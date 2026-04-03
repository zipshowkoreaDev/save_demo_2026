import { useState, useRef, Fragment } from 'react';
import characterGreeting from '../../assets/character-smile.png';
import missionSign from '../../assets/sign-construction.png';

const WORDS = [
  '공사 현장',
  '조심',
  '경고',
  '화장실',
  '이쪽',
  '지시',
  '고압 전기',
  '위험해',
  '안내'
];

const DROP_ZONES = [
  { id: 'drop1', answer: '공사 현장', placeholder: '무엇' },
  { id: 'drop2', answer: '조심',     placeholder: '어떻게' },
  { id: 'drop3', answer: '경고',     placeholder: '이런' },
];

function MissionScene({ onComplete }) {
  const [filled, setFilled]   = useState({});
  const [used, setUsed]     = useState({});
  const [shaking, setShaking] = useState({});
  const correctCount = useRef(0);
  const draggedVal   = useRef(null);
  const touchClone   = useRef(null);

  /* ── 공통 drop 처리 ── */
  function drop(zoneId, answer) {
    const val = draggedVal.current;
    if (!val || filled[zoneId]) return;

    if (val === answer) {
      setFilled(prev => ({ ...prev, [zoneId]: val }));
      setUsed(prev => ({ ...prev, [val]: true }));
      correctCount.current += 1;
      if (correctCount.current === DROP_ZONES.length) setTimeout(onComplete, 800);
    } else {
      setShaking(prev => ({ ...prev, [zoneId]: true }));
      setTimeout(() => setShaking(prev => ({ ...prev, [zoneId]: false })), 300);
    }
    draggedVal.current = null;
  }

  /* ── 마우스 드래그 ── */
  function handleDragStart(val) { draggedVal.current = val; }

  /* ── 터치 드래그 ── */
  function handleTouchStart(e, val) {
    if (used[val]) return;
    e.preventDefault();
    draggedVal.current = val;

    const touch = e.touches[0];
    const rect  = e.currentTarget.getBoundingClientRect();
    const clone = e.currentTarget.cloneNode(true);

    Object.assign(clone.style, {
      position:      'fixed',
      pointerEvents: 'none',
      opacity:       '0.85',
      zIndex:        '9999',
      margin:        '0',
      left:          touch.clientX - rect.width  / 2 + 'px',
      top:           touch.clientY - rect.height / 2 + 'px',
      width:         rect.width  + 'px',
    });

    document.body.appendChild(clone);
    touchClone.current = clone;
  }

  function handleTouchMove(e) {
    e.preventDefault();
    if (!touchClone.current) return;
    const touch  = e.touches[0];
    const clone  = touchClone.current;
    clone.style.left = touch.clientX - clone.offsetWidth  / 2 + 'px';
    clone.style.top  = touch.clientY - clone.offsetHeight / 2 + 'px';
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    if (touchClone.current) {
      document.body.removeChild(touchClone.current);
      touchClone.current = null;
    }

    const touch = e.changedTouches[0];
    const el    = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!el) return;

    const zone = el.closest('[data-zone-id]');
    if (zone) drop(zone.dataset.zoneId, zone.dataset.answer);
  }

  return (
    <div className="mission-overlay">
      <img className="mission-sign" src={missionSign} alt="공사장 표지판" />

      <div className="mission-content">
        <div className="guide-bubble">
          <img src={characterGreeting} alt="배움이" />
          <span>이 표지판이 무엇인지 맞춰보세요!</span>
        </div>

        <div className="word-choices">
          {WORDS.map(word => (
            <div
              key={word}
              className={`word-chip${used[word] ? ' used' : ''}`}
              draggable={!used[word]}
              onDragStart={() => handleDragStart(word)}
              onTouchStart={e => handleTouchStart(e, word)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {word}
            </div>
          ))}
        </div>

        <div className="answer-sentence">
          이것은&nbsp;
          {DROP_ZONES.map(({ id, answer, placeholder }, i) => (
            <Fragment key={id}>
              <div
                className={`answer-slot${filled[id] ? ' filled' : ''}${shaking[id] ? ' shake' : ''}`}
                data-zone-id={id}
                data-answer={answer}
                onDragOver={e => e.preventDefault()}
                onDrop={() => drop(id, answer)}
              >
                {filled[id] || placeholder}
              </div>
              {i === 0 && '을 '}
              {i === 1 && '(하)라는 '}
              {i === 2 && ' 표지판이에요!'}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MissionScene;
