import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Random "mo:core/Random";
import Runtime "mo:core/Runtime";


// Enable data migration in this actor

actor {
  type Question = {
    text : Text;
    answers : [Text];
    correctIndex : Nat;
  };

  type Motivation = {
    message : Text;
  };

  module Motivation {
    public func compare(motivation1 : Motivation, motivation2 : Motivation) : Order.Order {
      Text.compare(motivation1.message, motivation2.message);
    };
  };

  var motivationID = 5;
  let motivations = Map.fromIter<Nat, Motivation>([
    (0, { message = "Slow growth is still growth 🌸" }),
    (1, { message = "Water your dreams daily 💧" }),
    (2, { message = "Protect your peace 🕊️" }),
    (3, { message = "Stay consistent 🎯" }),
    (4, { message = "Bloom in your time 🌷" }),
  ].values());

  var puzzles = Map.empty<Nat, Question>();

  // Add JEE-style Questions
  public shared ({ caller }) func addQuestion(text : Text, answers : [Text], correctIndex : Nat) : async () {
    let id = puzzles.size();
    let question : Question = {
      text;
      answers;
      correctIndex;
    };
    if (id >= 25) { Runtime.trap("Please use puzzle id in range 0-25") };
    puzzles.add(id, question);
  };

  // Evaluate Answers
  public query ({ caller }) func isAnswerCorrect(questionID : Nat, submittedAnswerIndex : Nat) : async Bool {
    if (questionID >= puzzles.size()) { Runtime.trap("Question does not exist") };
    if (submittedAnswerIndex > 3) { Runtime.trap("Answer index must be between 0 and 3") };
    let correctIndex = puzzles.get(questionID).unwrap().correctIndex;
    submittedAnswerIndex == correctIndex;
  };

  // Add Motivations
  public shared ({ caller }) func addMotivation(message : Text) : async Nat {
    let id = motivationID;
    motivations.add(id, { message });
    motivationID += 1;
    id;
  };

  // Get Random Motivation
  public shared ({ caller }) func getRandomMotivation() : async Text {
    let size = motivations.size();
    if (size == 0) { Runtime.trap("No motivations available") };
    let randomIndex = await* (Random.crypto().natRange(0, size));
    switch (motivations.get(randomIndex)) {
      case (?motivation) { motivation.message };
      case (null) { Runtime.trap("Motivation not found") };
    };
  };

  // List Motivations
  public query ({ caller }) func getAllMotivations() : async [Motivation] {
    motivations.values().toArray().sort();
  };

  // List Questions
  public query ({ caller }) func getAllQuestions() : async [Question] {
    puzzles.values().toArray();
  };

  // Get Question
  public query ({ caller }) func getQuestion(id : Nat) : async Question {
    switch (puzzles.get(id)) {
      case (null) { Runtime.trap("Question not found") };
      case (?question) { question };
    };
  };
};

