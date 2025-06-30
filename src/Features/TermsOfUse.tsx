import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const TermsOfUse = () => {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>Terms of Use | Elegant</title>
        <meta name="description" content="Read the Terms of Use for Elegant, your trusted e-commerce platform." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://elegantapp.vercel.app${location.pathname}`} />
      </Helmet>
      <section className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Use</h1>
        <p className="text-sm text-gray-500 mb-6">Last Updated: June 30, 2025</p>
        <div className="prose prose-lg text-gray-700">
          <p>
            Welcome to Elegant, accessible at https://elegantapp.vercel.app By accessing or using our website, you agree to be bound by these Terms of Use. If you do not agree with these terms, please do not use our website.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Use of Our Website</h2>
          <p>
            You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of this website by, any third party. You must be at least 18 years old to use our services.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Account Responsibilities</h2>
          <p>
            When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Product Purchases</h2>
          <p>
            All purchases made through our website are subject to our return and refund policies. We reserve the right to refuse service or cancel orders at our discretion, including in cases of suspected fraud or unauthorized activity.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, and designs, is the property of Elegant or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Limitation of Liability</h2>
          <p>
            Elegant is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our website or services, including but not limited to errors in content, loss of data, or interruptions in service.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Governing Law</h2>
          <p>
            These Terms of Use are governed by the laws of [Your Country/State]. Any disputes arising from these terms will be resolved in the courts of [Your City, Country].
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to These Terms</h2>
          <p>
            We may update these Terms of Use from time to time. We will notify you of any changes by posting the new terms on this page and updating the "Last Updated" date.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms of Use, please contact us at:
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

export default TermsOfUse;