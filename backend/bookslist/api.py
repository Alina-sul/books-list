from django.shortcuts import render
from django.http import HttpResponse
from ninja import NinjaAPI, Router, Schema
import requests
from .keys import NYT_API_KEY
from typing import Optional

api = NinjaAPI()

API_KEY = NYT_API_KEY
NYT_BOOKS_URL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json"


@api.get("/books/")
def get_books(request, count: int = 10):
    params = {
        "api-key": API_KEY
    }
    response = requests.get(NYT_BOOKS_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        books_data = data.get("results", {}).get("books", [])[:count]
        return {"books": books_data}
    else:
        return {"error": "Unable to fetch books from NYT Books API"}


@api.get("/books-htmx/")
def get_books_htmx(request, count: int = 10, search: Optional[str] = None):
    params = {
        "api-key": API_KEY
    }

    if search:
        params['title'] = search

    try:
        response = requests.get(NYT_BOOKS_URL, params=params)
        response.raise_for_status()
        data = response.json()
        books_data = data.get("results", {}).get("books", [])[:count]
        return render(request, 'books_list.html', {'books': books_data})
    except requests.exceptions.HTTPError as err:
        return HttpResponse(f"Unable to fetch books from NYT Books API: {err}", status=response.status_code)
    except Exception as e:
        return HttpResponse(f"An error occurred: {e}", status=500)
