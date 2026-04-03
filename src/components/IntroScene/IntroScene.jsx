import characterGreeting from '../../assets/character-greeting.png';

function IntroScene({ onComplete }) {
  return (
    <div className="intro-overlay" onClick={onComplete}>
      <img
        className="intro-character"
        src={characterGreeting}
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
