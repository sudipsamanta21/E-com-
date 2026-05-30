import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";

/* ─── Inline styles ─── */
const S = {
  wrapper: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    padding: "1.75rem 2rem 2.5rem",
    maxWidth: 720,
    margin: "0 auto",
    boxSizing: "border-box",
  },
  header: {
    background: "#534AB7",
    borderRadius: 12,
    padding: "1.25rem 1.5rem",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    fontSize: 22,
    fontWeight: 400,
    color: "#EEEDFE",
    margin: "0 0 2px",
  },
  headerMeta: { fontSize: 12, color: "#AFA9EC", margin: 0 },
  headerBadge: {
    background: "#3C3489",
    color: "#CECBF6",
    fontSize: 11,
    fontWeight: 500,
    padding: "4px 14px",
    borderRadius: 20,
    whiteSpace: "nowrap",
  },

  /* cart item */
  item: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 16px",
    background: "#fff",
    border: "0.5px solid rgba(0,0,0,0.1)",
    borderRadius: 12,
    marginBottom: 10,
  },
  itemImg: {
    width: 64,
    height: 64,
    borderRadius: 10,
    objectFit: "cover",
    background: "#EEEDFE",
    flexShrink: 0,
  },
  itemInfo: { flex: 1, minWidth: 0 },
  itemBrand: {
    fontSize: 11,
    color: "#888780",
    margin: "0 0 2px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  itemName: {
    fontSize: 14,
    fontWeight: 500,
    color: "#2C2C2A",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  /* quantity controls */
  qtyWrap: { display: "flex", alignItems: "center", gap: 6 },
  qtyBtn: (hovered) => ({
    width: 28,
    height: 28,
    borderRadius: 6,
    border: `0.5px solid ${hovered ? "#7F77DD" : "rgba(0,0,0,0.15)"}`,
    background: hovered ? "#EEEDFE" : "#F5F4F0",
    color: hovered ? "#3C3489" : "#5F5E5A",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .15s",
    lineHeight: 1,
  }),
  qtyVal: {
    width: 28,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    color: "#2C2C2A",
  },

  itemPrice: {
    fontSize: 15,
    fontWeight: 500,
    color: "#534AB7",
    minWidth: 60,
    textAlign: "right",
  },
  heartBtn: (liked) => ({
    width: 30,
    height: 30,
    borderRadius: 6,
    border: "none",
    background: liked ? "#FBEAF0" : "transparent",
    color: liked ? "#D4537E" : "#B4B2A9",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 17,
    transition: "all .15s",
    flexShrink: 0,
  }),
  deleteBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    border: "none",
    background: "transparent",
    color: "#B4B2A9",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 17,
    transition: "all .15s",
    flexShrink: 0,
  },

  /* summary */
  summary: {
    background: "#fff",
    border: "0.5px solid rgba(0,0,0,0.1)",
    borderRadius: 12,
    padding: "1.25rem 1.5rem",
    marginTop: "1rem",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 0",
    fontSize: 13,
    color: "#5F5E5A",
    borderBottom: "0.5px solid rgba(0,0,0,0.08)",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0 4px",
  },
  totalLabel: { fontSize: 15, fontWeight: 500, color: "#2C2C2A" },
  totalVal: { fontSize: 20, fontWeight: 500, color: "#534AB7" },
  checkoutBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: 10,
    background: "#534AB7",
    color: "#EEEDFE",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
    marginTop: 12,
    transition: "background .15s",
  },

  /* empty state */
  empty: {
    textAlign: "center",
    padding: "4rem 1rem",
    background: "#fff",
    border: "0.5px solid rgba(0,0,0,0.1)",
    borderRadius: 12,
  },
  emptyIcon: { fontSize: 48, color: "#D3D1C7", marginBottom: "1rem" },
  emptyTitle: { fontSize: 16, fontWeight: 500, color: "#2C2C2A", margin: "0 0 6px" },
  emptySub: { fontSize: 13, color: "#888780", margin: 0 },
};

