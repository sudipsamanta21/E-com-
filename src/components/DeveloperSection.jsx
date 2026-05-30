import React from "react";
import profileImg from "../assets/profile.jpg";

/* ─── colour tokens ─── */
const C = {
  purple50:  "#EEEDFE",
  purple200: "#AFA9EC",
  purple400: "#7F77DD",
  purple600: "#534AB7",
  purple800: "#3C3489",
  teal50:    "#E1F5EE",
  teal800:   "#085041",
  teal600:   "#0F6E56",
  coral50:   "#FAECE7",
  coral600:  "#D85A30",
  coral800:  "#712B13",
  pink50:    "#FBEAF0",
  pink800:   "#72243E",
  blue50:    "#E6F1FB",
  blue800:   "#0C447C",
  amber50:   "#FAEEDA",
  amber800:  "#633806",
  gray50:    "#F5F4F0",
  gray100:   "#F1EFE8",
  gray400:   "#888780",
  gray600:   "#5F5E5A",
  gray900:   "#1A1A1A",
};

/* ─── section heading ─── */
const SectionHead = ({ label, title, size = 26 }) => (
  <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
    <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: C.purple600, margin: "0 0 6px" }}>
      {label}
    </p>
    <h2 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: size, fontWeight: 400, color: C.gray900 }}>
      {title}
    </h2>
  </div>
);

