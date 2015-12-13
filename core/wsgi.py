"""
WSGI for pythonanywhere.com hosting
"""

import sys
project_home = u'/home/RichardHills/housing3'
if project_home not in sys.path:
    sys.path.append(project_home)

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