/* ─── CartItem sub-component ─── */
const CartItem = ({ item, onIncrease, onDecrease, onRemove, onLike }) => {
  const [delHover, setDelHover] = useState(false);
  const [incHover, setIncHover] = useState(false);
  const [decHover, setDecHover] = useState(false);

  return (
    <div style={S.item}>
      <button
        style={S.heartBtn(item.liked)}
        onClick={() => onLike(item.id)}
        aria-label={item.liked ? "Unlike" : "Like"}
      >
        ♥
      </button>

      <img
        src={item.imageUrl || "https://placehold.co/64x64/EEEDFE/534AB7?text=📦"}
        alt={item.name}
        style={S.itemImg}
      />

      <div style={S.itemInfo}>
        <p style={S.itemBrand}>{item.brand}</p>
        <p style={S.itemName}>{item.name}</p>
      </div>

      <div style={S.qtyWrap}>
        <button
          style={S.qtyBtn(decHover)}
          onMouseEnter={() => setDecHover(true)}
          onMouseLeave={() => setDecHover(false)}
          onClick={() => onDecrease(item.id)}
          aria-label="Decrease"
        >
          −
        </button>
        <span style={S.qtyVal}>{item.quantity}</span>
        <button
          style={S.qtyBtn(incHover)}
          onMouseEnter={() => setIncHover(true)}
          onMouseLeave={() => setIncHover(false)}
          onClick={() => onIncrease(item.id)}
          aria-label="Increase"
        >
          +
        </button>
      </div>

      <div style={S.itemPrice}>${(item.price * item.quantity).toFixed(2)}</div>

      <button
        style={{
          ...S.deleteBtn,
          background: delHover ? "#FCEBEB" : "transparent",
          color: delHover ? "#A32D2D" : "#B4B2A9",
        }}
        onMouseEnter={() => setDelHover(true)}
        onMouseLeave={() => setDelHover(false)}
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        🗑
      </button>
    </div>
  );
};

/* ─── Main Cart ─── */
const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  const [cartItems, setCartItems]   = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal]   = useState(false);
  const [liked, setLiked]           = useState({});

  /* ── Fetch product images and merge into cart items ── */
  useEffect(() => {
    const fetchImagesAndUpdateCart = async () => {
      try {
        const { data: allProducts } = await axios.get("http://localhost:8080/api/products");
        const backendIds = allProducts.map((p) => p.id);
        const validCart  = cart.filter((item) => backendIds.includes(item.id));

        const itemsWithImages = await Promise.all(
          validCart.map(async (item) => {
            try {
              const res = await axios.get(
                `http://localhost:8080/api/product/${item.id}/image`,
                { responseType: "blob" }
              );
              // ✅ FIX: attach imageFile directly to each item instead of shared state
              const imageFile = new File(
                [res.data],
                item.imageName || "image",
                { type: res.data.type }
              );
              const imageUrl = URL.createObjectURL(res.data);
              return { ...item, imageUrl, imageFile };
            } catch {
              return { ...item, imageUrl: null, imageFile: null };
            }
          })
        );

        setCartItems(itemsWithImages);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (cart.length) fetchImagesAndUpdateCart();
    else setCartItems([]);
  }, [cart]);

  /* ── Recalculate total whenever items change ── */
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (item.quantity >= item.stockQuantity) {
          alert("Cannot add more than available stock");
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      })
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /* ── Checkout: use each item's own imageFile ── */
  const handleCheckout = async () => {
    try {
      await Promise.all(
        cartItems.map(async (item) => {
          const { imageUrl, imageName, imageData, imageType, quantity, imageFile, ...rest } = item;
          const updatedProduct = { ...rest, stockQuantity: item.stockQuantity - item.quantity };

          const formData = new FormData();
          // ✅ FIX: use item.imageFile (per-item) instead of shared cartImage state
          if (imageFile) formData.append("imageFile", imageFile);
          formData.append(
            "product",
            new Blob([JSON.stringify(updatedProduct)], { type: "application/json" })
          );

          await axios.put(`http://localhost:8080/api/product/${item.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        })
      );

      clearCart();
      setCartItems([]);
      setShowModal(false);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  const tax        = totalPrice * 0.08;
  const grandTotal = totalPrice + tax;
  const itemCount  = cartItems.length;

  return (
    <div style={S.wrapper}>

      {/* ── Header ── */}
      <div style={S.header}>
        <div>
          <h1 style={S.headerTitle}>Shopping Bag</h1>
          <p style={S.headerMeta}>{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
        </div>
        <span style={S.headerBadge}>{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
      </div>

      {/* ── Items or empty state ── */}
      {cartItems.length === 0 ? (
        <div style={S.empty}>
          <div style={S.emptyIcon}>🛍</div>
          <p style={S.emptyTitle}>Your bag is empty</p>
          <p style={S.emptySub}>Add some products to get started</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{ ...item, liked: !!liked[item.id] }}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
              onLike={handleLike}
            />
          ))}

          {/* ── Order summary ── */}
          <div style={S.summary}>
            <div style={S.summaryRow}>
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={S.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: "#1D9E75", fontWeight: 500 }}>Free</span>
            </div>
            <div style={{ ...S.summaryRow, borderBottom: "none" }}>
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={S.totalRow}>
              <span style={S.totalLabel}>Total</span>
              <span style={S.totalVal}>${grandTotal.toFixed(2)}</span>
            </div>

            {/* ✅ FIX: e.currentTarget instead of e.target */}
            <button
              style={S.checkoutBtn}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#3C3489")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#534AB7")}
              onClick={() => setShowModal(true)}
            >
              🔒 &nbsp; Proceed to checkout
            </button>
          </div>
        </>
      )}

      {/* ── Checkout popup ── */}
      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={grandTotal}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;