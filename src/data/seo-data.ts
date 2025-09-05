// SEO data สำหรับแต่ละหน้าในเว็บไซต์

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  ogUrl?: string;
  jsonLd?: object;
}

export const seoData: Record<string, PageSEO> = {
  home: {
    title: 'หน้าแรก - ระบบจองคิวออนไลน์ที่ทันสมัย',
    description: 'เริ่มต้นใช้งานระบบจองคิวออนไลน์ที่ง่ายและสะดวก จองบริการต่างๆ ได้ทุกที่ทุกเวลา ระบบจัดการคิวที่มีประสิทธิภาพ',
    keywords: 'จองคิว, หน้าแรก, ระบบจอง, booking system, จองออนไลน์, queue management',
    ogUrl: 'https://yourwebsite.com/',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ระบบจองคิว",
      "description": "ระบบจองคิวออนไลน์ที่ทันสมัย",
      "url": "https://yourwebsite.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://yourwebsite.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  },
  
  categories: {
    title: 'หมวดหมู่บริการ - เลือกประเภทบริการที่ต้องการ',
    description: 'เลือกจากหมวดหมู่บริการที่หนึ่งนึง ไม่ว่าจะเป็นสุขภาพ ความงาม การศึกษา หรือบริการอื่นๆ อีกมากมาย',
    keywords: 'หมวดหมู่บริการ, ประเภทบริการ, categories, services, บริการต่างๆ',
    ogUrl: 'https://yourwebsite.com/categories'
  },
  
  search: {
    title: 'ผลการค้นหา - ค้นหาบริการที่ต้องการ',
    description: 'ผลการค้นหาบริการต่างๆ ตามเงื่อนไขที่คุณต้องการ ค้นหาและจองบริการได้อย่างรวดเร็ว',
    keywords: 'ค้นหา, ผลการค้นหา, search results, หาบริการ, ค้นหาบริการ',
    ogUrl: 'https://yourwebsite.com/search'
  },
  
  myBookings: {
    title: 'การจองของฉัน - ประวัติและการจัดการการจอง',
    description: 'ดูประวัติการจองทั้งหมด จัดการการนัดหมาย ยกเลิกหรือเปลี่ยนแปลงการจองได้ง่ายๆ',
    keywords: 'การจองของฉัน, ประวัติการจอง, my bookings, booking history, จัดการการจอง',
    ogUrl: 'https://yourwebsite.com/my-bookings'
  },
  
  profile: {
    title: 'โปรไฟล์ - จัดการข้อมูลส่วนตัว',
    description: 'จัดการข้อมูลส่วนตัว แก้ไขข้อมูลติดต่อ ตั้งค่าการแจ้งเตือน และปรับแต่งการใช้งาน',
    keywords: 'โปรไฟล์, ข้อมูลส่วนตัว, profile, account settings, การตั้งค่า',
    ogUrl: 'https://yourwebsite.com/profile'
  },
  
  support: {
    title: 'ศูนย์ช่วยเหลือ - คำถามที่พบบ่อยและการติดต่อ',
    description: 'ศูนย์ช่วยเหลือลูกค้า คำถามที่พบบ่อย วิธีการใช้งาน และช่องทางการติดต่อเพื่อขอความช่วยเหลือ',
    keywords: 'ศูนย์ช่วยเหลือ, support, FAQ, help center, คำถามที่พบบ่อย, ติดต่อ',
    ogUrl: 'https://yourwebsite.com/support'
  }
};

// Structured Data สำหรับ Business
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ระบบจองคิว",
  "description": "ระบบจองคิวออนไลน์ที่ทันสมัย",
  "url": "https://yourwebsite.com",
  "telephone": "+66-XX-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ที่อยู่ของธุรกิจ",
    "addressLocality": "เมือง",
    "addressRegion": "จังหวัด",
    "postalCode": "รหัสไปรษณีย์",
    "addressCountry": "TH"
  },
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 09:00-16:00"
  ],
  "sameAs": [
    "https://facebook.com/yourbusiness",
    "https://twitter.com/yourbusiness",
    "https://instagram.com/yourbusiness"
  ]
};

// Service Schema สำหรับบริการต่างๆ
export const createServiceJsonLd = (serviceName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "ระบบจองคิว",
    "url": "https://yourwebsite.com"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "บริการจองคิว",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": serviceName,
          "description": description
        }
      }
    ]
  }
});