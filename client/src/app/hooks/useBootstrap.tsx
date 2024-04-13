import { useContext } from "react";
import BootstrapContext from "../contexts/BootstrapContext";

export default function useBootstrap() {
  return useContext(BootstrapContext);
}
