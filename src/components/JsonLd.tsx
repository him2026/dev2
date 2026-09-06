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
    "Feminine AI Companion",
    "AI Companion for Women",
    "Female AI Assistant",
    "Women Health AI Companion",
    "HIM Period Companion",
    "HerIntelligentMate"
  ],
  "description": "The world's leading Feminine AI Companion and AI for Women. Empathetic cycle tracking, PMS emotional support, female wellness insights, and 24/7 voice companion for women globally.",
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
  "name": "HIM - Her Intelligent Mate (Feminine AI Companion & AI for Women)",
  "operatingSystem": "Web, iOS, Android",
  "applicationCategory": "HealthApplication",
  "applicationSubCategory": "Feminine Wellness AI & Menstrual Cycle Tracker",
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
    "Feminine AI Companion & Empathetic Chat for Women",
    "AI Companion for Women's Health & Cycle Tracking",
    "AI Menstrual Cycle & Ovulation Prediction Engine",
    "PMS Mood & Physical Symptom Insights for Women",
    "NVIDIA Chatterbox Powered Voice Companion",
    "Feminine Wellness & Mindfulness Audiobooks Library",
    "Encrypted Privacy-First Female Health Data Protection"
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
      "name": "What is a Feminine AI Companion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Feminine AI Companion is an empathetic, context-aware artificial intelligence designed specifically for women. It understands female hormonal cycles, tracks mood shifts, offers comforting conversation during PMS, and provides tailored wellness guidance for women globally."
      }
    },
    {
      "@type": "Question",
      "name": "Why is HIM considered the #1 AI Companion for Women?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HIM (Her Intelligent Mate) stands out as the premier AI Companion for Women because it combines machine-learning cycle prediction with DeepSeek V4 Flash powered emotional intelligence. It offers soothing voice chat, period tracking, and 100% encrypted privacy."
      }
    },
    {
      "@type": "Question",
      "name": "How does HIM support women during PMS and menstrual cycles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HIM provides phase-aware support through every menstrual stage. It offers comforting voice interaction, phase-specific self-care guides, mood tracking, and empathetic dialogue to alleviate stress, cramps, and emotional ups and downs."
      }
    },
    {
      "@type": "Question",
      "name": "Is my health and personal data kept private on HIM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, absolutely. HIM is built on strict privacy-by-design standards. Your cycle logs, mood journals, and AI companion conversations are strictly encrypted, confidential, and will never be monetized or shared with third parties."
      }
    }
  ]
};
