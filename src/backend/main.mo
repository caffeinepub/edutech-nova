import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Random "mo:core/Random";
import Runtime "mo:core/Runtime";

import Nat "mo:core/Nat";


actor {
  type Question = {
    text : Text;
    answers : [Text];
    correctIndex : Nat;
  };

  type Motivation = {
    message : Text;
  };

  let questions = Map.fromIter<Nat, Question>(
    ([
      (0, { text = "A body is thrown vertically upward with velocity 20 m/s. The maximum height reached is (g = 10 m/s²):"; answers = [ "10 m", "20 m", "30 m", "40 m" ]; correctIndex = 1 }),
      (1, { text = "The unit of electric charge in SI system is:"; answers = [ "Ampere", "Coulomb", "Volt", "Ohm" ]; correctIndex = 1 }),
      (2, { text = "Which of the following has the highest frequency?"; answers = [ "Radio waves", "Infrared waves", "X-rays", "Microwaves" ]; correctIndex = 2 }),
      (3, { text = "Newton's second law of motion states that force equals:"; answers = [ "mass × velocity", "mass × acceleration", "mass × distance", "mass × time" ]; correctIndex = 1 }),
      (4, { text = "The phenomenon of light bending around obstacles is called:"; answers = [ "Reflection", "Refraction", "Diffraction", "Polarization" ]; correctIndex = 2 }),
      (5, { text = "The SI unit of power is:"; answers = [ "Joule", "Newton", "Watt", "Pascal" ]; correctIndex = 2 }),
      (6, { text = "Which law states that the pressure of a gas is inversely proportional to its volume at constant temperature?"; answers = [ "Charles Law", "Avogadros Law", "Boyles Law", "Gay-Lussacs Law" ]; correctIndex = 2 }),
      (7, { text = "The speed of light in vacuum is approximately:"; answers = [ "3 x 10^6 m/s", "3 x 10^8 m/s", "3 x 10^10 m/s", "3 x 10^4 m/s" ]; correctIndex = 1 }),
      (8, { text = "A concave lens always forms a:"; answers = [ "Real and inverted image", "Virtual and erect image", "Real and erect image", "Virtual and inverted image" ]; correctIndex = 1 }),
      (9, { text = "The atomic number of Carbon is:"; answers = [ "4", "6", "8", "12" ]; correctIndex = 1 }),
      (10, { text = "Which gas is produced when zinc reacts with dilute sulphuric acid?"; answers = [ "Oxygen", "Carbon dioxide", "Hydrogen", "Sulphur dioxide" ]; correctIndex = 2 }),
      (11, { text = "The pH of a neutral solution at 25°C is:"; answers = [ "0", "7", "14", "1" ]; correctIndex = 1 }),
      (12, { text = "Which of the following is a noble gas?"; answers = [ "Nitrogen", "Hydrogen", "Argon", "Chlorine" ]; correctIndex = 2 }),
      (13, { text = "The IUPAC name of CH3CHO is:"; answers = [ "Methanal", "Ethanal", "Propanal", "Butanal" ]; correctIndex = 1 }),
      (14, { text = "Which element has the highest electronegativity?"; answers = [ "Oxygen", "Nitrogen", "Chlorine", "Fluorine" ]; correctIndex = 3 }),
      (15, { text = "Avogadros number is approximately:"; answers = [ "6.022 x 10^23", "6.022 x 10^22", "3.011 x 10^23", "1.602 x 10^19" ]; correctIndex = 0 }),
      (16, { text = "What is the chemical formula of baking soda?"; answers = [ "NaCl", "Na2CO3", "NaHCO3", "NaOH" ]; correctIndex = 2 }),
      (17, { text = "The hybridization of carbon in ethylene (C2H4) is:"; answers = [ "sp", "sp2", "sp3", "sp3d" ]; correctIndex = 1 }),
      (18, { text = "The derivative of sin(x) is:"; answers = [ "-cos(x)", "cos(x)", "tan(x)", "-sin(x)" ]; correctIndex = 1 }),
      (19, { text = "If log base 10 of x equals 2, then x equals:"; answers = [ "20", "100", "1000", "10" ]; correctIndex = 1 }),
      (20, { text = "The sum of interior angles of a hexagon is:"; answers = [ "540°", "360°", "720°", "900°" ]; correctIndex = 2 }),
      (21, { text = "What is the value of integral of sin(x)dx?"; answers = [ "cos(x) + C", "-cos(x) + C", "sin(x) + C", "-sin(x) + C" ]; correctIndex = 1 }),
      (22, { text = "The number of ways to arrange 5 distinct objects is:"; answers = [ "25", "60", "100", "120" ]; correctIndex = 3 }),
      (23, { text = "Which of the following is NOT a prime number?"; answers = [ "11", "13", "15", "17" ]; correctIndex = 2 }),
      (24, { text = "The value of sin²(θ) + cos²(θ) is always equal to:"; answers = [ "0", "2", "1", "depends on θ" ]; correctIndex = 2 }),
    ].values())
  );

  var motivID = 5;
  let motivations = Map.fromIter<Nat, Motivation>(
    ([
      (0, { message = "Slow growth is still growth 🌸" }),
      (1, { message = "Water your dreams daily 💧" }),
      (2, { message = "Protect your peace 🕊️" }),
      (3, { message = "Stay consistent 🎯" }),
      (4, { message = "Bloom in your time 🌷" }),
    ].values())
  );

  //////////////////// QUESTIONS ////////////////////
  public query ({ caller }) func getAllQuestions() : async [Question] {
    questions.values().toArray();
  };

  public query ({ caller }) func getQuestion(id : Nat) : async Question {
    switch (questions.get(id)) {
      case (?question) { question };
      case (null) { Runtime.trap("Question not found") };
    };
  };

  public shared ({ caller }) func isAnswerCorrect(questionID : Nat, submittedAnswerIndex : Nat) : async Bool {
    if (questionID >= questions.size()) { Runtime.trap("Question does not exist") };
    if (submittedAnswerIndex > 3) { Runtime.trap("Answer index must be between 0 and 3") };
    let correctIndex = questions.get(questionID).unwrap().correctIndex;
    submittedAnswerIndex == correctIndex;
  };

  public shared ({ caller }) func addQuestion(text : Text, answers : [Text], correctIndex : Nat) : async () {
    if (answers.size() != 4) { Runtime.trap("Must provide four answer options") };
    if (correctIndex > 3) { Runtime.trap("Correct answer must be in 0-3") };
    let id = questions.size();
    let question : Question = { text; answers; correctIndex };
    questions.add(id, question);
  };

  //////////////////// MOTIVATIONS ////////////////////
  public query ({ caller }) func getAllMotivations() : async [Motivation] {
    motivations.values().toArray();
  };

  public shared ({ caller }) func getRandomMotivation() : async Text {
    let size = motivations.size();
    if (size == 0) { Runtime.trap("No motivations available") };
    let randomIndex = await* (Random.crypto().natRange(0, size));
    switch (motivations.get(randomIndex)) {
      case (?motivation) { motivation.message };
      case (null) { Runtime.trap("Motivation not found") };
    };
  };

  public shared ({ caller }) func addMotivation(message : Text) : async Nat {
    let id = motivID;
    motivations.add(id, { message });
    motivID += 1;
    id;
  };
};
