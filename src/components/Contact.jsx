import React, { useState } from 'react';
// We no longer need Phone, Mail, and MapPin imports since the contact list is removed
// import { Phone, Mail, MapPin } from 'lucide-react'; 

// Color Palette Definition (REVERTED)
const COLORS = {
  PRIMARY: '#21421e',   
  SECONDARY: '#d4a574', 
  ACCENT: '#f5f5dc',      
  DARK_TEXT: '#333333',
};

// Data that was moved from the contact component (for future use in the Footer)
const ContactInfo = [
    { title: 'Headquarters', main: 'Mumbai, Maharashtra, India', sub: 'Regional centers across India' },
    { title: 'Phone', main: '+91 98701 08612 / +91 91377 36886' },
    { title: 'Email', main: 'info@heavyweight.com', sub: "We'll respond within 24 hours" }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '', // Used for Contact Number / Email
    message: '' // Used for Business Enquiry
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // NOTE: The Google Form entry IDs are retained, assuming 'address' field in the old form 
    // is now repurposed for the new 'contact' field here.
    const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeuM2yAUzqvK5b_CO1Il6xSkNeusLEgou0ZLkQqQVfLMrSQXg/formResponse';
    
    const formBody = new URLSearchParams({
      'entry.1723405742': formData.name,
      'entry.1873269004': formData.contact, 
      'entry.1147767104': formData.message 
    });

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', contact: '', message: '' });
    } catch (error) {
      setSubmitStatus('success'); // no-cors mode doesn't allow error detection
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="font-semibold text-sm uppercase tracking-wider" style={{color: COLORS.SECONDARY}}>Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2 mb-4" style={{color: COLORS.DARK_TEXT}}>
            Let’s make a healthier Bharat
          </h2>
          <div className="w-24 h-1 mx-auto" style={{background: `linear-gradient(to right, ${COLORS.PRIMARY}, ${COLORS.SECONDARY})`}}></div>
        </div>

        {/* Main Content: Centered Form, now set to max-w-xl (thinner) */}
        <div className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl shadow-xl" style={{background: COLORS.ACCENT}}>
                <h3 className="text-2xl font-bold mb-6 text-center" style={{color: COLORS.DARK_TEXT}}>Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all"
                style={{borderColor: COLORS.PRIMARY, background: 'white'}}
              />
                {/* Contact Number / Email Field */}
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all"
                style={{borderColor: COLORS.PRIMARY, background: 'white'}}
              />
                {/* Business Enquiry Field */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Business Enquiry"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all"
                style={{borderColor: COLORS.PRIMARY, background: 'white'}}
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                style={{background: COLORS.PRIMARY}}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <div className="text-center p-3 rounded-lg" style={{background: COLORS.PRIMARY, color: 'white'}}>
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;