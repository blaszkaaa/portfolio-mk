import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { toast } from "sonner";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message has been sent!", {
        description: "Thank you for contacting me. I will respond as soon as possible."
      });
      
      setFormState({
        name: '',
        email: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="max-w-md">
              <h2 className="font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground mb-6">
                Are you interested in collaboration or have questions about my projects?
                Contact me through the form or directly via email.
              </p>
              
              <div className="mb-8">
                <div className="flex items-center p-4 rounded-lg bg-secondary">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">mateuszkazmierczak109@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block mt-12">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/5 to-accent/20 blur-3xl"></div>
                  <div className="relative p-8 rounded-2xl bg-white">
                    <p className="text-lg font-medium mb-4">I'm open to:</p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-2"></span>
                        <span>Freelance projects</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-2"></span>
                        <span>Full-time job offers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-2"></span>
                        <span>Collaboration on interesting projects</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-1 focus:ring-accent focus:border-accent transition-all resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full button-animated bg-primary text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send message
                      <Send size={16} className="ml-2" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
