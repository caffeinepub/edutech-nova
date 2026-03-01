import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type Question = {
    text : Text;
    answers : [Text];
    correctIndex : Nat;
  };

  type OldActor = {
    motivations : Map.Map<Nat, { message : Text }>;
    puzzles : Map.Map<Nat, Question>;
    motivationID : Nat;
  };

  type NewActor = {
    motivations : Map.Map<Nat, { message : Text }>;
    puzzles : Map.Map<Nat, Question>;
    motivationID : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newPuzzles = Map.fromIter<Nat, Question>([
      (0, {
        text = "Physics: What is the SI unit of electric current?";
        answers = ["Coulomb", "Volt", "Ampere", "Watt"];
        correctIndex = 2; // Ampere
      }),
      (1, {
        text = "Physics: Which law states that the pressure of a gas is inversely proportional to its volume?";
        answers = ["Boyle's Law", "Charle's Law", "Ohm's Law", "Newton's Law"];
        correctIndex = 0; // Boyle's Law
      }),
      (2, {
        text = "Physics: What is the acceleration due to gravity on Earth?";
        answers = ["6.67 m/s²", "9.81 m/s²", "3.14 m/s²", "1.62 m/s²"];
        correctIndex = 1; // 9.81 m/s²
      }),
      (3, {
        text = "Physics: Which type of lens converges parallel rays of light?";
        answers = ["Concave Lens", "Convex Lens", "Planar Mirror", "Concave Mirror"];
        correctIndex = 1; // Convex Lens
      }),
      (4, {
        text = "Physics: In a series circuit, how does current behave?";
        answers = ["Current divides", "Current is same", "Voltage is same", "Resistance is same"];
        correctIndex = 1; // Current is same
      }),
      (5, {
        text = "Physics: What is the primary constituent of stars?";
        answers = ["Oxygen", "Hydrogen", "Carbon", "Iron"];
        correctIndex = 1; // Hydrogen
      }),
      (6, {
        text = "Physics: What does Ohm's Law state?";
        answers = ["V = IR", "P = IV", "F = ma", "V = !I"];
        correctIndex = 0; // V = IR
      }),
      (7, {
        text = "Physics: Which electromagnetic wave has the shortest wavelength?";
        answers = ["Gamma Rays", "Radio Waves", "Infrared", "Visible Light"];
        correctIndex = 0; // Gamma Rays
      }),
      (8, {
        text = "Chemistry: What is the atomic number of Carbon?";
        answers = ["6", "12", "8", "14"];
        correctIndex = 0; // 6
      }),
      (9, {
        text = "Chemistry: Which is NOT a noble gas?";
        answers = ["Helium", "Neon", "Oxygen", "Argon"];
        correctIndex = 2; // Oxygen
      }),
      (10, {
        text = "Chemistry: What is the chemical formula for water?";
        answers = ["H2O", "CO2", "CH4", "NH3"];
        correctIndex = 0; // H2O
      }),
      (11, {
        text = "Chemistry: What is the pH of a neutral solution?";
        answers = ["0", "7", "14", "1"];
        correctIndex = 1; // 7
      }),
      (12, {
        text = "Chemistry: Which bond is the strongest?";
        answers = ["Ionic", "Covalent", "Hydrogen", "Van der Waals"];
        correctIndex = 1; // Covalent
      }),
      (13, {
        text = "Chemistry: Who invented the periodic table?";
        answers = ["Newton", "Mendeleev", "Curie", "Einstein"];
        correctIndex = 1; // Mendeleev
      }),
      (14, {
        text = "Chemistry: What is the oxidation state of oxygen in H2O?";
        answers = ["0", "+1", "-2", "+2"];
        correctIndex = 2; // -2
      }),
      (15, {
        text = "Chemistry: What is the gas evolved in photosynthesis?";
        answers = ["Nitrogen", "Oxygen", "Carbon Dioxide", "Methane"];
        correctIndex = 1; // Oxygen
      }),
      (16, {
        text = "Mathematics: Which is the value of π (pi) approximately?";
        answers = ["2.71", "3.14", "1.61", "0.577"];
        correctIndex = 1; // 3.14
      }),
      (17, {
        text = "Mathematics: What is the derivative of x²?";
        answers = ["2x", "x", "x²", "0"];
        correctIndex = 0; // 2x
      }),
      (18, {
        text = "Mathematics: What is the solution to the equation x - 5 = 0?";
        answers = ["5", "-5", "0", "1"];
        correctIndex = 0; // 5
      }),
      (19, {
        text = "Mathematics: Which is a prime number?";
        answers = ["6", "9", "11", "15"];
        correctIndex = 2; // 11
      }),
      (20, {
        text = "Mathematics: What is the area of a circle with radius r?";
        answers = ["πr²", "2πr", "πr", "πr³"];
        correctIndex = 0; // πr²
      }),
      (21, {
        text = "Mathematics: What is sin(90°)?";
        answers = ["0", "1", "0.5", "2"];
        correctIndex = 1; // 1
      }),
      (22, {
        text = "Mathematics: What is the next number in the sequence: 2, 4, 8, 16?";
        answers = ["20", "24", "32", "30"];
        correctIndex = 2; // 32
      }),
      (23, {
        text = "Mathematics: What is the square root of 49?";
        answers = ["5", "6", "7", "8"];
        correctIndex = 2; // 7
      }),
      (24, {
        text = "Mathematics: What is the sum of the first 100 natural numbers?";
        answers = ["1000", "5000", "5050", "10000"];
        correctIndex = 2; // 5050
      }),
    ].values());

    { old with puzzles = newPuzzles };
  };
};
