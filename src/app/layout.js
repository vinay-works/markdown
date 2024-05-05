import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Convert Google Docs To Markdown - FREE!",
  description:
  "Effortlessly convert  Google Docs  to markdown with our free tool!  Your privacy is our priority; we only need the Google Docs link for extraction.",
  // openGraph: {
  //   title: "Convert Google Docs To Markdown - FREE!",
  //   description:
  //     "Effortlessly convert  Google Docs  to markdown with our free tool!  Your privacy is our priority; we only need the Google Docs link for extraction.",
  //   // url: "https://downloadimagegoogledocs.com",
  //   siteName: "Download Image Google Docs",
  //   images: [
  //     {
  //       url: "https://auth.typeflo.io/storage/v1/object/public/general/public/Opengraph.jpg",
  //       alt: "Download Image Google Docs",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
