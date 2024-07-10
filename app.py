from flask import Flask, request, send_file, jsonify, render_template
from flask_cors import CORS
from pytube import YouTube
import webbrowser
from threading import Timer
import os



app = Flask(__name__)
CORS(app)  

# Ruta para la carpeta de descargas
DOWNLOAD_FOLDER = 'downloads'

#Para limpiar todos los videos que queden en caché
for f in os.listdir(DOWNLOAD_FOLDER):
    os.remove(os.path.join(DOWNLOAD_FOLDER, f))


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/info', methods=['POST'])
def get_video_info():
    url = request.form['url']
    yt = YouTube(url)
    
    # Obtener la miniatura y el título
    video_info = {
        'title': yt.title,
        'thumbnail_url': yt.thumbnail_url
    }
    
    return jsonify(video_info)

@app.route('/download', methods=['POST'])
def download():
    url = request.form['url']
    yt = YouTube(url)
    stream = yt.streams.get_highest_resolution()
    
    # Descargar el video en la carpeta de descargas
    if not os.path.exists(DOWNLOAD_FOLDER):
        os.makedirs(DOWNLOAD_FOLDER)
    stream.download(output_path=DOWNLOAD_FOLDER)
    
    
    return jsonify({'message': 'Finalizado, descargue el archivo dandole click abajo⬇⬇⬇⬇⬇⬇', 'filename': stream.default_filename})

@app.route('/downloadm', methods=['POST'])
def downloadm():
    url = request.form['url']
    yt = YouTube(url)
    stream = yt.streams.filter(only_audio=True).first()
    
    # Descargar el video en la carpeta de descargas
    if not os.path.exists(DOWNLOAD_FOLDER):
        os.makedirs(DOWNLOAD_FOLDER)
    stream.download(output_path=DOWNLOAD_FOLDER)
    
    # Devolver el nombre del archivo descargado en la respuesta JSON
    return jsonify({'message': 'Finalizado, descargue el archivo dandole click abajo⬇⬇⬇⬇⬇⬇', 'filename': "DevElian "+stream.default_filename})

@app.route('/file/<filename>', methods=['GET'])
def get_file(filename):
    # Asegurarse de que la ruta sea segura
    file_path = os.path.join(DOWNLOAD_FOLDER, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return jsonify({'message': 'File not found'}), 404
    
def open_browser():
    webbrowser.open_new("http://127.0.0.1:5000")

def start():
    Timer(1, open_browser).start()
    app.run(host="0.0.0.0",port="5000",debug=True)
    
    


if __name__ == '__main__':
     start()

