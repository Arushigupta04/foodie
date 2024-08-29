import React, { useState } from 'react';
import './style.css';

const AddItemForm = ({ categories, onAddItem }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('veg'); 
  const [price, setPrice] = useState('');
  const [offer, setOffer] = useState('');
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
console.log(categories)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      item_title: title,
      item_type: type,
      item_price: price,
      item_offer: offer,
      item_src: image
    };
    if (selectedCategory) {
      onAddItem(selectedCategory, newItem);
     
      setTitle('');
      setType('veg');
      setPrice('');
      setOffer('');
      setImage('');
      setSelectedCategory('');
    } else {
      console.error('Please select a category.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Offer:</label>
        <input type="text" value={offer} onChange={(e) => setOffer(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Image:</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Select Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.category_title}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
