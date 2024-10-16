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
      image: "/images.jpeg",
    },
    {
      image: "/images.jpeg",
      label: "Glioma",
      description:
        "Gliomas are a type of tumor that originates from glial cells, which support and protect neurons in the brain. They can be classified into various subtypes, including astrocytomas, oligodendrogliomas, and ependymomas. Gliomas can vary widely in their aggressiveness, with some being low-grade and others high-grade, which are more aggressive and harder to treat.",
    },
    {
      label: "Pituitary Tumors",
      description:
        "Pituitary tumors develop in the pituitary gland, located at the base of the brain. These tumors can be functional (hormone-secreting) or non-functional (not secreting hormones). Functional tumors can lead to hormonal imbalances, causing symptoms like weight gain, mood swings, and changes in menstrual cycles.",
      image: "/images.jpeg",
    },
  ];

  return (
    <TracingBeam className="p-6 min-h-screen">
      <div className="container mx-auto">
        <Hero />

        <div className="bg-gray-900 mx-3 my-8 w-full p-8 rounded-3xl shadow-lg border border-gray-700">
          <p className="capitalize text-2xl md:text-5xl font-bold text-white text-start py-6">
            Upload your MRI scan
          </p>
          <div className="flex flex-col md:flex-row gap-6 p-4">
            <Upload />
            <TextGenerateEffect
              words={
                "Upload your MRI scan to get a detailed analysis of your brain tumor and classification of the type of tumor."
              }
            />
          </div>
        </div>

        <p className="capitalize text-2xl md:text-5xl font-bold text-white text-start py-6">
          Brain Tumor Types
        </p>

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
    </TracingBeam>
  );
}

export default Page;
