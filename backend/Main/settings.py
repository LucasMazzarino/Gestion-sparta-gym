from pathlib import Path
from corsheaders.defaults import default_headers
from datetime import timedelta

import os
import environ
import dj_database_url
from pathlib import Path

env = environ.Env()
#leyendo env.File
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

DEBUG = env('DEBUG')
SECRET_KEY = env('SECRET_KEY')
    
SITE_NAME = 'SpartaGym'

ALLOWED_HOSTS = [
    "gestion-sparta-gym-production.up.railway.app",
    "localhost",
    "127.0.0.1",   
]


if not DEBUG:
    ALLOWED_HOSTS = [
        "gestion-sparta-gym-production.up.railway.app",
        "www.spartagym.com",
        ".spartagym.com",
        "spartagym.com",
    ]   

# RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
# if RENDER_EXTERNAL_HOSTNAME:
#     ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

DJANGO_APPS =[
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]


PROJECT_APPS =[
     'Users',
     'Noticias',
     'Cursos',
     'Base'
]

THIRD_PARTY_APPS =[
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'djoser',
    'corsheaders',
    'ckeditor',
    'ckeditor_uploader',
]

INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS + THIRD_PARTY_APPS

CKEDITOR_CONFIGS={
    "default":{
        'toolbar':'Full',
        'autoParagraph': False
    }
}

CKEDITOR_UPLOAD_PATH = "/media/"

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    #Corsheaders
    "corsheaders.middleware.CorsMiddleware",

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://gestion-sparta-gym-production.up.railway.app",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://gestion-sparta-gym-production.up.railway.app",
]

if not DEBUG:
    CORS_ORIGIN_WHITELIST = [
        "https://gestion-sparta-gym-production.up.railway.app",
    ]

    CSRF_TRUSTED_ORIGINS = [
        "https://gestion-sparta-gym-production.up.railway.app",
    ]


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Main.wsgi.application'


DATABASES = {
    "default":dj_database_url.config(default=env.db("DATABASE_URL")),
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

ROOT_URLCONF = 'Main.urls'

LANGUAGE_CODE = 'es'
TIME_ZONE = 'America/Montevideo'
USE_I18N = True
USE_TZ = True


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

AUTH_USER_MODEL = 'Users.Usuarios'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = { 
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSIONS_CLASSES': [
        'rest_framework.permissions.IsAuthenticated'
    ],
    'DATETIME_FORMAT':"%d-%m-%Y %H:%M",
    'TIME_FORMAT': "%H:%M",
}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT', ),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10080),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=10),
    'ROTATE_REFRESFH_TOKENS':True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_TOKEN_CLASSES': (
        'rest_framework_simplejwt.tokens.AccessToken',
    )
}

DJOSER = {
    'LOGIN_FIELD': 'documento',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'documento/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': False,
    'SERIALIZERS': {
        'user_create': 'Users.api.serializers.UsuariosSerializer',
        'user': 'Users.api.serializers.UsuariosSerializer',
        'current_user': 'Users.api.serializers.UsuariosSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
    },
}

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)

FILE_UPLOAD_PERMISSIONS = 0o640

EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend'

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

if not DEBUG:
    DEFAULT_FROM_EMAIL= env('EMAIL_DEF')
    EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
    # EMAIL_HOST = env('EMAIL_HOST')
    # EMAIL_HOST_USER = env('EMAIL_HOST_USER')
    # EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
    # EMAIL_PORT = env('EMAIL_PORT')
    # EMAIL_USE_TLS = env('EMAIL_USE_TLS')


# print(f"DEBUG: {DEBUG}")
# print(f"SECRET_KEY: {SECRET_KEY}")
# # print(f"DATABASE_URL: {DATABASE_URL}")
# # print(f"EMAIL_DEF: {EMAIL_DEF}")