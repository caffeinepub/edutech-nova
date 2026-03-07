export interface LocalQuestion {
  id: number;
  text: string;
  answers: string[];
  correctIndex: number;
  subject: "Physics" | "Chemistry" | "Mathematics";
}

export const JEE_QUESTIONS: LocalQuestion[] = [
  // PHYSICS
  {
    id: 0,
    subject: "Physics",
    text: "A body is thrown vertically upward with velocity 20 m/s. The maximum height reached is (g = 10 m/s²):",
    answers: ["10 m", "20 m", "30 m", "40 m"],
    correctIndex: 1,
  },
  {
    id: 1,
    subject: "Physics",
    text: "The unit of electric charge in SI system is:",
    answers: ["Ampere", "Coulomb", "Volt", "Ohm"],
    correctIndex: 1,
  },
  {
    id: 2,
    subject: "Physics",
    text: "Which of the following has the highest frequency?",
    answers: ["Radio waves", "Infrared waves", "X-rays", "Microwaves"],
    correctIndex: 2,
  },
  {
    id: 3,
    subject: "Physics",
    text: "Newton's second law of motion states that force equals:",
    answers: [
      "mass × velocity",
      "mass × acceleration",
      "mass × distance",
      "mass × time",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    subject: "Physics",
    text: "The phenomenon of light bending around obstacles is called:",
    answers: ["Reflection", "Refraction", "Diffraction", "Polarization"],
    correctIndex: 2,
  },
  {
    id: 5,
    subject: "Physics",
    text: "The SI unit of power is:",
    answers: ["Joule", "Newton", "Watt", "Pascal"],
    correctIndex: 2,
  },
  {
    id: 6,
    subject: "Physics",
    text: "A concave lens always forms a:",
    answers: [
      "Real and inverted image",
      "Virtual and erect image",
      "Real and erect image",
      "Virtual and inverted image",
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    subject: "Physics",
    text: "The speed of light in vacuum is approximately:",
    answers: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
    correctIndex: 1,
  },
  {
    id: 8,
    subject: "Physics",
    text: "Which law states that the pressure of a gas is inversely proportional to its volume at constant temperature?",
    answers: [
      "Charles' Law",
      "Avogadro's Law",
      "Boyle's Law",
      "Gay-Lussac's Law",
    ],
    correctIndex: 2,
  },
  // CHEMISTRY
  {
    id: 9,
    subject: "Chemistry",
    text: "The atomic number of Carbon is:",
    answers: ["4", "6", "8", "12"],
    correctIndex: 1,
  },
  {
    id: 10,
    subject: "Chemistry",
    text: "Which gas is produced when zinc reacts with dilute sulphuric acid?",
    answers: ["Oxygen", "Carbon dioxide", "Hydrogen", "Sulphur dioxide"],
    correctIndex: 2,
  },
  {
    id: 11,
    subject: "Chemistry",
    text: "The pH of a neutral solution at 25°C is:",
    answers: ["0", "7", "14", "1"],
    correctIndex: 1,
  },
  {
    id: 12,
    subject: "Chemistry",
    text: "Which of the following is a noble gas?",
    answers: ["Nitrogen", "Hydrogen", "Argon", "Chlorine"],
    correctIndex: 2,
  },
  {
    id: 13,
    subject: "Chemistry",
    text: "The IUPAC name of CH₃CHO is:",
    answers: ["Methanal", "Ethanal", "Propanal", "Butanal"],
    correctIndex: 1,
  },
  {
    id: 14,
    subject: "Chemistry",
    text: "Which element has the highest electronegativity?",
    answers: ["Oxygen", "Nitrogen", "Chlorine", "Fluorine"],
    correctIndex: 3,
  },
  {
    id: 15,
    subject: "Chemistry",
    text: "Avogadro's number is approximately:",
    answers: ["6.022 × 10²³", "6.022 × 10²²", "3.011 × 10²³", "1.602 × 10¹⁹"],
    correctIndex: 0,
  },
  {
    id: 16,
    subject: "Chemistry",
    text: "What is the chemical formula of baking soda?",
    answers: ["NaCl", "Na₂CO₃", "NaHCO₃", "NaOH"],
    correctIndex: 2,
  },
  {
    id: 17,
    subject: "Chemistry",
    text: "The hybridization of carbon in ethylene (C₂H₄) is:",
    answers: ["sp", "sp²", "sp³", "sp³d"],
    correctIndex: 1,
  },
  // MATHEMATICS
  {
    id: 18,
    subject: "Mathematics",
    text: "The derivative of sin(x) is:",
    answers: ["-cos(x)", "cos(x)", "tan(x)", "-sin(x)"],
    correctIndex: 1,
  },
  {
    id: 19,
    subject: "Mathematics",
    text: "If log₁₀(x) = 2, then x equals:",
    answers: ["20", "100", "1000", "10"],
    correctIndex: 1,
  },
  {
    id: 20,
    subject: "Mathematics",
    text: "The sum of interior angles of a hexagon is:",
    answers: ["540°", "360°", "720°", "900°"],
    correctIndex: 2,
  },
  {
    id: 21,
    subject: "Mathematics",
    text: "What is ∫sin(x)dx?",
    answers: ["cos(x) + C", "-cos(x) + C", "sin(x) + C", "-sin(x) + C"],
    correctIndex: 1,
  },
  {
    id: 22,
    subject: "Mathematics",
    text: "The number of ways to arrange 5 distinct objects is:",
    answers: ["25", "60", "100", "120"],
    correctIndex: 3,
  },
  {
    id: 23,
    subject: "Mathematics",
    text: "Which of the following is NOT a prime number?",
    answers: ["11", "13", "15", "17"],
    correctIndex: 2,
  },
  {
    id: 24,
    subject: "Mathematics",
    text: "The value of sin²(θ) + cos²(θ) is always equal to:",
    answers: ["0", "2", "1", "Depends on θ"],
    correctIndex: 2,
  },
];

export const MOTIVATIONS: string[] = [
  "Slow growth is still growth 🌸",
  "Water your dreams daily 💧",
  "Protect your peace 🕊️",
  "Stay consistent 🎯",
  "Bloom in your time 🌷",
];
