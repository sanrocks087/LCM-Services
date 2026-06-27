import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {CheckCircle, Send} from 'lucide-react'

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  buildingName: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export default function ContactForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState<string>('');


  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    buildingName: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
        // Only allow digits AND prevent entering more than 10 digits
        if ((/^\d*$/.test(value)) && (value.length <= 10)) {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        return; 
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === "phone") {
      if (form.phone.length > 0 && form.phone.length < 10) {
        setPhoneError("Please enter 10 digits number.");
      } else if (form.phone.length === 0) {
        setPhoneError("Phone number is required.");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        //alert("Message sent successfully.");
        setForm({
          name: "",
          email: "",
          phone: "",
          buildingName: "",
          message: "",
        });
        setSubmitted(true);
      } else {
        //alert(result.message);
        setPhoneError(result.message);
      }
    } catch (error) {
      //console.error(error);
      //alert("Something went wrong.");
      setPhoneError("Something went wrong, please try after sometime.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <div>
            {submitted ? (
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-8 text-white text-center h-full flex flex-col items-center justify-center animate-fade-in">
                <CheckCircle className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-white/90">Your message has been sent. We will get back to you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                     <input
                        type="text"
                        required
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                     <input
                        type="tel"
                        required
                        name="phone"
                        placeholder="10 digit Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                     
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                     <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Building/Society/Area Name *</label>
                    <input
                        required
                        type="text"
                        name="buildingName"
                        placeholder="ex: Green View Apartments"
                        value={form.buildingName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                   <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us about your building and maintenance needs..."
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    />
                </div>
                {phoneError && <p style={{ color: 'red', fontSize: '14px' }}>{phoneError}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
    </>
  );
}