import deliveryIcon from "@/assets/icons/shipping.svg";
import moneyIcon from "@/assets/icons/money.svg";
import lockIcon from "@/assets/icons/lock.svg";
import PhoneIcon from "@/assets/icons/phone.svg";

const Features = () => {
  const features = [
    {
      icon: deliveryIcon,
      title: "Free Shipping",
      description: "Order above $200",
    },
    {
      icon: moneyIcon,
      title: "Money-back",
      description: "30 days guarantee",
    },
    {
      icon: lockIcon,
      title: "Secure Payments",
      description: "Secured by Stripe",
    },
    {
      icon: PhoneIcon,
      title: "24/7 Support",
      description: "Phone and Email support",
    },
  ];

  return (
    <div className="mt-8 py-8 px-1 md:px-1">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col py-9 ps-5 pe-2 sm:py-12 sm:px-8 bg-neutral-200 hover:shadow-md duration-300"
          >
            <div className="text-4xl mb-4">
              <img
                width={48}
                height={48}
                loading="lazy"
                src={feature?.icon}
                alt="features icon"
                className="w-8 h-8 sm:w-12 sm:h-12"
              />
            </div>
            <h5 className="text-base sm:text-[1.25rem] font-medium leading-5 sm:leading-[auto]">
              {feature?.title}
            </h5>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 sm:mt-3">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Features;
