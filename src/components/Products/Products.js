import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    product_id: '',
    product_name: '',
    product_description: '',
    product_selling_price: '',
    product_catalog_id: '',
  });
  const [editProduct, setEditProduct] = useState({
    product_id: '',
    product_name: '',
    product_description: '',
    product_selling_price: '',
    product_catalog_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8089/api/products')
      .then(response => {
        console.log('Fetched Products:', response.data);
        setProducts(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    axios.post('http://localhost:8089/api/products', newProduct)
      .then(response => {
        console.log('Added Product:', response.data);
        fetchProducts();
        setNewProduct({
          product_id: '',
          product_name: '',
          product_description: '',
          product_selling_price: '',
          product_catalog_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:8089/api/products/${productId}`)
      .then(response => {
        console.log('Deleted Product:', response.data);
        fetchProducts();
      })
      .catch(error => console.error(error));
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = () => {
    axios.put(`http://localhost:8089/api/products/${editProduct.product_id}`, editProduct)
      .then(response => {
        console.log('Updated Product:', response.data);
        fetchProducts();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Product Records</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Selling Price</th>
            <th>Catalog ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && Array.isArray(products) ? (
            products.map(product => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>{product.product_description}</td>
                <td>{product.product_selling_price}</td>
                <td>{product.product_catalog_id}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(product.product_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Add New Product</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="product_id"
          value={newProduct.product_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="product_name"
          value={newProduct.product_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="product_description"
          value={newProduct.product_description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Selling Price:</label>
        <input
          type="text"
          name="product_selling_price"
          value={newProduct.product_selling_price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Catalog ID:</label>
        <input
          type="text"
          name="product_catalog_id"
          value={newProduct.product_catalog_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Product</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="product_id"
              value={editProduct.product_id}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="product_name"
              value={editProduct.product_name}
              onChange={(e) => setEditProduct({ ...editProduct, product_name: e.target.value })}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="product_description"
              value={editProduct.product_description}
              onChange={(e) => setEditProduct({ ...editProduct, product_description: e.target.value })}
            />
          </div>
          <div>
            <label>Selling Price:</label>
            <input
              type="text"
              name="product_selling_price"
              value={editProduct.product_selling_price}
              onChange={(e) => setEditProduct({ ...editProduct, product_selling_price: e.target.value })}
            />
          </div>
          <div>
            <label>Catalog ID:</label>
            <input
              type="text"
              name="product_catalog_id"
              value={editProduct.product_catalog_id}
              onChange={(e) => setEditProduct({ ...editProduct, product_catalog_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateProduct}>Update Product</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default Products;
