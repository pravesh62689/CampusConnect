import React, { useState } from "react";
import { faq } from "./faqdata";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0b2447",
    color: "#d9dfdb",
    width: "40%",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
  },
};

const Faq = ({ modalIsOpen, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold uppercase">Faq</h1>
          <AiOutlineClose
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
            size={22}
          />
        </div>
        <div className="h-[43vh] overflow-y-scroll mt-4">
          {faq.map((e, i) => {
            return <Block data={e} key={i} />;
          })}
        </div>
      </Modal>
    </div>
  );
};

const Block = ({ data }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div
      className="border mb-2 px-2 py-1 rounded-md cursor-pointer border-gray-700"
      onClick={(e) => {
        e.preventDefault();
        setShowAnswer(!showAnswer);
      }}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold mb-1">Q : {data.question}</p>
        {!showAnswer ? <AiFillCaretDown /> : <AiFillCaretUp />}
      </div>
      {showAnswer ? <p className="text-[14.5px]">A : {data.answer}</p> : null}
    </div>
  );
};

export default Faq;
