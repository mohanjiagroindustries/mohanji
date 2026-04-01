import React, { useState, useEffect } from "react";
import axios from "axios";

// Static local imports
import p1 from "../assets/Products/manure.png";
import p2 from "../assets/Products/rawhoney.png";
import p3 from "../assets/Products/df1.png";
import p11 from "../assets/Products/df2.png";
import p4 from "../assets/Products/fnv1.png";
import p12 from "../assets/Products/fnv2.png";
import p13 from "../assets/Products/fnv3.png";
import p5 from "../assets/Products/poultry.png";
import p6 from "../assets/Products/SNC1.png";
import p14 from "../assets/Products/snc2.png";
import p7 from "../assets/Products/gnp1.png";
import p15 from "../assets/Products/gnp2.png";
import p8 from "../assets/Products/saffron.png";
import p16 from "../assets/Products/saffron2.png";
import p9 from "../assets/Products/desighee.png";
import p10 from "../assets/Products/powder.png";
import p17 from "../assets/Products/jaggery.jpeg";
import p18 from "../assets/Products/edibleoil.jpeg";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const COLORS = {
  PRIMARY: "#21421e",
  SECONDARY: "#d4a574",
  ACCENT: "#f5f5dc",
  DARK_TEXT: "#333333",
};

// ─── Static flagship details ───────────────────────────────────────────────────
const flagshipDetails = {
  manure: {
    title: "Heavyweight Fermented Organic Manure",
    image: p1,
    slogan: "Premium • Powerful • 100% Organic",
    shortDesc:
      "FOM (Fermented Organic Manure) is a nutrient-rich by-product of biogas plant consists of human waste, bio waste, kitchen waste, animal waste, cow dung, it contains essential micronutrients, microalgae, natural amino acids, nitrogen, phosphorus, magnesium, and calcium.",
    longDesc:
      "Heavyweight is a high-performance fermented organic manure developed by Mohanji Agro Industries, designed to transform soil health and maximize crop productivity. Formulated through advanced natural fermentation processes, Heavyweight delivers three times more nutrient potency than traditional vermicompost or regular organic manures.",
    features: [
      "3x more powerful than standard organic manure",
      "Enhances soil structure and increases fertility naturally",
      "Boosts microbial life for long-term soil rejuvenation",
      "Improves water retention, root strength, and nutrient absorption",
      "Completely chemical-free, residue-free, and safe for all crops",
      "Suitable for fruits, vegetables, cereals, flowers, plantations & horticulture",
    ],
    benefits: [
      "Ideal for terrace farming, home gardens, kitchen gardens, small fields, pots",
      "Higher and healthier crop yields",
      "Better resistance to pests and diseases",
      "Improved soil quality for future seasons",
      "Cost-effective and environment-friendly farming solution",
    ],
    footer:
      "Heavyweight stands for purity, performance, and sustainable agriculture.",
  },
  honey: {
    title: "Pure Raw Honey",
    image: p2,
    slogan: "Pure • Unprocessed • Nutrition Every Day",
    shortDesc:
      "Pure Raw Honey is a premium, 100% natural and unprocessed honey, harvested from the finest apiaries to deliver authentic taste, rich nutrition, and daily wellness.",
    longDesc:
      "Produced and sourced from quality apiaries, crafted at our farms in Vajreshwari. Packed without heating or refining, preserving all its natural enzymes, antioxidants, pollen, and medicinal properties.",
    features: [
      "Raw and unprocessed",
      "Produced from nectar of 7 different kinds of flowers",
      "Retains natural enzymes, pollen, and antioxidants",
      "No added sugars, chemicals, or preservatives",
      "Rich golden texture with authentic floral aroma",
    ],
    benefits: [
      "Boosts immunity and supports respiratory health",
      "Enhances digestion and gut wellness",
      "Provides natural energy throughout the day",
      "Powerful antioxidant support",
      "Supports improving cholesterol levels",
    ],
    footer: "Our Raw Honey stands for purity, trust, and health.",
  },
};

