"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/shadcn-io/dot-pattern";

const features = [
  {
    category: "Explore",
    title: "Trustworthy and verified listings",
    details: "Discover the best rental options with user reviews and ratings",
    tutorialLink: "/explore",
    image: "/landing-search1.png",
  },
  {
    category: "Search",
    title: "Browse Rental Listings with Ease",
    details:
      "Get access to user reviews and ratings for better understanding of rental options",
    tutorialLink: "/search",
    image: "/landing-search2.png",
  },
  {
    category: "Discover",
    title: "Simplify Your Rental Search using Advanced Tools",
    details:
      "Find trustworthy and verified rental listings to ensure a hassle-free experience",
    tutorialLink: "/discover",
    image: "/landing-search3.png",
  },
];

const FeaturesSection = () => {
  return (
    <div className="min-h-screen py-24 flex items-center justify-center ">
        <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] -z-1 bg-background",
        )}
      />
      <div className="max-w-screen-lg w-full px-6 ">
        <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto">
          Rapid home searching with effective search filters
        </h2>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? 20 : -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
            >
              <Image
                src={feature.image}
                alt="search image 1"
                width={500}
                height={500}
              ></Image>
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-semibold text-sm text-muted-foreground">
                  {feature.category}
                </span>
                <h4 className="my-3 text-3xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-[17px]">
                  {feature.details}
                </p>
                <Button
                  asChild
                  className="mt-6 rounded-full min-w-40 text-[15px]"
                >
                  <Link href={feature.tutorialLink}>
                    Learn More <ArrowRight />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
