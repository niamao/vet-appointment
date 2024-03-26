import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header"
import { Container, Row, Col } from 'react-bootstrap';

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} overflow-x-hidden`}>
        <Container fluid className="px-0 vh-100">
          <Row>
            <Col xs="auto" className="px-0 vh-100">
              <Sidebar />
            </Col>
            <Col className="ps-0 vh-100">
              <Header />
              {children}
            </Col>
          </Row>
        </Container>
      </body>
    </html>
  );
}
