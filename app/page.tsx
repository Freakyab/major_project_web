import Hero from "../components/hero";
import Card from "@/components/cards";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Upload from "@/components/upload";

function Page() {
  const example = [
    {
      label: "Meningioma",
      description:
        "Meningiomas are tumors that arise from the protective layers surrounding the brain and spinal cord, known as the meninges. They are typically slow-growing and may not cause symptoms initially. However, as they grow, they can exert pressure on the brain, leading to headaches, vision problems, or seizures. Meningiomas are generally benign, but some can be atypical or malignant.",
      image: "/meni.jpg",
    },
    {
      image: "/glio.jpg",
      label: "Glioma",
      description:
        "Gliomas are a type of tumor that originates from glial cells, which support and protect neurons in the brain. They can be classified into various subtypes, including astrocytomas, oligodendrogliomas, and ependymomas. Gliomas can vary widely in their aggressiveness, with some being low-grade and others high-grade, which are more aggressive and harder to treat.",
    },
    {
      label: "Pituitary Tumors",
      description:
        "Pituitary tumors develop in the pituitary gland, located at the base of the brain. These tumors can be functional (hormone-secreting) or non-functional (not secreting hormones). Functional tumors can lead to hormonal imbalances, causing symptoms like weight gain, mood swings, and changes in menstrual cycles.",
      image: "/pitu.jpg",
    },
  ];

  return (
    <TracingBeam className="p-6 min-h-screen">
      <div className="container mx-auto">
        <Hero />

        <div className="bg-gray-900 mx-3 my-8 w-full p-8 rounded-3xl shadow-lg border border-gray-700">
          <h2 className="capitalize text-2xl md:text-5xl font-bold text-white text-start py-6">
            Upload your MRI scan
          </h2>
          <Upload />
        </div>

        <h2 className="capitalize text-2xl md:text-5xl font-bold text-white text-start py-6">
          Brain Tumor Types
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {example.map((item, index) => (
            <div key={index} className="flex-grow">
              <Card
                label={item.label}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="capitalize text-2xl md:text-5xl font-bold text-white text-start py-6">
          Model used
        </h2>
        <section className="container tracking-wide leading-8">
          <article>
            <p>
              MobileNet CNN Model Overview MobileNet is a class of lightweight
              convolutional neural networks (CNNs) designed specifically for
              mobile and edge devices where computational power, memory, and
              storage are limited. Developed by Google, MobileNets use a
              combination of techniques to drastically reduce the size and
              computational cost of traditional CNNs without sacrificing too
              much accuracy. The core idea behind MobileNet is to optimize CNNs
              for mobile applications by using efficient layer designs and fewer
              parameters, making them suitable for real-time processing tasks
              like image classification, object detection, and more, all while
              operating on lower-powered devices.
            </p>
          </article>
        </section>

        <section className="bg-gray-900 mx-3 my-8 w-full p-8 rounded-3xl shadow-lg border border-gray-700">
          <h3 className="capitalize text-xl md:text-3xl font-bold text-white text-start py-6">
            {" "}
            Key Features of MobileNet
          </h3>
          <ol className="flex items-center justify-start gap-4 flex-col list-decimal container">
            <li>
              <h4 className="text-lg font-bold text-white">
                Depthwise Separable Convolutions:
              </h4>
              <p className="container tracking-wide leading-8">
                Traditional convolutions apply filters across all input
                channels. In MobileNet, this is replaced by depthwise separable
                convolutions, which factor the standard convolution into two
                layers: Depthwise convolution: Each input channel is convolved
                with its own set of filters. Pointwise convolution (1x1
                convolution): A standard convolution applied across all
                channels. This significantly reduces the number of computations
                andq parameters in the network, making it more efficient.
              </p>
            </li>

            <li>
              <h4 className="text-lg font-bold text-white">
                Width Multiplier (α):
              </h4>
              <p className="container tracking-wide leading-8">
                The width multiplier is a hyperparameter used to scale the
                number of channels in each layer. By reducing the width, the
                model becomes smaller and faster, at the expense of some
                accuracy. A smaller width multiplier reduces the model's size
                and computational load.
              </p>
            </li>
            <li>
              <h4 className="text-lg font-bold text-white">
                Resolution Multiplier (ρ):
              </h4>{" "}
              <p className="container tracking-wide leading-8">
                The resolution multiplier adjusts the input image resolution. By
                decreasing the input resolution, the network reduces the number
                of computations and parameters. However, this may also reduce
                the quality of the output, so it is a trade-off between
                performance and accuracy.
              </p>
            </li>
            <li>
              <h4 className="text-lg font-bold text-white">
                Efficient Architecture:
              </h4>{" "}
              <p className="container tracking-wide leading-8">
                MobileNet's architecture allows it to be tailored for different
                levels of computational resources, from high-end smartphones to
                low-power edge devices. MobileNet models can be designed in
                varying sizes, from "MobileNetV1" (the original version) to
                "MobileNetV2" and "MobileNetV3," with the latter offering
                further optimizations for performance and efficiency.
              </p>
            </li>
          </ol>
        </section>
      </div>
    </TracingBeam>
  );
}

export default Page;
