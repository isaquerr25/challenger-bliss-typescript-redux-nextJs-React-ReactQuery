'use client';
import { FormEvent, useEffect, useRef, useState } from "react";
import { getQuestionsList, QuestionListType } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { InView } from "react-intersection-observer";
import React from "react";
import ReactDOM from "react-dom";
import { Loading } from "../../components/loadingScreen";
import { HashLoader } from "react-spinners";
import { useRouter, useSearchParams } from 'next/navigation'
import Sharing from "../../components/sharing";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeOffset, changeQuestions } from "../../redux/slice/questionsSlice";

function Questions() {
  const dispatch = useDispatch();
  const { lastPosition, offset, questions } = useSelector((state: RootState) => state.questionsPageSlice);

  const navigate = useRouter();
  const search = useSearchParams();
  const filter = search.get("filter");
  console.log(filter);
  // const [offset, setOffset] = useState(0);
  // const [questions, setQuestions] = useState<QuestionListType>([]);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["health", { offset, filter }],
    queryFn: getQuestionsList,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data)   dispatch(changeQuestions([...questions, ...data]));
  }, [data]);

  const handleSubmit = (e: FormEvent) => {
    const target = e.target as HTMLFormElement;

    e.preventDefault();

    dispatch(changeQuestions([]));
    dispatch(changeOffset(0));
    
    navigate.push(`/questions?filter=${target["filter"].value}`);
  };

  if (filter === "") {
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="pb-2 text-3xl font-bold border-b-4 border-teal-500">
        Questions
      </h1>
      <div className="border-[#36d7b7] border-[2px] p-4 mt-[1rem] rounded-[0.3rem] flex flex-row gap-4">
        <form className="flex justify-center" onSubmit={(e) => handleSubmit(e)}>
          <input
            defaultValue={filter ?? ""}
            type="text"
            placeholder="Filter"
            className="text-[black] py-2 pl-2 rounded-l-[0.3rem] flex-1"
            name="filter"
            ref={inputRef}
          />

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-l-[0] rounded-r-[0.3rem] mt-0"
          >
            Filter
          </button>
        </form>
        {filter != null && (
          <button
            onClick={() => {
              dispatch(changeQuestions([]));
              dispatch(changeOffset(0));
              if (inputRef.current) {
                inputRef.current.value = "";
              }
              navigate.push("/questions");
            }}
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4  border-red-800 rounded-[0.3rem] mt-0"
          >
            Clear
          </button>
        )}
        <Sharing />
      </div>
      <div className="grid justify-center grid-cols-1 gap-4 mx-4 mt-8 md:grid-cols-2 2xl:grid-cols-3">
        {questions?.map((choices, index) => (
          <Link
            key={index}
            href={`/questions/${choices.id}`}
            className="block transform transition-all hover:scale-105 border-[#36d7b7]   border-[2px]  w-[20rem] rounded-[0.3rem]"
          >
            <div className="p-4 rounded-md shadow-md ">
              <h3 className="text-lg font-bold mb-[1rem] text-center">
                {choices.question}
              </h3>
              <img
                src={choices.image_url}
                alt={choices.question}
                className="mb-4 rounded-md"
              />
            </div>
          </Link>
        ))}
        {questions && (
          <InView
            as="div"
            onChange={(inView, entry) => {
              if (inView) {
                dispatch(changeOffset(offset + 10));
              }
            }}
          ></InView>
        )}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center flex-col my-[2rem]">
          <HashLoader color="#36d7b7" />
          <h3 className="mt-[1rem] text-2xl opacity-[0.7]">Loading...</h3>
        </div>
      )}
    </div>
  );
}

export default Questions;

