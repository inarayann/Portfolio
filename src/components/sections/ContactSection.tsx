'use client'
import { motion } from 'framer-motion';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../lib/constants';
import { useScrollAnimation, useStaggeredAnimation } from '../../hooks/useAnimation';
import { useContactForm } from '../../hooks/useForm';
import { SectionHeader, Container, Grid } from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input, { Textarea } from '../ui/Input';

/**
 * Contact Section Component
 * 
 * Optimized contact section using centralized data and reusable components
 * Follows SOLID principles with single responsibility
 */
export default function ContactSection() {
  const { ref, inView } = useScrollAnimation();
  const { ref: contactRef, getStaggeredConfig } = useStaggeredAnimation();
  const {
    values: formData,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    reset
  } = useContactForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! I will get back to you soon.');
      reset();
    }
  };

  const handleContactClick = (info: any) => {
    if (info.title === 'Email') {
      window.open(`mailto:${info.value}`, '_self');
    } else if (info.title === 'Phone') {
      window.open(`tel:${info.value}`, '_self');
    } else if (info.title === 'Location') {
      // Open Google Maps with the location
      const encodedLocation = encodeURIComponent(info.value);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
    } else if (info.title === 'Whatsapp') {
      window.open(`https://wa.me/${info.value}`, '_self');
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-800"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <Container>
        <SectionHeader
          title="Get In"
          subtitle="Touch"
          description="Let's discuss your next project or just say hello!"
        />

        <div ref={contactRef} className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              className="contact-card"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((info, index) => {
                  const isClickable = info.title === 'Email' || info.title === 'Phone' || info.title === 'Location' || info.title === 'Whatsapp';
                  
                  return (
                    <motion.div
                      key={index}
                      {...getStaggeredConfig(index)}
                    >
                      <Card 
                        className={`p-6 transition-all duration-300 ${
                          isClickable 
                            ? 'cursor-pointer hover:shadow-xl hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                            : ''
                        }`} 
                        hover={false}
                        onClick={isClickable ? () => handleContactClick(info) : undefined}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {info.title}
                          </h4>
                          {isClickable && (
                            <motion.div
                              className="text-blue-500"
                              whileHover={{ scale: 1.2 }}
                              transition={{ duration: 0.2 }}
                            >
                              {info.title === 'Email' && '📧'}
                              {info.title === 'Phone' && '📞'}
                              {info.title === 'Location' && '📍'}
                              {info.title === 'Whatsapp' && '💬'}
                            </motion.div>
                          )}
                        </div>
                        <p className={`font-medium mb-1 ${
                          isClickable 
                            ? 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300' 
                            : 'text-blue-600'
                        }`}>
                          {info.value}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {isClickable 
                            ? `Click to ${info.title === 'Email' ? 'send email' : info.title === 'Phone' ? 'call' : info.title === 'Location' ? 'view on map' : 'chat on WhatsApp'}`
                            : info.description
                          }
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="contact-card"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Follow Me
              </h3>
              <Grid cols={3} className="gap-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-r ${social.color} text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2">{social.icon}</div>
                    <div className="text-sm font-medium">{social.name}</div>
                  </motion.a>
                ))}
              </Grid>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Message
            </h3>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  error={errors.name}
                  required
                  placeholder="Your Name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={errors.email}
                  required
                  placeholder="your@email.com"
                />
              </div>
              
              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                onBlur={() => handleBlur('subject')}
                error={errors.subject}
                required
                placeholder="Project Inquiry"
              />
              
              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                error={errors.message}
                required
                rows={5}
                placeholder="Tell me about your project..."
              />
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
