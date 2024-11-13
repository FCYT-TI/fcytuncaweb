from django.db import models
from django.db.models import Q
from django.urls import reverse
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify

# Create your models here.
class Categoria (models.Model):
    nombre = models.CharField(null= False, blank= True, max_length=100)

    def __str__(self):
        return self.nombre





class Post(models.Model):
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    foto1 = models.ImageField(null=True, blank=True)
    title = models.CharField(max_length=200)
    text1 = models.TextField(null=True, blank=True)
    foto2 = models.ImageField(null=True, blank=True)
    text2 = models.TextField(null=True, blank=True)
    foto3 = models.ImageField(null=True, blank=True)
    text3 = models.TextField(null=True, blank=True)
    foto4 = models.ImageField(null=True, blank=True)
    text4 = models.TextField(null=True, blank=True)
    foto5 = models.ImageField(null=True, blank=True)
    text5 = models.TextField(null=True, blank=True)
    foto6 = models.ImageField(null=True, blank=True)
    text6 = models.TextField(null=True, blank=True)
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE,null=True)
    published_date = models.DateTimeField(blank=True, null=True)
    slug= models.SlugField(null=False, default="#")

    def get_absolute_url(self):
        return reverse('single_blog', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):  # new
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
