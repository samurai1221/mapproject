from django.shortcuts import render
from django.conf import settings

def index(request):
    return render(request, 'map_app/index.html', {
        'google_api_key': settings.GOOGLE_MAPS_API_KEY
    })
