from config.settings.base import *


INSTALLED_APPS += [
    'apps.review',
    'apps.accounts',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
