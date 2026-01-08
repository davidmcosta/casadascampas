"use client";
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getSanityContactInfo } from '../../../components/lib/contactData';
import Contact from "../../../components/contact"
import { getDictionary } from '../dictionaries'
import { usePathname } from 'next/navigation';
import translateText from '../../../components/helper/translateText.js';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [translatedData, setTranslatedData] = useState(null);
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const [t, setT] = useState(null);


  useEffect(() => {
  const loadData = async () => {
    try {
      const [dict, contactData] = await Promise.all([
        getDictionary(lang, "contact"),
        getSanityContactInfo()
      ]);

      setT(dict);
      setContactInfo(contactData[0]);

      // Remove tradução
      setTranslatedData({
        address: contactData[0]?.address || ""
      });

    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []); // sem dependência de lang, pois não há tradução

  
  const addr = {
    address: lang === 'pt' ? translatedData?.address : contactInfo?.address,
  }
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t?.form?.errors?.nameRequired || 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = t?.form?.errors?.nameLength || 'Name too short';

    if (!formData.email.trim()) newErrors.email = t?.form?.errors?.emailRequired || 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t?.form?.errors?.emailInvalid || 'Invalid email';

    if (!formData.message.trim()) newErrors.message = t?.form?.errors?.messageRequired || 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = t?.form?.errors?.messageLength || 'Message too short';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        urgency: 'normal'
      });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = contactInfo?.whatsapp;
    const message = encodeURIComponent(t?.whatsappMessage || 'Hello, I would like to inquire about your services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (loading || !t) {
    return <Contact />;
  }

  return (
    <>
      <Head>
        <title>{t.seo?.title}</title>
        <meta name="description" content={t.seo?.description} />
      </Head>

      <main className="bg-white min-h-screen mt-12">
         {/* Hero Section */}
<header className="bg-blackDark text-amberVar py-16 px-4">
  <div className="max-w-6xl mx-auto text-center">
    <h1
      className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-amberVar"
      dangerouslySetInnerHTML={{
        __html: t.hero?.heading,
      }}
    />
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4">
      {t.hero?.subheading}
    </p>
    <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto bg-amberVar"></div>
  </div>
</header>
{/* Emergency Banner */}
<section className="py-6 px-4 bg-amberhover">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center text-blackDark gap-4">
    
    {/* Left Side */}
    <div className="flex items-center gap-3">
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-base sm:text-lg md:text-xl font-bold">
        {t.banner?.emergency}
      </span>
    </div>

    {/* Right Side */}
    <div className="flex items-center justify-start md:justify-end gap-4 sm:gap-6">
      <a
        href={`tel:${contactInfo?.phone}`}
        className="flex items-center gap-2 font-bold text-base sm:text-lg hover:underline"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        {contactInfo?.phone}
      </a>

      <button
        onClick={handleWhatsAppContact}
        className="flex items-center gap-2 bg-blackDark text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base hover:bg-blackVar transition-colors"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688" />
        </svg>
        WhatsApp
      </button>
    </div>
  </div>
</section>



        {/* Main Content */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blackDark mb-8" dangerouslySetInnerHTML={{
                __html: t.form?.heading
              }} />
              <p className="text-blackVar text-lg mb-8">
                {t.form?.subheading }
              </p>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-blackDark mb-2">
                    {t.form?.labels?.name }
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.form?.placeholders?.name }
                    className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amberhover transition-colors ${errors.name ? 'border-amberVar' : 'border-gray-300 focus:border-amberVar'}`}
                    required
                  />
                  {errors.name && <p className="text-amberVar text-sm mt-2">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-blackDark mb-2">
                    {t.form?.labels?.email }
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.form?.placeholders?.email }
                    className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amberhover transition-colors ${errors.email ? 'border-amberVar' : 'border-gray-300 focus:border-amberVar'}`}
                    required
                  />
                  {errors.email && <p className="text-amberVar text-sm mt-2">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-blackDark mb-2">
                    {t.form?.labels?.phone }
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.form?.placeholders?.phone }
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amberhover focus:border-amberVar transition-colors"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-blackDark mb-2">
                    {t.form?.labels?.subject }
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.form?.placeholders?.subject }
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amberhover focus:border-amberVar transition-colors"
                  />
                </div>

                {/* Urgency Field */}
                <div>
                  <label htmlFor="urgency" className="block text-sm font-bold text-blackDark mb-2">
                    {t.form?.labels?.urgency }
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amberhover focus:border-amberVar transition-colors"
                  >
                    {Object.entries(t.form?.urgencyOptions || {
                      normal: 'Normal Inquiry',
                      urgent: 'Urgent - Needs Response Today',
                      immediate: 'Immediate Emergency'
                    }).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-blackDark mb-2">
                    {t.form?.labels?.message }
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder={t.form?.placeholders?.message}
                    className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amberhover transition-colors resize-vertical ${errors.message ? 'border-amberVar' : 'border-gray-300 focus:border-amberVar'}`}
                    required
                  />
                  {errors.message && <p className="text-amberVar text-sm mt-2">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 text-blackDrk bg-amberVar font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t.form?.submitting }
                    </span>
                  ) : (
                    t.form?.button 
                  )}
                </button>

                {/* Form Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-amberVar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-amberVar font-medium">
                        {t.form?.success }
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-amberVar rounded-lg">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-amberVar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-amberVar font-medium">
                        {t.form?.error }
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blackDark mb-8" dangerouslySetInnerHTML={{
                __html: t.location?.heading 
              }} />

             {/* Address Card */}
<div className="space-y-6 mb-12">

  {/* Address */}
  <div className="bg-gray-50 p-6 rounded-2xl">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-amberVar">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blackDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blackDark mb-2">
          {t.location?.address?.title }
        </h3>
        <address className="text-sm sm:text-base md:text-lg text-blackVar not-italic leading-relaxed">
          {addr?.address}
        </address>
      </div>
    </div>
  </div>

  {/* Phone */}
  <div className="bg-gray-50 p-6 rounded-2xl">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-amberVar">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blackVar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blackVar mb-2">
          {t.location?.phone?.title }
        </h3>
        <div className="space-y-2 text-sm sm:text-base md:text-lg text-blackVar">
          <p>
            <strong>{t.location?.phone?.main }</strong>{" "}
            <a href={`tel:${contactInfo?.phone}`} className="hover:text-amberhover">
              {contactInfo?.phone}
            </a>
          </p>
          <p>
            <strong>{t.location?.phone?.whatsapp }</strong>{" "}
            <a href={`https://wa.me/${contactInfo?.whatsapp}`} className="hover:text-amberhover">
              {contactInfo?.whatsapp}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Email */}
  <div className="bg-gray-50 p-6 rounded-2xl">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-amberVar">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blackDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blackDark mb-2">
          {t.location?.email?.title }
        </h3>
        <div className="space-y-2 text-sm sm:text-base md:text-lg text-blackVar">
          <p>
            <a href={`mailto:${contactInfo?.email}`} className="hover:text-amberhover">
              {contactInfo?.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Hours */}
  <div className="bg-gray-50 p-6 rounded-2xl">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-amberVar">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blackDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blackDark mb-2">
          {t.location?.hours?.title }
        </h3>
        <div className="space-y-1 text-sm sm:text-base md:text-lg text-blackVar">
          {contactInfo?.hours ? (
            contactInfo.hours.map((hour, index) => (
              <div key={hour._key || index}>
                <p><strong>{hour.days}:</strong> {hour.time}</p>
                {index === contactInfo.hours.length - 1 && (
                  <p className="text-xs sm:text-sm text-blackVar mt-2">
                    {t.location?.hours?.emergency }
                  </p>
                )}
              </div>
            ))
          ) : (
            <>
              <p><strong>{t.location?.hours?.default || "Monday - Sunday:"}</strong> Open 24 Hours</p>
              <p className="text-xs sm:text-sm text-blackVar mt-2">
                {t.location?.hours?.emergency }
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  </div>

</div>


             {/* Map */}
<div className="rounded-2xl overflow-hidden shadow-lg">
  <iframe
    src={`https://www.google.com/maps?q=${contactInfo?.mapLocation?.lat},${contactInfo?.mapLocation?.lng}&z=4&output=embed`}
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen={true}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title={t.location?.mapTitle}
  />
</div>

{/* Directions Button */}
<div className="mt-6 text-center">
  <a
    href={`https://www.google.com/maps?q=${contactInfo?.mapLocation?.lat},${contactInfo?.mapLocation?.lng}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center bg-amberVar gap-2 px-6 py-3 text-black font-bold rounded-full transition-all duration-300 hover:scale-105"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13l-6-3m6 3V4m0 13l6-3m-6 3V4"
      />
    </svg>
    {t.location?.mapButton}
  </a>
</div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}