import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  jsonLd?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'ระบบจองคิว - จองบริการออนไลน์ง่ายๆ ได้ทุกที่ทุกเวลา',
  description = 'ระบบจองคิวออนไลน์ที่ทันสมัย จองบริการต่างๆ ได้อย่างสะดวกรวดเร็ว ดูประวัติการจอง และจัดการการนัดหมายทั้งหมดในที่เดียว',
  keywords = 'จองคิว, จองออนไลน์, ระบบจอง, booking system, appointment, queue system, จองบริการ',
  ogImage = 'https://yourwebsite.com/og-image.jpg',
  ogUrl = 'https://yourwebsite.com/',
  jsonLd
}) => {
  const fullTitle = title.includes('ระบบจองคิว') ? title : `${title} | ระบบจองคิว`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={ogUrl} />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};