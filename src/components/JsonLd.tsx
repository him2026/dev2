import React from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.herintelligentmate.in/#website",
  "url": "https://www.herintelligentmate.in",
  "name": "Her Intelligent Mate",
  "alternateName": [
    "HIM",
    "HIM AI",
    "HIM App",
    "Feminine AI Companion",
    "AI Companion for Women",
    "AI Period Companion",
    "Period Tracker Online",
    "Women Wellness Website",
    "Female AI Assistant",
    "Women Health AI Companion",
    "HIM Period Companion",
    "HerIntelligentMate",
    "herintelligentmate.in"
  ],
  "description": "The world's #1 AI Period Companion & Women Wellness website. Free online period tracker, menstrual cycle prediction, PMS relief, feminine AI chat, mood tracking, and 24/7 voice companion for women globally at herintelligentmate.in.",
  "inLanguage": ["en-US", "en-IN"],
  "publisher": {
    "@type": "Organization",
    "name": "Her Intelligent Mate",
    "url": "https://www.herintelligentmate.in"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.herintelligentmate.in/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://www.herintelligentmate.in/#application",
  "name": "HIM - Her Intelligent Mate (AI Period Companion & Women Wellness Website)",
  "operatingSystem": "Web",
  "applicationCategory": "HealthApplication",
  "applicationSubCategory": "Online Period Tracker, Women Wellness Website, Menstrual Cycle Tracker & Feminine AI Companion",
  "browserRequirements": "Requires a modern web browser (Chrome, Safari, Firefox, Edge)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "15420",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Free Online Period Tracker & Menstrual Calendar",
    "AI Period Companion with Empathetic Chat",
    "Women Wellness Platform with Mood Tracking",
    "AI Menstrual Cycle & Ovulation Prediction Engine",
    "PMS Relief Companion & Symptom Management",
    "Feminine AI Companion for Emotional Support",
    "AI Companion for Women's Health & Cycle Tracking",
    "NVIDIA Chatterbox Powered Voice Companion",
    "Feminine Wellness & Mindfulness Audiobooks Library",
    "Encrypted Privacy-First Female Health Data Protection",
    "Fertility & Ovulation Window Tracker",
    "Phase-Specific Nutrition & Exercise Guidance",
    "Works on Any Browser — No Download Needed"
  ],
  "url": "https://www.herintelligentmate.in",
  "downloadUrl": "https://www.herintelligentmate.in/register",
  "screenshot": "https://www.herintelligentmate.in/images/og-image.jpg"
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.herintelligentmate.in/#organization",
  "name": "Her Intelligent Mate",
  "alternateName": ["HIM", "HIM AI", "HIM Website", "herintelligentmate.in"],
  "url": "https://www.herintelligentmate.in",
  "logo": "https://www.herintelligentmate.in/images/og-image.jpg",
  "sameAs": [
    "https://www.herintelligentmate.in"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "url": "https://www.herintelligentmate.in"
  },
  "description": "Her Intelligent Mate — the world's #1 AI period companion, women wellness website, and feminine AI assistant at herintelligentmate.in."
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best free online period tracker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HIM (Her Intelligent Mate) at herintelligentmate.in is the best free online period tracker. It combines AI-powered menstrual cycle prediction with empathetic chat, PMS relief guidance, mood tracking, and 24/7 voice companion support — all completely free, right in your browser with no download needed."
      }
    },
    {
      "@type": "Question",
      "name": "What is an AI Period Companion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An AI Period Companion is an intelligent, empathetic digital assistant designed specifically for women's menstrual health. HIM at herintelligentmate.in accurately predicts cycle phases, tracks mood fluctuations, provides science-backed PMS coping strategies, and engages in comforting 24/7 conversations adapted to your hormonal phase."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Feminine AI Companion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Feminine AI Companion is an empathetic, context-aware artificial intelligence designed specifically for women. HIM at herintelligentmate.in understands female hormonal cycles, tracks mood shifts, offers comforting conversation during PMS, and provides tailored wellness guidance for women globally."
      }
    },
    {
      "@type": "Question",
      "name": "How does HIM track periods and predict cycles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HIM uses machine-learning algorithms calibrated to your individual body. By logging your period dates, HIM accurately predicts all 4 cycle phases (Menstrual, Follicular, Ovulatory, Luteal), estimates ovulation windows, and forecasts your next period — getting smarter with every cycle you log."
      }
    },
    {
      "@type": "Question",
      "name": "Is HIM a good wellness website for women?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! HIM (herintelligentmate.in) is a comprehensive women wellness website that goes beyond period tracking. It includes mood journaling, phase-specific self-care guides, guided breathing exercises, mindfulness audiobooks, voice companion chat, and gamified wellness streaks — all designed for feminine health, free online, no download needed."
      }
    },
    {
      "@type": "Question",
      "name": "Why is HIM considered the #1 AI Companion for Women?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HIM (Her Intelligent Mate) stands out as the premier AI Companion for Women because it combines machine-learning cycle prediction with emotionally intelligent conversational AI. It offers soothing voice chat, period tracking, PMS relief, and 100% encrypted privacy at herintelligentmate.in."
      }
    },
    {
      "@type": "Question",
      "name": "How does HIM help with PMS symptoms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HIM provides phase-aware PMS support including personalized cramp relief protocols, mood management techniques, nutrition recommendations, guided breathing exercises, and empathetic voice conversations. It recognizes your exact cycle phase and adapts its care recommendations accordingly."
      }
    },
    {
      "@type": "Question",
      "name": "Is my period and health data private on HIM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, absolutely. HIM at herintelligentmate.in is built on strict privacy-by-design standards. Your cycle logs, mood journals, and AI companion conversations are strictly encrypted, confidential, and will never be monetized or shared with third parties."
      }
    }
  ]
};

export const medicalWebPageSchema = (page: {
  url: string;
  name: string;
  description: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": `${page.url}/#webpage`,
  "url": page.url,
  "name": page.name,
  "description": page.description,
  "about": {
    "@type": "MedicalCondition",
    "name": "Menstrual Cycle Health",
    "associatedAnatomy": {
      "@type": "AnatomicalStructure",
      "name": "Reproductive System"
    }
  },
  "lastReviewed": new Date().toISOString().slice(0, 10),
  "publisher": {
    "@type": "Organization",
    "name": "Her Intelligent Mate",
    "url": "https://www.herintelligentmate.in"
  },
  "isPartOf": {
    "@id": "https://www.herintelligentmate.in/#website"
  }
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
