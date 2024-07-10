import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import flask
except ImportError:
    install('flask')

try:
    import pytube
except ImportError:
    install('pytube')

try:
    from flask_cors import CORS
except ImportError:
    install('flask-cors')


print("Todas las dependencias están descargadas")
