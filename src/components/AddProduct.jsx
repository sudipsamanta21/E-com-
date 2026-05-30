import React, { useState } from "react";
import axios from "axios";

const CATEGORIES = [
  { value: "Laptop",     icon: "💻", color: "purple" },
  { value: "Headphone",  icon: "🎧", color: "teal"   },
  { value: "Mobile",     icon: "📱", color: "coral"  },
  { value: "Electronics",icon: "⚡", color: "blue"   },
  { value: "Toys",       icon: "🧸", color: "amber"  },
  { value: "Fashion",    icon: "👗", color: "pink"   },
];

const COLOR_MAP = {
  purple: { bg: "#EEEDFE", border: "#7F77DD", text: "#3C3489", focus: "rgba(127,119,221,0.15)" },
  teal:   { bg: "#E1F5EE", border: "#1D9E75", text: "#085041", focus: "rgba(29,158,117,0.15)"  },
  coral:  { bg: "#FAECE7", border: "#D85A30", text: "#712B13", focus: "rgba(216,90,48,0.15)"   },
  blue:   { bg: "#E6F1FB", border: "#378ADD", text: "#0C447C", focus: "rgba(55,138,221,0.15)"  },
  amber:  { bg: "#FAEEDA", border: "#BA7517", text: "#633806", focus: "rgba(186,117,23,0.15)"  },
  pink:   { bg: "#FBEAF0", border: "#D4537E", text: "#72243E", focus: "rgba(212,83,126,0.15)"  },
};