const staticProducts = [
  {
    name: "Heavyweight Fermented Organic Manure",
    image: p1,
    desc: "Premium • Powerful • 100% Organic",
    highlight: true,
    id: "manure",
  },
  {
    name: "Pure Raw Honey",
    image: p2,
    desc: "Pure • Unprocessed • Nutrition Every Day",
    highlight: true,
    id: "honey",
  },
  {
    name: "Premium Dry Fruits & Nuts",
    image: p3,
    images: [p3, p11],
    desc: "Almonds, Cashews, Walnuts, Raisins & more",
    id: "dryfruits",
  },
  {
    name: "Fresh Fruits & Vegetables",
    image: p4,
    images: [p4, p12, p13],
    desc: "Organic & chemical-free from farm to table",
    id: "fruits-vegetables",
  },
  {
    name: "Poultry Products",
    image: p5,
    desc: "Ethically raised, naturally fed eggs & meat",
    id: "poultry",
  },
  {
    name: "Spices & Condiments",
    image: p6,
    images: [p6, p14],
    desc: "Pure aromatic Indian spices",
    id: "spices",
  },
  {
    name: "Grains & Pulses",
    image: p7,
    images: [p7, p15],
    desc: "Rice, Wheat, Millet, Lentils & more",
    id: "grains-pulses",
  },
  {
    name: "Premium Kashmiri Saffron",
    image: p8,
    images: [p8, p16],
    desc: "Pure hand-harvested Kesar",
    id: "saffron",
  },
  {
    name: "Desi Ghee (Bilona Method)",
    image: p9,
    desc: "Traditional organic clarified butter",
    id: "ghee",
  },
  {
    name: "Dried Vegetables & Fruits Powders",
    image: p10,
    desc: "Pure, Natural & Processed In-House",
    id: "powders",
  },
  {
    name: "Natural Jaggery (Gur)",
    image: p17,
    desc: "Unrefined sweetener rich in minerals",
    id: "jaggery",
  },
  {
    name: "Edible Oils (Peanut, Mustard & Coconut)",
    image: p18,
    desc: "Healthy Edible Oils",
    id: "edible-oils",
  },
];

