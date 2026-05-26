// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  bg: "#EDEAE4",
  surface: "#F4F1EB",
  surfaceCard: "#FFFFFF",
  border: "#D6D0C8",
  borderStrong: "#B8B0A4",
  text: "#1C1814",
  textSub: "#4A4440",
  textMuted: "#847870",
  gold: "#9A6F00",
  goldLight: "#F5EDD4",
  goldBorder: "#D4A843",
};

const orbitTools = [
  { id: "higgsfield", name: "higgsfield-ai", label: "VIDEO · CINEMATIC", icon: "🎬", color: "#C47A00", url: "https://higgsfield.ai", angle: 0 },
  { id: "elevenlabs", name: "elevenlabs", label: "VOICE · 29 LANGS", icon: "🎙️", color: "#1D4ED8", url: "https://elevenlabs.io", angle: 51 },
  { id: "falai", name: "fal.ai", label: "PIPELINE · GPU", icon: "⚡", color: "#6D28D9", url: "https://fal.ai", angle: 102 },
  { id: "creatomate", name: "creatomate", label: "VIDEO · AUTOMATION", icon: "🎨", color: "#047857", url: "https://creatomate.com", angle: 153 },
  { id: "runway", name: "runway-ml", label: "VIDEO · PRO EDIT", icon: "🚀", color: "#B91C1C", url: "https://runwayml.com", angle: 204 },
  { id: "suno", name: "suno-ai", label: "MUSIC · AI GEN", icon: "🎵", color: "#0E7490", url: "https://suno.com", angle: 255 },
  { id: "kieai", name: "kie.ai", label: "UNIFIED · HUB", icon: "🌐", color: "#9A6F00", url: "https://kie.ai", angle: 306 },
];

