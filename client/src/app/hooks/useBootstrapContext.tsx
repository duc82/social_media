import { useContext } from "react";
import { BootstrapContext } from "../providers/BootstrapProvider";

export default function useBootstrapContext() {
  return useContext(BootstrapContext);
}
