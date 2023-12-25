import React from "react";
import { HeadingMain, Paragraph } from "../../Common";

export const HeroText = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeadingMain text="Temp Trek" />
      <Paragraph text="The app provides real-time temperature data for your location, ensuring that you are always prepared for the day ahead. The intuitive design allows you to effortlessly navigate " />
    </div>
  );
};