const tools = [
  {
    id: "higgsfield", name: "Higgsfield AI", icon: "🎬", url: "https://higgsfield.ai",
    tagline: "Cinematic multi-model video studio",
    description: "15+ AI video models (Veo 3.1, Sora 2, Kling 3.0, WAN 2.6) under one subscription with 70+ cinematic camera presets.",
    hospitality: ["Drone-style property flyovers", "Cinematic room reveals", "Pool & spa ambiance reels", "Seasonal campaign hero videos"],
    usd: { Free: "Free tier", Starter: "$15/mo", Plus: "$39/mo", Ultra: "$99/mo" },
    inr: { Free: "Free tier", Starter: "₹1,429/mo", Plus: "₹3,715/mo", Ultra: "₹9,430/mo" },
    note: "Billed annually. Credit-based — Veo 3.1 costs 40–70 credits/video.",
    accent: "#C47A00", accentBg: "#FEF3C7", accentBorder: "#F59E0B", tag: "VIDEO GEN"
  },
  {
    id: "elevenlabs", name: "ElevenLabs", icon: "🎙️", url: "https://elevenlabs.io",
    tagline: "Hyper-realistic AI voiceovers in 29+ languages",
    description: "Emotionally resonant text-to-speech, voice cloning, and AI dubbing. The gold standard for hospitality narration.",
    hospitality: ["Property tour narration", "Multilingual ad voiceovers", "AI concierge voice", "Brand ambassador voice clone"],
    usd: { Free: "Free (10 min/mo)", Starter: "$5/mo", Creator: "$11/mo", Pro: "$99/mo" },
    inr: { Free: "Free", Starter: "₹476/mo", Creator: "₹1,048/mo", Pro: "₹9,430/mo" },
    note: "India billing in USD + 18% GST if business entity. Annual saves ~17%.",
    accent: "#1D4ED8", accentBg: "#EFF6FF", accentBorder: "#93C5FD", tag: "VOICE AI", kieSupport: true
  },
  {
    id: "falai", name: "fal.ai", icon: "⚡", url: "https://fal.ai",
    tagline: "Lightning-fast AI inference & pipeline glue",
    description: "Pay-per-use GPU inference. The backbone of your pipeline — stitches clips, merges audio, runs 1000+ models.",
    hospitality: ["Multi-clip video assembly", "Audio-visual sync", "Batch property ad rendering", "LoRA fine-tuning on brand assets"],
    usd: { Free: "$0 (starter credits)", "Per Image": "$0.03", "Per Video": "$0.05/sec", "Veo 3": "$0.40/sec" },
    inr: { Free: "Free credits", "Per Image": "₹2.9", "Per Video": "₹4.8/sec", "Veo 3": "₹38/sec" },
    note: "Pure pay-per-use. H100 GPU: $1.89/hr. No lock-in.",
    accent: "#6D28D9", accentBg: "#F5F3FF", accentBorder: "#C4B5FD", tag: "PIPELINE"
  },
  {
    id: "creatomate", name: "Creatomate", icon: "🎨", url: "https://creatomate.com",
    tagline: "Template-driven video automation at scale",
    description: "Automate video creation from templates. Feed it property data and branding, it outputs polished ads for every platform.",
    hospitality: ["Branded room highlight reels", "Price & offer overlays", "Multi-platform ad resizing", "Dynamic seasonal promotions"],
    usd: { Essential: "$41/mo", Growth: "$99/mo", Beyond: "$249/mo" },
    inr: { Essential: "₹3,905/mo", Growth: "₹9,430/mo", Beyond: "₹23,717/mo" },
    note: "Free 50-credit trial. Annual = 2 months free.",
    accent: "#047857", accentBg: "#ECFDF5", accentBorder: "#6EE7B7", tag: "AUTOMATION"
  },
  {
    id: "runway", name: "Runway ML", icon: "🚀", url: "https://runwayml.com",
    tagline: "Professional AI video editing suite",
    description: "Gen-4 & Gen-4.5 models with advanced editing, Act Two performance capture, and AI upscaling.",
    hospitality: ["Cinematic color grading", "AI background replacement", "Long-form brand films", "Performance & emotion capture"],
    usd: { Free: "Free (125 credits)", Standard: "$12/mo", Pro: "$28/mo", Unlimited: "$76/mo" },
    inr: { Free: "Free", Standard: "₹1,143/mo", Pro: "₹2,667/mo", Unlimited: "₹7,239/mo" },
    note: "Billed annually. 625 credits on Standard ≈ 10 videos/month.",
    accent: "#B91C1C", accentBg: "#FEF2F2", accentBorder: "#FCA5A5", tag: "PRO EDIT"
  },
  {
    id: "suno", name: "Suno AI", icon: "🎵", url: "https://suno.com",
    tagline: "Full vocal & instrumental tracks from text",
    description: "Turn a prompt into a complete branded soundtrack — lobby ambiance, ad tracks, emotional brand film scores.",
    hospitality: ["Lobby ambiance tracks", "Ad background music", "Branded jingle creation", "Seasonal mood playlists"],
    usd: { Free: "Free (50 credits/day)", Pro: "$10/mo", Premier: "$30/mo" },
    inr: { Free: "Free", Pro: "₹953/mo", Premier: "₹2,858/mo" },
    note: "Commercial rights on paid plans. Annual = $8/mo (Pro).",
    accent: "#0E7490", accentBg: "#ECFEFF", accentBorder: "#67E8F9", tag: "MUSIC AI", kieSupport: true
  },
  {
    id: "kieai", name: "kie.ai", icon: "🌐", url: "https://kie.ai",
    tagline: "One API for all AI video, audio & image models",
    description: "Unified gateway to Veo 3.1, Sora 2, Kling 3.0, Wan 2.5, Seedance, ElevenLabs, Suno, and 20+ models at 30–70% lower cost.",
    hospitality: ["Single API for entire video stack", "Veo 3.1 at 70% lower cost", "Suno music + ElevenLabs voice", "Scale without juggling SDKs"],
    usd: { Credits: "$0.005/credit", "Veo 3 Fast 8s": "$0.40", "Veo 3 Full 8s": "~$1.50", Music: "Via Suno API" },
    inr: { Credits: "₹0.48/credit", "Veo 3 Fast 8s": "₹38", "Veo 3 Full 8s": "~₹143", Music: "Via Suno API" },
    note: "Pay-as-you-go credits. 30–70% cheaper than direct model APIs.",
    accent: "#9A6F00", accentBg: "#FEF9EC", accentBorder: "#D4A843", tag: "UNIFIED HUB"
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

function TopologyMap({ onEnter }) {
  const [hovered, setHovered] = useState(null);
  const cx = 250, cy = 250, r2 = 170;

  const nodePos = (angle, radius) => {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 20px",
      fontFamily: "monospace"
    }}>
      {/* Top tags */}
      <div style={{ width: "100%", maxWidth: 580, marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#22C55E", display: "inline-block", flexShrink: 0 }} />
          {["MULTIMODAL", "IMAGE", "VIDEO", "VOICE", "AUDIO", "MUSIC"].map(t => (
            <span key={t} style={{ fontSize: 11, letterSpacing: 3, color: C.textSub }}>{t} ·</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ width: 16, height: 2, background: "#C47A00", display: "inline-block", flexShrink: 0 }} />
          {["OPTIMIZED FOR SPEED", "QUALITY", "COST"].map(t => (
            <span key={t} style={{ fontSize: 11, letterSpacing: 3, color: C.textSub }}>{t} ·</span>
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{ position: "relative", width: "100%", maxWidth: 560 }}>
        {/* Corner brackets */}
        {[{ top: 0, left: 0, borderTop: `1px solid ${C.borderStrong}`, borderLeft: `1px solid ${C.borderStrong}` },
          { top: 0, right: 0, borderTop: `1px solid ${C.borderStrong}`, borderRight: `1px solid ${C.borderStrong}` },
          { bottom: 0, left: 0, borderBottom: `1px solid ${C.borderStrong}`, borderLeft: `1px solid ${C.borderStrong}` },
          { bottom: 0, right: 0, borderBottom: `1px solid ${C.borderStrong}`, borderRight: `1px solid ${C.borderStrong}` }
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 18, height: 18, ...s }} />
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px 0" }}>
          <span style={{ fontSize: 9, letterSpacing: 3, color: C.textMuted }}>TOPOLOGY.MAP</span>
          <span style={{ fontSize: 9, letterSpacing: 3, color: C.textMuted }}>N=7 / 20+ MODELS</span>
        </div>

        <svg viewBox="0 0 500 520" style={{ width: "100%", overflow: "visible" }}>
          {/* Rings */}
          <circle cx={cx} cy={cy} r={r2} fill="none" stroke="#C47A0025" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx={cx} cy={cy} r={r2 + 18} fill="none" stroke="#C47A0012" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={88} fill="none" stroke="#C47A0020" strokeWidth="1" strokeDasharray="2 4" />

          {/* Tick marks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 15 - 90) * Math.PI / 180;
            const inn = r2 + 22, out = r2 + 28;
            return <line key={i} x1={cx + inn * Math.cos(a)} y1={cy + inn * Math.sin(a)} x2={cx + out * Math.cos(a)} y2={cy + out * Math.sin(a)} stroke="#C47A0022" strokeWidth="1" />;
          })}

          {/* Spokes */}
          {orbitTools.map(tool => {
            const pos = nodePos(tool.angle, r2);
            return (
              <line key={tool.id}
                x1={cx} y1={cy} x2={pos.x} y2={pos.y}
                stroke={hovered === tool.id ? tool.color : "#C47A0018"}
                strokeWidth={hovered === tool.id ? 1.5 : 0.8}
                strokeDasharray="3 5"
                style={{ transition: "all 0.25s" }}
              />
            );
          })}

          {/* Center hub */}
          <circle cx={cx} cy={cy} r={58} fill={C.surface} stroke={C.goldBorder} strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r={50} fill="none" stroke="#D4A84325" strokeWidth="1" strokeDasharray="3 4" />
          <text x={cx} y={cy - 8} textAnchor="middle" fontSize="12" fontFamily="monospace" fontWeight="700" fill={C.gold} letterSpacing="2">KIE.AI</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fontFamily="monospace" fill={C.textMuted} letterSpacing="3">UNIFIED API</text>
          <circle cx={cx - 14} cy={cy + 22} r={4} fill="#22C55E" />
          <text x={cx - 6} y={cy + 26} fontSize="7" fontFamily="monospace" fill={C.textSub} letterSpacing="2">ONLINE</text>

          {/* Orbit nodes */}
          {orbitTools.map(tool => {
            const pos = nodePos(tool.angle, r2);
            const isHov = hovered === tool.id;
            const above = pos.y < cy - 20;
            const right = pos.x > cx + 25;
            const left = pos.x < cx - 25;
            const lx = pos.x + (left ? -36 : right ? 36 : 0);
            const ly = above ? pos.y - 34 : pos.y + 40;
            const anchor = left ? "end" : right ? "start" : "middle";

            return (
              <g key={tool.id} style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(tool.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => window.open(tool.url, "_blank")}
              >
                {/* Subtle shadow ring on hover */}
                {isHov && <circle cx={pos.x} cy={pos.y} r={30} fill={tool.color} opacity="0.08" />}

                <circle cx={pos.x} cy={pos.y} r={isHov ? 27 : 23}
                  fill={isHov ? tool.color : C.surface}
                  stroke={tool.color}
                  strokeWidth={isHov ? 0 : 1.5}
                  style={{ transition: "all 0.22s" }}
                />
                {/* Small accent dot */}
                <circle cx={pos.x} cy={pos.y - 12} r={2.5} fill={tool.color} opacity={isHov ? 0 : 0.6} />

                <text x={pos.x} y={pos.y + 6} textAnchor="middle" fontSize="16" style={{ userSelect: "none" }}>{tool.icon}</text>

                {/* Visit indicator on hover */}
                {isHov && <text x={pos.x} y={pos.y + 20} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#fff" letterSpacing="1">↗ OPEN</text>}

                {/* Label */}
                <text x={lx} y={ly} textAnchor={anchor} fontSize="9" fontFamily="monospace" fontWeight="700"
                  fill={isHov ? tool.color : C.text} style={{ transition: "fill 0.2s" }}
                >{tool.name}</text>
                <text x={lx} y={ly + 13} textAnchor={anchor} fontSize="7" fontFamily="monospace"
                  fill={C.textMuted} letterSpacing="1"
                >{tool.label}</text>
              </g>
            );
          })}
        </svg>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 14px 12px" }}>
          <span style={{ fontSize: 9, letterSpacing: 3, color: C.textMuted }}>UNIFIED</span>
          <span style={{ fontSize: 9, letterSpacing: 3, color: C.textMuted }}>→ ACTIVE</span>
        </div>
      </div>

      {/* Headline + CTA */}
      <div style={{ maxWidth: 520, textAlign: "center", marginTop: 32 }}>
        <div style={{ fontSize: 10, letterSpacing: 5, color: C.gold, marginBottom: 10 }}>DIGITAL MARKETING AGENCY · HOSPITALITY VERTICAL</div>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 400, margin: "0 0 12px", color: C.text, lineHeight: 1.25, letterSpacing: -0.5, fontFamily: "Georgia, serif" }}>
          The AI Stack Powering<br /><em style={{ color: C.gold }}>Next-Gen Hospitality Ads</em>
        </h1>
        <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.8, margin: "0 0 26px", fontFamily: "sans-serif" }}>
          Seven specialized AI tools. One cinematic pipeline. From raw property photos to platform-ready video ads — in hours, not weeks.
        </p>
        <button onClick={onEnter} style={{
          padding: "13px 32px", background: C.text, color: C.bg,
          border: "none", borderRadius: 2, cursor: "pointer",
          fontSize: 11, letterSpacing: 4, fontFamily: "monospace", fontWeight: 700
        }}>EXPLORE THE FULL PROPOSAL →</button>
        <div style={{ marginTop: 12, fontSize: 10, color: C.textMuted, fontFamily: "monospace", letterSpacing: 2 }}>HOVER ANY NODE · CLICK TO VISIT</div>
      </div>
    </div>
  );
}

const kieModels = [
  {
    id: "veo31",
    name: "veo-3.1-fast",
    category: "VIDEO",
    tag: "+AUDIO",
    desc: "Google's cinematic video model. Native audio sync. Best for hotel room reveals & property tours.",
    usd_unit: "8s clip",
    usd_price: "$0.40",
    inr_price: "₹38",
    usd_full: "$1.50 (full quality)",
    inr_full: "₹143 (full quality)",
    color: "#C47A00"
  },
  {
    id: "sora2",
    name: "sora-2-pro",
    category: "VIDEO",
    tag: "HD",
    desc: "OpenAI's Sora 2. Physics-consistent 720p–1080p. Great for narrative brand films & spa ambiance.",
    usd_unit: "10s clip",
    usd_price: "$1.00",
    inr_price: "₹95",
    usd_full: "$1.50 (15s)",
    inr_full: "₹143 (15s)",
    color: "#1D4ED8"
  },
  {
    id: "kling",
    name: "kling-3.0-pro",
    category: "VIDEO",
    tag: "1080p",
    desc: "Kling 3.0. Best price-performance for high-volume social ads — Instagram Reels, TikTok, YouTube Shorts.",
    usd_unit: "10s clip",
    usd_price: "$0.70",
    inr_price: "₹67",
    usd_full: "$0.70",
    inr_full: "₹67",
    color: "#047857"
  },
  {
    id: "seedance",
    name: "seedance-2.0",
    category: "VIDEO",
    tag: "+AUDIO",
    desc: "ByteDance Seedance 2.0. Native audio generation. Excellent for F&B and restaurant ambiance videos.",
    usd_unit: "8s clip",
    usd_price: "$0.50",
    inr_price: "₹48",
    usd_full: "$0.50",
    inr_full: "₹48",
    color: "#6D28D9"
  },
  {
    id: "wan",
    name: "wan-2.5",
    category: "VIDEO",
    tag: "BUDGET",
    desc: "Alibaba Wan 2.5. Most cost-effective for bulk batch rendering — 10+ variants per property.",
    usd_unit: "per sec",
    usd_price: "$0.05",
    inr_price: "₹4.8",
    usd_full: "$0.50 (10s)",
    inr_full: "₹48 (10s)",
    color: "#B91C1C"
  },
  {
    id: "elevenlabs",
    name: "elevenlabs-tts",
    category: "VOICE",
    tag: "29 LANGS",
    desc: "ElevenLabs via kie.ai. Hyper-realistic narration in any accent. Property tours, concierge voice, brand films.",
    usd_unit: "per 1K chars",
    usd_price: "$0.18",
    inr_price: "₹17",
    usd_full: "~$0.50 avg spot",
    inr_full: "~₹48 avg spot",
    color: "#0E7490"
  },
  {
    id: "suno",
    name: "suno-v5.5",
    category: "MUSIC",
    tag: "FULL TRACK",
    desc: "Suno V5.5 via kie.ai. Full vocal + instrumental from a text prompt. Lobby ambiance, ad soundtracks, jingles.",
    usd_unit: "per track",
    usd_price: "$0.10",
    inr_price: "₹9.5",
    usd_full: "$0.10 per song",
    inr_full: "₹9.5 per song",
    color: "#9A6F00"
  },
  {
    id: "nanobanana",
    name: "nano-banana-2",
    category: "IMAGE",
    tag: "~1.4s",
    desc: "Google Nano Banana 2 — ultra-fast cinematic property stills. The input that feeds your video generation pipeline.",
    usd_unit: "per image",
    usd_price: "$0.03",
    inr_price: "₹2.9",
    usd_full: "$0.03",
    inr_full: "₹2.9",
    color: "#4A4440"
  },
];

function KieBanner({ region }) {
  const [activeModel, setActiveModel] = useState("veo31");
  const model = kieModels.find(m => m.id === activeModel);
  const categories = ["ALL", "VIDEO", "VOICE", "MUSIC", "IMAGE"];
  const [catFilter, setCatFilter] = useState("ALL");
  const filtered = catFilter === "ALL" ? kieModels : kieModels.filter(m => m.category === catFilter);

  return (
    <div style={{ background: "#1C1814", borderRadius: 8, marginBottom: 26, border: `1.5px solid ${C.goldBorder}50`, overflow: "hidden" }}>

      {/* Top bar: category filters */}
      <div style={{ borderBottom: "1px solid #D4A84320", padding: "14px 20px", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 9, letterSpacing: 3, color: "#807060", fontFamily: "monospace", marginRight: 6 }}>FILTER:</span>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCatFilter(cat)} style={{
            padding: "4px 12px",
            background: catFilter === cat ? C.goldBorder : "transparent",
            color: catFilter === cat ? "#1C1814" : "#9A9080",
            border: catFilter === cat ? "none" : "1px solid #D4A84330",
            borderRadius: 2, cursor: "pointer",
            fontSize: 9, letterSpacing: 3, fontFamily: "monospace", fontWeight: 700
          }}>{cat}</button>
        ))}
      </div>

      {/* Model selector scrollbar */}
      <div style={{ borderBottom: "1px solid #D4A84320", padding: "12px 20px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
        {filtered.map(m => (
          <button key={m.id} onClick={() => setActiveModel(m.id)} style={{
            flexShrink: 0,
            padding: "7px 14px",
            background: activeModel === m.id ? m.color : "#2A2420",
            color: activeModel === m.id ? "#FFF" : "#9A9080",
            border: activeModel === m.id ? "none" : `1px solid #D4A84320`,
            borderRadius: 4, cursor: "pointer",
            fontFamily: "monospace", fontSize: 10, letterSpacing: 1, fontWeight: 700,
            transition: "all 0.18s"
          }}>
            <span style={{ marginRight: 6, fontSize: 12 }}>
              {m.category === "VIDEO" ? "🎬" : m.category === "VOICE" ? "🎙️" : m.category === "MUSIC" ? "🎵" : "🖼️"}
            </span>
            {m.name}
            <span style={{ marginLeft: 6, fontSize: 8, opacity: 0.7 }}>{m.tag}</span>
          </button>
        ))}
      </div>

      {/* Selected model detail + main info */}
      <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>

        {/* Model detail panel */}
        <div style={{ flex: "0 0 280px", minWidth: 240, padding: "20px 22px", borderRight: "1px solid #D4A84318" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
            <div style={{ background: model.color, borderRadius: 3, padding: "3px 8px", fontSize: 8, letterSpacing: 3, color: "#FFF", fontFamily: "monospace" }}>{model.category}</div>
            <div style={{ fontSize: 8, letterSpacing: 3, color: "#807060", fontFamily: "monospace", border: "1px solid #D4A84320", padding: "3px 8px", borderRadius: 3 }}>{model.tag}</div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#F0EBE0", fontFamily: "monospace", marginBottom: 6 }}>{model.name}</div>
          <div style={{ fontSize: 12, color: "#9A9080", lineHeight: 1.7, fontFamily: "sans-serif", marginBottom: 16 }}>{model.desc}</div>

          {/* Pricing breakdown */}
          <div style={{ background: "#2A2420", borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontSize: 8, letterSpacing: 3, color: "#807060", fontFamily: "monospace", marginBottom: 10 }}>
              {region === "usd" ? "🇺🇸 USD PRICING" : "🇮🇳 INR PRICING"}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div>
                <div style={{ fontSize: 8, letterSpacing: 2, color: "#807060", fontFamily: "monospace", marginBottom: 3 }}>PER {model.usd_unit.toUpperCase()}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: model.color, fontFamily: "monospace" }}>
                  {region === "usd" ? model.usd_price : model.inr_price}
                </div>
              </div>
              <div style={{ borderLeft: "1px solid #D4A84320", paddingLeft: 16 }}>
                <div style={{ fontSize: 8, letterSpacing: 2, color: "#807060", fontFamily: "monospace", marginBottom: 3 }}>AVG SPOT</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#C8C0B0", fontFamily: "monospace" }}>
                  {region === "usd" ? model.usd_full : model.inr_full}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 10, color: "#605850", fontFamily: "sans-serif", fontStyle: "italic" }}>
              Via kie.ai · 30–70% cheaper than direct API
            </div>
          </div>
        </div>

        {/* Right: main kie.ai info */}
        <div style={{ flex: 1, minWidth: 220, padding: "20px 22px" }}>
          <div style={{ display: "inline-block", fontSize: 9, letterSpacing: 4, color: C.goldBorder, background: "#D4A84318", border: "1px solid #D4A84330", padding: "3px 10px", borderRadius: 2, fontFamily: "monospace", marginBottom: 10 }}>★ UNIFIED HUB</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 400, color: "#F0EBE0" }}>🌐 kie.ai — One API for Everything</h2>
          <p style={{ margin: "0 0 14px", color: "#9A9080", lineHeight: 1.8, fontFamily: "sans-serif", fontSize: 13 }}>
            Instead of managing 7 separate platforms, <strong style={{ color: C.goldBorder }}>one API</strong> to access Veo 3.1, Sora 2, Kling 3.0, ElevenLabs, Suno, and 20+ models at <strong style={{ color: C.goldBorder }}>30–70% lower cost</strong>.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
            {[["Video", "Veo 3.1, Sora 2, Kling, Wan"], ["Audio", "ElevenLabs, Suno V5.5"], ["Images", "GPT Image 2, Nano Banana"]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 8, letterSpacing: 3, color: C.goldBorder, fontFamily: "monospace", marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 11, color: "#C8C0B0", fontFamily: "sans-serif" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ background: "#F0EBE010", border: "1px solid #D4A84320", borderRadius: 5, padding: "10px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 7, letterSpacing: 3, color: "#9A9080", fontFamily: "monospace", marginBottom: 3 }}>BASE CREDIT</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.goldBorder, fontFamily: "monospace" }}>{region === "usd" ? "$0.005" : "₹0.48"}</div>
              <div style={{ fontSize: 9, color: "#9A9080", fontFamily: "sans-serif" }}>per credit</div>
            </div>
            <a href="https://kie.ai" target="_blank" rel="noreferrer" style={{ fontSize: 9, letterSpacing: 3, color: C.goldBorder, fontFamily: "monospace", textDecoration: "none", border: "1px solid #D4A84340", padding: "8px 14px", borderRadius: 2, display: "inline-block" }}>↗ KIE.AI</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Proposal() {
  const [activeTab, setActiveTab] = useState("tools");
  const [selectedTool, setSelectedTool] = useState(null);
  const [region, setRegion] = useState("usd");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <div style={{ background: C.text, color: C.bg, padding: "36px 28px 32px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: C.goldBorder, fontFamily: "monospace", marginBottom: 10 }}>
            DIGITAL MARKETING AGENCY · CLIENT PROPOSAL · HOSPITALITY VERTICAL
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 400, margin: "0 0 10px", lineHeight: 1.2 }}>
            The AI Stack Powering <span style={{ color: C.goldBorder }}>Next-Gen Hospitality Ads</span>
          </h1>
          <p style={{ fontSize: 14, color: "#A09888", maxWidth: 500, lineHeight: 1.8, margin: "0 0 24px", fontFamily: "sans-serif" }}>
            Seven specialized AI tools. One cinematic pipeline. From raw property photos to platform-ready video ads — in hours, not weeks.
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[["tools", "AI Tools"], ["pipeline", "The Pipeline"], ["roi", "ROI Case"]].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                padding: "8px 20px",
                background: activeTab === id ? C.goldBorder : "transparent",
                color: activeTab === id ? C.text : "#A09888",
                border: activeTab === id ? "none" : "1px solid #3A3530",
                borderRadius: 2, cursor: "pointer",
                fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                fontFamily: "monospace", fontWeight: 700, transition: "all 0.2s"
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "36px 22px" }}>

        {/* TOOLS */}
        {activeTab === "tools" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, letterSpacing: 3, color: C.textMuted, fontFamily: "monospace" }}>PRICING:</span>
              <div style={{ display: "flex", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 3, overflow: "hidden" }}>
                {["usd", "inr"].map(r => (
                  <button key={r} onClick={() => setRegion(r)} style={{
                    padding: "7px 16px", background: region === r ? C.text : "transparent",
                    color: region === r ? C.bg : C.textSub,
                    border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "monospace", letterSpacing: 2
                  }}>{r === "usd" ? "🇺🇸 USD" : "🇮🇳 INR"}</button>
                ))}
              </div>
              <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "sans-serif" }}>Live rate: $1 = ₹95.25 (XE, May 25 2026) · +18% GST for Indian businesses</span>
            </div>

            <KieBanner region={region} />

            {/* Tool cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(295px, 1fr))", gap: 16 }}>
              {tools.filter(t => t.id !== "kieai").map(tool => (
                <div key={tool.id}
                  onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
                  style={{
                    background: C.surfaceCard, border: selectedTool === tool.id ? `2px solid ${tool.accent}` : `1px solid ${C.border}`,
                    borderRadius: 8, padding: "20px", cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: selectedTool === tool.id ? `0 3px 14px ${tool.accent}15` : "0 1px 3px #1C181408"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 9, letterSpacing: 3, color: tool.accent, background: tool.accentBg, border: `1px solid ${tool.accentBorder}`, padding: "3px 9px", borderRadius: 2, fontFamily: "monospace" }}>{tool.tag}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      {tool.kieSupport && <span style={{ fontSize: 8, letterSpacing: 2, color: "#6D28D9", background: "#F5F3FF", border: "1px solid #C4B5FD", padding: "3px 7px", borderRadius: 2, fontFamily: "monospace" }}>VIA KIE.AI</span>}
                      <a href={tool.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 8, letterSpacing: 2, color: tool.accent, background: tool.accentBg, border: `1px solid ${tool.accentBorder}`, padding: "3px 7px", borderRadius: 2, fontFamily: "monospace", textDecoration: "none" }}>↗ VISIT</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 26 }}>{tool.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{tool.name}</div>
                      <div style={{ fontSize: 11, color: tool.accent, fontFamily: "sans-serif", marginTop: 2 }}>{tool.tagline}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7, margin: "0 0 13px", fontFamily: "sans-serif" }}>{tool.description}</p>
                  <div style={{ background: C.surface, borderRadius: 7, padding: "11px", marginBottom: 9, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 8, letterSpacing: 3, color: C.textMuted, fontFamily: "monospace", marginBottom: 7 }}>{region === "usd" ? "🇺🇸 USD PRICING" : "🇮🇳 INR PRICING"}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {Object.entries(region === "usd" ? tool.usd : tool.inr).map(([tier, price]) => (
                        <div key={tier} style={{ background: C.surfaceCard, border: `1px solid ${tool.accentBorder}`, borderRadius: 4, padding: "5px 9px" }}>
                          <div style={{ fontSize: 8, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase", fontFamily: "monospace" }}>{tier}</div>
                          <div style={{ fontSize: 12, color: tool.accent, fontWeight: 700, fontFamily: "monospace" }}>{price}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 10, color: C.textMuted, marginTop: 7, fontFamily: "sans-serif", fontStyle: "italic" }}>{tool.note}</div>
                  </div>
                  {selectedTool === tool.id && (
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 11 }}>
                      <div style={{ fontSize: 8, letterSpacing: 3, color: tool.accent, fontFamily: "monospace", marginBottom: 7 }}>HOSPITALITY USE CASES</div>
                      {tool.hospitality.map((uc, i) => (
                        <div key={i} style={{ display: "flex", gap: 7, marginBottom: 6, fontSize: 12, color: C.text, fontFamily: "sans-serif" }}>
                          <span style={{ color: tool.accent, fontWeight: 700 }}>›</span>{uc}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 9, color: selectedTool === tool.id ? tool.accent : C.textMuted, fontFamily: "monospace", textAlign: "right", marginTop: 5 }}>
                    {selectedTool === tool.id ? "▲ COLLAPSE" : "▼ VIEW USE CASES"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PIPELINE */}
        {activeTab === "pipeline" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 10, letterSpacing: 5, color: C.gold, fontFamily: "monospace", marginBottom: 8 }}>THE PRODUCTION WORKFLOW</div>
              <h2 style={{ fontSize: 28, fontWeight: 400, margin: "0 0 8px" }}>From Brief to Broadcast</h2>
              <p style={{ color: C.textSub, fontSize: 14, lineHeight: 1.8, maxWidth: 500, fontFamily: "sans-serif" }}>A single hospitality video ad flows through this pipeline in under 4 hours. Traditional agencies take 2–6 weeks.</p>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 26, top: 0, bottom: 0, width: 1.5, background: `linear-gradient(180deg, ${C.gold} 0%, ${C.border} 100%)` }} />
              {pipeline.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 22, marginBottom: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 52, height: 52, flexShrink: 0, background: C.surfaceCard, border: `1.5px solid ${C.gold}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "monospace", color: C.gold, fontWeight: 700, zIndex: 1 }}>{step.step}</div>
                  <div style={{ flex: 1, background: C.surfaceCard, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 18px", marginTop: 5 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 3 }}>{step.label}</div>
                        <div style={{ fontSize: 13, color: C.textSub, fontFamily: "sans-serif", lineHeight: 1.6 }}>{step.desc}</div>
                      </div>
                      <div style={{ background: C.goldLight, border: `1px solid ${C.goldBorder}`, borderRadius: 3, padding: "4px 11px", fontSize: 10, color: C.gold, fontFamily: "monospace", whiteSpace: "nowrap" }}>{step.tool}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: C.surfaceCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "22px", marginTop: 10 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: C.gold, fontFamily: "monospace", marginBottom: 14 }}>ESTIMATED COST PER VIDEO AD</div>
              <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
                {["usd", "inr"].map(r => (
                  <button key={r} onClick={() => setRegion(r)} style={{ padding: "5px 13px", background: region === r ? C.text : C.surface, color: region === r ? C.bg : C.textSub, border: `1px solid ${C.border}`, borderRadius: 3, cursor: "pointer", fontSize: 10, fontFamily: "monospace", letterSpacing: 2 }}>{r === "usd" ? "🇺🇸 USD" : "🇮🇳 INR"}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 11 }}>
                {[
                  { label: "60-sec hotel reel", usd: "$4 – $12", inr: "₹381 – ₹1,143" },
                  { label: "15-sec social clip", usd: "$1 – $4", inr: "₹95 – ₹381" },
                  { label: "Voiceover per spot", usd: "$0.10 – $1", inr: "₹10 – ₹95" },
                  { label: "Background music", usd: "$0.25 – $0.50", inr: "₹24 – ₹48" },
                  { label: "Batch 10 variants", usd: "$15 – $40", inr: "₹1,429 – ₹3,810" },
                  { label: "Monthly campaign", usd: "$150 – $400", inr: "₹14,288 – ₹38,100" }
                ].map((item, i) => (
                  <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "12px" }}>
                    <div style={{ fontSize: 11, color: C.textSub, fontFamily: "sans-serif", marginBottom: 5 }}>{item.label}</div>
                    <div style={{ fontSize: 16, color: C.gold, fontFamily: "monospace", fontWeight: 700 }}>{region === "usd" ? item.usd : item.inr}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: C.textMuted, fontFamily: "sans-serif", fontStyle: "italic" }}>* Traditional production: $500–$5,000 per spot.</div>
            </div>
          </div>
        )}

        {/* ROI */}
        {activeTab === "roi" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 10, letterSpacing: 5, color: C.gold, fontFamily: "monospace", marginBottom: 8 }}>THE BUSINESS CASE</div>
              <h2 style={{ fontSize: 28, fontWeight: 400, margin: "0 0 8px" }}>Why Hospitality Brands Win With AI Video</h2>
              <p style={{ color: C.textSub, fontSize: 14, lineHeight: 1.8, maxWidth: 540, fontFamily: "sans-serif" }}>Hotels, restaurants, and resorts are 100% visual businesses. Pay $5,000 per spot or $12.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { stat: "80%", label: "of travellers watch hotel videos before booking", source: "Google Travel" },
                { stat: "3×", label: "higher engagement on video vs static images", source: "Meta Ads Data" },
                { stat: "$12", label: "average AI cost vs $2,000+ traditional production", source: "Our Pipeline" },
                { stat: "4 hrs", label: "from brief to platform-ready ad with full AI stack", source: "SceneCraft" }
              ].map((item, i) => (
                <div key={i} style={{ background: C.surfaceCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px", textAlign: "center" }}>
                  <div style={{ fontSize: 38, color: C.gold, fontWeight: 700, fontFamily: "monospace", lineHeight: 1 }}>{item.stat}</div>
                  <div style={{ fontSize: 12, color: C.text, margin: "10px 0 5px", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.label}</div>
                  <div style={{ fontSize: 8, color: C.textMuted, fontFamily: "monospace", letterSpacing: 2 }}>{item.source}</div>
                </div>
              ))}
            </div>
            {/* Hotels & Resorts — expanded */}
            <div style={{ background: C.surfaceCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "22px 24px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 26 }}>🏨</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.gold }}>Hotels & Resorts</div>
                  <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif" }}>8-second cinematic ads that convert lookers into bookers</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
                {[
                  { ad: "Room Reveal Ad", desc: "Door opens → cinematic 8s sweep of suite interior. Ends on price overlay. Deployed on Booking.com, Instagram Stories, and YouTube pre-roll.", tag: "CONVERSION" },
                  { ad: "Pool & Lobby Ambiance", desc: "Golden-hour pool shot, smooth camera drift, Suno AI ambient score. No voiceover. Pure mood. Used for Instagram Reels & TikTok top-of-funnel.", tag: "AWARENESS" },
                  { ad: "Seasonal Offer Spot", desc: "8s: summer/winter visual → offer text overlay → CTA. Batch-generated in 10 variants per season via Creatomate. One template, 10 rooms.", tag: "PROMO" },
                  { ad: "Multilingual Brand Film", desc: "30s property story narrated by ElevenLabs voice clone in English, Hindi, Arabic. One source video, three language markets.", tag: "BRAND" },
                  { ad: "OTA Image-to-Video", desc: "Existing Booking.com/Expedia hero photos animated into cinematic 8s clips via Kling 3.0 or Seedance 2.0. No new shoot, no crew, no cost.", tag: "LOW COST" },
                  { ad: "Review-to-Reel", desc: "Real guest quote rendered as animated text over property footage with background score. Social proof in 8 seconds. Runs on Instagram & Google Display.", tag: "TRUST" },
                ].map((item, i) => (
                  <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.ad}</div>
                      <span style={{ fontSize: 8, letterSpacing: 2, color: C.gold, background: C.goldLight, border: `1px solid ${C.goldBorder}`, padding: "2px 7px", borderRadius: 2, fontFamily: "monospace", whiteSpace: "nowrap", marginLeft: 8 }}>{item.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.textSub, fontFamily: "sans-serif", lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurants & F&B — expanded */}
            <div style={{ background: C.surfaceCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "22px 24px", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 26 }}>🍽️</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.gold }}>Restaurants & F&B</div>
                  <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif" }}>8-second short commercial ads that sell before the first bite</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
                {[
                  { ad: "Signature Dish Reveal", desc: "Slow-motion pour, steam rising, fork cut — 8s food porn. Works for Instagram Stories, Zomato/Swiggy banners, Google Ads.", tag: "HERO" },
                  { ad: "Table Ambiance Spot", desc: "Candlelit table, ambient sound, warm tones. 8s. No dialogue. Targets fine-dining audiences on Meta and Pinterest.", tag: "MOOD" },
                  { ad: "Chef Story Micro-Doc", desc: "15s: chef at work → plating → guest reaction. Narrated by ElevenLabs voice. Used for brand building on YouTube & LinkedIn.", tag: "BRAND" },
                  { ad: "Weekend Brunch Promo", desc: "Batch of 6 variants — each with a different dish, same music, same CTA. Runs Friday–Sunday on paid social.", tag: "PROMO" },
                  { ad: "Cocktail Reveal Ad", desc: "8s pour sequence, ice clink, garnish drop. Text overlay: name + price. Runs on Instagram Reels, Zomato Stories.", tag: "PRODUCT" },
                  { ad: "Festive Menu Teaser", desc: "Diwali/Christmas/New Year variants batch-generated via Creatomate. Same template, 10 dishes, deployed in hours.", tag: "SEASONAL" },
                ].map((item, i) => (
                  <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.ad}</div>
                      <span style={{ fontSize: 8, letterSpacing: 2, color: C.gold, background: C.goldLight, border: `1px solid ${C.goldBorder}`, padding: "2px 7px", borderRadius: 2, fontFamily: "monospace", whiteSpace: "nowrap", marginLeft: 8 }}>{item.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.textSub, fontFamily: "sans-serif", lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: C.text, color: C.bg, borderRadius: 8, padding: "26px" }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: C.goldBorder, fontFamily: "monospace", marginBottom: 14 }}>SUGGESTED AGENCY RETAINER MODEL</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
                {["usd", "inr"].map(r => (
                  <button key={r} onClick={() => setRegion(r)} style={{ padding: "6px 13px", background: region === r ? C.goldBorder : "transparent", color: region === r ? C.text : "#A09888", border: "1px solid #3A3530", borderRadius: 2, cursor: "pointer", fontSize: 10, fontFamily: "monospace", letterSpacing: 2, fontWeight: 700 }}>{r === "usd" ? "🇺🇸 USD" : "🇮🇳 INR"}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                {[
                  { tier: "Starter", color: "#A09888", price_usd: "$800/mo", price_inr: "₹76,200/mo", ai_usd: "$50–$100/mo", ai_inr: "₹4,763–₹9,525/mo", includes: ["8 video ads/mo (8–15s each)", "Resized for Instagram Reels + YouTube Shorts", "ElevenLabs voiceover on every ad", "Suno AI music rendered into video"] },
                  { tier: "Growth", color: C.goldBorder, price_usd: "$2,200/mo", price_inr: "₹2,09,550/mo", ai_usd: "$200–$400/mo", ai_inr: "₹19,050–₹38,100/mo", includes: ["30 video ads/mo (8–30s each)", "4 formats: Reels, Shorts, Stories, 16:9", "ElevenLabs voice clone of brand narrator", "English + Hindi + Arabic versions"] },
                  { tier: "Enterprise", color: "#F472B6", price_usd: "$6,000/mo", price_inr: "₹5,71,500/mo", ai_usd: "$500–$1,200/mo", ai_inr: "₹47,625–₹1,14,300/mo", includes: ["Unlimited ad variants via Creatomate", "Fine-tuned video model on your property", "Cloned brand voice across all languages", "Full n8n pipeline — brief to publish"] }
                ].map((t, i) => (
                  <div key={i} style={{ background: "#2A2420", border: `1px solid ${t.color}35`, borderRadius: 7, padding: "18px" }}>
                    <div style={{ fontSize: 8, letterSpacing: 4, color: t.color, fontFamily: "monospace", marginBottom: 7 }}>{t.tier.toUpperCase()}</div>
                    <div style={{ fontSize: 26, color: t.color, fontFamily: "monospace", fontWeight: 700 }}>{region === "usd" ? t.price_usd : t.price_inr}</div>
                    <div style={{ fontSize: 10, color: "#807060", fontFamily: "sans-serif", marginBottom: 12, marginTop: 3 }}>AI costs: {region === "usd" ? t.ai_usd : t.ai_inr}</div>
                    {t.includes.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 7, marginBottom: 6, fontSize: 12, color: "#C8C0B0", fontFamily: "sans-serif" }}>
                        <span style={{ color: t.color }}>✓</span>{item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 18, padding: "14px 16px", background: "#D4A84310", border: "1px solid #D4A84322", borderRadius: 6, fontSize: 13, color: "#C8C0B0", fontFamily: "sans-serif", lineHeight: 1.8 }}>
                <strong style={{ color: C.goldBorder }}>The margin math:</strong> AI tools cost $50–$1,200/mo at scale. You charge $800–$6,000/mo. Traditional agencies spend $2,000–$10,000 per video in production. We spend $4–$15. That's your competitive moat.
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderTop: `1px solid ${C.border}`, padding: "16px 28px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 9, color: C.textMuted, fontFamily: "monospace", letterSpacing: 2 }}>AI STACK · HOSPITALITY VERTICAL · 2026</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {tools.map(t => (
              <a key={t.id} href={t.url} target="_blank" rel="noreferrer" style={{ fontSize: 9, color: C.textMuted, fontFamily: "monospace", textDecoration: "none" }}>{t.name}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("map");
  return page === "map" ? <TopologyMap onEnter={() => setPage("proposal")} /> : <Proposal />;
}
