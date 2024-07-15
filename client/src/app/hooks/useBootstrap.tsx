import { useContext } from "react";
import { BootstrapContext } from "../providers/BootstrapProvider";

export default function useBootstrap() {
  return useContext(BootstrapContext);
}
