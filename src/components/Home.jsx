import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

/* ─── colour tokens ─── */
const C = {
  purple50:  "#EEEDFE",
  purple200: "#AFA9EC",
  purple400: "#7F77DD",
  purple600: "#534AB7",
  purple800: "#3C3489",
  teal50:    "#E1F5EE",
  teal600:   "#0F6E56",
  teal800:   "#085041",
  coral50:   "#FCEBEB",
  coral800:  "#A32D2D",
  pink50:    "#FBEAF0",
  pink400:   "#D4537E",
  gray50:    "#F5F4F0",
  gray200:   "#B4B2A9",
  gray400:   "#888780",
  gray600:   "#5F5E5A",
  gray900:   "#2C2C2A",
};

const CATEGORIES = ["All", "Laptop", "Headphone", "Mobile", "Electronics", "Toys", "Fashion"];

/* ─── Hero Banner ─── */
const HeroBanner = () => (
  <div style={{
    background: "linear-gradient(135deg, #534AB7 0%, #3C3489 100%)",
    borderRadius: 16,
    padding: "3rem 2rem",
    marginBottom: "2rem",
    color: "#EEEDFE",
    textAlign: "center",
  }}>
    <h2 style={{
      fontFamily: "Georgia, serif",
      fontStyle: "italic",
      fontSize: 32,
      fontWeight: 400,
      marginBottom: "0.5rem",
    }}>
      Discover Your Next Favorite
    </h2>
    <p style={{ fontSize: 14, opacity: 0.85, marginBottom: "1.5rem" }}>
      Premium electronics, fashion, and lifestyle products at unbeatable prices
    </p>
    <Link to="/" style={{ textDecoration: "none" }}>
      <button style={{
        display: "inline-flex",
        gap: 8,
        alignItems: "center",
        padding: "10px 24px",
        background: "rgba(255,255,255,0.15)",
        border: "0.5px solid rgba(255,255,255,0.25)",
        borderRadius: 20,
        color: "#EEEDFE",
        fontSize: 13,
        fontFamily: "inherit",
        cursor: "pointer",
        fontWeight: 500,
        transition: "all .15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.25)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.15)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
      }}
      >
        <span>Shop now</span>
        <span>→</span>
      </button>
    </Link>
  </div>
);

/* ─── ProductCard ─── */
const ProductCard = ({ product, onAddToCart, liked, onLike }) => {
  const { id, brand, name, price, available, imageUrl } = product;
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid rgba(0,0,0,0.1)",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        opacity: available ? 1 : 0.65,
        filter: available ? "none" : "grayscale(0.4)",
        transition: "all .15s",
        textDecoration: "none",
        color: "inherit",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 12px 24px rgba(0,0,0,0.12)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ position: "relative", height: 160, background: C.purple50, overflow: "hidden" }}>
          <img
            src={imageUrl || `https://placehold.co/300x160/EEEDFE/534AB7?text=${encodeURIComponent(name.slice(0,8))}`}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <span style={{
            position: "absolute", top: 8, left: 8,
            fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 20,
            background: available ? C.teal50 : C.coral50,
            color: available ? C.teal800 : C.coral800,
          }}>
            {available ? "In stock" : "Out of stock"}
          </span>
          <button
            style={{
              position: "absolute", top: 8, right: 8,
              width: 28, height: 28, borderRadius: "50%", border: "none",
              background: liked ? C.pink50 : "rgba(255,255,255,0.9)",
              color: liked ? C.pink400 : C.gray200,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 14, transition: "all .15s",
            }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLike(id); }}
            aria-label={liked ? "Unlike" : "Like"}
          >
            ♥
          </button>
        </div>

        <div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 10, color: C.gray400, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 3px" }}>
              {brand}
            </p>
            <p style={{ fontSize: 13, fontWeight: 500, color: C.gray900, margin: "0 0 8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {name}
            </p>
            <p style={{ fontSize: 15, fontWeight: 500, color: C.purple600, margin: "0 0 10px" }}>
              ${Number(price).toLocaleString()}
            </p>
          </div>
          <button
            style={{
              width: "100%", padding: 8, border: "none", borderRadius: 8,
              fontSize: 12, fontWeight: 500, fontFamily: "inherit",
              cursor: available ? "pointer" : "default",
              background: available ? C.purple600 : C.gray50,
              color: available ? "#EEEDFE" : C.gray400,
              transition: "background .15s",
            }}
            onMouseEnter={(e) => available && (e.currentTarget.style.background = C.purple800)}
            onMouseLeave={(e) => available && (e.currentTarget.style.background = C.purple600)}
            disabled={!available}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (available) onAddToCart(product);
            }}
          >
            {available ? "Add to cart" : "Out of stock"}
          </button>
        </div>
      </Link>
    </div>
  );
};

