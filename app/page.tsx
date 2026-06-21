import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Track the ISS in Real-Time
        </h1>
        <p className="text-lg text-gray-300">
          Monitor the International Space Station&apos;s journey across the globe.
          Access live telemetry, velocity, and altitude data updated every 10 seconds.
        </p>

        <div className="pt-8 flex justify-center items-center">
          <style>{`
            .orbit-btn {
              position: relative;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 208px;
              height: 56px;
              border-radius: 9999px;
              background: rgba(8, 12, 24, 0.65);
              border: 1px solid rgba(34, 211, 238, 0.35);
              backdrop-filter: blur(6px);
              color: rgb(204, 251, 241);
              font-family: ui-monospace, SFMono-Regular, 'SF Mono', monospace;
              font-size: 14px;
              font-weight: 500;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              text-decoration: none;
              cursor: pointer;
              overflow: visible;
              box-shadow: 0 0 20px rgba(34, 211, 238, 0.12);
              transition: width 600ms cubic-bezier(0.65, 0, 0.35, 1) 120ms,
                          border-color 500ms ease,
                          box-shadow 500ms ease,
                          background 500ms ease;
            }

            .orbit-btn:hover,
            .orbit-btn:focus-visible {
              width: 56px;
              border-color: rgba(94, 234, 212, 0.7);
              background: rgba(20, 184, 166, 0.08);
              box-shadow: 0 0 36px rgba(34, 211, 238, 0.3);
            }

            .orbit-btn:focus-visible {
              outline: 2px solid rgb(94, 234, 212);
              outline-offset: 3px;
            }

            .orbit-label {
              position: absolute;
              white-space: nowrap;
              transition: opacity 220ms ease, transform 220ms ease;
            }

            .orbit-btn:hover .orbit-label,
            .orbit-btn:focus-visible .orbit-label {
              opacity: 0;
              transform: scale(0.7);
              transition: opacity 220ms ease 500ms, transform 220ms ease 500ms;
            }

            .orbit-ring {
              position: absolute;
              width: 140px;
              height: 140px;
              border-radius: 50%;
              border: 1px dashed rgba(34, 211, 238, 0.25);
              opacity: 0;
              transform: scale(0.6);
              transition: opacity 400ms ease 380ms, transform 400ms ease 380ms;
              pointer-events: none;
            }

            .orbit-btn:hover .orbit-ring,
            .orbit-btn:focus-visible .orbit-ring {
              opacity: 1;
              transform: scale(1);
            }

            .satellite-orbit {
              position: absolute;
              width: 140px;
              height: 140px;
              opacity: 0;
              transition: opacity 200ms ease 450ms;
              pointer-events: none;
            }

            .orbit-btn:hover .satellite-orbit,
            .orbit-btn:focus-visible .satellite-orbit {
              opacity: 1;
              animation: orbit-spin 3.2s linear infinite;
            }

            .satellite {
              position: absolute;
              top: 0;
              left: 50%;
              display: flex;
              align-items: center;
              gap: 3px;
              transform: translate(-50%, -50%);
            }

            .panel {
              width: 7px;
              height: 2px;
              background: rgb(165, 243, 252);
            }

            .sat-body {
              width: 6px;
              height: 6px;
              border-radius: 1px;
              background: rgb(224, 250, 252);
              box-shadow: 0 0 8px rgba(94, 234, 212, 0.9);
            }

            .earth-wrap {
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 56px;
              height: 56px;
              opacity: 0;
              transform: scale(0.4) rotate(-8deg);
              transition: opacity 320ms ease 280ms, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1) 280ms;
            }

            .orbit-btn:hover .earth-wrap,
            .orbit-btn:focus-visible .earth-wrap {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }

            .earth {
              position: relative;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: radial-gradient(circle at 30% 25%, #7dd3fc 0%, #2563eb 45%, #0c1f3d 100%);
              box-shadow: 0 0 14px rgba(125, 211, 252, 0.45), inset -4px -4px 8px rgba(0, 0, 0, 0.35);
              overflow: hidden;
              animation: spin-slow 9s linear infinite paused;
            }

            .orbit-btn:hover .earth,
            .orbit-btn:focus-visible .earth {
              animation-play-state: running;
            }

            .continent {
              position: absolute;
              background: rgba(74, 222, 128, 0.85);
            }

            .c1 {
              width: 18px;
              height: 13px;
              left: 16%;
              top: 24%;
              border-radius: 60% 40% 50% 50%;
              transform: rotate(10deg);
            }

            .c2 {
              width: 13px;
              height: 12px;
              right: 14%;
              bottom: 20%;
              border-radius: 40% 60% 40% 60%;
              transform: rotate(-15deg);
              background: rgba(52, 211, 153, 0.85);
            }

            .c3 {
              width: 12px;
              height: 10px;
              left: 42%;
              bottom: 12%;
              border-radius: 60% 40% 50% 40%;
              transform: rotate(45deg);
              background: rgba(34, 197, 94, 0.8);
            }

            .specular {
              position: absolute;
              inset: 0;
              border-radius: 50%;
              background: radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.55), transparent 38%);
            }

            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @keyframes orbit-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @media (prefers-reduced-motion: reduce) {
              .orbit-btn,
              .orbit-label,
              .orbit-ring,
              .satellite-orbit,
              .earth-wrap,
              .earth {
                animation: none !important;
                transition: none !important;
              }
            }
          `}</style>

          {/* Login Button */}
          <Link
            href="/dashboard"
            prefetch={false}
            /* We use the custom CSS class combined with Tailwinds */
            className="orbit-btn group w-[208px] h-[56px] rounded-full hover:w-[56px] duration-600 ease-[cubic-bezier(0.65,0,0.35,1)]"
          >
            <span className="text-teal-100 font-mono text-sm tracking-[0.18em] uppercase transition-all group-hover:opacity-0 group-hover:scale-75">
              Login
            </span>
            <span className="orbit-ring" />

            <span className="satellite-orbit">
              <span className="satellite">
                <span className="panel" />
                <span className="sat-body" />
                <span className="panel" />
              </span>
            </span>

            <span className="earth-wrap">
              <span className="earth">
                <span className="continent c1" />
                <span className="continent c2" />
                <span className="continent c3" />
                <span className="specular" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
