'use client';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AiFillCloseCircle, AiOutlineMail } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getQuestionsList, postShareEmail } from "../api";
import { useState, useEffect, FormEvent, ReactNode } from "react";

const Sharing = () => {
  const contentUrl = window.location.href;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { isLoading, error, data, refetch, remove } = useQuery({
    queryKey: ["share", { destinationEmail: email, contentUrl }],
    queryFn: postShareEmail,
    enabled: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    refetch();
  };

  useEffect(() => {
    setSent(data?.status === "OK");
  }, [data]);

  return (
    <Popup
      trigger={
        <button title="duck" className="px-3 mt-0 rounded-[50%]">
          <FiShare2 />
        </button>
      }
      onClose={() => {
        remove();
        setSent(false);
      }}
      modal
    >
      {((close: any) => 
        <div className="flex flex-col items-stretch justify-center ">
          <h1
            className={`text-xl font-bold ${
              sent ? "" : "border-b-4"
            } border-teal-500 py-3 relative text-center `}
          >
            {sent ? "Email sent " : "Share "}&nbsp;
            <AiOutlineMail className="inline" />
            <button className="close" onClick={close}>
              <AiFillCloseCircle />
            </button>
          </h1>
          {!sent && (
            <form
              className="flex justify-center p-3"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Insert here your email"
                className="text-[black] py-2 pl-2 rounded-l-[0.3rem] flex-1"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-l-[0] rounded-r-[0.3rem] mt-0"
              >
                Share
              </button>
            </form>
          )}
        </div>
      ) as any}
    </Popup>
  );
};

export default Sharing;
