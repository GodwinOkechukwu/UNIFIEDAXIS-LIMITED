import AppLayout from "@src/components/AppLayout";
import Picture from "@src/components/picture/Picture";

const page = () => {
  return (
    <AppLayout>
      <section className="bg-[#fff] h-full text-[#000] mx-auto mt-36 md:mt-36">
        <div className="flex w-full  flex-col items-center pt-16 slg:pt-16 gap-4 px-16 text-center">
          <h3 className="font-semibold  text-xl md:text-3xl tracking-tighter">
            About Us
          </h3>
          <div className="flex flex-col gap-2">
            <h3 className="slg:text-2xl text-lg font-semibold text-center ">
              Welcome to our Unifiedaxis Limited!
            </h3>
            <p className="text-xs sm:text-sm slg:text-base !leading-[180%] ">
              Unifiedaxis Limited! is a distributor in Nigeria. We offer a wide
              range of high-quality appliances designed to meet the diverse
              needs of our customers. Our products include; <br /> Kitchen
              Appliances, Laundry Appliances, office Equipment, Home Comforts
              such as Air conditioners, heaters, fans e.t.c and Home
              Entertainment Equipment such as TVs, Sound Systems, and multimedia
              devices.
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default page;