/* ─── 1. Hero card ─── */
const DevHero = () => (
  <div style={{
    background: "linear-gradient(135deg, #534AB7 0%, #3C3489 100%)",
    borderRadius: 16,
    padding: "2rem",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "2rem",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    marginBottom: "1.25rem",
  }}>
    {/* decorative circles */}
    <div style={{ position:"absolute", top:"-40%", right:"-5%", width:320, height:320, background:"rgba(255,255,255,0.05)", borderRadius:"50%", zIndex:1 }} />
    <div style={{ position:"absolute", bottom:"-30%", left:"-5%", width:240, height:240, background:"rgba(255,255,255,0.04)", borderRadius:"50%", zIndex:1 }} />

    {/* content */}
    <div style={{ position:"relative", zIndex:2, color:"#EEEDFE" }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", color:"#AFA9EC", marginBottom:12 }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:C.coral600 }} />
        Available for freelance
      </div>
      <h3 style={{ fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:32, fontWeight:400, marginBottom:4 }}>
        Sudip Samanta
      </h3>
      <p style={{ fontSize:14, color:"#CECBF6", marginBottom:"1.25rem" }}>
        SpringBoot Developer · UI/UX Enthusiast
      </p>
      <p style={{ fontSize:13, lineHeight:1.75, color:"rgba(255,255,255,0.85)", maxWidth:460, marginBottom:"1.25rem" }}>
        Passionate about building premium digital experiences with clean code and thoughtful design.
        Specialising in React ecosystems, Spring Boot APIs, and crafting interfaces people love using.
      </p>
      {/* skill pills */}
      <div style={{ marginBottom:"1.25rem" }}>
        {["Java","Spring Boot","MySQL","C","React","Git & GitHub"].map((s) => (
          <span key={s} style={{
            display:"inline-block", fontSize:11, fontWeight:500,
            padding:"5px 12px", margin:"0 6px 6px 0",
            background:"rgba(255,255,255,0.14)", border:"0.5px solid rgba(255,255,255,0.22)",
            borderRadius:20, color:"#EEEDFE",
          }}>{s}</span>
        ))}
      </div>
      {/* social links */}
      <div style={{ display:"flex", gap:10 }}>
        {[["🐙","GitHub"],["🔗","LinkedIn"],["𝕏","Twitter"],["✉️","Email"],["🌐","Portfolio"]].map(([icon, title]) => (
          <button key={title} title={title} style={{
            width:38, height:38, borderRadius:"50%",
            background:"rgba(255,255,255,0.12)", border:"0.5px solid rgba(255,255,255,0.22)",
            color:"#EEEDFE", cursor:"pointer", display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:15, transition:"all .15s",
          }}
          onMouseEnter={(e)=>e.currentTarget.style.background="rgba(255,255,255,0.24)"}
          onMouseLeave={(e)=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>

   <div style={{ position:"relative", zIndex:2 }}>
  <div
    style={{
      width:180,
      height:180,
      borderRadius:16,
      background:"rgba(255,255,255,0.12)",
      border:"2px solid rgba(255,255,255,0.18)",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      fontSize:72,
    }}
  >
    <img
      src={profileImg}
      alt="Avatar"
      style={{
        width:160,
        height:160,
        borderRadius:12,
        objectFit:"cover",
      }}
    />
  </div>

  <div
    style={{
      position:"absolute",
      bottom:-8,
      right:-8,
      background:C.coral600,
      color:"#fff",
      fontSize:11,
      fontWeight:500,
      padding:"6px 14px",
      borderRadius:20,
    }}
  >
    Open to work
  </div>
</div>
  </div>
);

/* ─── 2. Stats ─── */
const StatsRow = () => {
  const stats = [
    { num:"3+",  label:"Years experience" },
    { num:"6+", label:"Projects built"   },
    { num:"8+",  label:"Happy clients"    },
    { num:"3k+", label:"GitHub commits"   },
  ];
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:"1.25rem" }}>
      {stats.map(({ num, label }) => (
        <div key={label} style={{
          background:"#fff", border:`0.5px solid rgba(0,0,0,0.08)`,
          borderRadius:12, padding:"1.25rem", textAlign:"center",
        }}>
          <div style={{ fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:28, color:C.purple600, marginBottom:4 }}>
            {num}
          </div>
          <div style={{ fontSize:12, color:C.gray400 }}>{label}</div>
        </div>
      ))}
    </div>
  );
};

/* ─── 3. Experience + Skills ─── */
const ExperienceAndSkills = () => {
  const experience = [
    // { emoji:"💼", company:"TechCorp Solutions", role:"Full Stack Developer", date:"2023 – Present", desc:"Built scalable React + Spring Boot applications serving 10k+ users daily.", dotBg:C.purple50 },
    // { emoji:"🚀", company:"StartupXYZ", role:"Frontend Developer", date:"2022 – 2026", desc:"Led the UI redesign that increased user engagement by 40%.", dotBg:C.teal50 },
    { emoji:"🎓", company:"B.Tech — Computer Science", role:"Jis University", date:"2022 – 2026", desc:"Graduated with honours, specialising in software engineering.", dotBg:C.pink50 },
  ];
  const skills = [
    { name:"Java",     pct:92, color:C.purple600 },
    { name:"Spring Boot",  pct:85, color:C.coral600  },
    { name:"MySQL",      pct:80, color:C.teal600   },
    { name:"Git & GitHub",      pct:78, color:"#378ADD"   },
    { name:"React.js", pct:88, color:"#D4537E"   },
  
   
    { name:"JavaScript",   pct:90, color:"#BA7517"   },
  ];

  const card = { background:"#fff", border:"0.5px solid rgba(0,0,0,0.08)", borderRadius:12, padding:"1.25rem" };

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:"1.25rem" }}>
      {/* Experience */}
      <div style={card}>
        <h3 style={{ fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:17, color:C.gray900, marginBottom:"1rem" }}>
          Experience
        </h3>
        {experience.map(({ emoji, company, role, date, desc, dotBg }, i) => (
          <div key={i} style={{ display:"flex", gap:12, paddingBottom:"1rem", position:"relative" }}>
            {i < experience.length - 1 && (
              <div style={{ position:"absolute", left:17, top:36, bottom:0, width:1, background:"rgba(0,0,0,0.08)" }} />
            )}
            <div style={{
              width:34, height:34, borderRadius:"50%", background:dotBg,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:14, flexShrink:0, marginTop:2,
            }}>
              {emoji}
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:500, color:C.gray900 }}>{company}</div>
              <div style={{ fontSize:12, color:C.purple600, marginBottom:2 }}>{role}</div>
              <div style={{ fontSize:11, color:C.gray400, marginBottom:4 }}>{date}</div>
              <div style={{ fontSize:12, color:C.gray600, lineHeight:1.55 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div style={card}>
        <h3 style={{ fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:17, color:C.gray900, marginBottom:"1rem" }}>
          Tech Proficiency
        </h3>
        {skills.map(({ name, pct, color }) => (
          <div key={name} style={{ marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, fontSize:12 }}>
              <span style={{ fontWeight:500, color:C.gray900 }}>{name}</span>
              <span style={{ color:C.gray400 }}>{pct}%</span>
            </div>
            <div style={{ height:5, background:C.gray100, borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:3, transition:"width .6s ease" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── 4. Projects ─── */
const Projects = () => {
  const projects = [
    { emoji:"🛍", name:"ShopKart", desc:"Full-stack e-commerce platform with cart, checkout, and admin panel.", bg:C.purple50, tags:[{l:"React",bg:C.purple50,c:C.purple800},{l:"Spring Boot",bg:C.teal50,c:C.teal800},{l:"Java",bg:C.teal50,c:C.teal800},{l:"MySQL",bg:C.coral50,c:C.coral800}] },
    { emoji:"📊", name:"Medicine recommendation System", desc:"A healthcare application that analyzes user symptoms and recommends suitable medicines with dosage, side effects, and precaution information.", bg:C.teal50, tags:[{l:"Html",bg:C.purple50,c:C.purple800},{l:"CSS",bg:C.teal50,c:C.teal800},{l:"JavaScript",bg:C.corallue50,c:C.blue800},{l:"MongoDB",bg:C.amber50,c:C.amber800}] },
    { emoji:"💬", name:"Power Point Fault Detection", desc:"A smart monitoring system that identifies and detects faults in electrical power systems to improve reliability, safety, and maintenance efficiency.", bg:C.pink50, tags:[{l:"IBM Cloud",bg:C.purple50,c:C.purple800}] },
  ];
  return (
    <div style={{ marginBottom:"1.25rem" }}>
      <SectionHead label="Portfolio" title="Featured Projects" size={20} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
        {projects.map(({ emoji, name, desc, bg, tags }) => (
          <div key={name} style={{
            background:"#fff", border:"0.5px solid rgba(0,0,0,0.08)",
            borderRadius:12, overflow:"hidden", transition:"all .15s", cursor:"pointer",
          }}
          onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,0.1)"; }}
          onMouseLeave={(e)=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}
          >
            <div style={{ height:90, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>{emoji}</div>
            <div style={{ padding:12 }}>
              <p style={{ fontSize:13, fontWeight:500, color:C.gray900, marginBottom:4 }}>{name}</p>
              <p style={{ fontSize:11, color:C.gray400, lineHeight:1.5, marginBottom:8 }}>{desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {tags.map(({ l, bg, c }) => (
                  <span key={l} style={{ fontSize:10, padding:"2px 8px", borderRadius:20, fontWeight:500, background:bg, color:c }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── 5. Testimonials ─── */
const Testimonials = () => {
  const items = [
    { stars:5, text:'"Sudip delivered a world-class UI for our platform. His attention to detail and design sensibility is exceptional."',    bg:C.purple50 },
    { stars:5, text:'"Incredible work on our backend API. Performance improved by 3× and the code quality is clean and maintainable."',     bg:C.teal50   },
    { stars:5, text:'"Sudip is a reliable, creative, and skilled developer. Our project was delivered on time and exceeded expectations."',  bg:C.pink50   },
  ];
  return (
    <div style={{ marginBottom:"1.25rem" }}>
      <SectionHead label="What people say" title="Testimonials" size={20} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
        {items.map(({ stars, text, avatar, name, role, bg }) => (
          <div key={name} style={{ background:"#fff", border:"0.5px solid rgba(0,0,0,0.08)", borderRadius:12, padding:"1.25rem" }}>
            <div style={{ color:"#BA7517", fontSize:13, letterSpacing:2, marginBottom:"0.6rem" }}>{"★".repeat(stars)}</div>
            <p style={{ fontSize:12, color:C.gray600, lineHeight:1.65, marginBottom:"0.75rem", fontStyle:"italic" }}>{text}</p>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{avatar}</div>
              <div>
                <div style={{ fontSize:12, fontWeight:500, color:C.gray900 }}>{name}</div>
                <div style={{ fontSize:11, color:C.gray400 }}>{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── 6. Contact CTA ─── */
const ContactCTA = () => (
  <div style={{
    background:"linear-gradient(135deg, #47709b 0%, #2C2C2A 100%)",
    borderRadius:16, padding:"2rem", textAlign:"center", color:"#EEEDFE",
  }}>
    <h3 style={{ fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:22, fontWeight:400, marginBottom:"0.5rem" }}>
      Let's build something great together
    </h3>
    <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginBottom:"1.5rem" }}>
      Available for freelance projects, full-time roles, and collaborations
    </p>
    <button style={{
      display:"inline-flex", alignItems:"center", gap:8,
      padding:"10px 24px", background:C.purple600, border:"none",
      borderRadius:20, color:"#fff", fontSize:13, fontWeight:500,
      fontFamily:"inherit", cursor:"pointer", transition:"all .15s",
    }}
    onMouseEnter={(e)=>{ e.currentTarget.style.background=C.purple800; e.currentTarget.style.transform="translateY(-1px)"; }}
    onMouseLeave={(e)=>{ e.currentTarget.style.background=C.purple600; e.currentTarget.style.transform="none"; }}
    >
      ✉️&nbsp;&nbsp;Get in touch
    </button>
    <div style={{ display:"flex", justifyContent:"center", gap:12, marginTop:"1rem", flexWrap:"wrap" }}>
      {["GitHub","LinkedIn","Portfolio","Resume"].map((l, i, arr) => (
        <React.Fragment key={l}>
          <a href="#" style={{ fontSize:11, color:"rgba(255,255,255,0.5)", textDecoration:"none", transition:"color .15s" }}
            onMouseEnter={(e)=>e.currentTarget.style.color="#EEEDFE"}
            onMouseLeave={(e)=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}
          >
            {l}
          </a>
          {i < arr.length - 1 && <span style={{ color:"rgba(255,255,255,0.2)" }}>·</span>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

/* ─── DeveloperSection (export) ─── */
const DeveloperSection = () => (
  <div style={{
    maxWidth:1100,
    margin:"4rem auto",
    padding:"0 2rem",
    fontFamily:"'DM Sans', system-ui, sans-serif",
  }}>
    <SectionHead label="About the creator" title="Meet the Developer" />
    <DevHero />
    <StatsRow />
    <ExperienceAndSkills />
    <Projects />
    <Testimonials />
    <ContactCTA />
  </div>
);

export default DeveloperSection;
