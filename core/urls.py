from django.conf.urls import patterns, include, url

import backend.ui.urls

urlpatterns = patterns('',
    url(r'', include(backend.ui.urls))
)
