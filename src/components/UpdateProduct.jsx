import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

/* ─── Google Fonts (injected once) ─── */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400&family=Syne:wght@400;500;600&display=swap";

/* ─── Category config ─── */
const CATEGORIES = [
  { value: "Laptop",      icon: "💻", activeClass: "catLaptop"      },
  { value: "Headphone",   icon: "🎧", activeClass: "catHeadphone"   },
  { value: "Mobile",      icon: "📱", activeClass: "catMobile"      },
  { value: "Electronics", icon: "⚡", activeClass: "catElectronics" },
  { value: "Toys",        icon: "🧸", activeClass: "catToys"        },
  { value: "Fashion",     icon: "👗", activeClass: "catFashion"     },
];

const CAT_ACTIVE = {
  catLaptop:      { border: "#7F77DD", bg: "#EEEDFE", text: "#3C3489" },
  catHeadphone:   { border: "#1D9E75", bg: "#E1F5EE", text: "#085041" },
  catMobile:      { border: "#D85A30", bg: "#FAECE7", text: "#712B13" },
  catElectronics: { border: "#378ADD", bg: "#E6F1FB", text: "#0C447C" },
  catToys:        { border: "#BA7517", bg: "#FAEEDA", text: "#633806" },
  catFashion:     { border: "#D4537E", bg: "#FBEAF0", text: "#72243E" },
};

/* ─── Theme tokens ─── */
const T = {
  bg:        "rgb(245, 242, 239)",   /* warm off-white page bg          */
  surface:   "#4a619f",              /* card surfaces — clean white      */
  surfaceL:  "#F0EDE9",              /* input bg / secondary surface     */
  border:    "rgba(0,0,0,0.08)",     /* subtle borders                   */
  borderH:   "rgba(0,0,0,0.16)",     /* hover / focus borders            */
  text:      "rgba(13,1,1,0.88)",    /* near-black body text             */
  muted:     "rgba(13,1,1,0.45)",    /* secondary / label text           */
  hint:      "rgba(13,1,1,0.10)",    /* ghost bg, dividers               */
  accent:    "#534AB7",              /* purple CTA                       */
  accentHov: "#3C3489",              /* purple hover                     */
  success:   "#1D9E75",              /* green                            */
  successBg: "rgba(29,158,117,0.10)",
  danger:    "#D85A30",              /* coral                            */
  dangerBg:  "rgba(216,90,48,0.08)",
};

