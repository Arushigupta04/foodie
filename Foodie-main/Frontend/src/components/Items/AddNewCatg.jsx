import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryTitle || !categoryDescription || !categoryIcon) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddCategory({ category_title: categoryTitle, category_description: categoryDescription, category_icon: categoryIcon });
      toast.success('Category added successfully');
      setCategoryTitle('');
      setCategoryDescription('');
      setCategoryIcon('');
    } catch (error) {
      toast.error('Failed to add category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Category Title:</label>
          <input
            type="text"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category Description:</label>
          <input
            type="text"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category Icon URL:</label>
          <input
            type="text"
            value={categoryIcon}
            onChange={(e) => setCategoryIcon(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Category'}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddCategoryForm;
