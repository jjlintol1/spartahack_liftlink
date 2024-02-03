import React from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface IMetricProps {
  icon: string;
  metricTitle: string;
  metricValue?: string | number;
  otherClasses?: string;
  targetedMuscleGroups?: string[];
}

const Metric = ({
  icon,
  metricTitle,
  metricValue,
  otherClasses,
  targetedMuscleGroups,
}: IMetricProps) => {
  return (
    <div className={`flex items-center gap-1 ${otherClasses}`}>
      <Image
        src={icon}
        alt={metricTitle}
        width={20}
        height={20}
        className="invert-0 dark:invert"
      />
      {targetedMuscleGroups ? (
        targetedMuscleGroups.slice(0, 2).map((item) => (
          <Badge
            variant="outline"
            key={item}
            className="body-regular text-dark200_light800"
          >
            {item}
          </Badge>
        ))
      ) : (
        <p className="body-regular text-dark200_light800">{metricValue}</p>
      )}
    </div>
  );
};

export default Metric;