// ─── Image Slider ──────────────────────────────────────────────────────────────
const ImageSlider = ({ images, height = "400px" }) => {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        background: "#f9f9f9",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <img
        src={images[current]}
        alt={`product-${current}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.3s",
        }}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrent((p) => (p - 1 + images.length) % images.length)
            }
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % images.length)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            ›
          </button>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "6px",
            }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setCurrent(i)}
                style={{
                  width: "44px",
                  height: "44px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border:
                    i === current ? "2px solid #fff" : "2px solid transparent",
                  opacity: i === current ? 1 : 0.6,
                  transition: "all 0.2s",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Cart Drawer ───────────────────────────────────────────────────────────────
const CartDrawer = ({ cart, onClose, onRemove, onCheckout, priceMode }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}
      onClick={onClose}
    >
      <div style={{ flex: 1 }} />
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: COLORS.PRIMARY,
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#fff",
              fontWeight: "700",
              fontSize: "1.1rem",
            }}
          >
            🛒 Your Cart ({cart.length})
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
                color: "#999",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                  padding: "0.75rem",
                  background: COLORS.ACCENT,
                  borderRadius: "10px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: "0 0 0.25rem",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      color: COLORS.PRIMARY,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      margin: "0 0 0.25rem",
                      fontSize: "0.75rem",
                      color: "#666",
                    }}
                  >
                    ₹{item.price} × {item.qty} {item.unit}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "700",
                      color: COLORS.PRIMARY,
                      fontSize: "0.9rem",
                    }}
                  >
                    ₹{item.price * item.qty}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(i)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#e74c3c",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    alignSelf: "flex-start",
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #eee" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontWeight: "600", fontSize: "1rem" }}>Total</span>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "1.3rem",
                  color: COLORS.PRIMARY,
                }}
              >
                ₹{total}
              </span>
            </div>
            <button
              onClick={onCheckout}
              style={{
                width: "100%",
                padding: "0.9rem",
                borderRadius: "10px",
                border: "none",
                background: COLORS.PRIMARY,
                color: "#fff",
                fontWeight: "700",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Checkout Modal ────────────────────────────────────────────────────────────
const CheckoutModal = ({ cart, priceMode, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    const { customerName, phone, address, city, pincode } = form;
    if (!customerName || !phone || !address || !city || !pincode) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleConfirmPayment = async () => {
  setLoading(true);
  setError("");
  try {
    const orderRes = await axios.post(`${API}/payment/create-order`, {
      amount: total,
      customerName: form.customerName,
      phone: form.phone,
      address: form.address,
      city: form.city,
      pincode: form.pincode,
      priceMode,
      totalAmount: total,
      items: cart.map((item) => ({
        productId: item._id,
        productName: item.name,
        quantity: item.qty,
        unit: item.unit,
        pricePerUnit: item.price,
        totalPrice: item.price * item.qty,
        priceMode,
      })),
    });
    const razorpayOrder = orderRes.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Mohanji Agro Industries",
      description: "Order Payment",
      order_id: razorpayOrder.id,
      redirect: false,
      retry: { enabled: false },
      modal: {
        ondismiss: async () => {
          await new Promise(r => setTimeout(r, 1500));
          setStep(3);
          onSuccess();
        }
      },
      handler: async (response) => {
        const verifyRes = await axios.post(`${API}/payment/verify`, response);
        if (verifyRes.data.success) {
          const saved = await axios.post(`${API}/orders`, {
            customerName: form.customerName,
            phone: form.phone,
            address: form.address,
            city: form.city,
            pincode: form.pincode,
            razorpayPaymentId: response.razorpay_payment_id,
            priceMode,
            totalAmount: total,
            items: cart.map((item) => ({
              productId: item._id,
              productName: item.name,
              quantity: item.qty,
              unit: item.unit,
              pricePerUnit: item.price,
              totalPrice: item.price * item.qty,
              priceMode,
            })),
          });
          setOrderId(saved.data._id);
          setStep(3);
          onSuccess();
        }
      },
      prefill: { name: form.customerName, contact: form.phone },
      theme: { color: "#21421e" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", () =>
      setError("Payment failed. Please try again.")
    );
    rzp.open();
    setLoading(false);
    setTimeout(() => {
  setStep(3);
  onSuccess();
}, 8000); 
  } catch (err) {
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid #eee",
            background: COLORS.PRIMARY,
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontWeight: "700",
              fontSize: "1.1rem",
            }}
          >
            {step === 1
              ? "📋 Order Details"
              : step === 2
                ? "💳 Payment"
                : "✅ Order Confirmed"}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: "1.5rem" }}>
          {step === 1 && (
            <>
              {/* Cart summary */}
              <div
                style={{
                  background: COLORS.ACCENT,
                  borderRadius: "12px",
                  padding: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 0.75rem",
                    color: COLORS.PRIMARY,
                    fontSize: "0.9rem",
                    fontWeight: "700",
                  }}
                >
                  Order Summary
                </h4>
                {cart.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.85rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span style={{ color: "#555" }}>
                      {item.name} × {item.qty} {item.unit}
                    </span>
                    <span style={{ fontWeight: "600", color: COLORS.PRIMARY }}>
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    marginTop: "0.75rem",
                    paddingTop: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontWeight: "700" }}>Total</span>
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "1.2rem",
                      color: COLORS.PRIMARY,
                    }}
                  >
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Form */}
              {[
                { key: "customerName", placeholder: "Full Name *" },
                { key: "phone", placeholder: "Phone Number *" },
                { key: "address", placeholder: "Delivery Address *" },
                { key: "city", placeholder: "City *" },
                { key: "pincode", placeholder: "Pincode *" },
              ].map(({ key, placeholder }) => (
                <input
                  key={key}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    fontSize: "0.875rem",
                    marginBottom: "0.6rem",
                    boxSizing: "border-box",
                  }}
                />
              ))}

              {error && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                onClick={handlePlaceOrder}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "10px",
                  border: "none",
                  background: COLORS.PRIMARY,
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginTop: "0.25rem",
                }}
              >
                Proceed to Payment →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                  💳
                </div>
                <h3 style={{ color: COLORS.PRIMARY }}>Pay ₹{total}</h3>
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  You'll be redirected to Razorpay's secure checkout
                </p>
              </div>
              {error && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {error}
                </p>
              )}
              <button
                onClick={handleConfirmPayment}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "10px",
                  border: "none",
                  background: "#1a6b3c",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                }}
              >
                {loading ? "Opening Razorpay..." : "Pay Securely →"}
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setError("");
                }}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "none",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                ← Back
              </button>
            </>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
              <h3
                style={{
                  color: COLORS.PRIMARY,
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                Order Placed Successfully!
              </h3>
              <p style={{ color: "#555", marginBottom: "0.5rem" }}>
                Thank you, <strong>{form.customerName}</strong>!
              </p>
              <p
                style={{
                  color: "#777",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}
              >
                Your order of <strong>{cart.length} item(s)</strong> totalling{" "}
                <strong>₹{total}</strong> has been received.
                <br />
                <br />
                You will receive a <strong>WhatsApp message</strong> from
                Mohanji Agro Industries confirming the dispatch of your order.
                🌿
              </p>
              <div
                style={{
                  background: COLORS.ACCENT,
                  borderRadius: "10px",
                  padding: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p style={{ fontSize: "0.8rem", color: "#666", margin: 0 }}>
                  Order Ref:{" "}
                  <strong>{orderId?.slice(-8)?.toUpperCase()}</strong>
                </p>
              </div>
              <button
                onClick={() => {
                  onSuccess();
                  onClose();
                }}
                style={{
                  padding: "0.75rem 2rem",
                  borderRadius: "10px",
                  border: "none",
                  background: COLORS.PRIMARY,
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Done ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Buy Now Modal (single product) ───────────────────────────────────────────
const BuyNowModal = ({ product, priceMode, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(
    priceMode === "wholesale" ? Number(product.wholesaleMinQty) || 1 : 1,
  );
  const [goToCheckout, setGoToCheckout] = useState(false);

  const isWholesale = priceMode === "wholesale";
  const unitPrice = isWholesale
    ? Number(product.wholesalePrice)
    : Number(product.retailPrice);
  const unitLabel = isWholesale ? product.wholesaleUnit : product.retailUnit;
  const minQty = isWholesale ? Number(product.wholesaleMinQty) || 1 : 1;
  const totalPrice = unitPrice * quantity;
  const coverImage = product.images?.[0] || product.image || "";

  const cartItem = {
    _id: product._id,
    name: product.name,
    image: coverImage,
    price: unitPrice,
    unit: unitLabel,
    qty: quantity,
    priceMode,
  };

  if (goToCheckout) {
    return (
      <CheckoutModal
        cart={[cartItem]}
        priceMode={priceMode}
        onClose={onClose}
        onSuccess={() => {
          onClose();
        }} // ✅ closes modal after success
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "480px",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid #eee",
            background: COLORS.PRIMARY,
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontWeight: "700",
              fontSize: "1rem",
            }}
          >
            {product.name}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: "1.5rem" }}>
          {/* Product image */}
          <div
            style={{
              width: "100%",
              height: "180px",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "1.25rem",
            }}
          >
            <img
              src={coverImage}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Mode badge */}
          <div
            style={{
              display: "inline-block",
              background: isWholesale ? COLORS.PRIMARY : COLORS.SECONDARY,
              color: "#fff",
              padding: "0.3rem 0.85rem",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            {isWholesale ? "📦 Wholesale Price" : "🛒 Retail Price"}
          </div>

          {/* Price box */}
          <div
            style={{
              background: COLORS.ACCENT,
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: "#666" }}>
                Price per unit
              </span>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  color: COLORS.PRIMARY,
                }}
              >
                ₹{unitPrice} / {unitLabel}
              </span>
            </div>
            {isWholesale && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#888",
                  marginBottom: "0.75rem",
                }}
              >
                Min order: {minQty} {unitLabel}
              </p>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: "#666" }}>
                Quantity
              </span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <button
                  onClick={() => setQuantity(Math.max(minQty, quantity - 1))}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "none",
                    background: COLORS.PRIMARY,
                    color: "#fff",
                    fontWeight: "700",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    minWidth: "24px",
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "none",
                    background: COLORS.PRIMARY,
                    color: "#fff",
                    fontWeight: "700",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid #ddd",
                marginTop: "0.75rem",
                paddingTop: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: "600" }}>Total</span>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "1.3rem",
                  color: COLORS.PRIMARY,
                }}
              >
                ₹{totalPrice}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <button
            onClick={() => setGoToCheckout(true)}
            style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "10px",
              border: "none",
              background: COLORS.PRIMARY,
              color: "#fff",
              fontWeight: "700",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "0.75rem",
            }}
          >
            Buy Now →
          </button>
          <button
            onClick={() => {
              onAddToCart(cartItem);
              onClose();
            }}
            style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "10px",
              border: `2px solid ${COLORS.PRIMARY}`,
              background: "#fff",
              color: COLORS.PRIMARY,
              fontWeight: "700",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Flagship Modal (static product details) ───────────────────────────────────
const FlagshipModal = ({ product, onClose }) => {
  if (!product) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "860px",
          maxHeight: "90vh",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth > 700 ? "1fr 1fr" : "1fr",
            height: "100%",
            maxHeight: "90vh",
          }}
        >
          <div
            style={{
              background: COLORS.PRIMARY,
              position: "relative",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "2rem",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.2,
              }}
            />
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                fontSize: "1.1rem",
              }}
            >
              ×
            </button>
            <div style={{ position: "relative", zIndex: 1, color: "#fff" }}>
              <h2
                style={{
                  margin: "0 0 0.5rem",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                {product.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  opacity: 0.8,
                  fontStyle: "italic",
                }}
              >
                {product.slogan}
              </p>
            </div>
          </div>
          <div style={{ overflowY: "auto", padding: "2rem" }}>
            <p
              style={{
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#333",
              }}
            >
              {product.shortDesc}
            </p>
            <p
              style={{
                color: "#666",
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #eee",
              }}
            >
              {product.longDesc}
            </p>
            {product.features && (
              <div style={{ marginBottom: "1.25rem" }}>
                <h3 style={{ color: COLORS.PRIMARY, marginBottom: "0.75rem" }}>
                  Key Features
                </h3>
                {product.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <span style={{ color: COLORS.SECONDARY, flexShrink: 0 }}>
                      ✓
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}
            {product.benefits && (
              <div style={{ marginBottom: "1.25rem" }}>
                <h3 style={{ color: COLORS.PRIMARY, marginBottom: "0.75rem" }}>
                  Benefits
                </h3>
                {product.benefits.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <span style={{ color: COLORS.SECONDARY, flexShrink: 0 }}>
                      ✓
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            )}
            {product.footer && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#999",
                  fontStyle: "italic",
                  borderTop: "1px solid #eee",
                  paddingTop: "1rem",
                }}
              >
                {product.footer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Instagram Slider ──────────────────────────────────────────────────────────
const InstagramSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${images[current]})` }}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((p) => (p - 1 + images.length) % images.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((p) => (p + 1) % images.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/50 w-1"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Live Product Card ─────────────────────────────────────────────────────────
const LiveProductCard = ({ product, priceMode, onBuyNow, onAddToCart }) => {
  const coverImage = product.images?.[0] || product.image || "";
  const isWholesale = priceMode === "wholesale";
  const price = isWholesale ? product.wholesalePrice : product.retailPrice;
  const unit = isWholesale ? product.wholesaleUnit : product.retailUnit;

  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 w-full"
      style={{ aspectRatio: "1" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      {product.category && (
        <div
          className="absolute top-3 left-4 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
          style={{ background: COLORS.SECONDARY }}
        >
          {product.category}
        </div>
      )}
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end z-10">
        <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-white/80 text-sm font-semibold mb-3">
          ₹{price} / {unit}
        </p>
        {/* Buttons — visible on hover */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onBuyNow(product)}
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "none",
              background: COLORS.PRIMARY,
              color: "#fff",
              fontWeight: "700",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            Buy Now
          </button>
          <button
            onClick={() =>
              onAddToCart({
                _id: product._id,
                name: product.name,
                image: coverImage,
                price: isWholesale
                  ? Number(product.wholesalePrice)
                  : Number(product.retailPrice),
                unit: isWholesale ? product.wholesaleUnit : product.retailUnit,
                qty: isWholesale ? Number(product.wholesaleMinQty) || 1 : 1,
                priceMode,
              })
            }
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: `1.5px solid #fff`,
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "0.8rem",
              cursor: "pointer",
              backdropFilter: "blur(4px)",
            }}
          >
            🛒 Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Static Product Card ───────────────────────────────────────────────────────
const StaticProductCard = ({ product, onDetailClick }) => (
  <div
    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 w-full cursor-pointer"
    style={{ aspectRatio: "1" }}
    onClick={() => onDetailClick(product.id)}
  >
    {product.images ? (
      <InstagramSlider images={product.images} />
    ) : (
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${product.image})` }}
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    {product.highlight && (
      <div
        className="absolute top-3 left-4 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
        style={{ background: COLORS.SECONDARY }}
      >
        FLAGSHIP
      </div>
    )}
    <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight z-10">
        {product.name}
      </h3>
      <p className="text-white/80 text-xs z-10 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
        {product.desc}
      </p>
      <span className="absolute bottom-3 right-4 text-white text-xs opacity-70 group-hover:opacity-100 z-20">
        View Details →
      </span>
    </div>
    <div
      className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-10"
      style={{
        background: `linear-gradient(to right, ${COLORS.PRIMARY}, ${COLORS.SECONDARY})`,
      }}
    />
  </div>
);

// ─── Floating Cart Button ──────────────────────────────────────────────────────
const FloatingCart = ({ count, onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "fixed",
      bottom: "2rem",
      right: "2rem",
      zIndex: 150,
      background: COLORS.PRIMARY,
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "0.85rem 1.25rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      cursor: "pointer",
      fontWeight: "700",
      fontSize: "1rem",
      transition: "transform 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    🛒
    {count > 0 && (
      <span
        style={{
          background: COLORS.SECONDARY,
          borderRadius: "50%",
          width: "22px",
          height: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: "800",
        }}
      >
        {count}
      </span>
    )}
    <span style={{ fontSize: "0.9rem" }}>Cart</span>
  </button>
);

// ─── Main Products Section ─────────────────────────────────────────────────────
const Products = () => {
  const [liveProducts, setLiveProducts] = useState([]);
  const [loadingLive, setLoadingLive] = useState(true);
  const [priceMode, setPriceMode] = useState("retail"); // GLOBAL toggle
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [selectedFlagship, setSelectedFlagship] = useState(null);
  const [addedToast, setAddedToast] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((res) => setLiveProducts(res.data))
      .catch(() => setLiveProducts([]))
      .finally(() => setLoadingLive(false));
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.findIndex(
        (c) => c._id === item._id && c.priceMode === item.priceMode,
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = {
          ...updated[existing],
          qty: updated[existing].qty + item.qty,
        };
        return updated;
      }
      return [...prev, item];
    });
    setAddedToast(`${item.name} added to cart!`);
    setTimeout(() => setAddedToast(""), 2500);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <section
      id="products"
      className="py-12 sm:py-16 overflow-hidden"
      style={{ background: "white" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-3 px-4"
            style={{ color: COLORS.DARK_TEXT }}
          >
            Our Products
          </h2>
          <div
            className="w-20 sm:w-24 h-1 mx-auto mb-4"
            style={{
              background: `linear-gradient(to right, ${COLORS.PRIMARY}, ${COLORS.SECONDARY})`,
            }}
          />
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-600 px-4 mb-6">
            From revolutionary organic manure to premium natural foods, discover
            our export-quality range
          </p>

          {/* ── GLOBAL RETAIL / WHOLESALE TOGGLE ── */}
          {!loadingLive && liveProducts.length > 0 && (
            <div
              style={{
                display: "inline-flex",
                borderRadius: "50px",
                overflow: "hidden",
                border: `2px solid ${COLORS.PRIMARY}`,
                boxShadow: "0 2px 10px rgba(33,66,30,0.15)",
              }}
            >
              <button
                onClick={() => setPriceMode("retail")}
                style={{
                  padding: "0.65rem 1.75rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                  background: priceMode === "retail" ? COLORS.PRIMARY : "#fff",
                  color: priceMode === "retail" ? "#fff" : COLORS.PRIMARY,
                  transition: "all 0.25s",
                }}
              >
                🛒 Retail
              </button>
              <button
                onClick={() => setPriceMode("wholesale")}
                style={{
                  padding: "0.65rem 1.75rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                  background:
                    priceMode === "wholesale" ? COLORS.PRIMARY : "#fff",
                  color: priceMode === "wholesale" ? "#fff" : COLORS.PRIMARY,
                  transition: "all 0.25s",
                }}
              >
                📦 Wholesale
              </button>
            </div>
          )}
          {priceMode === "wholesale" && (
            <p
              style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#888" }}
            >
              Wholesale prices shown — minimum quantities apply
            </p>
          )}
        </div>

        {/* Live products */}
        {loadingLive && (
          <div style={{ textAlign: "center", padding: "2rem", color: "#999" }}>
            Loading products...
          </div>
        )}

        {!loadingLive && liveProducts.length > 0 && (
          <>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: COLORS.PRIMARY }}
            >
              Available for Order
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
              {liveProducts.map((p) => (
                <LiveProductCard
                  key={p._id}
                  product={p}
                  priceMode={priceMode}
                  onBuyNow={setBuyNowProduct}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: COLORS.PRIMARY }}
            >
              Our Full Range
            </h3>
          </>
        )}

        {/* Static showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {staticProducts.map((p, i) => (
            <StaticProductCard
              key={i}
              product={p}
              onDetailClick={(id) =>
                flagshipDetails[id] && setSelectedFlagship(flagshipDetails[id])
              }
            />
          ))}
        </div>
      </div>

      {/* ── FLOATING CART ── */}
      <FloatingCart count={cartCount} onClick={() => setShowCart(true)} />

      {/* ── TOAST ── */}
      {addedToast && (
        <div
          style={{
            position: "fixed",
            bottom: "6rem",
            right: "2rem",
            zIndex: 400,
            background: COLORS.PRIMARY,
            color: "#fff",
            padding: "0.75rem 1.25rem",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: "600",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          ✓ {addedToast}
        </div>
      )}

      {/* ── MODALS ── */}
      {showCart && (
        <CartDrawer
          cart={cart}
          priceMode={priceMode}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          priceMode={priceMode}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => setCart([])}
        />
      )}

      {buyNowProduct && (
        <BuyNowModal
          product={buyNowProduct}
          priceMode={priceMode}
          onClose={() => setBuyNowProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {selectedFlagship && (
        <FlagshipModal
          product={selectedFlagship}
          onClose={() => setSelectedFlagship(null)}
        />
      )}
    </section>
  );
};

export default Products;
