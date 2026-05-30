import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

/* ─── Google Fonts ─── */
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Syne:wght@400;500;600&display=swap";

/* ─── Category config ─── */
const CATEGORIES = ["Laptop", "Headphone", "Mobile", "Electronics", "Toys", "Fashion"];

const CAT_COLORS = {
  Laptop:      "#7F77DD",
  Headphone:   "#1D9E75",
  Mobile:      "#D85A30",
  Electronics: "#378ADD",
  Toys:        "#BA7517",
  Fashion:     "#D4537E",
};

/* ─── Theme tokens ─── */
const DARK = {
  bg:          "#0A0908",
  surface:     "#111110",
  border:      "rgba(255,255,255,0.07)",
  borderH:     "rgba(255,255,255,0.14)",
  text:        "rgba(255,255,255,0.88)",
  muted:       "rgba(255,255,255,0.38)",
  hint:        "rgba(255,255,255,0.16)",
  accent:      "#D85A30",
  accentDim:   "rgba(216,90,48,0.12)",
  accentBorder:"rgba(216,90,48,0.25)",
  dropBg:      "#161614",
  catTagBg:    "rgba(255,255,255,0.045)",
};

const LIGHT = {
  bg:          "#F5F3EF",
  surface:     "#EDEAE4",
  border:      "rgba(0,0,0,0.08)",
  borderH:     "rgba(0,0,0,0.14)",
  text:        "rgba(10,9,8,0.88)",
  muted:       "rgba(10,9,8,0.42)",
  hint:        "rgba(10,9,8,0.07)",
  accent:      "#D85A30",
  accentDim:   "rgba(216,90,48,0.10)",
  accentBorder:"rgba(216,90,48,0.22)",
  dropBg:      "#F0EDE8",
  catTagBg:    "rgba(0,0,0,0.04)",
};

