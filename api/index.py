from fastapi import FastAPI, status
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from api.types.types import SourcesBody
from api.pubmed.search import PubMedSearch

import json
    
app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

searcher = PubMedSearch()

@app.get("/api/v1")
def root():
  return Response(status_code=200)

@app.post("/api/v1/sources")
def sources(body: SourcesBody):
  if not body or not body.query:
    return JSONResponse(
      content={"error": "Invalid input"},
      status_code=status.HTTP_400_BAD_REQUEST
    )
  
  try:
    sources = searcher.get_sources(body.query)
    sources = json.dumps(sources, indent=4)
    print(sources)
    return Response(
      content=sources, 
      media_type="application/json",
      status_code=status.HTTP_200_OK
    )
  except Exception as e:
    return JSONResponse(
      content={"error": str(e)},
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
    )