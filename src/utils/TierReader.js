import bronze from "../assets/bronze.png";
import silver from "../assets/silver.png";
import gold from "../assets/gold.png";
import platinum from "../assets/platinum.png";

export const TierReader = (grade) => {
  switch (grade) {
    case "IRON":
      return bronze;
    case "BRONZE":
      return silver;
    case "SILVER":
      return gold;
    case "GOLD":
      return platinum;
    default:
      return;
  }
};
