from django.shortcuts import render, redirect

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

def transparencialey(request):
    return render(request, 'transparencialey.html')
def direccion_telefono_dependencias(request):
    return render(request, 'direccionytel_dependencias.html')
def funcionarios_anho(request):
    return render(request, 'funcionarios_anho.html')
def vacancias(request):
    return render(request, 'vacancias.html')
def declaracion_jurada(request):
    return render(request, 'declaracion_jurada.html')
def presupuesto_ingreso(request):
    return render(request, 'presupuesto_ingreso.html')