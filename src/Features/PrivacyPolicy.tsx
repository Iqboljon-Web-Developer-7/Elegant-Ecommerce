import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const PrivacyPolicy = () => {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Elegant</title>
        <meta name="description" content="Read the Privacy Policy for Elegant, your trusted e-commerce platform." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://elegantapp.vercel.app${location.pathname}`} />
      </Helmet>
      <section className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">Last Updated: June 30, 2025</p>
        <div className="prose prose-lg text-gray-700">
          <p>
            At Elegant, accessible from https://elegantapp.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by Elegant and how we use it.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
          <p>
            We collect information from you when you register on our site, place an order, subscribe to our newsletter, or fill out a form. The information collected may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name and contact details (e.g., email address, phone number)</li>
            <li>Billing and shipping address</li>
            <li>Payment information (processed securely via third-party payment processors)</li>
            <li>Browsing behavior and preferences (e.g., products viewed, cart items)</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
          <p>We use the information we collect in the following ways:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To process and fulfill your orders</li>
            <li>To improve our website and personalize your shopping experience</li>
            <li>To send periodic emails regarding your order or promotional offers</li>
            <li>To respond to customer service requests</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Data Protection</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers, and we use encryption for sensitive information. However, no method of transmission over the Internet is 100% secure.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Cookies</h2>
          <p>
            We use cookies to enhance your experience, gather general visitor information, and track visits to our website. You can choose to disable cookies through your browser settings, but this may affect the functionality of our site.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us at support@yourdomain.com.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: support@yourdomain.com
            <br />
            Phone: (123) 456-7890
            <br />
            Address: 123 Elegant Street, Suite 100, City, Country
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;