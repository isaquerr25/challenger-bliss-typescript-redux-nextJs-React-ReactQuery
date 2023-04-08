'use client';
import { FormEvent, useEffect, useRef, useState } from "react";
import { getQuestionById, getQuestionsList, putQuestionById, QuestionListType, QuestionType } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { InView } from "react-intersection-observer";
import React from "react";
import ReactDOM from "react-dom";
import { Loading } from "../../../components/loadingScreen";
import { HashLoader } from "react-spinners";
import { useRouter, useSearchParams } from 'next/navigation'
import Sharing from "../../../components/sharing";
import Link from "next/link";

type ParamsType = {
  params: {
    questionId: number;
  }
}


function Question({params: {questionId: id}}: ParamsType) {
  const navigate = useRouter();
  console.log(id);
  const { isLoading, error, data, refetch } = useQuery(
    ["question", id],
    getQuestionById
  );
  const [voteData, setVoteData] = useState<QuestionType>();

  const { refetch: vote } = useQuery({
    queryKey: ["putQuestionById", { questionId: id, data: voteData }],
    queryFn: putQuestionById,
    enabled: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  async function handleVote(index: number) {
    const newVoteData = { ...data } as QuestionType;

    newVoteData.choices![index].votes += 1;

    setVoteData(newVoteData);
    await vote();
    refetch();
  }

  if (error || !data) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div className=" flex flex-col justify-center items-center gap-[3rem] ">
      <h1 className="text-3xl font-bold border-b-4 border-teal-500 pb-2 mt-[3rem] text-center">
        {data.question}
      </h1>
      <div className=" p-4 rounded-md flex  flex-col xl:flex-row gap-[1rem]">
        <img
          src={data.image_url}
          alt={data.question}
          className="mb-4 rounded-md"
        />

        <div className="mt-4  flex flex-col gap-[1rem]">
          {data.choices.map((item, index) => (
            <div className="flex items-center justify-between gap-4 text-center">
              <h3 className="text-xl" key={index}>
                {item.choice}: {item.votes}
              </h3>
              <button
                onClick={() => {
                  handleVote(index);
                }}
              >
                vote
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex gap-[1rem] ">
        <button className=" mt-[0rem]" onClick={() => navigate.back()}>
          Back
        </button>
        <Sharing />
      </div>
    </div>
  );
}

export default Question;

