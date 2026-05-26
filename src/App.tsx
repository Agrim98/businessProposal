// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  bg: "#F4F1EC",
  surface: "#FFFFFF",
  surfaceAlt: "#F0EDE8",
  border: "#E2DDD6",
  text: "#1A1612",
  textSub: "#5C5449",
  textMuted: "#9A9088",
  gold: "#B8860B",
  goldLight: "#FDF3DC",
  goldBorder: "#E8C96A",
};

const orbitTools = [
  { id: "higgsfield", name: "higgsfield-ai", label: "VIDEO · CINEMATIC", icon: "🎬", color: "#D97706", url: "https://higgsfield.ai", angle: 0 },
  { id: "elevenlabs", name: "elevenlabs", label: "VOICE · 29 LANGS", icon: "🎙️", color: "#2563EB", url: "https://elevenlabs.io", angle: 51 },
  { id: "falai", name: "fal.ai", label: "PIPELINE · GPU", icon: "⚡", color: "#7C3AED", url: "https://fal.ai", angle: 102 },
  { id: "creatomate", name: "creatomate", label: "VIDEO · AUTOMATION", icon: "🎨", color: "#059669", url: "https://creatomate.com", angle: 153 },
  { id: "runway", name: "runway-ml", label: "VIDEO · PRO EDIT", icon: "🚀", color: "#DC2626", url: "https://runwayml.com", angle: 204 },
  { id: "suno", name: "suno-ai", label: "MUSIC · AI GEN", icon: "🎵", color: "#0891B2", url: "https://suno.com", angle: 255 },
  { id: "kieai", name: "kie.ai", label: "UNIFIED · HUB", icon: "🌐", color: "#B8860B", url: "https://kie.ai", angle: 306 },
];

