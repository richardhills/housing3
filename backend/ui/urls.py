from django.conf.urls import patterns, url
from backend.ui.views import Housing3View


urlpatterns = patterns('',
    url(r'', Housing3View.as_view())
)
