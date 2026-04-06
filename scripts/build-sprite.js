/**
 * 121장 WebP 프레임 → 스프라이트시트 생성
 * 각 프레임: 1920x1080 → 480x270 (1/4 스케일)
 * 그리드: 11열 × 11행 = 121칸
 * 출력: src/assets/woman-sprite.webp (5280x2970)
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const TOTAL  = 121;
const COLS   = 11;
const ROWS   = 11;
const FW     = 480;
const FH     = 270;
const INPUT  = path.join(__dirname, '../src/assets/woman-compressed');
const OUTPUT = path.join(__dirname, '../src/assets/woman-sprite.webp');

async function buildSprite() {
  console.log('프레임 리사이즈 중...');

  const resized = await Promise.all(
    Array.from({ length: TOTAL }, async (_, i) => {
      const file = path.join(INPUT, `woman-${String(i).padStart(4, '0')}.webp`);
      const buf  = await sharp(file).resize(FW, FH).webp({ quality: 80 }).toBuffer();
      return { input: buf, left: (i % COLS) * FW, top: Math.floor(i / COLS) * FH };
    })
  );

  console.log('스프라이트시트 합성 중...');

  await sharp({
    create: { width: COLS * FW, height: ROWS * FH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
    .composite(resized)
    .webp({ quality: 80 })
    .toFile(OUTPUT);

  const size = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(2);
  console.log(`완료: ${OUTPUT}`);
  console.log(`크기: ${size}MB (${COLS * FW}x${ROWS * FH}px, ${COLS}열×${ROWS}행)`);
  console.log(`프레임당: ${FW}x${FH}px`);
}

buildSprite().catch(console.error);
