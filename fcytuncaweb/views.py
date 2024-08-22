from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    return render(request, 'index.html')

def raiz(request):
    return redirect('/inicio')

def resenha(request):
    return render(request, 'resenhahistorica.html')


def acuerdos(request):
    return render(request, 'acuerdosconvenios.html')

def bienestar_estudiantil(request):
    return render(request, 'bienestar_estudiantil.html')