/* ─── Shared style factories ─── */
const s = {
  page: {
    padding: "2rem 1.5rem",
    maxWidth: 700,
    margin: "0 auto",
    fontFamily: "'Syne', system-ui, sans-serif",
  },
  card: {
    background: T.surface,
    border: `0.5px solid ${T.border}`,
    borderRadius: 12,
    padding: "1.25rem 1.5rem",
    marginBottom: "1.25rem",
  },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: "1rem",
    paddingBottom: ".75rem",
    borderBottom: `0.5px solid ${T.border}`,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: T.muted,
  },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: ".06em",
    textTransform: "uppercase",
    color: T.muted,
  },
  inp: (focused) => ({
    background: focused ? T.surfaceL : T.surface,
    border: `0.5px solid ${focused ? T.accentHov : T.border}`,
    boxShadow: focused ? `0 0 0 3px rgba(127,119,221,.1)` : "none",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 13,
    fontFamily: "'Syne', system-ui, sans-serif",
    color: T.text,
    outline: "none",
    width: "100%",
    transition: "border-color .15s, box-shadow .15s",
  }),
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 },
};

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [image, setImage]     = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [focus, setFocus]     = useState(null);
  const [saveState, setSaveState] = useState("idle"); // idle | loading | success

  const [form, setForm] = useState({
    id: null, name: "", description: "", brand: "",
    price: "", category: "", releaseDate: "",
    available: false, stockQuantity: "",
  });

  /* inject Google Fonts once */
  useEffect(() => {
    if (!document.querySelector("[data-up-fonts]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONT_HREF;
      link.setAttribute("data-up-fonts", "1");
      document.head.appendChild(link);
    }
  }, []);

  /* fetch product on mount */
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(data);
        setForm(data);

        const imgRes = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        const file = new File([imgRes.data], data.imageName, { type: imgRes.data.type });
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
        setFileName(data.imageName);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveState("loading");
    const fd = new FormData();
    fd.append("imageFile", image);
    fd.append("product", new Blob([JSON.stringify(form)], { type: "application/json" }));
    try {
      await axios.put(`http://localhost:8080/api/product/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSaveState("success");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product. Please try again.");
      setSaveState("idle");
    }
  };

  const stockQty = parseInt(form.stockQuantity) || 0;
  const stockPct = Math.min((stockQty / 500) * 100, 100);
  const stockColor = stockQty < 10 ? "#E24B4A" : stockQty < 50 ? "#EF9F27" : T.success;

  const fp = (name) => ({
    name,
    value: form[name] ?? "",
    onChange: handleChange,
    onFocus: () => setFocus(name),
    onBlur:  () => setFocus(null),
    style: s.inp(focus === name),
  });

  return (
    <div style={s.page}>

      {/* ── Top bar ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.75rem" }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px",
            border: `0.5px solid ${T.border}`,
            borderRadius: 8,
            background: T.surface,
            color: T.muted,
            fontFamily: "'Syne', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: ".05em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <span style={{ fontSize: 12, color: T.muted, letterSpacing: ".04em", textTransform: "uppercase" }}>
          Products <span style={{ opacity: .4 }}>/</span> Edit <span style={{ opacity: .4 }}>/</span>{" "}
          <span style={{ color: T.text }}>{product.name || `#${id}`}</span>
        </span>
      </div>

      {/* ── Hero strip ── */}
      <div style={{
        ...s.card,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: 26,
            fontWeight: 400,
            color: T.text,
            letterSpacing: "-.3px",
          }}>
            Edit product
          </div>
          <div style={{ fontSize: 12, color: T.muted, letterSpacing: ".04em", textTransform: "uppercase", marginTop: 3 }}>
            ID #{id} · {product.name || "Loading…"}
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "6px 14px",
          background: T.successBg,
          borderRadius: 20,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success }} />
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: "#085041" }}>
            Live
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* ── Basic info ── */}
        <div style={s.card}>
          <div style={s.sectionHead}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7F77DD", flexShrink: 0 }} />
            <span style={s.sectionLabel}>Basic information</span>
          </div>
          <div style={s.grid2}>
            <div style={s.field}>
              <label style={s.label}>Product name</label>
              <input type="text" placeholder="e.g. Wireless Earbuds" {...fp("name")} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Brand</label>
              <input type="text" placeholder="e.g. Sony, Apple…" {...fp("brand")} />
            </div>
          </div>
          <div style={s.field}>
            <label style={s.label}>Description</label>
            <textarea
              rows={3}
              placeholder="Describe key features…"
              {...fp("description")}
              style={{ ...s.inp(focus === "description"), resize: "vertical", lineHeight: 1.6 }}
            />
          </div>
        </div>

        {/* ── Pricing & inventory ── */}
        <div style={s.card}>
          <div style={s.sectionHead}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D85A30", flexShrink: 0 }} />
            <span style={s.sectionLabel}>Pricing & inventory</span>
          </div>
          <div style={s.grid3}>
            <div style={s.field}>
              <label style={s.label}>Price</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)",
                  fontSize: 13, color: T.muted, pointerEvents: "none",
                }}>$</span>
                <input
                  type="number" placeholder="0.00" min="0" step="0.01"
                  {...fp("price")}
                  style={{ ...s.inp(focus === "price"), paddingLeft: 26 }}
                />
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Stock quantity</label>
              <input type="number" placeholder="Units" min="0" {...fp("stockQuantity")} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Release date</label>
              <input type="date" {...fp("releaseDate")} />
            </div>
          </div>

          {/* Stock bar */}
          {stockQty > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: T.muted }}>
                  Stock level
                </span>
                <span style={{ fontSize: 11, fontWeight: 500, color: stockColor }}>
                  {stockQty} units
                </span>
              </div>
              <div style={{
                height: 4, borderRadius: 2,
                background: T.border,
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  width: stockPct + "%",
                  background: stockColor,
                  transition: "width .3s, background .3s",
                }} />
              </div>
            </div>
          )}
        </div>

        {/* ── Category ── */}
        <div style={s.card}>
          <div style={s.sectionHead}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#378ADD", flexShrink: 0 }} />
            <span style={s.sectionLabel}>Category</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 7 }}>
            {CATEGORIES.map(({ value, icon, activeClass }) => {
              const active = form.category === value;
              const c = CAT_ACTIVE[activeClass];
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, category: value }))}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    padding: "10px 4px",
                    borderRadius: 8,
                    border: `0.5px solid ${active ? c.border : T.border}`,
                    background: active ? c.bg : T.surface,
                    cursor: "pointer",
                    transition: "all .15s",
                    fontFamily: "'Syne', system-ui, sans-serif",
                  }}
                >
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 500,
                    letterSpacing: ".04em", textTransform: "uppercase",
                    color: active ? c.text : T.muted,
                  }}>
                    {value}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Availability toggle */}
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 14px", marginTop: 12,
              background: T.surfaceL,
              border: `0.5px solid ${T.border}`,
              borderRadius: 8, cursor: "pointer",
            }}
            onClick={() => setForm((p) => ({ ...p, available: !p.available }))}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ fontSize: 14, color: T.muted }}>✓</span>
              <span style={{
                fontSize: 12, fontWeight: 500,
                letterSpacing: ".04em", textTransform: "uppercase", color: T.muted,
              }}>
                Available for purchase
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontSize: 10, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase",
                padding: "3px 10px", borderRadius: 20,
                background: form.available ? T.successBg : "transparent",
                border: form.available ? "none" : `0.5px solid ${T.border}`,
                color: form.available ? "#085041" : T.muted,
              }}>
                {form.available ? "In stock" : "Out of stock"}
              </span>
              {/* Track */}
              <div style={{
                width: 36, height: 20, borderRadius: 10, position: "relative",
                background: form.available ? T.success : T.borderH,
                flexShrink: 0, transition: "background .2s",
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: "50%", background: "#fff",
                  position: "absolute", top: 3,
                  left: form.available ? 19 : 3,
                  transition: "left .2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,.3)",
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Image ── */}
        <div style={s.card}>
          <div style={s.sectionHead}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success, flexShrink: 0 }} />
            <span style={s.sectionLabel}>Product image</span>
          </div>

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.imageName}
              style={{
                width: "100%", aspectRatio: "16/7", objectFit: "cover",
                borderRadius: 8, display: "block", marginBottom: 10,
              }}
            />
          ) : (
            <div style={{
              width: "100%", aspectRatio: "16/7",
              borderRadius: 8, background: T.surfaceL,
              border: `0.5px dashed ${T.borderH}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 6,
              marginBottom: 10,
            }}>
              <span style={{ fontSize: 28, color: T.muted }}>📷</span>
              <span style={{ fontSize: 12, color: T.muted, letterSpacing: ".04em" }}>
                No image uploaded
              </span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name="imageUrl"
            style={s.inp(false)}
          />
          {fileName && (
            <span style={{ fontSize: 11, color: T.muted, marginTop: 4, display: "block" }}>
              {fileName}
            </span>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "1.25rem",
          borderTop: `0.5px solid ${T.border}`,
        }}>
          <span style={{ fontSize: 12, color: T.muted, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ color: T.success }}>✓</span> Changes saved automatically
          </span>

          <div style={{ display: "flex", gap: 10 }}>
            {/* Discard */}
            <button
              type="button"
              onClick={() => setForm(product)}
              style={{
                padding: "9px 18px", borderRadius: 8,
                fontSize: 12, fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase",
                fontFamily: "'Syne', system-ui, sans-serif",
                cursor: "pointer",
                background: "transparent",
                border: `0.5px solid ${T.border}`,
                color: T.muted,
              }}
            >
              Discard
            </button>

            {/* Save */}
            <button
              type="submit"
              style={{
                padding: "9px 22px", borderRadius: 8,
                fontSize: 12, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase",
                fontFamily: "'Syne', system-ui, sans-serif",
                cursor: "pointer",
                border: "none",
                background:
                  saveState === "success" ? T.success :
                  saveState === "loading" ? T.accentHov : T.accent,
                color: "#EEEDFE",
                transition: "background .2s",
              }}
            >
              {saveState === "loading" ? "Saving…"
               : saveState === "success" ? "✓ Saved!"
               : "Save changes"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}