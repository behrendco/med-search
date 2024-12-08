<img alt="Med Search" src="https://github.com/behrendco/med-search/blob/main/public/preview.png" width="100%">
<h1 align="center">Med Search</h1>
<p align="center"><b>Search Medical Literature with AI</b></p>

<h4 align="center">
  <a href="https://twitter.com/behrend_co">
    <img src="https://img.shields.io/twitter/follow/behrend_co?style=flat&label=%40behrend_co&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a>
  <a href="https://github.com/behrendco/med-search/pull">
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs welcome!" />
  </a>
</h4>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#self-hosting"><strong>Self Hosting</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>
<br/>

## Introduction

Med Search is a vertical AI search engine for medical literature.

## Features

- PubMed Article Retrieval
- Query Result Summarization
- Related Query Suggestion

## Tech Stack

- [Next.js](https://nextjs.org/) – Framework
- [TypeScript](https://typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Python](https://python.org) – Backend
- [FastAPI](https://fastapi.tiangolo.com/) – API
- [OpenAI](https://openai.com/) – LLM

## Self Hosting

1. Clone the repo

```bash
git clone https://github.com/behrendco/med-search.git
```

2. cd into the repo

```bash
cd med-search
```

3. Copy the `.env.example` file

```bash
cp .env.example .env
```

4. Setup environment variables

```bash
vim .env
```

5. Install dependencies

```bash
npm i
```

6. Quickstart

> - Starts a Next.js app and FastAPI concurrently

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Contributing

Here's how you can contribute:

- [Open an issue](https://github.com/behrendco/med-search/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/behrendco/med-search/pull) to add new features/make quality-of-life improvements/fix bugs.