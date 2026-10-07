import React, { useCallback, useEffect, useState } from 'react';

interface JungleFlashScreenProps {
  onFinish?: () => void;
  autoDismissMs?: number;
}

const dripPositions = [
  ['4%', '7px', '18%', '5s', '0s'],
  ['11%', '5px', '30%', '6.5s', '-2s'],
  ['19%', '9px', '22%', '5.5s', '-4s'],
  ['28%', '6px', '36%', '7s', '-1s'],
  ['37%', '8px', '16%', '4.8s', '-3s'],
  ['46%', '5px', '28%', '6s', '-5s'],
  ['55%', '9px', '24%', '5.2s', '-2.5s'],
  ['63%', '6px', '34%', '7.2s', '-0.5s'],
  ['72%', '8px', '20%', '5.6s', '-3.5s'],
  ['80%', '5px', '32%', '6.4s', '-1.5s'],
  ['88%', '9px', '26%', '5s', '-4.5s'],
  ['95%', '6px', '18%', '6s', '-2.8s'],
] as const;

const veinRows = (fine: boolean) => {
  const veins: Array<{ y: number; side: -1 | 1 }> = [];
  const step = fine ? 16 : 40;
  for (let y = fine ? 70 : 100; y < 350; y += step) {
    veins.push({ y, side: -1 }, { y, side: 1 });
  }
  return veins;
};

const LeafEvidenceIllustration: React.FC<{ id: string; fine?: boolean }> = ({ id, fine = false }) => (
  <svg viewBox="0 0 300 400" aria-hidden="true">
    <defs>
      <radialGradient id={`leaf-${id}`} cx="45%" cy="35%" r="80%">
        <stop offset="0" stopColor="#86d9a2" />
        <stop offset="55%" stopColor="#2f8a55" />
        <stop offset="100%" stopColor="#0e4526" />
      </radialGradient>
    </defs>
    <path
      d="M150 8C255 88 272 232 150 392 28 232 45 88 150 8Z"
      fill={`url(#leaf-${id})`}
      stroke="#0d3a20"
      strokeWidth="3"
    />
    {veinRows(fine).map(({ y, side }) => {
      const width = 100 * Math.sin((Math.PI * (y - 10)) / 380);
      return (
        <path
          key={`${y}-${side}`}
          d={`M150 ${y + 30} Q${150 + side * width * 0.5} ${y + 2} ${150 + side * width * 0.9} ${y - 48}`}
          stroke="#e4f9df"
          strokeOpacity={fine ? 0.62 : 0.6}
          strokeWidth={fine ? 1.4 : 2.2}
          fill="none"
        />
      );
    })}
    <path
      d="M150 14C153 140 147 270 150 392"
      stroke="#e6f7d8"
      strokeOpacity="0.8"
      strokeWidth={fine ? 3 : 5}
      fill="none"
      strokeLinecap="round"
    />
    {fine && (
      <g>
        <circle cx="112" cy="170" r="10" fill="#e6f8ff" fillOpacity="0.45" />
        <circle cx="108" cy="166" r="3.2" fill="#fff" />
        <circle cx="196" cy="236" r="7" fill="#e6f8ff" fillOpacity="0.45" />
        <circle cx="193" cy="233" r="2.4" fill="#fff" />
        <circle cx="170" cy="120" r="5" fill="#e6f8ff" fillOpacity="0.45" />
        <circle cx="168" cy="118" r="1.8" fill="#fff" />
      </g>
    )}
  </svg>
);

interface CanopyTree {
  kind: 'broad' | 'pine';
  color: string;
  height: number;
  left: number;
}

const createCanopyTrees = (color: string, count: number, seed: number): CanopyTree[] => {
  let random = seed;
  return Array.from({ length: count }, (_, index) => {
    random = (random * 9301 + 49297) % 233280;
    return {
      kind: random % 3 ? 'broad' : 'pine',
      color,
      height: 55 + (random % 45),
      left: ((index + (random % 70) / 100) / count) * 94,
    };
  });
};

