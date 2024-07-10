<h1>DevElian Video Downloader</h1>
<center><img src="develianlogo.png" width=40px></center>
<p>DevElian Video Downloader es una aplicación web diseñada en python con el Framework Flask y la librería Pytube, hecha principalmente para practicar peticiones entre el Framework Flask y un servidor.</p>
<p style=color:red>Disclaimer: Esta herramienta está diseñada únicamente para fines educativos. No promueve la descarga ni distribución de contenido protegido por derechos de autor, ni busca infringir los términos de servicio de YouTube. Los usuarios son responsables de asegurarse de que su uso de esta herramienta cumpla con todas las leyes aplicables y los términos de servicio de YouTube. </p>
<h2>Características principales</h2>
<p>
-<b>Descargar Videos.</b> 
<br>
-<b>Descargar Audio.</b>
<br>
-<b>Diseño Minimalista.</b>
<br>
-<b>Diseño Intuitivo.</b>
</p>

<h2>Interfaz</h2>
<img src="Interfaz 1.jpeg">

<h2>Instalación</h2>
<p>Para instalar esta herramienta se necesita ejecutar el archivo <b>Installer.py</b> este hace una comprobación si el usuario tiene instaladas las librerias necesarias para la ejecución del programa.</p>

```python
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

```
<p>Recomendación: Es posible que deba realizar un entorno virtual dependiendo de la configuración de su entorno más que nada para no tener conflicto con otras librerias.</p>

<h2>Cómo Funciona</h2>
<img src="Interfaz 2.jpeg">
<b>Botón Buscar</b><br>
Luego de poner la url de Youtube y tocar el botón buscar aparece información básica del video (La miniatura y el título del video).

<b>Petición:</b><br>

```python
@app.route('/info', methods=['POST'])
def get_video_info():
    url = request.form['url']
    yt = YouTube(url)
    
    video_info = {
        'title': yt.title,
        'thumbnail_url': yt.thumbnail_url
    }
    
    return jsonify(video_info)
```

<p>Una vez le damos al botón "buscar" con la libreria Pytube obtenemos la información del video, en este caso el título y la miniatura del video y enviamos los datos en formato json.</p>

<b>Botones de descargas:</b><br>
<p>Luego de asegurarnos de que ingresamos el video correcto podemos descarga nuestro archivo.

<b>Petición</b>

```python
@app.route('/download', methods=['POST'])
def download():
    url = request.form['url']
    yt = YouTube(url)
    stream = yt.streams.get_highest_resolution()
    
    # Descargar el video en la carpeta de descargas
    if not os.path.exists(DOWNLOAD_FOLDER):
        os.makedirs(DOWNLOAD_FOLDER)
    stream.download(output_path=DOWNLOAD_FOLDER)
    
    # Devolver el nombre del archivo descargado en la respuesta JSON
    return jsonify({'message': 'Finalizado, descargue el archivo dandole click abajo⬇⬇⬇⬇⬇⬇', 'filename': stream.default_filename})

```

<br><b>Nota:</b> Todos los archivos se descargaran dentro del directorio donde tenga el programa en la carpeta "downloads" para luego enviarlo al cliente en la página web. Ya pensé en esto para que todos esos archivos no estén ocupando espacio en disco, basta solamente con reiniciar el servidor y los archivos dentro de la carpeta se borrarán.</p>

```python
#Para limpiar todos los videos que queden en caché
for f in os.listdir(DOWNLOAD_FOLDER):
    os.remove(os.path.join(DOWNLOAD_FOLDER, f))
```