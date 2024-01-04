import type { Metadata } from "next";
import Content from "./components/Content";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return <Content />;
}
