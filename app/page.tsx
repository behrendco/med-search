"use client";

import Answer from "@/components/Answer";
import Hero from "@/components/Hero";
import SimilarTopics from "@/components/SimilarTopics";
import Sources from "@/components/Sources";
import axios from "axios";
import { useState } from "react";
import { useCompletion } from "ai/react";

export default function Home() {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [sources, setSources] = useState<{ url: string; title: string; abstract: string }[]>([]);
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSources, setIsLoadingSources] = useState<boolean>(false);

  const { 
    complete: completeAnswer, 
    completion: answer, 
    setCompletion: setAnswer,
  } = useCompletion({
    api: "/api/v1/answer",
    streamProtocol: "text",
    onError: (e) => {
      console.log(`Error getting answer: ${e}`)
    }
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = newQuestion || question;
    setShowResult(true);
    setIsLoading(true);
    setQuestion(query);
    setNewQuestion("");

    await Promise.all([
      handleSearch(query),
      handleSimilar(query),
    ]);

    setIsLoading(false);
  }

  async function handleNewSubmit(query: string) {
    const prompt = query || newQuestion;
    setShowResult(true);
    setIsLoading(true);
    setQuestion(prompt);
    setNewQuestion("");

    await Promise.all([
      handleSearch(query),
      handleSimilar(query),
    ]);

    setIsLoading(false);
  }

  async function handleSearch(query: string) {
    setIsLoadingSources(true);
    const sourcesReponse = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sources`,
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8"
      },
      data: { query }
    });
    let answerSources: { url: string; title: string; abstract: string }[] = [];
    if (sourcesReponse && sourcesReponse.status === 200) {
      answerSources = await sourcesReponse.data;
      setSources(answerSources);
    } else {
      setSources([]);
    }
    setIsLoadingSources(false);

    const prompt = `### Question ###\n${query}\n\n### Context ###\n${answerSources.map((source) => `${source.abstract}\n`)}`;
    await completeAnswer(prompt);
  }

  async function handleSimilar(query: string) {
    const response = await fetch("/api/v1/similar", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const { result } = await response.json();
    setSimilarQuestions(result.object.questions);
  }

  function reset() {
    setShowResult(false);
    setNewQuestion("");
    setQuestion("");
    setAnswer("");
    setSources([]);
    setSimilarQuestions([]);
  }

  return (
    <div className="w-full h-full bg-zinc-900">
      {!showResult && (
        <Hero
          question={question}
          setQuestion={setQuestion}
          handleSubmit={handleSubmit}
          handleNewSubmit={handleNewSubmit}
        />
      )}

      {showResult && (
        <div className="flex flex-col gap-8 my-24 items-center justify-center h-full w-full bg-zinc-900">
          <h1 className="text-white text-2xl font-[550] mb-5 text-center">
            {question}
          </h1>
          <Sources
            name="PubMed"
            sources={sources}
            isLoading={isLoadingSources}
          />
          <Answer 
            answer={answer}
          />
          <SimilarTopics
            similarQuestions={similarQuestions}
            handleSubmit={handleNewSubmit}
            reset={reset}
          />
          <form
            className="flex items-center justify-center mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              reset();
              handleSubmit(e);
            }}
          >
            <input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              disabled={isLoading}
              placeholder="Ask anything..."
              required
              className="border border-zinc-600 bg-zinc-800 text-white rounded-full py-3 px-4 focus:outline-none focus:ring-0 sm:w-[34rem] md:w-[42rem] w-full"
            />
            <button 
              type="submit"
              disabled={!newQuestion}
              className={`${!newQuestion ? "opacity-50" : ""} bg-sky-500 text-white rounded-full py-3 px-4 ml-2 focus:outline-none focus:ring-0`}
            >
              →
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