const renderCanopyTree = (tree: CanopyTree, index: number) => (
  <svg
    key={`${tree.left}-${index}`}
    viewBox={tree.kind === 'broad' ? '0 0 120 200' : '0 0 100 200'}
    style={{ left: `${tree.left}%`, height: `${tree.height}%` }}
    aria-hidden="true"
  >
    {tree.kind === 'broad' ? (
      <>
        <path d="M55 200L58 120 40 90M65 200L62 125 82 98" stroke="#080304" strokeWidth="8" fill="none" />
        <g fill={tree.color}>
          <circle cx="60" cy="68" r="48" />
          <circle cx="28" cy="96" r="30" />
          <circle cx="92" cy="96" r="30" />
          <circle cx="60" cy="102" r="30" />
        </g>
        <circle cx="44" cy="52" r="24" fill="#7a1016" opacity="0.16" />
      </>
    ) : (
      <>
        <rect x="46" y="150" width="8" height="50" fill="#080304" />
        <g fill={tree.color}>
          <path d="M50 4L82 62H18Z" />
          <path d="M50 36L88 108H12Z" />
          <path d="M50 74L94 156H6Z" />
        </g>
      </>
    )}
  </svg>
);

const TreeLayer: React.FC<{ id: string; trees: CanopyTree[] }> = ({ id, trees }) => (
  <div className="lay" id={id}>
    {[0, 1].map((half) => (
      <div className="half" key={half}>
        {trees.map(renderCanopyTree)}
      </div>
    ))}
  </div>
);

const distantTrees = createCanopyTrees('#1b0a0c', 9, 7);
const middleTrees = createCanopyTrees('#110709', 7, 13);
const foregroundTrees = createCanopyTrees('#050203', 5, 29);

