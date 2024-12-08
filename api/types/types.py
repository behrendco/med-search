from pydantic import BaseModel

class SourcesBody(BaseModel):
  query: str