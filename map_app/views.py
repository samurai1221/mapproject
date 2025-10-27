from django.conf import settings
from django.shortcuts import render

def map_view(request):
    return render(request, 'templates/map_app/index.html', {
        'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY
    })