const tools = [
  {
    id: "higgsfield", name: "Higgsfield AI", icon: "🎬", url: "https://higgsfield.ai",
    tagline: "Cinematic multi-model video studio",
    description: "15+ AI video models (Veo 3.1, Sora 2, Kling 3.0, WAN 2.6) under one subscription with 70+ cinematic camera presets.",
    hospitality: ["Drone-style property flyovers", "Cinematic room reveals", "Pool & spa ambiance reels", "Seasonal campaign hero videos"],
    usd: { Free: "Free tier", Starter: "$15/mo", Plus: "$39/mo", Ultra: "$99/mo" },
    inr: { Free: "Free tier", Starter: "₹1,250/mo", Plus: "₹3,250/mo", Ultra: "₹8,250/mo" },
    note: "Billed annually. Credit-based — Veo 3.1 costs 40–70 credits/video.",
    accent: "#D97706", accentBg: "#FEF3C7", accentBorder: "#FCD34D", tag: "VIDEO GEN"
  },
  {
    id: "elevenlabs", name: "ElevenLabs", icon: "🎙️", url: "https://elevenlabs.io",
    tagline: "Hyper-realistic AI voiceovers in 29+ languages",
    description: "Emotionally resonant text-to-speech, voice cloning, and AI dubbing. The gold standard for hospitality narration.",
    hospitality: ["Property tour narration", "Multilingual ad voiceovers", "AI concierge voice", "Brand ambassador voice clone"],
    usd: { Free: "Free (10 min/mo)", Starter: "$5/mo", Creator: "$11/mo", Pro: "$99/mo" },
    inr: { Free: "Free", Starter: "₹420/mo", Creator: "₹920/mo", Pro: "₹8,300/mo" },
    note: "India billing in USD + 18% GST if business entity. Annual saves ~17%.",
    accent: "#2563EB", accentBg: "#EFF6FF", accentBorder: "#93C5FD", tag: "VOICE AI", kieSupport: true
  },
  {
    id: "falai", name: "fal.ai", icon: "⚡", url: "https://fal.ai",
    tagline: "Lightning-fast AI inference & pipeline glue",
    description: "Pay-per-use GPU inference. The backbone of your pipeline — stitches clips, merges audio, runs 1000+ models.",
    hospitality: ["Multi-clip video assembly", "Audio-visual sync", "Batch property ad rendering", "LoRA fine-tuning on brand assets"],
    usd: { Free: "$0 (starter credits)", "Per Image": "$0.03", "Per Video": "$0.05/sec", "Veo 3": "$0.40/sec" },
    inr: { Free: "Free credits", "Per Image": "₹2.5", "Per Video": "₹4.2/sec", "Veo 3": "₹33/sec" },
    note: "Pure pay-per-use. H100 GPU: $1.89/hr. No lock-in.",
    accent: "#7C3AED", accentBg: "#F5F3FF", accentBorder: "#C4B5FD", tag: "PIPELINE"
  },
  {
    id: "creatomate", name: "Creatomate", icon: "🎨", url: "https://creatomate.com",
    tagline: "Template-driven video automation at scale",
    description: "Automate video creation from templates. Feed it property data and branding, it outputs polished ads for every platform.",
    hospitality: ["Branded room highlight reels", "Price & offer overlays", "Multi-platform ad resizing", "Dynamic seasonal promotions"],
    usd: { Essential: "$41/mo", Growth: "$99/mo", Beyond: "$249/mo" },
    inr: { Essential: "₹3,420/mo", Growth: "₹8,260/mo", Beyond: "₹20,760/mo" },
    note: "Free 50-credit trial. Annual = 2 months free.",
    accent: "#059669", accentBg: "#ECFDF5", accentBorder: "#6EE7B7", tag: "AUTOMATION"
  },
  {
    id: "runway", name: "Runway ML", icon: "🚀", url: "https://runwayml.com",
    tagline: "Professional AI video editing suite",
    description: "Gen-4 & Gen-4.5 models with advanced editing, Act Two performance capture, and AI upscaling.",
    hospitality: ["Cinematic color grading", "AI background replacement", "Long-form brand films", "Performance & emotion capture"],
    usd: { Free: "Free (125 credits)", Standard: "$12/mo", Pro: "$28/mo", Unlimited: "$76/mo" },
    inr: { Free: "Free", Standard: "₹1,000/mo", Pro: "₹2,335/mo", Unlimited: "₹6,340/mo" },
    note: "Billed annually. 625 credits on Standard ≈ 10 videos/month.",
    accent: "#DC2626", accentBg: "#FEF2F2", accentBorder: "#FCA5A5", tag: "PRO EDIT"
  },
  {
    id: "suno", name: "Suno AI", icon: "🎵", url: "https://suno.com",
    tagline: "Full vocal & instrumental tracks from text",
    description: "Turn a prompt into a complete branded soundtrack — lobby ambiance, ad tracks, emotional brand film scores.",
    hospitality: ["Lobby ambiance tracks", "Ad background music", "Branded jingle creation", "Seasonal mood playlists"],
    usd: { Free: "Free (50 credits/day)", Pro: "$10/mo", Premier: "$30/mo" },
    inr: { Free: "Free", Pro: "₹835/mo", Premier: "₹2,500/mo" },
    note: "Commercial rights on paid plans. Annual = $8/mo (Pro). Also via kie.ai.",
    accent: "#0891B2", accentBg: "#ECFEFF", accentBorder: "#67E8F9", tag: "MUSIC AI", kieSupport: true
  },
  {
    id: "kieai", name: "kie.ai", icon: "🌐", url: "https://kie.ai",
    tagline: "One API for all AI video, audio & image models",
    description: "Unified gateway to Veo 3.1, Sora 2, Kling 3.0, Wan 2.5, Seedance, ElevenLabs, Suno, and 20+ models at 30–70% lower cost.",
    hospitality: ["Single API for entire video stack", "Veo 3.1 at 70% lower cost", "Suno music + ElevenLabs voice", "Scale without juggling SDKs"],
    usd: { Credits: "$0.005/credit", "Veo 3 Fast 8s": "$0.40", "Veo 3 Full 8s": "~$1.50", Music: "Via Suno API" },
    inr: { Credits: "₹0.42/credit", "Veo 3 Fast 8s": "₹33", "Veo 3 Full 8s": "~₹125", Music: "Via Suno API" },
    note: "Pay-as-you-go credits. 30–70% cheaper than direct model APIs.",
    accent: "#B8860B", accentBg: "#FDF3DC", accentBorder: "#E8C96A", tag: "UNIFIED HUB"
  }
];

const pipeline = [
  { step: "01", label: "Script & Concept", tool: "Claude / GPT", desc: "AI writes property ad scripts, scene descriptions, voiceover copy" },
  { step: "02", label: "Image Enhancement", tool: "Gemini Flash / fal.ai", desc: "Property photos enhanced to cinematic stills" },
  { step: "03", label: "Video Generation", tool: "kie.ai → Veo 3.1 / Kling", desc: "Stills converted to cinematic clips with camera motion" },
  { step: "04", label: "Voiceover", tool: "ElevenLabs", desc: "AI narrator in brand voice, any language or accent" },
  { step: "05", label: "Music", tool: "Suno AI", desc: "Custom branded soundtrack or ambient score generated" },
  { step: "06", label: "Stitching", tool: "fal.ai", desc: "Clips + audio + voiceover merged into final video" },
  { step: "07", label: "Brand Overlay", tool: "Creatomate", desc: "Logo, offers, CTA, platform sizing automated" },
  { step: "08", label: "Publish", tool: "n8n / Zapier", desc: "Auto-publish to Instagram, YouTube, OTAs on schedule" }
];

