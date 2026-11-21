import { projects as en, experience as enExp, education as enEdu } from "./content";

export const about = {
  text: [
    "Je suis développeur full-stack, avec un faible pour les interfaces soignées et les produits rapides et bien construits.",
    "Je travaille surtout avec React et TypeScript côté front, et Node.js et MongoDB côté back. J'ai récemment réalisé Iterum, une plateforme Scrum propulsée par l'IA avec un service d'IA entièrement local : je suis à l'aise de l'interface soignée jusqu'à la logique qui la fait tourner.",
    "Titulaire d'une licence en technologies de l'information (mention Excellent), je parle arabe, français et anglais, et je travaille volontiers avec mes clients dans leur langue.",
  ],
};

export const services = [
  { id: "websites", title: "Sites web pour entreprises", text: "Des sites rapides et élégants qui transforment les visiteurs en clients." },
  { id: "apps", title: "Applications web et MVP SaaS", text: "De l'idée à un produit fonctionnel, avec authentification, tableaux de bord et fonctionnalités en temps réel." },
  { id: "ecommerce", title: "Boutiques en ligne", text: "Des boutiques faciles à gérer et agréables pour acheter." },
  { id: "ai", title: "IA et automatisation", text: "Des fonctionnalités d'IA concrètes et l'automatisation de vos processus, y compris des modèles locaux qui gardent vos données privées." },
];

// Same order as in content.ts
const exp = [
  { role: "Développeur web", period: "juin 2026 – sept. 2026", text: "Développement d'une application web de gestion des produits, des fournisseurs et des stocks." },
  { role: "Stagiaire PFE", period: "févr. 2026 – juin 2026", text: "Développement d'Iterum, une plateforme Scrum propulsée par l'IA, en binôme." },
  { role: "Stagiaire d'été", period: "juin 2025 – août 2025", text: "Réalisation de solutions logicielles et maintenance des systèmes." },
  { role: "Stage de perfectionnement", org: "Compagnie des Phosphates de Gafsa (CPG)", period: "janv. 2025 – févr. 2025", text: "Solutions web full-stack avec Node.js et MongoDB." },
];
export const experience = enExp.map((e, i) => ({ ...e, ...exp[i] }));

export const education = {
  ...enEdu,
  degree: "Licence en technologies de l'information (mention Excellent)",
  school: "Institut Supérieur des Études Technologiques (ISET) de Gafsa",
};

const texts: Record<string, { oneLiner: string; problem: string; solution: string; role: string; highlights: string[] }> = {
  iterum: {
    oneLiner: "Une plateforme Scrum propulsée par l'IA qui tourne sur votre propre machine : aucune donnée n'est envoyée à des services d'IA externes.",
    problem: "Les équipes agiles perdent des heures à transformer des cahiers des charges en backlogs et en user stories, et beaucoup ne peuvent pas envoyer les données de leurs projets vers des outils d'IA dans le cloud.",
    solution: "Iterum génère des backlogs priorisés (MoSCoW) et des user stories à partir de cahiers des charges grâce à un modèle d'IA local. Elle inclut aussi un assistant IA intégré et cinq tableaux de bord selon le rôle : Admin, Entreprise, Product Owner, Scrum Master et Développeur.",
    role: "Projet de fin d'études, réalisé en binôme. J'ai développé le frontend et la logique applicative, déployé la plateforme et rédigé la documentation.",
    highlights: [
      "5 sprints Scrum et 56 user stories livrés, avec 96 % de conformité à la Definition of Done",
      "Tableau Kanban en direct et chat d'équipe via Socket.IO",
      "Service d'IA local (FastAPI, Ollama, Mistral 7B), totalement découplé de l'application principale",
      "Envoi de fichiers avec Cloudinary, e-mails avec Resend et planificateur de sprints automatisé",
    ],
  },
  solofact: {
    oneLiner: "Une plateforme pour freelances : factures, projets, contrats et messagerie, avec analyse de CV par IA.",
    problem: "Les freelances jonglent entre factures, contrats et messages clients répartis dans des outils dispersés.",
    solution: "SoloFact couvre toute la collaboration : trouver un projet et y postuler, signer un contrat, facturer, puis échanger avec le client en temps réel.",
    role: "Au départ un projet académique ; je l'ai reconstruit seul comme un produit de type production, avec bien plus de fonctionnalités.",
    highlights: [
      "Générateur de profil par IA : importez un CV (PDF ou DOCX) et un LLM remplit le profil pour relecture",
      "Signature numérique des contrats dans le navigateur",
      "Générateur de factures avec numérotation automatique, calcul des taxes et export PDF",
      "Tableau Kanban, tableau de bord des revenus, notifications et messagerie en temps réel",
      "Page d'accueil 3D, mode sombre, installable comme application mobile (PWA)",
    ],
  },
  "business-manager": {
    oneLiner: "Une application web permettant aux petites entreprises de gérer leurs clients, leurs services et leur planning.",
    problem: "Les petites entreprises suivent souvent clients, services et rendez-vous dans des tableurs ou sur papier.",
    solution: "Un tableau de bord pour les clients et les services, une planification par calendrier, une connexion sécurisée et une API REST derrière le tout.",
    role: "J'ai réalisé le workflow CRUD complet et l'interface pilotée par l'API.",
    highlights: [
      "CRUD complet pour les clients et les services",
      "Planification par calendrier",
      "Authentification sécurisée",
      "API REST avec un backend Java / Spring Boot",
    ],
  },
};
export const projects = en.map((p) => ({ ...p, ...texts[p.slug] }));