from django.shortcuts import render
from django.http import HttpResponse
from ninja import NinjaAPI, Router, Schema
import requests
from .keys import NYT_API_KEY

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
def get_books_htmx(request, count: int = 10):
    params = {
        "api-key": API_KEY
    }
    response = requests.get(NYT_BOOKS_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        books_data = data.get("results", {}).get("books", [])[:count]
        return render(request, 'books_list.html', {'books': books_data})
    else:
        return HttpResponse("Unable to fetch books from NYT Books API", status=500)