// ---------- TOPOLOGY MAP COMPONENT ----------
function TopologyMap({ onEnter }) {
  const [hovered, setHovered] = useState(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => p + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const cx = 300, cy = 300;
  const r1 = 105, r2 = 200;

  const nodePos = (angle, radius) => {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "monospace" }}>

      {/* top labels */}
      <div style={{ width: "100%", maxWidth: 640, marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E", display: "inline-block", flexShrink: 0 }} />
          {["MULTIMODAL", "IMAGE", "VIDEO", "VOICE", "AUDIO", "MUSIC"].map(t => (
            <span key={t} style={{ fontSize: 12, letterSpacing: 4, color: C.textSub }}>{t} ·</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ width: 18, height: 2, background: "#D97706", display: "inline-block", flexShrink: 0 }} />
          {["OPTIMIZED FOR SPEED", "QUALITY", "COST"].map(t => (
            <span key={t} style={{ fontSize: 12, letterSpacing: 4, color: C.textSub }}>{t} ·</span>
          ))}
        </div>
      </div>

      {/* map container */}
      <div style={{ position: "relative", width: "100%", maxWidth: 640 }}>
        {/* corner brackets */}
        {[["0,0", "top:0;left:0", "border-top:1px solid;border-left:1px solid"],
          ["0,0", "top:0;right:0", "border-top:1px solid;border-right:1px solid"],
          ["0,0", "bottom:0;left:0", "border-bottom:1px solid;border-left:1px solid"],
          ["0,0", "bottom:0;right:0", "border-bottom:1px solid;border-right:1px solid"]
        ].map((_, i) => {
          const positions = [{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }];
          const borders = [
            { borderTop: `1px solid ${C.borderStrong || "#C8C0B4"}`, borderLeft: `1px solid ${C.borderStrong || "#C8C0B4"}` },
            { borderTop: `1px solid ${C.borderStrong || "#C8C0B4"}`, borderRight: `1px solid ${C.borderStrong || "#C8C0B4"}` },
            { borderBottom: `1px solid ${C.borderStrong || "#C8C0B4"}`, borderLeft: `1px solid ${C.borderStrong || "#C8C0B4"}` },
            { borderBottom: `1px solid ${C.borderStrong || "#C8C0B4"}`, borderRight: `1px solid ${C.borderStrong || "#C8C0B4"}` },
          ];
          return <div key={i} style={{ position: "absolute", width: 20, height: 20, ...positions[i], ...borders[i] }} />;
        })}

        <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, padding: "8px 14px 0" }}>TOPOLOGY.MAP</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.textMuted, padding: "8px 14px 0", position: "absolute", top: 0, right: 0 }}>N=7 / 20+ MODELS</div>

        {/* SVG map */}
        <svg viewBox="0 0 600 620" style={{ width: "100%", overflow: "visible" }}>
          {/* outer orbit ring */}
          <circle cx={cx} cy={cy} r={r2} fill="none" stroke="#D4A85330" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx={cx} cy={cy} r={r2 + 20} fill="none" stroke="#D4A85315" strokeWidth="1" />
          {/* inner ring */}
          <circle cx={cx} cy={cy} r={r1} fill="none" stroke="#D4A85325" strokeWidth="1" strokeDasharray="2 4" />

          {/* spoke lines from center to each node */}
          {orbitTools.map(tool => {
            const pos = nodePos(tool.angle, r2);
            return (
              <line key={tool.id}
                x1={cx} y1={cy} x2={pos.x} y2={pos.y}
                stroke={hovered === tool.id ? tool.color : "#D4A85320"}
                strokeWidth={hovered === tool.id ? 1.5 : 1}
                strokeDasharray="3 5"
                style={{ transition: "all 0.3s" }}
              />
            );
          })}

          {/* center hub */}
          <circle cx={cx} cy={cy} r={62} fill={C.surface} stroke="#E8C96A" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r={54} fill="none" stroke="#E8C96A30" strokeWidth="1" strokeDasharray="3 4" />
          <text x={cx} y={cy - 10} textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill={C.gold} letterSpacing="2">KIE.AI</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={C.textMuted} letterSpacing="3">UNIFIED API</text>
          <circle cx={cx - 16} cy={cy + 22} r={4} fill="#22C55E" />
          <text x={cx - 8} y={cy + 26} fontSize="8" fontFamily="monospace" fill={C.textSub} letterSpacing="2">ONLINE</text>

          {/* orbit nodes */}
          {orbitTools.map(tool => {
            const pos = nodePos(tool.angle, r2);
            const isHov = hovered === tool.id;
            const labelAbove = pos.y < cy;
            const labelRight = pos.x > cx + 30;
            const labelLeft = pos.x < cx - 30;

            return (
              <g key={tool.id}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(tool.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => window.open(tool.url, "_blank")}
              >
                {/* node circle */}
                <circle cx={pos.x} cy={pos.y} r={isHov ? 30 : 26}
                  fill={isHov ? tool.color : C.surface}
                  stroke={tool.color}
                  strokeWidth={isHov ? 2 : 1.5}
                  style={{ transition: "all 0.25s", filter: isHov ? `drop-shadow(0 2px 8px ${tool.color}60)` : "none" }}
                />
                {/* dot accent */}
                <circle cx={pos.x} cy={pos.y - 14} r={3} fill={tool.color} opacity={0.7} />
                {/* icon text */}
                <text x={pos.x} y={pos.y + 6} textAnchor="middle" fontSize="18" style={{ userSelect: "none" }}>{tool.icon}</text>

                {/* label */}
                <text
                  x={pos.x + (labelLeft ? -38 : labelRight ? 38 : 0)}
                  y={labelAbove ? pos.y - 36 : pos.y + 44}
                  textAnchor={labelLeft ? "end" : labelRight ? "start" : "middle"}
                  fontSize="10" fontFamily="monospace" fontWeight="700"
                  fill={isHov ? tool.color : C.text}
                  style={{ transition: "fill 0.2s" }}
                >{tool.name}</text>
                <text
                  x={pos.x + (labelLeft ? -38 : labelRight ? 38 : 0)}
                  y={labelAbove ? pos.y - 22 : pos.y + 57}
                  textAnchor={labelLeft ? "end" : labelRight ? "start" : "middle"}
                  fontSize="8" fontFamily="monospace"
                  fill={C.textMuted}
                  letterSpacing="1"
                >{tool.label}</text>

                {/* hover tooltip: "↗ visit" */}
                {isHov && (
                  <text x={pos.x} y={pos.y + 22} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#fff" letterSpacing="1">↗ VISIT</text>
                )}
              </g>
            );
          })}

          {/* tick marks on outer ring */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 15 - 90) * Math.PI / 180;
            const inner = r2 + 24, outer = r2 + 30;
            return (
              <line key={i}
                x1={cx + inner * Math.cos(a)} y1={cy + inner * Math.sin(a)}
                x2={cx + outer * Math.cos(a)} y2={cy + outer * Math.sin(a)}
                stroke="#D4A85330" strokeWidth="1"
              />
            );
          })}
        </svg>

        {/* bottom labels */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 14px 12px", fontSize: 10, letterSpacing: 3, color: C.textMuted }}>
          <span>UNIFIED</span>
          <span>→ ACTIVE</span>
        </div>
      </div>

      {/* headline + CTA */}
      <div style={{ maxWidth: 580, textAlign: "center", marginTop: 36 }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: C.gold, marginBottom: 12 }}>DIGITAL MARKETING AGENCY · HOSPITALITY VERTICAL</div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 400, margin: "0 0 14px", color: C.text, lineHeight: 1.2, letterSpacing: -0.5, fontFamily: "Georgia, serif" }}>
          The AI Stack Powering<br /><em style={{ color: C.gold }}>Next-Gen Hospitality Ads</em>
        </h1>
        <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.75, margin: "0 0 28px", fontFamily: "sans-serif" }}>
          Seven specialized AI tools. One cinematic pipeline. From raw property photos to platform-ready video ads — in hours, not weeks.
        </p>
        <button onClick={onEnter} style={{
          padding: "14px 36px", background: C.text, color: "#F7F5F2",
          border: "none", borderRadius: 3, cursor: "pointer",
          fontSize: 12, letterSpacing: 4, fontFamily: "monospace", fontWeight: 700,
          transition: "all 0.2s"
        }}>
          EXPLORE THE FULL PROPOSAL →
        </button>
        <div style={{ marginTop: 14, fontSize: 11, color: C.textMuted, fontFamily: "monospace", letterSpacing: 2 }}>
          CLICK ANY NODE ABOVE TO VISIT THE TOOL
        </div>
      </div>
    </div>
  );
}

