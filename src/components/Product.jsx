import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage(response.data.imageName);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async (imageName) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8080/api/product/${id}`);
        removeFromCart(id);
        alert("Product deleted successfully");
        refreshData();
        navigate("/");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handlAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  if (!product) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Column - Image */}
        <div style={styles.imageSection}>
          <div style={styles.imageContainer}>
            <img
              src={imageUrl || "https://via.placeholder.com/400?text=No+Image"}
              alt={product.name}
              style={styles.productImage}
            />
            {!product.available && (
              <div style={styles.outOfStockBadge}>Out of Stock</div>
            )}
          </div>
        </div>

        {/* Right Column - Details */}
        <div style={styles.detailsSection}>
          <div style={styles.categoryBadge}>{product.category}</div>
          
          <h1 style={styles.productName}>{product.name}</h1>
          <h3 style={styles.brandName}>{product.brand}</h3>
          
          <div style={styles.priceTag}>
            ${product.price.toFixed(2)}
          </div>

          <p style={styles.description}>{product.description}</p>

          {/* Stock & Release Info */}
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Availability</span>
              <span style={{
                ...styles.infoValue,
                color: product.available ? "#10b981" : "#ef4444"
              }}>
                {product.available ? `In Stock (${product.stockQuantity})` : "Out of Stock"}
              </span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Listed Date</span>
              <span style={styles.infoValue}>
                {new Date(product.releaseDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button
              style={{
                ...styles.addToCartButton,
                backgroundColor: product.available ? "#2563eb" : "#94a3b8",
                cursor: product.available ? "pointer" : "not-allowed"
              }}
              onClick={handlAddToCart}
              disabled={!product.available}
            >
              {product.available ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>

          {/* Admin Actions */}
          <div style={styles.adminSection}>
            <h4 style={styles.adminTitle}>Admin Actions</h4>
            <div style={styles.adminButtons}>
              <button
                style={styles.updateButton}
                onClick={handleEditClick}
              >
                ✏️ Update Product
              </button>
              <button
                style={styles.deleteButton}
                onClick={deleteProduct}
              >
                🗑️ Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    maxWidth: "900px",
    width: "100%",
    flexWrap: "wrap",
  },
  imageSection: {
    flex: "1 1 400px",
    backgroundColor: "#f9fafb",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "350px",
  },
  productImage: {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
    objectFit: "cover",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  outOfStockBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#ef4444",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "0.875rem",
  },
  detailsSection: {
    flex: "1 1 400px",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
  },
  categoryBadge: {
    display: "inline-block",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    alignSelf: "flex-start",
    marginBottom: "1rem",
  },
  productName: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 0.5rem 0",
    lineHeight: "1.2",
  },
  brandName: {
    fontSize: "1.125rem",
    fontWeight: "500",
    color: "#6b7280",
    margin: "0 0 1.5rem 0",
  },
  priceTag: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#2563eb",
    marginBottom: "1.5rem",
  },
  description: {
    fontSize: "1rem",
    color: "#4b5563",
    lineHeight: "1.75",
    marginBottom: "2rem",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    marginBottom: "2rem",
    padding: "1rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
  },
  infoLabel: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    color: "#9ca3af",
    fontWeight: "600",
    marginBottom: "0.25rem",
  },
  infoValue: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#111827",
  },
  actionButtons: {
    marginBottom: "2rem",
  },
  addToCartButton: {
    width: "100%",
    padding: "1rem",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "1.125rem",
    fontWeight: "600",
    transition: "all 0.2s",
    boxShadow: "0 4px 6px rgba(37, 99, 235, 0.2)",
  },
  adminSection: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: "1.5rem",
  },
  adminTitle: {
    fontSize: "0.875rem",
    color: "#6b7280",
    fontWeight: "600",
    marginBottom: "1rem",
    textTransform: "uppercase",
  },
  adminButtons: {
    display: "flex",
    gap: "1rem",
  },
  updateButton: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#ffffff",
    border: "2px solid #2563eb",
    color: "#2563eb",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  deleteButton: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#ffffff",
    border: "2px solid #ef4444",
    color: "#ef4444",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Product;