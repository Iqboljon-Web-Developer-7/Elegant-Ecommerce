import StyledLink from "@/components/atoms/StyledLink";
import contactImg from "@/assets/contact/contactBanner.webp";
import Banner from "@/components/molecules/Banner";
import storeIcon from "@/assets/icons/store.svg";
import emailIcon from "@/assets/icons/mail.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import Features from "@/Features/Home/_components/Features";
import { ContactForm } from "./ContactForm";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  const features = [
    {
      icon: storeIcon,
      title: "Address",
      description: "234 Hai Trieu, Ho Chi Minh City, Viet Nam",
    },
    {
      icon: phoneIcon,
      title: "Contact Us",
      description: "+84 234 567 890",
    },
    {
      icon: emailIcon,
      title: "Email",
      description: "hello@3legant.com",
    },
  ];

  return (
    <>
      <>
        <Helmet>
          <title>Contact Us | Elegant</title>
          <meta name="description" content="Tell us about your idea, report and whatever" />
        </Helmet>
      </>
      <div className="container-xl">
        <div className="breadcrumb mt-4 text-sm inter">
          <span className="text-slate-600">Home {">"}</span> &nbsp; Contact Us
        </div>
        <div className="mt-10 max-w-[45rem] inter">
          <h3 className="font-medium text-gray-900 tracking-tight">
            We believe in sustainable decor. We’re passionate about life at
            home.
          </h3>
          <p className="mt-6 text-neutral-700 text-base leading-relaxed">
            Our features timeless furniture, with natural fabrics, curved lines,
            plenty of mirrors and classic design, which can be incorporated into
            any decor project. The pieces enchant for their sobriety, to last
            for generations, faithful to the shapes of each period, with a touch
            of the present
          </p>
        </div>

        <Banner img={contactImg} className="mt-12">
          <h4 className="max-w-[22.3rem] font-medium">About Us</h4>
          <p className="text-sm sm:text-[1.25rem] md:text-base lg:text-[1.25rem] text-neutral-700 font-normal inter">
            3legant is a gift & decorations store based in HCMC, Vietnam. Est
            since 2019.
          </p>
          <p className="text-sm sm:text-[1.25rem] md:text-base lg:text-[1.25rem] text-neutral-700 font-normal inter">
            Our customer service is always prepared to support you 24/7
          </p>
          <StyledLink
            destination="/products/discount"
            name="Shop Now"
            className="mt-4 lg:mt-6"
          />
        </Banner>

        <h4 className="text-center my-12">Contact Us</h4>

        <div className="pb-8 px-1 md:px-1">
          <div className="sm:h-40 flex items-center justify-center flex-col sm:flex-row gap-2 md:gap-6 inter">
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-full h-full px-6 md:px-10 py-8 flex items-center justify-center flex-col bg-neutral-200 hover:shadow-md duration-300"
              >
                <div className="text-4xl mb-4">
                  <img
                    src={feature.icon}
                    alt="features icon"
                    className="w-8 h-8"
                  />
                </div>
                <p className="font-bold">{feature.title}</p>
                <p className="text-xs lg:text-sm text-center text-neutral-700 mt-2 sm:mt-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-2xl bg-neutral-200">
        <div className="container-xl">
          <Features />
        </div>
      </div>
      <div className="container-xl py-10 grid grid-cols-1 md:grid-cols-2 gap-[5%] items-center">
        <ContactForm />
        <div
          className="relative mx-auto mb-4 md:mx-0"
        >
          <a
            href="https://yandex.uz/maps/org/94800077397/?utm_medium=mapframe&utm_source=maps"
            style={{
              color: "#eee",
              fontSize: "12px",
              position: "absolute",
              top: "0px",
            }}
          >
            Najot Ta'lim Chilonzor filiali
          </a>
          <a
            href="https://yandex.uz/maps/10335/tashkent/category/educational_center/184106168/?utm_medium=mapframe&utm_source=maps"
            style={{
              color: "#eee",
              fontSize: "12px",
              position: "absolute",
              top: "14px",
            }}
          >
            O‘quv markazi Toshkentda
          </a>
          <a
            href="https://yandex.uz/maps/10335/tashkent/category/computer_courses/184106158/?utm_medium=mapframe&utm_source=maps"
            style={{
              color: "#eee",
              fontSize: "12px",
              position: "absolute",
              top: "28px",
            }}
          >
            Kompyuter kurslari Toshkentda
          </a>
          <iframe
            src="https://yandex.uz/map-widget/v1/?ll=69.203532%2C41.285835&mode=search&oid=94800077397&ol=biz&z=16.81"
            width="580"
            height="400"
            frameBorder="1"
            allowFullScreen
            style={{ position: "relative" }}
            title="Yandex Map"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