// ---------- MAIN PROPOSAL ----------
function Proposal() {
  const [activeTab, setActiveTab] = useState("tools");
  const [selectedTool, setSelectedTool] = useState(null);
  const [region, setRegion] = useState("usd");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Georgia', serif" }}>
      {/* HEADER */}
      <div style={{ background: C.text, color: "#F7F5F2", padding: "40px 32px 36px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: "#E8C96A", fontFamily: "monospace", marginBottom: 12 }}>
            DIGITAL MARKETING AGENCY · CLIENT PROPOSAL · HOSPITALITY VERTICAL
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 44px)", fontWeight: 400, margin: "0 0 12px", lineHeight: 1.2 }}>
            The AI Stack Powering <span style={{ color: "#E8C96A" }}>Next-Gen Hospitality Ads</span>
          </h1>
          <p style={{ fontSize: 14, color: "#B0A898", maxWidth: 520, lineHeight: 1.75, margin: "0 0 28px", fontFamily: "sans-serif" }}>
            Seven specialized AI tools. One cinematic pipeline. From raw property photos to platform-ready video ads — in hours, not weeks.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[["tools", "AI Tools"], ["pipeline", "The Pipeline"], ["roi", "ROI Case"]].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                padding: "9px 22px",
                background: activeTab === id ? "#E8C96A" : "transparent",
                color: activeTab === id ? "#1A1612" : "#B0A898",
                border: activeTab === id ? "none" : "1px solid #3A3530",
                borderRadius: 3, cursor: "pointer",
                fontSize: 12, letterSpacing: 3, textTransform: "uppercase",
                fontFamily: "monospace", fontWeight: 700, transition: "all 0.2s"
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px" }}>

        {/* ===== TOOLS ===== */}
        {activeTab === "tools" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, letterSpacing: 3, color: C.textMuted, fontFamily: "monospace" }}>PRICING REGION:</span>
              <div style={{ display: "flex", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, overflow: "hidden" }}>
                {["usd", "inr"].map(r => (
                  <button key={r} onClick={() => setRegion(r)} style={{
                    padding: "7px 18px", background: region === r ? C.text : "transparent",
                    color: region === r ? "#F7F5F2" : C.textSub,
                    border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "monospace", letterSpacing: 2
                  }}>{r === "usd" ? "🇺🇸 USD" : "🇮🇳 INR"}</button>
                ))}
              </div>
              <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif" }}>INR ≈ USD × 83.5 · +18% GST for Indian businesses</span>
            </div>

            {/* KIE.AI BANNER */}
            <div style={{ background: "#1A1612", borderRadius: 10, padding: "26px 28px", marginBottom: 28, border: `2px solid #E8C96A50` }}>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: "inline-block", fontSize: 10, letterSpacing: 4, color: "#E8C96A", background: "#E8C96A15", border: "1px solid #E8C96A30", padding: "3px 12px", borderRadius: 3, fontFamily: "monospace", marginBottom: 12 }}>★ UNIFIED HUB</div>
                  <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 400, color: "#F7F5F2" }}>🌐 kie.ai — One API for Everything</h2>
                  <p style={{ margin: "0 0 16px", color: "#B0A898", lineHeight: 1.75, fontFamily: "sans-serif", fontSize: 13 }}>
                    Instead of managing 7 separate platforms, kie.ai gives you <strong style={{ color: "#E8C96A" }}>one API</strong> to access Veo 3.1, Sora 2, Kling 3.0, ElevenLabs, Suno, and 20+ models at <strong style={{ color: "#E8C96A" }}>30–70% lower cost</strong>.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {[["Video", "Veo 3.1, Sora 2, Kling, Wan"], ["Audio", "ElevenLabs, Suno V5.5"], ["Images", "GPT Image 2, Nano Banana"]].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: 9, letterSpacing: 3, color: "#E8C96A", fontFamily: "monospace", marginBottom: 3 }}>{k}</div>
                        <div style={{ fontSize: 12, color: "#D0C8BC", fontFamily: "sans-serif" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#F7F5F210", border: "1px solid #E8C96A25", borderRadius: 8, padding: "18px 22px", textAlign: "center" }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#B0A898", fontFamily: "monospace", marginBottom: 6 }}>CREDIT PRICE</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "#E8C96A", fontFamily: "monospace" }}>{region === "usd" ? "$0.005" : "₹0.42"}</div>
                  <div style={{ fontSize: 11, color: "#B0A898", fontFamily: "sans-serif", marginBottom: 12 }}>per credit</div>
                  <div style={{ fontSize: 12, color: "#D0C8BC", fontFamily: "sans-serif", lineHeight: 1.9 }}>
                    Veo 3 Fast 8s: <strong style={{ color: "#E8C96A" }}>{region === "usd" ? "$0.40" : "₹33"}</strong><br />
                    Veo 3 Full 8s: <strong style={{ color: "#E8C96A" }}>{region === "usd" ? "~$1.50" : "~₹125"}</strong>
                  </div>
                  <a href="https://kie.ai" target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 14, fontSize: 10, letterSpacing: 3, color: "#E8C96A", fontFamily: "monospace", textDecoration: "none", border: "1px solid #E8C96A40", padding: "5px 12px", borderRadius: 3 }}>↗ KIE.AI</a>
                </div>
              </div>
            </div>

            {/* TOOL CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
              {tools.filter(t => t.id !== "kieai").map(tool => (
                <div key={tool.id} style={{
                  background: C.surface, border: selectedTool === tool.id ? `2px solid ${tool.accent}` : `1px solid ${C.border}`,
                  borderRadius: 10, padding: "22px", cursor: "pointer",
                  transition: "all 0.2s", boxShadow: selectedTool === tool.id ? `0 4px 18px ${tool.accent}18` : "0 1px 4px #1A161206"
                }}
                  onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 10, letterSpacing: 3, color: tool.accent, background: tool.accentBg, border: `1px solid ${tool.accentBorder}`, padding: "3px 10px", borderRadius: 3, fontFamily: "monospace" }}>{tool.tag}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      {tool.kieSupport && <span style={{ fontSize: 9, letterSpacing: 2, color: "#7C3AED", background: "#F5F3FF", border: "1px solid #C4B5FD", padding: "3px 8px", borderRadius: 3, fontFamily: "monospace" }}>VIA KIE.AI</span>}
                      <a href={tool.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 10, letterSpacing: 2, color: tool.accent, background: tool.accentBg, border: `1px solid ${tool.accentBorder}`, padding: "3px 8px", borderRadius: 3, fontFamily: "monospace", textDecoration: "none" }}>↗ VISIT</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 28 }}>{tool.icon}</span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{tool.name}</div>
                      <div style={{ fontSize: 12, color: tool.accent, fontFamily: "sans-serif", marginTop: 2 }}>{tool.tagline}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7, margin: "0 0 14px", fontFamily: "sans-serif" }}>{tool.description}</p>
                  <div style={{ background: C.surfaceAlt, borderRadius: 8, padding: "12px", marginBottom: 10, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 9, letterSpacing: 3, color: C.textMuted, fontFamily: "monospace", marginBottom: 8 }}>{region === "usd" ? "🇺🇸 USD PRICING" : "🇮🇳 INR PRICING"}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {Object.entries(region === "usd" ? tool.usd : tool.inr).map(([tier, price]) => (
                        <div key={tier} style={{ background: C.surface, border: `1px solid ${tool.accentBorder}`, borderRadius: 5, padding: "5px 10px" }}>
                          <div style={{ fontSize: 8, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase", fontFamily: "monospace" }}>{tier}</div>
                          <div style={{ fontSize: 12, color: tool.accent, fontWeight: 700, fontFamily: "monospace" }}>{price}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 10, color: C.textMuted, marginTop: 8, fontFamily: "sans-serif", fontStyle: "italic" }}>{tool.note}</div>
                  </div>
                  {selectedTool === tool.id && (
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                      <div style={{ fontSize: 9, letterSpacing: 3, color: tool.accent, fontFamily: "monospace", marginBottom: 8 }}>HOSPITALITY USE CASES</div>
                      {tool.hospitality.map((uc, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 13, color: C.text, fontFamily: "sans-serif" }}>
                          <span style={{ color: tool.accent, fontWeight: 700 }}>›</span>{uc}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 10, color: selectedTool === tool.id ? tool.accent : C.textMuted, fontFamily: "monospace", textAlign: "right", marginTop: 6 }}>
                    {selectedTool === tool.id ? "▲ COLLAPSE" : "▼ VIEW USE CASES"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== PIPELINE ===== */}
        {activeTab === "pipeline" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: 5, color: C.gold, fontFamily: "monospace", marginBottom: 10 }}>THE PRODUCTION WORKFLOW</div>
              <h2 style={{ fontSize: 30, fontWeight: 400, margin: "0 0 10px" }}>From Brief to Broadcast</h2>
              <p style={{ color: C.textSub, fontSize: 14, lineHeight: 1.75, maxWidth: 520, fontFamily: "sans-serif" }}>
                A single hospitality video ad flows through this automated pipeline in under 4 hours. Traditional agencies take 2–6 weeks.
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 27, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${C.gold} 0%, ${C.border} 100%)` }} />
              {pipeline.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 24, marginBottom: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 54, height: 54, flexShrink: 0, background: C.surface, border: `2px solid ${C.gold}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "monospace", color: C.gold, fontWeight: 700, zIndex: 1 }}>{step.step}</div>
                  <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", marginTop: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 3 }}>{step.label}</div>
                        <div style={{ fontSize: 13, color: C.textSub, fontFamily: "sans-serif", lineHeight: 1.6 }}>{step.desc}</div>
                      </div>
                      <div style={{ background: C.goldLight, border: `1px solid ${C.goldBorder}`, borderRadius: 4, padding: "4px 12px", fontSize: 11, color: C.gold, fontFamily: "monospace", whiteSpace: "nowrap" }}>{step.tool}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "24px", marginTop: 12 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: C.gold, fontFamily: "monospace", marginBottom: 16 }}>ESTIMATED COST PER VIDEO AD</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {["usd", "inr"].map(r => (
                  <button key={r} onClick={() => setRegion(r)} style={{ padding: "6px 14px", background: region === r ? C.text : C.surfaceAlt, color: region === r ? "#F7F5F2" : C.textSub, border: `1px solid ${C.border}`, borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "monospace", letterSpacing: 2 }}>{r === "usd" ? "🇺🇸 USD" : "🇮🇳 INR"}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12 }}>
                {[
                  { label: "60-sec hotel reel", usd: "$4 – $12", inr: "₹335 – ₹1,000" },
                  { label: "15-sec social clip", usd: "$1 – $4", inr: "₹85 – ₹335" },
                  { label: "Voiceover per spot", usd: "$0.10 – $1", inr: "₹8 – ₹85" },
                  { label: "Background music", usd: "$0.25 – $0.50", inr: "₹21 – ₹42" },
                  { label: "Batch 10 variants", usd: "$15 – $40", inr: "₹1,250 – ₹3,340" },
                  { label: "Monthly campaign", usd: "$150 – $400", inr: "₹12,500 – ₹33,400" }
                ].map((item, i) => (
                  <div key={i} style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px" }}>
                    <div style={{ fontSize: 11, color: C.textSub, fontFamily: "sans-serif", marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 17, color: C.gold, fontFamily: "monospace", fontWeight: 700 }}>{region === "usd" ? item.usd : item.inr}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, fontSize: 11, color: C.textMuted, fontFamily: "sans-serif", fontStyle: "italic" }}>* Traditional production: $500–$5,000 per spot.</div>
            </div>
          </div>
        )}

        {/* ===== ROI ===== */}
        {activeTab === "roi" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: 5, color: C.gold, fontFamily: "monospace", marginBottom: 10 }}>THE BUSINESS CASE</div>
              <h2 style={{ fontSize: 30, fontWeight: 400, margin: "0 0 10px" }}>Why Hospitality Brands Win With AI Video</h2>
              <p style={{ color: C.textSub, fontSize: 14, lineHeight: 1.75, maxWidth: 560, fontFamily: "sans-serif" }}>Hotels, restaurants, and resorts are 100% visual businesses. Pay $5,000 per spot or $12.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { stat: "80%", label: "of travellers watch hotel videos before booking", source: "Google Travel" },
                { stat: "3×", label: "higher engagement on video vs static images", source: "Meta Ads Data" },
                { stat: "$12", label: "average AI cost vs $2,000+ traditional production", source: "Our Pipeline" },
                { stat: "4 hrs", label: "from brief to platform-ready ad with full AI stack", source: "SceneCraft" }
              ].map((item, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "22px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, color: C.gold, fontWeight: 700, fontFamily: "monospace", lineHeight: 1 }}>{item.stat}</div>
                  <div style={{ fontSize: 13, color: C.text, margin: "10px 0 6px", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.label}</div>
                  <div style={{ fontSize: 9, color: C.textMuted, fontFamily: "monospace", letterSpacing: 2 }}>{item.source}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 14, marginBottom: 32 }}>
              {[
                { type: "Hotels & Resorts", icon: "🏨", items: ["Cinematic room & suite reveals", "Pool, spa, lobby walkthroughs", "Seasonal offer ads", "Multilingual brand films"] },
                { type: "Restaurants & F&B", icon: "🍽️", items: ["Dish & cocktail reveal videos", "Chef story mini-docs", "Table setting ambiance reels", "Event promotions"] },
                { type: "Spas & Wellness", icon: "🧖", items: ["Treatment room reels", "Skincare product spotlights", "Wellness journey narratives", "Calm ambiance ads"] },
                { type: "Events & MICE", icon: "🎪", items: ["Venue showcase videos", "Wedding package highlights", "Corporate sizzle reels", "Before-after clips"] }
              ].map((item, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px" }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.gold, marginBottom: 12 }}>{item.type}</div>
                  {item.items.map((d, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 12, color: C.textSub, fontFamily: "sans-serif" }}>
                      <span style={{ color: C.gold, flexShrink: 0 }}>—</span>{d}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ background: C.text, color: "#F7F5F2", borderRadius: 10, padding: "28px" }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: "#E8C96A", fontFamily: "monospace", marginBottom: 16 }}>SUGGESTED AGENCY RETAINER MODEL</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["usd", "inr"].map(r => (
                  <button key={r} onClick={() => setRegion(r)} style={{ padding: "6px 14px", background: region === r ? "#E8C96A" : "transparent", color: region === r ? "#1A1612" : "#B0A898", border: "1px solid #3A3530", borderRadius: 3, cursor: "pointer", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, fontWeight: 700 }}>{r === "usd" ? "🇺🇸 USD" : "🇮🇳 INR"}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
                {[
                  { tier: "Starter", color: "#B0A898", price_usd: "$800/mo", price_inr: "₹66,800/mo", ai_usd: "$50–$100/mo", ai_inr: "₹4,175–₹8,350/mo", includes: ["8 short video ads/mo", "2 platform variants each", "Voiceover included", "Brand music included"] },
                  { tier: "Growth", color: "#E8C96A", price_usd: "$2,200/mo", price_inr: "₹1,84,000/mo", ai_usd: "$200–$400/mo", ai_inr: "₹16,700–₹33,400/mo", includes: ["30 video ads/mo", "Multi-platform sizing", "Voice cloning", "Multilingual versions"] },
                  { tier: "Enterprise", color: "#F472B6", price_usd: "$6,000/mo", price_inr: "₹5,00,000/mo", ai_usd: "$500–$1,200/mo", ai_inr: "₹41,750–₹1,00,200/mo", includes: ["Unlimited variants", "Custom AI fine-tuning", "Brand voice clone", "Full pipeline ownership"] }
                ].map((t, i) => (
                  <div key={i} style={{ background: "#2A2520", border: `1px solid ${t.color}40`, borderRadius: 8, padding: "20px" }}>
                    <div style={{ fontSize: 9, letterSpacing: 4, color: t.color, fontFamily: "monospace", marginBottom: 8 }}>{t.tier.toUpperCase()}</div>
                    <div style={{ fontSize: 28, color: t.color, fontFamily: "monospace", fontWeight: 700 }}>{region === "usd" ? t.price_usd : t.price_inr}</div>
                    <div style={{ fontSize: 11, color: "#8A8078", fontFamily: "sans-serif", marginBottom: 14, marginTop: 3 }}>AI costs: {region === "usd" ? t.ai_usd : t.ai_inr}</div>
                    {t.includes.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 12, color: "#D0C8BC", fontFamily: "sans-serif" }}>
                        <span style={{ color: t.color }}>✓</span>{item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "16px 18px", background: "#E8C96A10", border: "1px solid #E8C96A25", borderRadius: 8, fontSize: 13, color: "#D0C8BC", fontFamily: "sans-serif", lineHeight: 1.75 }}>
                <strong style={{ color: "#E8C96A" }}>The margin math:</strong> AI tools cost $50–$1,200/mo at scale. You charge $800–$6,000/mo. Traditional agencies spend $2,000–$10,000 per video in production. We spend $4–$15. That's your competitive moat.
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderTop: `1px solid ${C.border}`, padding: "18px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 10, color: C.textMuted, fontFamily: "monospace", letterSpacing: 2 }}>AI STACK · HOSPITALITY VERTICAL · 2026</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {tools.map(t => (
              <a key={t.id} href={t.url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: C.textMuted, fontFamily: "monospace", textDecoration: "none" }}>{t.name}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- ROOT ----------
export default function App() {
  const [page, setPage] = useState("map");
  return page === "map" ? <TopologyMap onEnter={() => setPage("proposal")} /> : <Proposal />;
}