const styles = {
  wrapper: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    padding: "1.75rem 2rem 2.5rem",
    maxWidth: 680,
    margin: "0 auto",
    boxSizing: "border-box",
  },
  header: {
    background: "#534AB7",
    borderRadius: 12,
    padding: "1.5rem 1.75rem",
    marginBottom: "1.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 400,
    color: "#EEEDFE",
    margin: "0 0 4px",
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
  },
  headerSub: { fontSize: 13, color: "#AFA9EC", margin: 0 },
  headerBadge: {
    background: "#3C3489",
    color: "#CECBF6",
    fontSize: 11,
    fontWeight: 500,
    padding: "5px 12px",
    borderRadius: 8,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
  },
  card: {
    background: "#fff",
    border: "0.5px solid rgba(0,0,0,0.1)",
    borderRadius: 12,
    padding: "1.25rem 1.5rem",
    marginBottom: "1.25rem",
  },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  sectionDot: (color) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: color,
    flexShrink: 0,
  }),
  sectionLabel: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#888780",
  },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 12, fontWeight: 500, color: "#5F5E5A" },
  input: (accentColor, isFocused) => ({
    background: isFocused ? "#fff" : "#F5F4F0",
    border: `1.5px solid ${isFocused ? COLOR_MAP[accentColor].border : "transparent"}`,
    boxShadow: isFocused ? `0 0 0 3px ${COLOR_MAP[accentColor].focus}` : "none",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 14,
    fontFamily: "inherit",
    color: "#2C2C2A",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.15s, box-shadow 0.15s",
  }),
  chars: (warn) => ({
    fontSize: 11,
    color: warn ? "#BA7517" : "#888780",
    textAlign: "right",
    marginTop: 2,
  }),
  priceWrap: { position: "relative" },
  pricePrefix: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 14,
    color: "#888780",
    pointerEvents: "none",
  },
  catGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 },
  catBtn: (color, active) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: "12px 8px",
    borderRadius: 8,
    border: `1.5px solid ${active ? COLOR_MAP[color].border : "transparent"}`,
    cursor: "pointer",
    background: active ? COLOR_MAP[color].bg : "#F5F4F0",
    transition: "all 0.15s",
    fontFamily: "inherit",
  }),
  catIcon: { fontSize: 20 },
  catLabel: (color, active) => ({
    fontSize: 11,
    fontWeight: 500,
    color: active ? COLOR_MAP[color].text : "#5F5E5A",
  }),
  toggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    background: "#F5F4F0",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 12,
  },
  toggleTrack: (on) => ({
    width: 38,
    height: 22,
    borderRadius: 11,
    background: on ? "#1D9E75" : "#ccc",
    position: "relative",
    transition: "background 0.2s",
    flexShrink: 0,
  }),
  toggleThumb: (on) => ({
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: "white",
    position: "absolute",
    top: 3,
    left: on ? 19 : 3,
    transition: "left 0.2s",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
  }),
  badge: (on) => ({
    fontSize: 11,
    fontWeight: 500,
    padding: "3px 10px",
    borderRadius: 8,
    background: on ? "#E1F5EE" : "#F5F4F0",
    color: on ? "#085041" : "#888780",
    border: on ? "none" : "0.5px solid rgba(0,0,0,0.1)",
  }),
  uploadZone: (hasFile) => ({
    border: `1.5px dashed ${hasFile ? "#1D9E75" : "#AFA9EC"}`,
    borderRadius: 12,
    background: hasFile ? "#E1F5EE" : "#EEEDFE",
    padding: "1.75rem",
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.2s",
  }),
  uploadInput: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    cursor: "pointer",
    width: "100%",
    height: "100%",
  },
  uploadIcon: (hasFile) => ({
    fontSize: 28,
    color: hasFile ? "#0F6E56" : "#534AB7",
  }),
  uploadText: (hasFile) => ({
    fontSize: 13,
    color: hasFile ? "#0F6E56" : "#3C3489",
    margin: "6px 0 0",
  }),
  uploadHint: (hasFile) => ({
    fontSize: 11,
    color: hasFile ? "#0F6E56" : "#7F77DD",
    margin: "3px 0 0",
  }),
  stockBarWrap: { marginTop: 10 },
  stockTrack: {
    height: 5,
    borderRadius: 3,
    background: "#E0DED8",
    overflow: "hidden",
    marginTop: 4,
  },
  stockFill: (pct, qty) => ({
    height: "100%",
    borderRadius: 3,
    width: pct + "%",
    background: qty < 10 ? "#E24B4A" : qty < 50 ? "#EF9F27" : "#1D9E75",
    transition: "width 0.3s, background 0.3s",
  }),
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1.75rem",
    paddingTop: "1.25rem",
    borderTop: "0.5px solid rgba(0,0,0,0.1)",
  },
  footerInfo: {
    fontSize: 12,
    color: "#888780",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  btnGroup: { display: "flex", gap: 10 },
  btnGhost: {
    padding: "9px 20px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
    background: "transparent",
    border: "0.5px solid rgba(0,0,0,0.2)",
    color: "#5F5E5A",
    transition: "background 0.15s",
  },
  btnSubmit: (state) => ({
    padding: "9px 20px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
    border: "none",
    background: state === "success" ? "#1D9E75" : state === "loading" ? "#3C3489" : "#534AB7",
    color: "#EEEDFE",
    transition: "all 0.15s",
  }),
};

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "", brand: "", description: "",
    price: "", category: "", stockQuantity: "",
    releaseDate: "", available: false,
  });
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [focus, setFocus] = useState(null);
  const [submitState, setSubmitState] = useState("idle"); // idle | loading | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((p) => ({ ...p, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImage(file); setFileName(file.name); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState("loading");
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    try {
      const response = await axios.post("http://localhost:8080/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product added:", response.data);
      setSubmitState("success");
      setTimeout(() => setSubmitState("idle"), 2500);
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product");
      setSubmitState("idle");
    }
  };

  const stockQty = parseInt(product.stockQuantity) || 0;
  const stockPct = Math.min(stockQty / 500 * 100, 100);

  const inputProps = (name, accentColor, extra = {}) => ({
    name,
    value: product[name],
    onChange: handleChange,
    onFocus: () => setFocus(name),
    onBlur: () => setFocus(null),
    style: { ...styles.input(accentColor, focus === name), ...extra },
  });

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.headerTitle}>Add new product</h2>
          <p style={styles.headerSub}>Fill in the details to publish a new listing</p>
        </div>
        <span style={styles.headerBadge}>New listing</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div style={styles.card}>
          <div style={styles.sectionHead}>
            <div style={styles.sectionDot("#7F77DD")} />
            <span style={styles.sectionLabel}>Basic information</span>
          </div>
          <div style={styles.grid2}>
            <div style={styles.field}>
              <label style={styles.label}>Product name</label>
              <input type="text" placeholder="e.g. Wireless Earbuds Pro" {...inputProps("name", "purple")} />
              <span style={styles.chars(product.name.length > 34)}>{product.name.length} / 40</span>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Brand</label>
              <input type="text" placeholder="e.g. Sony, Apple…" {...inputProps("brand", "purple")} />
            </div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              rows={3}
              placeholder="Describe key features and what makes this product special…"
              {...inputProps("description", "purple", { resize: "vertical", lineHeight: 1.5 })}
            />
            <span style={styles.chars(product.description.length > 255)}>{product.description.length} / 300</span>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div style={styles.card}>
          <div style={styles.sectionHead}>
            <div style={styles.sectionDot("#D85A30")} />
            <span style={styles.sectionLabel}>Pricing & inventory</span>
          </div>
          <div style={styles.grid3}>
            <div style={styles.field}>
              <label style={styles.label}>Price</label>
              <div style={styles.priceWrap}>
                <span style={styles.pricePrefix}>$</span>
                <input
                  type="number" placeholder="0.00" min="0" step="0.01"
                  {...inputProps("price", "coral", { paddingLeft: 28 })}
                />
              </div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Stock quantity</label>
              <input type="number" placeholder="Units available" min="0" {...inputProps("stockQuantity", "coral")} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Release date</label>
              <input type="date" {...inputProps("releaseDate", "coral")} />
            </div>
          </div>
          {stockQty > 0 && (
            <div style={styles.stockBarWrap}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#888780" }}>Stock level</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: stockQty < 10 ? "#A32D2D" : "#5F5E5A" }}>
                  {stockQty} units
                </span>
              </div>
              <div style={styles.stockTrack}>
                <div style={styles.stockFill(stockPct, stockQty)} />
              </div>
            </div>
          )}
        </div>

        {/* Category & Availability */}
        <div style={styles.card}>
          <div style={styles.sectionHead}>
            <div style={styles.sectionDot("#378ADD")} />
            <span style={styles.sectionLabel}>Category</span>
          </div>
          <div style={styles.catGrid}>
            {CATEGORIES.map(({ value, icon, color }) => (
              <button
                key={value}
                type="button"
                style={styles.catBtn(color, product.category === value)}
                onClick={() => setProduct((p) => ({ ...p, category: value }))}
              >
                <span style={styles.catIcon}>{icon}</span>
                <span style={styles.catLabel(color, product.category === value)}>{value}</span>
              </button>
            ))}
          </div>
          <div
            style={styles.toggleRow}
            onClick={() => setProduct((p) => ({ ...p, available: !p.available }))}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>✓</span>
              <span style={{ fontSize: 13, color: "#5F5E5A" }}>Product available for purchase</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={styles.badge(product.available)}>
                {product.available ? "In stock" : "Out of stock"}
              </span>
              <div style={styles.toggleTrack(product.available)}>
                <div style={styles.toggleThumb(product.available)} />
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div style={styles.card}>
          <div style={styles.sectionHead}>
            <div style={styles.sectionDot("#1D9E75")} />
            <span style={styles.sectionLabel}>Product image</span>
          </div>
          <div style={styles.uploadZone(!!fileName)}>
            <input type="file" accept="image/*" onChange={handleImageChange} style={styles.uploadInput} />
            <div style={styles.uploadIcon(!!fileName)}>📷</div>
            <p style={styles.uploadText(!!fileName)}>
              {fileName ? <strong>{fileName}</strong> : <><strong>Browse</strong> or drag & drop</>}
            </p>
            <p style={styles.uploadHint(!!fileName)}>
              {fileName ? "Ready to upload" : "PNG, JPG, WEBP — up to 10 MB"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span style={styles.footerInfo}>
            <span style={{ color: "#1D9E75" }}>✓</span>
            Draft saved automatically
          </span>
          <div style={styles.btnGroup}>
            <button
              type="button"
              style={styles.btnGhost}
              onClick={() => {
                setProduct({ name:"", brand:"", description:"", price:"", category:"", stockQuantity:"", releaseDate:"", available:false });
                setImage(null); setFileName(null);
              }}
            >
              Discard
            </button>
            <button type="submit" style={styles.btnSubmit(submitState)}>
              {submitState === "loading" ? "Publishing…" : submitState === "success" ? "✓ Published!" : "✦ Publish product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
