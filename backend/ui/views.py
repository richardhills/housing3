from django.views.generic.base import TemplateView


class Housing3View(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super(Housing3View, self).get_context_data(**kwargs)
        context['js_url'] = 'http://localhost:3000/js/housing3.js'
        return context
