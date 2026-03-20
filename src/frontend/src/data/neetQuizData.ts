export interface NeetQuestion {
  id: number;
  text: string;
  answers: string[];
  correctIndex: number;
  subject: "Physics" | "Chemistry" | "Biology";
  solution: string;
}

export const NEET_QUESTIONS: NeetQuestion[] = [
  // ── PHYSICS (20 questions) ──────────────────────────────────────────
  {
    id: 0,
    subject: "Physics",
    text: "A particle moves in a straight line with uniform acceleration. If its velocity changes from 10 m/s to 30 m/s in 5 seconds, what is the acceleration?",
    answers: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
    correctIndex: 1,
    solution:
      "Using a = (v - u) / t = (30 - 10) / 5 = 20 / 5 = 4 m/s². Acceleration is the rate of change of velocity.",
  },
  {
    id: 1,
    subject: "Physics",
    text: "The SI unit of electric potential is:",
    answers: ["Ampere", "Ohm", "Volt", "Farad"],
    correctIndex: 2,
    solution:
      "Electric potential is measured in Volts (V). 1 Volt = 1 Joule / 1 Coulomb. It represents the work done per unit charge.",
  },
  {
    id: 2,
    subject: "Physics",
    text: "Which of the following electromagnetic waves has the shortest wavelength?",
    answers: ["Visible light", "Ultraviolet rays", "Gamma rays", "X-rays"],
    correctIndex: 2,
    solution:
      "Gamma rays have the shortest wavelength (< 0.01 nm) and highest frequency in the electromagnetic spectrum, followed by X-rays.",
  },
  {
    id: 3,
    subject: "Physics",
    text: "A body of mass 5 kg is moving with a velocity of 4 m/s. Its kinetic energy is:",
    answers: ["20 J", "40 J", "10 J", "80 J"],
    correctIndex: 1,
    solution:
      "KE = ½mv² = ½ × 5 × 4² = ½ × 5 × 16 = 40 J. Kinetic energy depends on both mass and the square of velocity.",
  },
  {
    id: 4,
    subject: "Physics",
    text: "The phenomenon responsible for the bluish colour of the sky is:",
    answers: [
      "Reflection of light",
      "Refraction of light",
      "Scattering of light",
      "Dispersion of light",
    ],
    correctIndex: 2,
    solution:
      "Rayleigh scattering: shorter wavelengths (blue) are scattered more by atmospheric molecules. This makes the sky appear blue during the day.",
  },
  {
    id: 5,
    subject: "Physics",
    text: "The image formed by a convex mirror is always:",
    answers: [
      "Real and inverted",
      "Virtual and erect",
      "Real and erect",
      "Virtual and inverted",
    ],
    correctIndex: 1,
    solution:
      "A convex mirror always forms a virtual, erect, and diminished image behind the mirror, regardless of the object's position.",
  },
  {
    id: 6,
    subject: "Physics",
    text: "Ohm's law states that current through a conductor is:",
    answers: [
      "Inversely proportional to voltage",
      "Directly proportional to voltage",
      "Independent of voltage",
      "Proportional to the square of voltage",
    ],
    correctIndex: 1,
    solution:
      "Ohm's law: V = IR, so I = V/R. At constant temperature, current is directly proportional to the applied voltage.",
  },
  {
    id: 7,
    subject: "Physics",
    text: "The period of a simple pendulum depends on:",
    answers: [
      "Mass of the bob",
      "Amplitude of swing",
      "Length of the pendulum",
      "Material of the bob",
    ],
    correctIndex: 2,
    solution:
      "T = 2π√(L/g). The period depends only on the length L and gravitational acceleration g, not on mass or amplitude (for small angles).",
  },
  {
    id: 8,
    subject: "Physics",
    text: "When a charged particle moves perpendicular to a magnetic field, the path is:",
    answers: ["Straight line", "Parabola", "Ellipse", "Circle"],
    correctIndex: 3,
    solution:
      "The magnetic force is always perpendicular to velocity (F = qv×B), providing centripetal force. This causes circular motion.",
  },
  {
    id: 9,
    subject: "Physics",
    text: "The escape velocity from Earth's surface is approximately:",
    answers: ["7.9 km/s", "11.2 km/s", "25 km/s", "3 km/s"],
    correctIndex: 1,
    solution:
      "Escape velocity = √(2gR) = √(2 × 9.8 × 6.4×10⁶) ≈ 11.2 km/s. This is the minimum speed needed to escape Earth's gravity.",
  },
  {
    id: 10,
    subject: "Physics",
    text: "The work done by a force is zero when the force is applied:",
    answers: [
      "In the direction of displacement",
      "Opposite to displacement",
      "Perpendicular to displacement",
      "At 45° to displacement",
    ],
    correctIndex: 2,
    solution:
      "W = Fd cosθ. When θ = 90°, cos90° = 0, so W = 0. No work is done when force is perpendicular to displacement.",
  },
  {
    id: 11,
    subject: "Physics",
    text: "Which of the following is a scalar quantity?",
    answers: ["Velocity", "Force", "Momentum", "Speed"],
    correctIndex: 3,
    solution:
      "Speed is a scalar — it has only magnitude. Velocity, force, and momentum are vectors — they have both magnitude and direction.",
  },
  {
    id: 12,
    subject: "Physics",
    text: "The loudness of sound depends on its:",
    answers: ["Frequency", "Amplitude", "Wavelength", "Speed"],
    correctIndex: 1,
    solution:
      "Loudness is determined by amplitude. Greater amplitude means more energy, which the ear perceives as louder sound.",
  },
  {
    id: 13,
    subject: "Physics",
    text: "A transformer works on the principle of:",
    answers: [
      "Mutual induction",
      "Self induction",
      "Electromagnetic radiation",
      "Electrostatic induction",
    ],
    correctIndex: 0,
    solution:
      "A transformer uses mutual electromagnetic induction between two coils. AC in the primary coil induces an EMF in the secondary coil.",
  },
  {
    id: 14,
    subject: "Physics",
    text: "The energy stored in a capacitor of capacitance C charged to voltage V is:",
    answers: ["CV", "½CV", "½CV²", "CV²"],
    correctIndex: 2,
    solution:
      "Energy stored = ½CV². This is derived by integrating the work done while charging the capacitor from 0 to V.",
  },
  {
    id: 15,
    subject: "Physics",
    text: "According to Newton's third law, action and reaction forces act on:",
    answers: [
      "The same body",
      "Different bodies",
      "The same body in same direction",
      "Different bodies in same direction",
    ],
    correctIndex: 1,
    solution:
      "Newton's 3rd law: For every action there is an equal and opposite reaction. These forces act on DIFFERENT bodies, hence they don't cancel.",
  },
  {
    id: 16,
    subject: "Physics",
    text: "The process of nuclear fission involves:",
    answers: [
      "Fusion of two light nuclei",
      "Splitting of a heavy nucleus",
      "Emission of electrons",
      "Absorption of photons",
    ],
    correctIndex: 1,
    solution:
      "Nuclear fission: a heavy nucleus (like U-235) splits into smaller nuclei, releasing enormous energy. Used in nuclear reactors and atomic bombs.",
  },
  {
    id: 17,
    subject: "Physics",
    text: "The total mechanical energy of a freely falling body (ignoring air resistance):",
    answers: [
      "Increases continuously",
      "Decreases continuously",
      "Remains constant",
      "First increases then decreases",
    ],
    correctIndex: 2,
    solution:
      "By conservation of energy, total mechanical energy (KE + PE) remains constant. As PE decreases, KE increases by the same amount.",
  },
  {
    id: 18,
    subject: "Physics",
    text: "Which type of lens is used to correct myopia (short-sightedness)?",
    answers: [
      "Convex lens",
      "Concave lens",
      "Cylindrical lens",
      "Bifocal lens",
    ],
    correctIndex: 1,
    solution:
      "Myopia (nearsightedness) is corrected using concave (diverging) lenses, which shift the focal point back onto the retina.",
  },
  {
    id: 19,
    subject: "Physics",
    text: "Bernoulli's principle is based on the law of conservation of:",
    answers: ["Mass", "Momentum", "Energy", "Charge"],
    correctIndex: 2,
    solution:
      "Bernoulli's equation (P + ½ρv² + ρgh = constant) is derived from conservation of energy for fluid flow along a streamline.",
  },

  // ── CHEMISTRY (20 questions) ────────────────────────────────────────
  {
    id: 20,
    subject: "Chemistry",
    text: "The molecular formula of glucose is:",
    answers: ["C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "C₆H₁₀O₅", "CH₂O"],
    correctIndex: 0,
    solution:
      "Glucose is a monosaccharide with molecular formula C₆H₁₂O₆. It has 6 carbons, an aldehyde group, and multiple hydroxyl groups.",
  },
  {
    id: 21,
    subject: "Chemistry",
    text: "Which of the following is an exothermic reaction?",
    answers: [
      "Photosynthesis",
      "Dissolution of ammonium nitrate",
      "Combustion of methane",
      "Decomposition of water",
    ],
    correctIndex: 2,
    solution:
      "Combustion reactions release heat to the surroundings (exothermic). CH₄ + 2O₂ → CO₂ + 2H₂O + energy (890 kJ/mol).",
  },
  {
    id: 22,
    subject: "Chemistry",
    text: "The valency of nitrogen in ammonia (NH₃) is:",
    answers: ["1", "2", "3", "5"],
    correctIndex: 2,
    solution:
      "In NH₃, nitrogen forms 3 covalent bonds with 3 hydrogen atoms, so its valency is 3. Nitrogen has 5 valence electrons; 3 are used for bonding.",
  },
  {
    id: 23,
    subject: "Chemistry",
    text: "Which law states that gases at the same temperature and pressure contain equal numbers of molecules per unit volume?",
    answers: ["Boyle's Law", "Charles' Law", "Avogadro's Law", "Dalton's Law"],
    correctIndex: 2,
    solution:
      "Avogadro's Law: equal volumes of all gases at the same T and P contain the same number of molecules. This led to the concept of the mole.",
  },
  {
    id: 24,
    subject: "Chemistry",
    text: "The oxidation state of sulphur in H₂SO₄ is:",
    answers: ["+2", "+4", "+6", "-2"],
    correctIndex: 2,
    solution:
      "In H₂SO₄: H is +1 (×2 = +2), O is -2 (×4 = -8). For overall neutrality: +2 + S + (-8) = 0, so S = +6.",
  },
  {
    id: 25,
    subject: "Chemistry",
    text: "Which of the following is a colligative property?",
    answers: [
      "Refractive index",
      "Osmotic pressure",
      "Surface tension",
      "Viscosity",
    ],
    correctIndex: 1,
    solution:
      "Colligative properties depend on the number of solute particles. Osmotic pressure is a colligative property; others listed depend on molecular nature.",
  },
  {
    id: 26,
    subject: "Chemistry",
    text: "The electronic configuration of Na⁺ ion is:",
    answers: ["2, 8, 1", "2, 8, 2", "2, 8", "2, 7"],
    correctIndex: 2,
    solution:
      "Sodium (Na) has configuration 2, 8, 1. It loses 1 electron to form Na⁺ with configuration 2, 8 — same as neon (noble gas).",
  },
  {
    id: 27,
    subject: "Chemistry",
    text: "Which acid is present in vinegar?",
    answers: [
      "Hydrochloric acid",
      "Sulphuric acid",
      "Acetic acid",
      "Nitric acid",
    ],
    correctIndex: 2,
    solution:
      "Vinegar contains 5-8% acetic acid (CH₃COOH). It is a weak organic acid responsible for vinegar's sour taste and pungent smell.",
  },
  {
    id: 28,
    subject: "Chemistry",
    text: "The IUPAC name of CH₃-CH₂-OH is:",
    answers: ["Methanol", "Ethanol", "Propanol", "Butanol"],
    correctIndex: 1,
    solution:
      "CH₃-CH₂-OH has 2 carbons with a hydroxyl (-OH) group. It is ethanol (eth = 2 carbons, -ol = alcohol group).",
  },
  {
    id: 29,
    subject: "Chemistry",
    text: "Which of the following is NOT a greenhouse gas?",
    answers: [
      "Carbon dioxide",
      "Methane",
      "Nitrous oxide",
      "Nitrogen gas (N₂)",
    ],
    correctIndex: 3,
    solution:
      "N₂ (diatomic nitrogen) is NOT a greenhouse gas because it cannot absorb infrared radiation. CO₂, CH₄, and N₂O are significant greenhouse gases.",
  },
  {
    id: 30,
    subject: "Chemistry",
    text: "The reaction between an acid and a base to form salt and water is called:",
    answers: ["Oxidation", "Reduction", "Neutralization", "Combustion"],
    correctIndex: 2,
    solution:
      "Neutralization: Acid + Base → Salt + Water. Example: HCl + NaOH → NaCl + H₂O. The pH shifts towards 7.",
  },
  {
    id: 31,
    subject: "Chemistry",
    text: "Which of the following has the highest bond energy?",
    answers: ["C-C", "C=C", "C≡C", "C-H"],
    correctIndex: 2,
    solution:
      "Bond energy increases with bond order. C≡C (triple bond) ≈ 835 kJ/mol > C=C (double bond) ≈ 614 kJ/mol > C-C (single bond) ≈ 346 kJ/mol.",
  },
  {
    id: 32,
    subject: "Chemistry",
    text: "The catalyst used in the Haber process for ammonia synthesis is:",
    answers: ["Platinum", "Iron", "Vanadium pentoxide", "Nickel"],
    correctIndex: 1,
    solution:
      "The Haber process (N₂ + 3H₂ → 2NH₃) uses iron as catalyst with molybdenum as promoter, at 400-500°C and 200 atm pressure.",
  },
  {
    id: 33,
    subject: "Chemistry",
    text: "Which of the following solutions has the highest conductivity?",
    answers: [
      "Pure water",
      "Sugar solution",
      "Glucose solution",
      "Salt (NaCl) solution",
    ],
    correctIndex: 3,
    solution:
      "NaCl dissociates into Na⁺ and Cl⁻ ions, which conduct electricity. Sugar and glucose are non-electrolytes; pure water has very few ions.",
  },
  {
    id: 34,
    subject: "Chemistry",
    text: "The number of sigma (σ) bonds in ethyne (C₂H₂) is:",
    answers: ["1", "2", "3", "4"],
    correctIndex: 2,
    solution:
      "In C₂H₂: each C-H bond = 1 σ bond (×2 = 2 σ bonds), and the C≡C triple bond = 1 σ + 2 π bonds. Total σ bonds = 3.",
  },
  {
    id: 35,
    subject: "Chemistry",
    text: "Which transition metal gives a characteristic purple colour in the +7 oxidation state?",
    answers: ["Iron", "Copper", "Manganese", "Chromium"],
    correctIndex: 2,
    solution:
      "KMnO₄ (potassium permanganate) contains Mn in +7 state and is intensely purple. It is a strong oxidizing agent.",
  },
  {
    id: 36,
    subject: "Chemistry",
    text: "The functional group present in aldehydes is:",
    answers: ["-OH", "-COOH", "-CHO", "-CO-"],
    correctIndex: 2,
    solution:
      "Aldehydes contain the -CHO (formyl) group at the terminal carbon. Example: HCHO (methanal), CH₃CHO (ethanal).",
  },
  {
    id: 37,
    subject: "Chemistry",
    text: "According to Le Chatelier's principle, increasing pressure on a gaseous equilibrium shifts the reaction towards:",
    answers: [
      "The side with more moles of gas",
      "The side with fewer moles of gas",
      "The exothermic side",
      "No shift occurs",
    ],
    correctIndex: 1,
    solution:
      "Increasing pressure favors the side that reduces pressure — i.e., fewer moles of gas. This is Le Chatelier's principle applied to pressure changes.",
  },
  {
    id: 38,
    subject: "Chemistry",
    text: "The pH of 0.01 M HCl solution is:",
    answers: ["1", "2", "3", "4"],
    correctIndex: 1,
    solution:
      "HCl is a strong acid, fully dissociating: [H⁺] = 0.01 M = 10⁻² M. pH = -log[H⁺] = -log(10⁻²) = 2.",
  },
  {
    id: 39,
    subject: "Chemistry",
    text: "Which of the following polymers is used in making bulletproof vests?",
    answers: ["Nylon", "Kevlar", "Bakelite", "PVC"],
    correctIndex: 1,
    solution:
      "Kevlar (poly-para-phenylene terephthalamide) is an aromatic polyamide with exceptional tensile strength, used in bulletproof vests and helmets.",
  },

  // ── BIOLOGY (20 questions) ──────────────────────────────────────────
  {
    id: 40,
    subject: "Biology",
    text: "The powerhouse of the cell is:",
    answers: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"],
    correctIndex: 2,
    solution:
      "Mitochondria produce ATP via cellular respiration (Krebs cycle + oxidative phosphorylation), supplying energy to the cell — hence 'powerhouse'.",
  },
  {
    id: 41,
    subject: "Biology",
    text: "DNA replication is:",
    answers: ["Conservative", "Semi-conservative", "Dispersive", "Additive"],
    correctIndex: 1,
    solution:
      "DNA replication is semi-conservative (Meselson-Stahl experiment). Each new DNA molecule has one old strand and one newly synthesized strand.",
  },
  {
    id: 42,
    subject: "Biology",
    text: "The process by which plants make food using sunlight is called:",
    answers: ["Respiration", "Fermentation", "Photosynthesis", "Transpiration"],
    correctIndex: 2,
    solution:
      "Photosynthesis: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. It occurs in chloroplasts using chlorophyll to capture light.",
  },
  {
    id: 43,
    subject: "Biology",
    text: "Which blood group is known as the universal donor?",
    answers: ["A", "B", "AB", "O"],
    correctIndex: 3,
    solution:
      "Blood group O (O negative) is the universal donor because its red blood cells lack A, B, and Rh antigens, so they won't trigger immune reactions.",
  },
  {
    id: 44,
    subject: "Biology",
    text: "The basic unit of heredity is:",
    answers: ["Cell", "Chromosome", "Gene", "Nucleotide"],
    correctIndex: 2,
    solution:
      "A gene is the basic unit of heredity — a specific DNA sequence that codes for a protein or functional RNA molecule.",
  },
  {
    id: 45,
    subject: "Biology",
    text: "Meiosis results in the formation of:",
    answers: [
      "2 diploid cells",
      "4 diploid cells",
      "2 haploid cells",
      "4 haploid cells",
    ],
    correctIndex: 3,
    solution:
      "Meiosis involves two divisions (Meiosis I and II) producing 4 haploid (n) daughter cells, each with half the chromosome number of the parent cell.",
  },
  {
    id: 46,
    subject: "Biology",
    text: "Which organelle is responsible for protein synthesis?",
    answers: ["Lysosome", "Ribosome", "Vacuole", "Peroxisome"],
    correctIndex: 1,
    solution:
      "Ribosomes are the site of protein synthesis (translation). mRNA is read by ribosomes to assemble amino acids into polypeptide chains.",
  },
  {
    id: 47,
    subject: "Biology",
    text: "The human heart has how many chambers?",
    answers: ["2", "3", "4", "6"],
    correctIndex: 2,
    solution:
      "The human heart has 4 chambers: right atrium, right ventricle, left atrium, and left ventricle — enabling separation of oxygenated and deoxygenated blood.",
  },
  {
    id: 48,
    subject: "Biology",
    text: "Which enzyme breaks down starch into maltose?",
    answers: ["Lipase", "Protease", "Amylase", "Lactase"],
    correctIndex: 2,
    solution:
      "Amylase (salivary and pancreatic) catalyzes the hydrolysis of starch into maltose and dextrin. Salivary amylase begins digestion in the mouth.",
  },
  {
    id: 49,
    subject: "Biology",
    text: "The site of gaseous exchange in the lungs is:",
    answers: ["Bronchi", "Trachea", "Alveoli", "Bronchioles"],
    correctIndex: 2,
    solution:
      "Alveoli are tiny air sacs in the lungs with thin walls and rich blood supply. O₂ diffuses in and CO₂ diffuses out across the alveolar membrane.",
  },
  {
    id: 50,
    subject: "Biology",
    text: "Which hormone is responsible for the 'fight or flight' response?",
    answers: ["Insulin", "Thyroxine", "Adrenaline", "Cortisol"],
    correctIndex: 2,
    solution:
      "Adrenaline (epinephrine), secreted by the adrenal medulla, triggers fight-or-flight: increases heart rate, dilates airways, and mobilizes glucose.",
  },
  {
    id: 51,
    subject: "Biology",
    text: "The process by which unused mRNA codons signal the end of translation is called:",
    answers: ["Initiation", "Elongation", "Termination", "Transcription"],
    correctIndex: 2,
    solution:
      "Termination occurs when a stop codon (UAA, UAG, or UGA) is reached. Release factors cause the ribosome to dissociate and release the polypeptide.",
  },
  {
    id: 52,
    subject: "Biology",
    text: "Which part of the brain controls balance and coordination?",
    answers: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Hypothalamus"],
    correctIndex: 1,
    solution:
      "The cerebellum coordinates voluntary movements, balance, and fine motor control. Damage to it causes ataxia (loss of coordination).",
  },
  {
    id: 53,
    subject: "Biology",
    text: "The fluid mosaic model describes the structure of:",
    answers: [
      "Cell wall",
      "Cell membrane",
      "Endoplasmic reticulum",
      "Nuclear envelope",
    ],
    correctIndex: 1,
    solution:
      "The fluid mosaic model (Singer & Nicolson, 1972) describes the plasma membrane as a phospholipid bilayer with embedded proteins that can move laterally.",
  },
  {
    id: 54,
    subject: "Biology",
    text: "How many ATP molecules are produced by complete oxidation of one glucose molecule?",
    answers: ["2", "8", "36–38", "100"],
    correctIndex: 2,
    solution:
      "Complete aerobic respiration of glucose yields ~36-38 ATP: 2 from glycolysis, 2 from Krebs cycle, and ~32-34 from oxidative phosphorylation.",
  },
  {
    id: 55,
    subject: "Biology",
    text: "Which vitamin is synthesised in the skin on exposure to sunlight?",
    answers: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    correctIndex: 3,
    solution:
      "UV-B radiation from sunlight converts 7-dehydrocholesterol in skin to Vitamin D₃ (cholecalciferol). Deficiency causes rickets.",
  },
  {
    id: 56,
    subject: "Biology",
    text: "The theory of natural selection was proposed by:",
    answers: ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Lamarck"],
    correctIndex: 1,
    solution:
      "Charles Darwin proposed natural selection in 'On the Origin of Species' (1859): individuals with favorable traits survive and reproduce more, driving evolution.",
  },
  {
    id: 57,
    subject: "Biology",
    text: "Which type of immunity involves antibodies produced by B-lymphocytes?",
    answers: [
      "Cell-mediated immunity",
      "Innate immunity",
      "Humoral immunity",
      "Passive immunity",
    ],
    correctIndex: 2,
    solution:
      "Humoral immunity is antibody-mediated. B-lymphocytes (B cells) differentiate into plasma cells that secrete antigen-specific antibodies.",
  },
  {
    id: 58,
    subject: "Biology",
    text: "The secondary structure of proteins is maintained by:",
    answers: [
      "Peptide bonds",
      "Hydrogen bonds",
      "Disulfide bonds",
      "Ionic bonds",
    ],
    correctIndex: 1,
    solution:
      "Hydrogen bonds between -NH and -CO groups of the peptide backbone stabilize secondary structures: alpha-helices and beta-pleated sheets.",
  },
  {
    id: 59,
    subject: "Biology",
    text: "Which plant hormone is responsible for fruit ripening?",
    answers: ["Auxin", "Gibberellin", "Cytokinin", "Ethylene"],
    correctIndex: 3,
    solution:
      "Ethylene (C₂H₄) is the primary plant hormone that triggers fruit ripening. It upregulates enzymes that soften fruit, convert starch to sugar, and change color.",
  },
];
