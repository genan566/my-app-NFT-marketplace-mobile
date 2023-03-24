import { Dimensions } from "react-native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

export const useDimensionSizes = () => {
    return { width: WIDTH, height: HEIGHT }
}