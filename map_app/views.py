from django.conf import settings
from django.shortcuts import render

def map_view(request):
    return render(request, "map_app/index.html", {
        "GOOGLE_MAPS_API_KEY": settings.GOOGLE_MAPS_API_KEY
    })
