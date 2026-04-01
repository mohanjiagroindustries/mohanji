import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = ({ onLogout }) => {
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', category: '',
    retailPrice: '', retailUnit: '',
    wholesalePrice: '', wholesaleUnit: '', wholesaleMinQty: ''
  });
  const [newImages, setNewImages] = useState([]); // File objects to upload
  const [existingImages, setExistingImages] = useState([]); // URLs already on server
  const [message, setMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { fetchOrders(); fetchProducts(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`, { headers });
      setOrders(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) { console.log(err); }
  };

const updateStatus = async (id, status) => {
  try {
    await axios.patch(`${API}/orders/${id}/status`, { status }, { headers });
    fetchOrders();
  } catch (err) { console.log(err); }
};

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`${API}/products/${id}`, { headers });
      fetchProducts();
    } catch (err) { console.log(err); }
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      retailPrice: product.retailPrice || '',
      retailUnit: product.retailUnit || '',
      wholesalePrice: product.wholesalePrice || '',
      wholesaleUnit: product.wholesaleUnit || '',
      wholesaleMinQty: product.wholesaleMinQty || ''
    });
    setExistingImages(product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []));
    setNewImages([]);
    setMessage('');
    setTab('upload');
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setForm({ name: '', description: '', category: '', retailPrice: '', retailUnit: '', wholesalePrice: '', wholesaleUnit: '', wholesaleMinQty: '' });
    setExistingImages([]);
    setNewImages([]);
    setMessage('');
  };

  // Move existing image left or right
  const moveExisting = (index, direction) => {
    const arr = [...existingImages];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= arr.length) return;
    [arr[index], arr[swapIndex]] = [arr[swapIndex], arr[index]];
    setExistingImages(arr);
  };

  // Remove existing image
  const removeExisting = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  // Move new image left or right
  const moveNew = (index, direction) => {
    const arr = [...newImages];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= arr.length) return;
    [arr[index], arr[swapIndex]] = [arr[swapIndex], arr[index]];
    setNewImages(arr);
  };

  // Remove new image
  const removeNew = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  // Handle new file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const total = existingImages.length + newImages.length + files.length;
    if (total > 4) {
      alert('Maximum 4 images allowed per product.');
      return;
    }
    setNewImages([...newImages, ...files]);
    e.target.value = ''; // reset input so same file can be re-added after removal
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (existingImages.length + newImages.length === 0) {
      setMessage('Please add at least one image.');
      return;
    }
    setUploadLoading(true);
    setMessage('');
    try {
      const data = new FormData();
      Object.keys(form).forEach(k => data.append(k, form[k]));

      if (editingProduct) {
        // Send existing image URLs in order
        data.append('existingImages', JSON.stringify(existingImages));
        // Send new image files
        newImages.forEach(f => data.append('newImages', f));
        await axios.put(`${API}/products/${editingProduct._id}`, data, {
          headers: { ...headers, 'Content-Type': 'multipart/form-data' }
        });
        setMessage('Product updated successfully!');
        setEditingProduct(null);
      } else {
        // New product — send all as 'images'
        newImages.forEach(f => data.append('images', f));
        await axios.post(`${API}/products`, data, {
          headers: { ...headers, 'Content-Type': 'multipart/form-data' }
        });
        setMessage('Product uploaded successfully!');
      }

      setForm({ name: '', description: '', category: '', retailPrice: '', retailUnit: '', wholesalePrice: '', wholesaleUnit: '', wholesaleMinQty: '' });
      setExistingImages([]);
      setNewImages([]);
      fetchProducts();
    } catch (err) {
      setMessage(editingProduct ? 'Update failed. Try again.' : 'Upload failed. Try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get(`${API}/orders/export`, { headers, responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mohanji-orders.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) { console.log(err); }
  };

  const inputStyle = {
    width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '0.875rem',
    boxSizing: 'border-box', marginBottom: '0.75rem'
  };

  const btnStyle = (active) => ({
    padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none',
    cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem',
    background: active ? '#21421e' : '#eee',
    color: active ? '#fff' : '#333'
  });

  const totalImages = existingImages.length + newImages.length;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5dc', padding: '2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#21421e' }}>Mohanji Admin Panel</h1>
          <button onClick={onLogout} style={{ ...btnStyle(false), background: '#fee2e2', color: '#991b1b' }}>Logout</button>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <button style={btnStyle(tab === 'orders')} onClick={() => { setTab('orders'); handleCancelEdit(); }}>Orders ({orders.length})</button>
          <button style={btnStyle(tab === 'upload')} onClick={() => { setTab('upload'); handleCancelEdit(); }}>
            {editingProduct ? '✏️ Editing Product' : 'Upload Product'}
          </button>
          <button style={btnStyle(tab === 'products')} onClick={() => { setTab('products'); handleCancelEdit(); }}>Products ({products.length})</button>
        </div>

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button onClick={handleExport} style={{ ...btnStyle(true), background: '#1a6b3c' }}>Download Excel</button>
            </div>
            {orders.length === 0 ? (
              <p style={{ color: '#666' }}>No orders yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map(order => (
                  <div key={order._id} style={{background: order.status === 'delivered' ? '#e9d5ff' : order.status === 'dispatched' ? '#d4edda' : '#fff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #ddd' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{order.customerName}</p>
                        <p style={{ fontSize: '0.875rem', color: '#555' }}>{order.phone}</p>
                        <p style={{ fontSize: '0.875rem', color: '#555' }}>{order.address}, {order.city} - {order.pincode}</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{order.items.map(i => `${i.productName} x${i.quantity} ${i.unit}`).join(', ')}</p>
                        <p style={{ fontWeight: '600', marginTop: '0.5rem' }}>Total: ₹{order.totalAmount}</p>
                        <p style={{ fontSize: '0.75rem', color: '#777' }}>UPI Name: {order.utrNumber}</p>
                        <p style={{ fontSize: '0.75rem', color: '#777' }}>{new Date(order.createdAt).toLocaleString('en-IN')}</p>
                      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
  {/* Status Badge */}
  <span style={{
    padding: '0.25rem 0.75rem', 
    borderRadius: '20px', 
    fontSize: '0.75rem', 
    fontWeight: '600',
    background: order.status === 'delivered' ? '#7c3aed' : order.status === 'dispatched' ? '#21421e' : order.status === 'sent_to_delivery' ? '#1a6b9a' : '#fef3c7',
color: order.status === 'delivered' ? '#fff' : order.status === 'dispatched' ? '#fff' : order.status === 'sent_to_delivery' ? '#fff' : '#92400e'
  }}>
    {order.status === 'delivered' ? 'Delivered ✅' : order.status === 'dispatched' ? 'Dispatched' : order.status === 'sent_to_delivery' ? 'Sent to Delivery' : 'Pending'}
  </span>

  {/* Action: Send to Delivery */}
  {order.status === 'pending' && (
    <button
      onClick={() => updateStatus(order._id, 'sent_to_delivery')}
      style={{ ...btnStyle(true), fontSize: '0.75rem', padding: '0.4rem 0.9rem', background: '#1a6b9a' }}
    >
      Send to Delivery Partner
    </button>
  )}

  {/* Action: Mark Dispatched */}
  {order.status === 'sent_to_delivery' && (
    <button
      onClick={() => updateStatus(order._id, 'dispatched')}
      style={{ ...btnStyle(true), fontSize: '0.75rem', padding: '0.4rem 0.9rem' }}
    >
      Mark Dispatched
    </button>
  )}

  {/* Action: WhatsApp (Fixed the missing <a> tag here) */}
  {order.status === 'dispatched' && (
  <>
    <a href={`https://wa.me/91${order.phone}?text=${encodeURIComponent(
      `Hi ${order.customerName}! 🌿 Your order from Mohanji Agro Industries has been dispatched!\n\n` +
      `Items: ${order.items.map(i => `${i.productName} x${i.quantity} ${i.unit}`).join(', ')}\n` +
      `Total: ₹${order.totalAmount}\n\nThank you for ordering with us!`
    )}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...btnStyle(false), fontSize: '0.75rem', padding: '0.4rem 0.9rem', background: '#25D366', color: '#fff', textDecoration: 'none', display: 'inline-block', borderRadius: '4px' }}
    >
      WhatsApp Customer
    </a>
    <button
      onClick={() => updateStatus(order._id, 'delivered')}
      style={{ ...btnStyle(true), fontSize: '0.75rem', padding: '0.4rem 0.9rem', background: '#7c3aed' }}
    >
      ✅ Order Received by Customer
    </button>
  </>
)}
</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UPLOAD / EDIT TAB */}
        {tab === 'upload' && (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', maxWidth: '650px' }}>

            {editingProduct && (
              <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: '#856404', margin: 0 }}>✏️ Editing: <strong>{editingProduct.name}</strong></p>
                <button onClick={handleCancelEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#856404', fontWeight: '600', fontSize: '0.875rem' }}>Cancel</button>
              </div>
            )}

            <h2 style={{ fontWeight: '600', marginBottom: '1.25rem', color: '#21421e' }}>
              {editingProduct ? 'Edit Product' : 'Upload New Product'}
            </h2>

            <form onSubmit={handleUpload}>
              <input style={inputStyle} placeholder="Product name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <input style={inputStyle} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <input style={inputStyle} placeholder="Category (e.g. Eggs, Almonds, Honey)" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="Retail price (₹) *" type="number" value={form.retailPrice} onChange={e => setForm({ ...form, retailPrice: e.target.value })} required />
                <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="Retail unit (e.g. per dozen)" value={form.retailUnit} onChange={e => setForm({ ...form, retailUnit: e.target.value })} required />
              </div>
              <div style={{ height: '0.75rem' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="Wholesale price (₹)" type="number" value={form.wholesalePrice} onChange={e => setForm({ ...form, wholesalePrice: e.target.value })} required />
                <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="Wholesale unit (e.g. kg)" value={form.wholesaleUnit} onChange={e => setForm({ ...form, wholesaleUnit: e.target.value })} required />
                <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="Min qty (e.g. 10)" type="number" value={form.wholesaleMinQty} onChange={e => setForm({ ...form, wholesaleMinQty: e.target.value })} />
              </div>
              <div style={{ height: '1.25rem' }} />

              {/* IMAGE MANAGER */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333' }}>
                    Product Images <span style={{ color: '#999', fontWeight: 'normal' }}>({totalImages}/4 — first image is cover)</span>
                  </label>
                  {totalImages < 4 && (
                    <label style={{ background: '#21421e', color: '#fff', padding: '0.35rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                      + Add Image
                      <input type="file" accept="image/*" multiple onChange={handleFileSelect} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>

                {totalImages === 0 && (
                  <div style={{ border: '2px dashed #ddd', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#aaa', fontSize: '0.875rem' }}>
                    No images yet. Click "+ Add Image" to upload.
                  </div>
                )}

                {/* Existing images (from server) */}
                {existingImages.length > 0 && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.5rem' }}>Current images:</p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {existingImages.map((url, i) => (
                        <div key={i} style={{ position: 'relative', width: '90px' }}>
                          <img src={url} alt={`img-${i}`} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: i === 0 ? '2px solid #21421e' : '1px solid #ddd' }} />
                          {i === 0 && <span style={{ position: 'absolute', top: '4px', left: '4px', background: '#21421e', color: '#fff', fontSize: '0.6rem', padding: '1px 5px', borderRadius: '4px' }}>Cover</span>}
                          <button type="button" onClick={() => removeExisting(i)} style={{ position: 'absolute', top: '4px', right: '4px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
                            <button type="button" onClick={() => moveExisting(i, -1)} disabled={i === 0} style={{ flex: 1, padding: '2px', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9', cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.3 : 1, fontSize: '0.7rem' }}>←</button>
                            <button type="button" onClick={() => moveExisting(i, 1)} disabled={i === existingImages.length - 1 && newImages.length === 0} style={{ flex: 1, padding: '2px', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9', cursor: 'pointer', fontSize: '0.7rem' }}>→</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New images (not yet uploaded) */}
                {newImages.length > 0 && (
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.5rem' }}>New images to upload:</p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {newImages.map((file, i) => {
                        const globalIndex = existingImages.length + i;
                        return (
                          <div key={i} style={{ position: 'relative', width: '90px' }}>
                            <img src={URL.createObjectURL(file)} alt={`new-${i}`} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: globalIndex === 0 ? '2px solid #21421e' : '1px solid #ddd' }} />
                            {globalIndex === 0 && <span style={{ position: 'absolute', top: '4px', left: '4px', background: '#21421e', color: '#fff', fontSize: '0.6rem', padding: '1px 5px', borderRadius: '4px' }}>Cover</span>}
                            <button type="button" onClick={() => removeNew(i)} style={{ position: 'absolute', top: '4px', right: '4px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
                              <button type="button" onClick={() => moveNew(i, -1)} disabled={i === 0 && existingImages.length === 0} style={{ flex: 1, padding: '2px', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9', cursor: 'pointer', fontSize: '0.7rem', opacity: (i === 0 && existingImages.length === 0) ? 0.3 : 1 }}>←</button>
                              <button type="button" onClick={() => moveNew(i, 1)} disabled={i === newImages.length - 1} style={{ flex: 1, padding: '2px', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9', cursor: 'pointer', fontSize: '0.7rem', opacity: i === newImages.length - 1 ? 0.3 : 1 }}>→</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {message && (
                <p style={{ color: message.includes('success') ? 'green' : 'red', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{message}</p>
              )}

              <button type="submit" disabled={uploadLoading} style={{ ...btnStyle(true), width: '100%', padding: '0.75rem' }}>
                {uploadLoading ? (editingProduct ? 'Saving...' : 'Uploading...') : (editingProduct ? 'Save Changes' : 'Upload Product')}
              </button>
            </form>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {products.map(p => (
              <div key={p._id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd' }}>
                {(p.images?.[0] || p.image) && <img src={p.images?.[0] || p.image} alt={p.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
                <div style={{ padding: '1rem' }}>
                  <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{p.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.25rem' }}>{p.images?.length || 1} image{(p.images?.length || 1) > 1 ? 's' : ''}</p>
                  <p style={{ fontSize: '0.875rem', color: '#555' }}>Retail: ₹{p.retailPrice} / {p.retailUnit}</p>
                  <p style={{ fontSize: '0.875rem', color: '#555' }}>Wholesale: ₹{p.wholesalePrice} / {p.wholesaleUnit}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <button onClick={() => handleStartEdit(p)} style={{ flex: 1, padding: '0.4rem 0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem', background: '#e8f4fd', color: '#1a6b9a' }}>✏️ Edit</button>
                    <button onClick={() => handleDeleteProduct(p._id)} style={{ flex: 1, padding: '0.4rem 0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem', background: '#fee2e2', color: '#991b1b' }}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;