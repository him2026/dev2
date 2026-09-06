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
  "alternateName": ["HIM", "HIM AI", "HIM Period Companion", "HerIntelligentMate"],
  "description": "The world's leading AI period companion and feminine health ally. Empathetic cycle tracking, PMS support, mood insights, and voice companion for women globally.",
  "inLanguage": "en-US",
  "publisher": {
    "@type": "Organization",
    "name": "Her Intelligent Mate",
    "url": "https://www.herintelligentmate.in"
  }
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://www.herintelligentmate.in/#application",
  "name": "HIM - Her Intelligent Mate (AI Period Companion)",
  "operatingSystem": "Web, iOS, Android",
  "applicationCategory": "HealthApplication",
  "applicationSubCategory": "Menstrual Cycle Tracker & Feminine Wellness AI",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "12850",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Empathetic AI Period Companion & Chat",
    "AI Menstrual Cycle & Ovulation Prediction Engine",
    "PMS Mood & Physical Symptom Insights",
    "NVIDIA Chatterbox Powered Voice Companion",
    "Phase-tailored Feminine Wellness & Mindfulness Library",
    "Encrypted Privacy-First Health Data Security"
  ]
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.herintelligentmate.in/#organization",
  "name": "Her Intelligent Mate",
  "url": "https://www.herintelligentmate.in",
  "logo": "https://www.herintelligentmate.in/images/og-image.jpg",
  "sameAs": [
    "https://www.herintelligentmate.in"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "url": "https://www.herintelligentmate.in"
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an AI Period Companion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An AI Period Companion is an intelligent, empathetic digital companion designed specifically for women to track menstrual cycles, analyze mood shifts, offer personalized PMS support, and provide 24/7 comforting conversation tailored to your exact cycle phase."
      }
    },
    {
      "@type": "Question",
      "name": "How does Her Intelligent Mate (HIM) support women during PMS and menstruation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HIM (Her Intelligent Mate) combines advanced cycle prediction algorithms with empathetic AI dialogue. It offers comforting voice interaction, personalized nutrition and mindfulness recommendations, mood tracking, and phase-aware conversations to ease PMS discomfort and emotional fluctuations."
      }
    },
    {
      "@type": "Question",
      "name": "Is my period and cycle health data private on HIM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, absolutely. HIM is built on strict privacy-by-design principles. Your cycle data, journal entries, and AI conversations are fully encrypted, confidential, and never sold or shared with third parties."
      }
    },
    {
      "@type": "Question",
      "name": "Can I talk to HIM using voice interaction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! HIM features an intuitive Voice Companion powered by advanced speech synthesis, enabling hands-free, natural voice conversations during your cycle days when typing feels tiring."
      }
    }
  ]
};