export const JungleFlashScreen: React.FC<JungleFlashScreenProps> = ({
  onFinish,
  autoDismissMs = 8300,
}) => {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [phase, setPhase] = useState(2);
  const dismissed = React.useRef(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleDismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setFading(true);
    window.setTimeout(() => {
      setRemoved(true);
      onFinish?.();
    }, 1100);
  }, [onFinish]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRemoved(true);
      onFinish?.();
      return;
    }

    const timers = [
      window.setTimeout(() => setPhase(3), 3600),
      window.setTimeout(() => setPhase(4), 4500),
      window.setTimeout(() => setPhase(5), 7000),
      window.setTimeout(handleDismiss, autoDismissMs),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [autoDismissMs, handleDismiss, onFinish]);

  const phaseClass = `p2${phase >= 3 ? ' p3' : ''}${phase >= 4 ? ' p4' : ''}${phase >= 5 ? ' p5' : ''}`;
  const caption = phase >= 5
    ? 'SPECIMEN LOCKED · OPENING ARCHIVE'
    : phase >= 4
      ? 'FOCUSING ON LEAF…'
      : phase >= 3
        ? 'SCANNING FOR SPECIMEN…'
        : '';

  if (removed) return null;

  return (
    <div
      id="splash"
      className={`${phaseClass} ${fading ? 'out' : ''}`}
      role="presentation"
      aria-label="Loading Botanical Investigation Archive"
    >
      <button id="skip" className="btn" type="button" onClick={handleDismiss}>
        SKIP ▸
      </button>

      <div className="scene">
        <div className="sunb" />
        <div className="drips" aria-hidden="true">
          {dripPositions.map(([left, width, height, duration, delay]) => (
            <i
              key={left}
              style={{
                left,
                ['--w' as string]: width,
                ['--h' as string]: height,
                ['--d' as string]: duration,
                animationDelay: delay,
              }}
            />
          ))}
        </div>
        <i className="shaft" style={{ right: '30%' }} />
        <i className="shaft" style={{ right: '44%', width: '6vw' }} />
        <TreeLayer id="ly1" trees={distantTrees} />
        <TreeLayer id="ly2" trees={middleTrees} />
        <div className="ground" />
        <TreeLayer id="ly3" trees={foregroundTrees} />
        <div className="road">
          <i className="dash" />
        </div>

        <div className="car">
          <svg viewBox="0 0 300 130" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="bm" x1="0" x2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="288,74 470,40 470,112" fill="url(#bm)" />
            <g className="bob">
              <path d="M12 92V70Q12 62 22 60L70 56 92 30Q96 26 102 26H196Q202 26 206 31L228 56 276 62Q290 64 290 76V92Z" fill="#bd1e32" />
              <path d="M100 34H140V56H84ZM148 34H196L214 56H148Z" fill="#a9dcec" opacity="0.9" />
              <path d="M104 22H194" stroke="#f2eeee" strokeWidth="3" />
              <rect x="278" y="68" width="12" height="9" rx="3" fill="#ffffff" />
              <path d="M12 80H290" stroke="#7e1421" strokeWidth="3" />
              <g className="wh">
                <circle cx="70" cy="96" r="22" fill="#0b0f0d" stroke="#666" strokeWidth="3" />
                <circle cx="70" cy="96" r="8" fill="#999" />
                <path d="M70 78V114M52 96H88" stroke="#aaa" strokeWidth="3" />
              </g>
              <g className="wh">
                <circle cx="232" cy="96" r="22" fill="#0b0f0d" stroke="#666" strokeWidth="3" />
                <circle cx="232" cy="96" r="8" fill="#999" />
                <path d="M232 78V114M214 96H250" stroke="#aaa" strokeWidth="3" />
              </g>
            </g>
          </svg>
        </div>

        <p className="cap mono">ENTERING THE BOTANICAL FIELD ARCHIVE…</p>
      </div>

      <div className="stage" aria-hidden="true">
        <div className="bigleaf" id="bl">
          <LeafEvidenceIllustration id="a" />
        </div>

        <div className="rig">
          <div className="lens">
            <div className="lz">
              <LeafEvidenceIllustration id="b" fine />
            </div>
            <i className="sheen" />
          </div>
          <i className="hd" />
        </div>

        <div className="bk">
          <i />
          <i />
          <i />
          <i />
        </div>
        <i className="flash" />
        <p className="cap2 mono" id="cap2">{caption}</p>
      </div>

      <style>{`
        #splash {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: radial-gradient(circle at 50% 40%, #25090e, #030304 70%);
          overflow: hidden;
          transition: opacity .8s, filter .8s, transform .8s;
          --ld: min(46vmin, 340px);
          --lh: min(64vh, 100vw, 520px);
        }
        #splash.out {
          opacity: 0;
          transform: scale(1.04);
          filter: blur(5px);
          pointer-events: none;
        }
        #skip {
          position: absolute;
          top: calc(14px + env(safe-area-inset-top, 0px));
          right: 16px;
          z-index: 9;
          padding: 8px 14px;
          font-size: 0.7rem;
          background: rgba(0,0,0,.4);
          cursor: pointer;
          border: 1px solid rgba(230, 40, 58, 0.7);
          border-radius: 999px;
          color: #f5efe1;
          letter-spacing: .2em;
          font-family: ui-monospace, 'SF Mono', monospace;
          text-transform: uppercase;
        }
        .scene {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1s ease, filter 1.2s ease;
          background: linear-gradient(180deg,#000 0%,#050102 45%,#1c0407 76%,#040102 100%);
        }
        #splash.p2 .scene,
        #splash.p3 .scene,
        #splash.p4 .scene,
        #splash.p5 .scene { opacity: 1; }
        #splash.p4 .scene { filter: blur(5px) brightness(.38); }
        .sunb {
          position: absolute;
          right: 10%;
          top: 9%;
          width: 22vmin;
          height: 22vmin;
          border-radius: 50%;
          background: radial-gradient(circle,#ff5446,#b3141a 42%,rgba(120,0,10,0) 70%);
        }
        .scene .shaft { background: linear-gradient(180deg,rgba(210,20,30,.2),transparent 80%); }
        .drips {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 60%;
          z-index: 4;
          pointer-events: none;
        }
        .drips::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 42px;
          background: linear-gradient(#4f050a,#8b0d14 40%,transparent 41%),radial-gradient(circle at 14px 14px,#8b0d14 13px,transparent 14px) 0 14px/28px 28px repeat-x;
        }
        .drips i {
          position: absolute;
          top: 12px;
          width: var(--w);
          height: 0;
          background: linear-gradient(#7d0a10,#c4141c);
          border-radius: 0 0 99px 99px;
          animation: drip var(--d) ease-in infinite;
        }
        @keyframes drip {
          0% { height: 0; opacity: 1; }
          70% { height: var(--h); opacity: 1; }
          100% { height: var(--h); opacity: 0; }
        }
        .lay {
          position: absolute;
          left: 0;
          bottom: var(--b);
          height: var(--hh);
          width: 200%;
          display: flex;
          animation: scr var(--sp) linear infinite;
        }
        .half { position: relative; width: 50%; height: 100%; flex: none; }
        .half svg { position: absolute; bottom: 0; width: auto; }
        #ly1 { --b: 24%; --hh: 52%; --sp: 70s; opacity: .5; filter: blur(1.5px); }
        #ly2 { --b: 20%; --hh: 62%; --sp: 36s; opacity: .8; }
        #ly3 { --b: 13%; --hh: 80%; --sp: 14s; }
        @keyframes scr { to { transform: translateX(-50%); } }
        .ground {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 24%;
          background: linear-gradient(#1c0407,#050102);
        }
        .road {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 14%;
          background: #080809;
          border-top: 3px solid #3a0a0e;
          overflow: hidden;
        }
        .dash {
          position: absolute;
          top: 50%;
          left: 0;
          width: calc(100% + 180px);
          height: 5px;
          background: repeating-linear-gradient(90deg,#8b1218 0 80px,transparent 80px 180px);
          animation: ds .5s linear infinite;
        }
        .road::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: calc(100% + 900px);
          background: radial-gradient(ellipse 70px 11px at 120px 72%,#8b0d14,transparent),radial-gradient(ellipse 44px 7px at 430px 28%,#8b0d14,transparent),radial-gradient(ellipse 100px 13px at 720px 66%,#5c070c,transparent);
          background-size: 900px 100%;
          animation: bloodTrail 3.2s linear infinite;
        }
        @keyframes ds { to { transform: translateX(-180px); } }
        @keyframes bloodTrail { to { transform: translateX(-900px); } }
        .car {
          position: absolute;
          bottom: 3.5%;
          left: 50%;
          width: min(72vw,330px);
          transform: translateX(-300%);
          transition: transform 1.6s ease-out;
          z-index: 3;
        }
        #splash.p2 .car { transform: translateX(-50%); }
        .bob { animation: bob .5s ease-in-out infinite alternate; }
        @keyframes bob { to { transform: translateY(-2px); } }
        .wh { animation: rot .45s linear infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes rot { to { transform: rotate(360deg); } }
        .scene::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 4;
          background: radial-gradient(circle at 50% 62%,transparent 50%,rgba(90,0,10,.38) 100%);
          animation: throb 3s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes throb { 50% { opacity: .55; } }
        .cap {
          position: absolute;
          top: 12%;
          left: 0;
          right: 0;
          text-align: center;
          color: #ff7b7b;
          letter-spacing: .3em;
          font-size: .74rem;
          margin: 0;
          font-family: ui-monospace, 'SF Mono', monospace;
          text-transform: uppercase;
        }
        #splash.p3 .cap { opacity: 0; transition: opacity .5s; }
        .stage {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
        }
        .bigleaf {
          position: absolute;
          left: 50%;
          top: 50%;
          height: var(--lh);
          aspect-ratio: 3/4;
          transform: translate(-50%,-50%) rotate(-18deg) scale(.86);
          opacity: 0;
          filter: blur(10px);
          transition: opacity 1s, transform 1.5s ease-out, filter 1.5s ease-out;
        }
        #splash.p4 .bigleaf {
          opacity: 1;
          transform: translate(-50%,-50%) rotate(-18deg) scale(1);
          filter: blur(2px) brightness(1.3) drop-shadow(0 24px 40px rgba(0,0,0,.6));
        }
        .rig {
          position: absolute;
          top: 50%;
          left: calc(100% + var(--ld));
          width: var(--ld);
          height: var(--ld);
          transform: translate(-50%,-50%) rotate(-8deg);
          filter: drop-shadow(0 14px 22px rgba(0,0,0,.5));
        }
        #splash.p3 .rig { left: 50%; transition: left 1.1s cubic-bezier(.2,.8,.2,1); }
        #splash.p4 .rig { transform: translate(-50%,-50%) rotate(0deg); transition: transform 1s ease; }
        .lens {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          border: 8px solid #f2eeee;
          background: radial-gradient(circle at 35% 30%,rgba(255,255,255,.2),rgba(195,30,49,.12) 60%,rgba(10,5,7,.4));
          box-shadow: inset 0 0 28px rgba(255,255,255,.10),0 0 0 2px rgba(0,0,0,.35);
        }
        .sheen {
          position: absolute;
          left: 12%;
          top: 8%;
          width: 38%;
          height: 20%;
          border-radius: 50%;
          background: linear-gradient(135deg,rgba(255,255,255,.5),transparent);
          transform: rotate(-30deg);
          filter: blur(2px);
          z-index: 2;
        }
        .hd {
          position: absolute;
          left: calc(50% + var(--ld)*.35);
          top: calc(50% + var(--ld)*.35);
          width: calc(var(--ld)*.52);
          height: calc(var(--ld)*.1);
          background: linear-gradient(#d8d3d4,#40383a);
          border-radius: 99px;
          transform-origin: 0 50%;
          transform: rotate(45deg);
          z-index: -1;
        }
        .lz {
          position: absolute;
          left: 50%;
          top: 50%;
          height: calc(var(--lh)*2.3);
          aspect-ratio: 3/4;
          transform: translate(-50%,-50%) rotate(-18deg);
          opacity: 0;
        }
        #splash.p4 .lz { animation: focus 1.6s .35s ease-out forwards; }
        @keyframes focus {
          0% { opacity: 0; filter: blur(16px); transform: translate(-50%,-50%) rotate(-18deg) scale(1.14); }
          35% { opacity: 1; }
          100% { opacity: 1; filter: blur(0); transform: translate(-50%,-50%) rotate(-18deg) scale(1); }
        }
        .bk {
          position: absolute;
          left: 50%;
          top: 50%;
          width: calc(var(--ld)*1.3);
          height: calc(var(--ld)*1.3);
          transform: translate(-50%,-50%) scale(1.45);
          opacity: 0;
          transition: opacity .8s .3s, transform 1s .3s;
        }
        #splash.p4 .bk { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        .bk i { position: absolute; width: 28px; height: 28px; border: 3px solid #e52b40; transition: border-color .5s; }
        .bk i:nth-child(1){top:0;left:0;border-right:0;border-bottom:0}.bk i:nth-child(2){top:0;right:0;border-left:0;border-bottom:0}.bk i:nth-child(3){bottom:0;left:0;border-right:0;border-top:0}.bk i:nth-child(4){bottom:0;right:0;border-left:0;border-top:0}
        #splash.p5 .bk i { border-color: #ffffff; }
        .flash {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 30vmin;
          height: 30vmin;
          border-radius: 50%;
          transform: translate(-50%,-50%) scale(0);
          opacity: 0;
          background: radial-gradient(circle,rgba(255,255,255,.98),rgba(234,35,57,.58) 42%,transparent 70%);
        }
        #splash.p5 .flash { animation: fl 1.2s ease-in forwards; }
        @keyframes fl { 0%{transform:translate(-50%,-50%) scale(0);opacity:0} 35%{opacity:1} 100%{transform:translate(-50%,-50%) scale(10);opacity:1} }
        .stage::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, #3a0d14 0, #10090b 62%, #030304 100%);
          opacity: 0;
          transition: opacity 1s;
        }
        #splash.p4 .stage::before { opacity: .95; }
        .cap2 {
          position: absolute;
          bottom: calc(8% + env(safe-area-inset-bottom,0px));
          left: 0;
          right: 0;
          text-align: center;
          color: #f4f1f1;
          letter-spacing: .28em;
          font-size: .74rem;
          margin: 0;
          padding: 0 12px;
          opacity: 0;
          text-transform: uppercase;
        }
        #splash.p3 .cap2 { opacity: 1; transition: opacity .5s ease; }
        @media (max-width:700px){.cap,.cap2{letter-spacing:.18em;font-size:.62rem}.car{width:min(72vw,240px)}}
        @media (prefers-reduced-motion: reduce) {
          #splash { display: none; }
          .drips i, .road::after, .scene::after { animation: none; }
        }
      `}</style>
    </div>
  );
};
