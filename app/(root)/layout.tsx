import CustomPage from "@/components/CustomPage"
import Footer from "@/components/Footer";
import Header from "@/components/Header"
import { siteConfig } from "@/config/site";
import CityModalProvider from "@/context/CityModalProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: {
     default: siteConfig.name,
     template: `%s | ${siteConfig.name}`
   },
   description: siteConfig.description,
   icons: [
      {
         url: '/vercel.svg',
         href: '/vercel.svg'
      }
   ],
   openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: 'https://localhost:3000',
      siteName: siteConfig.name,
      images: [
        {
          url: 'https://localhost:3000/public/billboard/', // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: 'https://localhost:3000/public/billboard/', // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: 'My custom alt',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {

   return (
      <>
         <CityModalProvider />
         <Header>
            <CustomPage>
               {children}
            </CustomPage>
            <Footer />
         </Header>
      </>
   )
}