/* ─── Navbar ─── */
const Navbar = ({ onSelectCategory, onSearch }) => {
  const { cart } = useContext(AppContext);
  const location = useLocation();

  const getInitialTheme = () => localStorage.getItem("theme") || "dark-theme";
  const [theme, setTheme]               = useState(getInitialTheme);
  const [input, setInput]               = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults]       = useState(false);
  const [showResults, setShowResults]   = useState(false);
  const [catOpen, setCatOpen]           = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const searchRef = useRef(null);
  const catRef    = useRef(null);
  const T = theme === "dark-theme" ? DARK : LIGHT;

  /* inject Google Fonts once */
  useEffect(() => {
    if (!document.querySelector('link[data-shopkart-fonts]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONT_LINK;
      link.setAttribute("data-shopkart-fonts", "1");
      document.head.appendChild(link);
    }
  }, []);

  /* apply theme to body */
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (catRef.current    && !catRef.current.contains(e.target))    setCatOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = async (value) => {
    setInput(value);
    if (onSearch) onSearch(value);
    if (value.length < 1) {
      setShowResults(false);
      setSearchResults([]);
      setNoResults(false);
      return;
    }
    try {
      const res = await axios.get(
           `http://localhost:8080/api/products/search?keyword=${encodeURIComponent(value)}`
      );
      console.log("Search:", value);
      console.log("Response:", res.data);
      setSearchResults(res.data);
      setNoResults(res.data.length === 0);
      setShowResults(true);
    } catch {
      setNoResults(true);
      setShowResults(true);
    }
  };

  const toggleTheme = () =>
    setTheme((t) => (t === "dark-theme" ? "light-theme" : "dark-theme"));

  const cartCount = cart?.reduce((t, i) => t + i.quantity, 0) || 0;

  /* ── Shared style helpers ── */
  const navLink = (active) => ({
    fontFamily: "'Syne', system-ui, sans-serif",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: active ? T.text : T.muted,
    padding: "7px 14px",
    borderRadius: 6,
    cursor: "pointer",
    border: "none",
    background: active ? T.hint : "transparent",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 5,
    transition: "color .15s, background .15s",
    whiteSpace: "nowrap",
  });

  const iconBtn = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: T.surface,
    border: `0.5px solid ${T.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: T.muted,
    fontSize: 16,
    transition: "border-color .15s, color .15s, background .15s",
    flexShrink: 0,
  };

  return (
    <header>
      <nav style={{
        background:"#495d93",
        borderBottom: `0.5px solid ${T.border}`,
        padding: "0 28px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        fontFamily: "'Syne', system-ui, sans-serif",
        transition: "background .2s",
      }}>

        {/* ── Brand ── */}
        <a href="/" style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontSize: 24,
          color: "#fff",
          textDecoration: "none",
          letterSpacing: "-0.3px",
          flexShrink: 0,
        }}>
          Shop<span style={{ color: T.accent }}>Kart</span>
        </a>

        {/* ── Center nav ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              style={navLink(location.pathname === "/")}
              onMouseEnter={(e) => { e.currentTarget.style.color = T.text; e.currentTarget.style.background = T.hint; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = location.pathname === "/" ? T.text : T.muted; e.currentTarget.style.background = location.pathname === "/" ? T.hint : "transparent"; }}
            >
              Home
            </button>
          </Link>
          <Link to="/developers" style={{ textDecoration: "none" }}>
            <button
              style={navLink(location.pathname === "/")}
              onMouseEnter={(e) => { e.currentTarget.style.color = T.text; e.currentTarget.style.background = T.hint; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = location.pathname === "/" ? T.text : T.muted; e.currentTarget.style.background = location.pathname === "/" ? T.hint : "transparent"; }}
            >
              Developers
            </button>
          </Link>

          <Link to="/add_product" style={{ textDecoration: "none" }}>
            <button
              style={navLink(location.pathname === "/add_product")}
              onMouseEnter={(e) => { e.currentTarget.style.color = T.text; e.currentTarget.style.background = T.hint; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = location.pathname === "/add_product" ? T.text : T.muted; e.currentTarget.style.background = location.pathname === "/add_product" ? T.hint : "transparent"; }}
            >
              Add product
            </button>
          </Link>

          {/* Categories dropdown */}
          <div ref={catRef} style={{ position: "relative" }}>
            <button
              onClick={() => setCatOpen((o) => !o)}
              style={navLink(catOpen)}
              onMouseEnter={(e) => { e.currentTarget.style.color = T.text; e.currentTarget.style.background = T.hint; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = catOpen ? T.text : T.muted; e.currentTarget.style.background = catOpen ? T.hint : "transparent"; }}
            >
              Categories
              <svg
                width="9" height="9" viewBox="0 0 10 10" fill="none"
                style={{ transform: catOpen ? "rotate(180deg)" : "none", transition: "transform .18s", opacity: 0.5 }}
              >
                <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Dropdown panel */}
            <div style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: "50%",
              transform: catOpen ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-6px)",
              background: T.dropBg,
              border: `0.5px solid ${T.borderH}`,
              borderRadius: 12,
              padding: 8,
              minWidth: 200,
              zIndex: 200,
              opacity: catOpen ? 1 : 0,
              pointerEvents: catOpen ? "all" : "none",
              transition: "opacity .15s, transform .15s",
            }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { onSelectCategory(cat); setCatOpen(false); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    width: "100%",
                    padding: "9px 12px",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: T.muted,
                    background: "transparent",
                    border: "none",
                    borderRadius: 7,
                    cursor: "pointer",
                    fontFamily: "'Syne', system-ui, sans-serif",
                    textAlign: "left",
                    transition: "background .12s, color .12s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = T.hint; e.currentTarget.style.color = T.text; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.muted; }}
                >
                  <div style={{
                    width: 6, height: 6,
                    borderRadius: "50%",
                    background: CAT_COLORS[cat],
                    flexShrink: 0,
                  }} />
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right side ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

          {/* Search */}
          <div ref={searchRef} style={{ position: "relative" }}>
            <div style={{ position: "relative" }}>
              <svg
                width="13" height="13" viewBox="0 0 14 14" fill="none"
                style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: T.muted, pointerEvents: "none" }}
              >
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M9.5 9.5 L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input
                type="search"
                placeholder="Search products…"
                value={input}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => { setSearchExpanded(true); if (input) setShowResults(true); }}
                onBlur={() => setSearchExpanded(false)}
                style={{
                  background: T.surface,
                  border: `0.5px solid ${T.border}`,
                  borderRadius: 22,
                  padding: "8px 16px 8px 36px",
                  fontSize: 12,
                  fontFamily: "'Syne', system-ui, sans-serif",
                  color: T.text,
                  outline: "none",
                  width: searchExpanded ? 240 : 190,
                  letterSpacing: "0.02em",
                  transition: "width .22s cubic-bezier(.4,0,.2,1), border-color .15s",
                }}
              />
            </div>

            {showResults && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                right: 0,
                background: "#f8fafb",
                border: `0.5px solid ${T.borderH}`,
                borderRadius: 12,
                overflow: "hidden",
                zIndex: 200,
                minWidth: 250,
              }}>
                {searchResults.length > 0 ? searchResults.map((r) => (
                  <a key={r.id} href={`/product/${r.id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        padding: "11px 16px",
                        fontSize: 12.5,
                        color: "#000000",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        borderBottom: `0.5px solid ${T.border}`,
                        cursor: "pointer",
                        transition: "background .1s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = T.hint; e.currentTarget.style.color = T.text; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.muted; }}
                    >
                      <div>{r.name}</div>
                      {r.brand && (
                        <div style={{ fontSize: 11, color: T.hint, marginTop: 2, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                          {r.brand}
                        </div>
                      )}
                    </div>
                  </a>
                )) : noResults && (
                  <div style={{ padding: "12px 16px", fontSize: 12.5, color: T.muted, textAlign: "center" }}>
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ width: "0.5px", height: 18, background: T.border }} />

          {/* Cart */}
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                background: T.surface,
                border: `0.5px solid ${T.border}`,
                borderRadius: 22,
                cursor: "pointer",
                color: T.muted,
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "border-color .15s, background .15s, color .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.borderH;
                e.currentTarget.style.background   = T.hint;
                e.currentTarget.style.color         = T.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.background   = T.surface;
                e.currentTarget.style.color         = T.muted;
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 L3 6 v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Cart
              {cartCount > 0 && (
                <span style={{
                  background: T.accent,
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 600,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={iconBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.borderH;
              e.currentTarget.style.color        = T.text;
              e.currentTarget.style.background   = T.hint;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.color        = T.muted;
              e.currentTarget.style.background   = T.surface;
            }}
          >
            {theme === "dark-theme" ? (
              /* Sun icon */
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1"     x2="12" y2="3"/>
                <line x1="12" y1="21"    x2="12" y2="23"/>
                <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1"  y1="12"    x2="3"  y2="12"/>
                <line x1="21" y1="12"    x2="23" y2="12"/>
                <line x1="4.22" y1="19.78"  x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;