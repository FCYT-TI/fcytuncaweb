from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    return render(request, 'index.html')

def raiz(request):
    return redirect('/inicio')

def resenha(request):
    return render(request, 'resenhahistorica.html')

def consejo(request):
    return render(request, 'consejo.html')


def acuerdos(request):
    return render(request, 'acuerdosconvenios.html')

def calendario(request):
    return render(request, 'calendario.html')