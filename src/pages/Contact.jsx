import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section style={{
        height: '40vh',
        background: 'linear-gradient(rgba(139, 92, 246, 0.9), rgba(139, 92, 246, 0.7)), url("https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0a0a0a',
        marginBottom: '80px'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          margin: 0,
          letterSpacing: '-1px'
        }}>
          Contact me!
        </h1>
      </section>

      {/* Contact Content */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '80px',
          alignItems: 'start'
        }}>
          {/* Left Column - Contact Info */}
          <div>
            <h2 style={{
              fontSize: '2rem',
              color: '#0a0a0a',
              marginBottom: '40px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '700',
              borderLeft: '4px solid #8B5CF6',
              paddingLeft: '15px'
            }}>
              Contact Info
            </h2>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0a0a0a', fontSize: '1.1rem', marginBottom: '8px', fontWeight: '600' }}>Email</h3>
              <a
                href="mailto:anmolp5@illinois.edu"
                style={{
                  color: '#555',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffb703'}
                onMouseLeave={(e) => e.target.style.color = '#555'}
              >
                anmolp5@illinois.edu
              </a>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0a0a0a', fontSize: '1.1rem', marginBottom: '8px', fontWeight: '600' }}>Telephone</h3>
              <a
                href="tel:+15109363604"
                style={{
                  color: '#555',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#8B5CF6'}
                onMouseLeave={(e) => e.target.style.color = '#555'}
              >
                (510) 936-3604
              </a>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <a
                href="https://linkedin.com/in/anmolprabhakar5"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '12px 24px',
                  background: '#0a0a0a',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  borderRadius: '4px',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#0077b5';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#0a0a0a';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid #eee'
          }}>
            <p style={{
              fontSize: '0.9rem',
              color: '#888',
              marginBottom: '30px',
              fontStyle: 'italic',
              textAlign: 'right'
            }}>
              * INDICATES REQUIRED FIELD
            </p>

            <form onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#0a0a0a',
                  marginBottom: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  letterSpacing: '0.5px'
                }}>
                  NAME *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#f9f9f9',
                      border: '1px solid #ddd',
                      color: '#0a0a0a',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      borderRadius: '4px',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ffb703'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#f9f9f9',
                      border: '1px solid #ddd',
                      color: '#0a0a0a',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      borderRadius: '4px',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ffb703'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#0a0a0a',
                  marginBottom: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  letterSpacing: '0.5px'
                }}>
                  EMAIL *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#f9f9f9',
                    border: '1px solid #ddd',
                    color: '#0a0a0a',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    borderRadius: '4px',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ffb703'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              {/* Message Field */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  color: '#0a0a0a',
                  marginBottom: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  letterSpacing: '0.5px'
                }}>
                  COMMENT *
                </label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#f9f9f9',
                    border: '1px solid #ddd',
                    color: '#0a0a0a',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    borderRadius: '4px',
                    transition: 'border-color 0.2s',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#8B5CF6'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  padding: '16px 40px',
                  background: '#0a0a0a',
                  color: 'white',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#8B5CF6';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#0a0a0a';
                  e.target.style.color = 'white';
                }}
              >
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;