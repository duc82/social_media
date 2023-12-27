import { useContext } from "react";
import BootstrapContext from "../context/BootstrapContext";

export default function useBootstrap() {
  return useContext(BootstrapContext);
}
