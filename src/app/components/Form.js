"use client";
import { useState, useRef } from 'react';
import endpointroute from '../utils/endpointroute';
export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    attachment: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const fileInputRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      if (formData.attachment) {
        formDataToSend.append('attachment', formData.attachment);
      }

      await endpointroute.post('/contact', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', attachment: null });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Contact Dr. Tunde</h2>
      
      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Message sent successfully!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          Failed to send message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-black">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 rounded border ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
          />
          {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 rounded border ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
          />
          {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block mb-1 text-black">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`w-full p-2 rounded border ${errors.message ? 'border-red-300' : 'border-gray-300'}`}
          />
          {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="attachment" className="block mb-1 text-black">
            Attachment (Optional)
          </label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            ref={fileInputRef}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded text-white font-medium bg-[#207dff] hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}