import { useGeneralContext } from "@/context/GeneralContext";

export const useGeneral = () => {
  const { navbar, setNavbar, payloadOrder, setPayloadOrder } =
    useGeneralContext();

  return {
    navbar,
    setNavbar,
    payloadOrder,
    setPayloadOrder,
  };
};
