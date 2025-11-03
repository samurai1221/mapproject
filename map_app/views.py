from django.conf import settings
from django.shortcuts import render
from django.http import JsonResponse
import logging

def map_view(request):
    return render(request, "map_app/index.html", {
        "GOOGLE_MAPS_API_KEY": settings.GOOGLE_MAPS_API_KEY
    })


logger = logging.getLogger(__name__)

def sw_log(request):
    message = request.GET.get("msg", "")
    level = request.GET.get("level", "info")

    if level == "error":
        logger.error(f"[SW] {message}")
    elif level == "warn":
        logger.warning(f"[SW] {message}")
    else:
        logger.info(f"[SW] {message}")

    return JsonResponse({"status": "ok"})
