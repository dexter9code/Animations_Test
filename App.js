import { StatusBar } from "expo-status-bar";
import LayoutAnimations from "./components/LayoutAnimation";
import PerpectiveAnimation from "./components/PerpectiveAnimation";
import SvgAnimation from "./components/SvgAnimation";
import SwipeAnimation from "./components/swipe_Pan/SwipeAnimation";

export default function App() {
  return (
    <>
      <StatusBar style="inverted" />
      <LayoutAnimations />
    </>
  );
}
