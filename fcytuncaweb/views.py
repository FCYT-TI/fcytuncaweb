from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import *
import random
from django.core.paginator import Paginator


# Create your views here.
def index(request):
    return render(request, 'index.html')

def raiz(request):
    return redirect('/inicio')

def resenha(request):
    return render(request, 'resenhahistorica.html')

def marcolegal(request):
    return render(request, 'marcolegal.html')

def resolucion(request):
    return render(request, 'resolucion.html')

def consejo(request):
    return render(request, 'consejo.html')


def acuerdos(request):
    return render(request, 'acuerdosconvenios.html')

def bienestar_estudiantil(request):
    return render(request, 'bienestar_estudiantil.html')

def misionVision(request):
    return render(request, 'misionvision.html')

def pagdeidentidad(request):
    return render(request, 'pagdeidentidad.html')

def pasantias(request):
    return render(request, 'pasantia.html')

def reglamento_investigacion(request):
    return render(request, 'reglamento_investigacion.html')




def blog (request):
    posts = Post.objects.all().order_by('-published_date')
    paginator = Paginator(posts, 3)
    page = request.GET.get('page')
    paginator_posts = paginator.get_page(page)
    posts = Post.objects.all().order_by('-published_date')[0:6]
    contexto = {"posts_pagin": paginator_posts, "posts": posts}
    return render(request, 'noticia.html', contexto)

def single_blog(request, pk):
    post = get_object_or_404(Post, pk=pk)
    posts = Post.objects.all().order_by('-published_date')[0:6]
    contexto = {"post": post, "posts":posts}
    return render(request, 'detalle_noticia.html', contexto)