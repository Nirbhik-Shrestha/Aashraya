import { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is Aashraya?",
    answer: "Aashraya is a safe mental wellness platform where you can track moods, find breathing exercises, and seek help anonymously."
  },
  {
    question: "Is my data anonymous?",
    answer: "Yes, all discussions in the forum are anonymous and we don’t store personal identifiers."
  },
  {
    question: "How does the mood tracker work?",
    answer: "You can log your mood daily using emojis. Over time, this helps you visualize your mental wellness trends."
  },
  {
    question: "What does the crisis button do?",
    answer: "It shows you immediate resources like hotlines, calming techniques, and emergency help instructions."
  },
  {
    question: "Can I use Aashraya without registering?",
    answer: "You need to register to use personalized features like mood tracking and streaks."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className={`faq-item ${openIndex === idx ? "open" : ""}`}
          onClick={() => toggle(idx)}
        >
          <div className="faq-question">
            <span>{faq.question}</span>
            <span className="arrow">{openIndex === idx ? "▲" : "▼"}</span>
          </div>
          <div
            className="faq-answer"
            style={{
              maxHeight: openIndex === idx ? "300px" : "0px",
              opacity: openIndex === idx ? 1 : 0,
              transition: "all 0.4s ease"
            }}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQ;