/* ─── Footer ─── */
const Footer = () => (
  <footer style={{
    background: "#4a619f",
    color: "#EEEDFE",
    padding: "3rem 2rem 2rem",
    marginTop: "4rem",
    fontSize: 13,
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>
        
        {/* Brand column */}
        <div>
          <h4 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 16, marginBottom: "1rem" }}>
            Shop<span style={{ color: "#D85A30" }}>Kart</span>
          </h4>
          <p style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: "1rem" }}>
            Premium electronics, fashion, and lifestyle products delivered right to your door.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {["f", "𝕏", "📷", "in"].map((icon, i) => (
              <button
                key={i}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, transition: "all .15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#EEEDFE"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Shop column */}
        <div>
          <h4 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 16, marginBottom: "1rem" }}>Shop</h4>
          {["All Products", "Best Sellers", "New Arrivals", "Sale Items", "Gift Cards"].map((link) => (
            <a key={link} href="#" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "0.5rem", transition: "color .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EEEDFE")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Support column */}
        <div>
          <h4 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 16, marginBottom: "1rem" }}>Support</h4>
          {["Contact Us", "Track Order", "Shipping Info", "Returns & Refunds", "FAQ"].map((link) => (
            <a key={link} href="#" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "0.5rem", transition: "color .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EEEDFE")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Company column */}
        <div>
          <h4 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 16, marginBottom: "1rem" }}>Company</h4>
          {["About Us", "Press", "Blog", "Careers", "Sustainability"].map((link) => (
            <a key={link} href="#" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "0.5rem", transition: "color .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EEEDFE")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Legal column */}
        <div>
          <h4 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 16, marginBottom: "1rem" }}>Legal</h4>
          {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((link) => (
            <a key={link} href="#" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "0.5rem", transition: "color .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EEEDFE")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "0.5px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
        <p style={{ margin: 0 }}>© 2026 ShopKart. All rights reserved.</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {["🔒 Secure Checkout", "📦 Free Shipping", "↩️ Easy Returns"].map((badge) => (
            <span key={badge} style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "6px 12px", background: "rgba(255,255,255,0.08)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 20 }}>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ─── Home ─── */
const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [liked, setLiked] = useState({});
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImages = async () => {
        const updated = await Promise.all(
          data.map(async (product) => {
            try {
              const res = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              return { ...product, imageUrl: URL.createObjectURL(res.data) };
            } catch {
              return { ...product, imageUrl: null };
            }
          })
        );
        setProducts(updated);
      };
      fetchImages();
    }
  }, [data]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const handleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentCategory = selectedCategory || (activeFilter === "All" ? null : activeFilter);
  const filtered = currentCategory
    ? products.filter((p) => p.category === currentCategory)
    : products;

  if (isError) {
    return (
      <div style={{ textAlign: "center", padding: "6rem 2rem", fontSize: 16, color: C.coral800 }}>
        Something went wrong. Please try again.
      </div>
    );
  }

  return (
    <>
      <div style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        padding: "2rem",
        maxWidth: 1100,
        margin: "0 auto",
        boxSizing: "border-box",
      }}>
        {/* Hero */}
        <HeroBanner />

        {/* Header */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div>
            <h1 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 24, color: C.gray900, margin: "0 0 2px" }}>
              Featured Products
            </h1>
            <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          {!selectedCategory && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: activeFilter === cat ? "none" : "0.5px solid #ddd",
                    background: activeFilter === cat ? C.purple600 : "#fff",
                    color: activeFilter === cat ? "#fff" : C.gray600,
                    fontSize: 12,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    transition: "all .15s",
                  }}
                  onClick={() => setActiveFilter(cat)}
                  onMouseEnter={(e) => {
                    if (activeFilter !== cat) {
                      e.currentTarget.style.borderColor = C.purple600;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeFilter !== cat) {
                      e.currentTarget.style.borderColor = "#ddd";
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        <div style={{ position: "relative" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: 16,
          }}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem 1rem" }}>
                <div style={{ fontSize: 48, color: C.gray200, marginBottom: "0.75rem" }}>🔍</div>
                <p style={{ fontSize: 16, fontWeight: 500, color: C.gray900, margin: "0 0 4px" }}>No products found</p>
                <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>Try a different category</p>
              </div>
            ) : (
              filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  liked={!!liked[product.id]}
                  onLike={handleLike}
                />
              ))
            )}
          </div>

          {/* Toast */}
          <div
            style={{
              position: "absolute",
              bottom: -48,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1D9E75",
              color: "#E1F5EE",
              fontSize: 12,
              fontWeight: 500,
              padding: "7px 18px",
              borderRadius: 20,
              opacity: toastVisible ? 1 : 0,
              transition: "opacity 0.3s",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
          >
            Added to cart!
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;