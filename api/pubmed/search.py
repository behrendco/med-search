import re
import os
from typing import Any
from Bio import Entrez
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

ENTREZ_EMAIL = os.environ.get("ENTREZ_EMAIL")
Entrez.email = ENTREZ_EMAIL

class PubMedSearch:
  def __init__(self):
    self.db = "pubmed"
    self.retmax = 4

  def search_pubmed(self, query: str):
    handle = Entrez.esearch(db=self.db, term=query, retmax=self.retmax)
    record = Entrez.read(handle)
    return record["IdList"]
  
  def fetch_abstracts(self, pmids: Any):
    handle = Entrez.efetch(db=self.db, id=pmids, retmode="xml")
    articles = Entrez.read(handle)
    return [article['MedlineCitation']['Article']['Abstract']['AbstractText'][0] for article in articles['PubmedArticle']]
  
  def fetch_pubmed_data(self, pmid: Any):
    handle = Entrez.efetch(db=self.db, id=pmid, rettype="medline", retmode="text")
    record = handle.read()
    handle.close()
    
    pubmed_url = f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/"
    
    title_match = re.search(r'TI  - (.*?)(?=\n\w)', record, re.DOTALL)
    title = re.sub(r'\s+', ' ', title_match.group(1).strip()) if title_match else "No title available"
    
    abstract_match = re.search(r'AB  - (.*?)(?=\n\w)', record, re.DOTALL)
    abstract = re.sub(r'\s+', ' ', abstract_match.group(1).strip()) if abstract_match else "No abstract available"
    
    return {
      "url": pubmed_url,
      "title": title,
      "abstract": abstract,
    }
    
  def get_sources(self, query: str):
    sources = []
    
    pmids = self.search_pubmed(query)
    for pmid in pmids:
      source = self.fetch_pubmed_data(pmid)
      sources.append(source)

    return sources