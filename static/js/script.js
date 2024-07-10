let logo = document.getElementById("logo");
        let containerWidth = window.innerWidth;
        let containerHeight = window.innerHeight;
        let logoWidth = logo.offsetWidth;
        let logoHeight = logo.offsetHeight;

        let x = Math.random() * (containerWidth - logoWidth);
        let y = Math.random() * (containerHeight - logoHeight);
        let xSpeed = 2;
        let ySpeed = 2;

        function moveLogo() {
            x += xSpeed;
            y += ySpeed;

            if (x + logoWidth > containerWidth || x < 0) {
                xSpeed *= -1;
            }

            if (y + logoHeight > containerHeight || y < 0) {
                ySpeed *= -1;
            }

            logo.style.left = x + 'px';
            logo.style.top = y + 'px';

            requestAnimationFrame(moveLogo);
        }

        moveLogo();

document.getElementById('Buscar').addEventListener('click', function() {
  const url = document.getElementById('url').value;
  const messageDiv = document.getElementById('message');
  const videoInfoDiv = document.getElementById('vista');
  const thumbnail = document.getElementById('thumbnail');
  const title = document.getElementById('title');

  fetch('http://127.0.0.1:5000/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `url=${encodeURIComponent(url)}`
  })
  .then(response => response.json())
  .then(data => {
    title.textContent = data.title;
    thumbnail.src = data.thumbnail_url;
    videoInfoDiv.style.display = 'block';
    messageDiv.innerHTML = '';
  })
  .catch(error => {
    messageDiv.innerHTML = 'Ha ocurrido un error. Intentelo nuevamente.';
    videoInfoDiv.style.display = 'none';
  });
});
document.getElementById('download-video').addEventListener('click', function() {
    const url = document.getElementById('url').value;
    const messageDiv = document.getElementById('message');
    const downloadLink = document.getElementById('download-link');
    const fileLink = document.getElementById('file-link');
  
    fetch('http://127.0.0.1:5000/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(url)}`
    })
    .then(response => response.json())
    .then(data => {
      messageDiv.innerHTML = data.message;
      fileLink.href = `http://127.0.0.1:5000/file/${data.filename}`;
      downloadLink.style.display = 'block';
    })
    .catch(error => {
      messageDiv.innerHTML = 'An error occurred. Please try again.';
      downloadLink.style.display = 'none';
    });
  });
  document.getElementById('download-music').addEventListener('click', function() {
    const url = document.getElementById('url').value;
    const messageDiv = document.getElementById('message');
    const downloadLink = document.getElementById('download-link');
    const fileLink = document.getElementById('file-link');
  
    fetch('http://127.0.0.1:5000/downloadm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(url)}`
    })
    .then(response => response.json())
    .then(data => {
      messageDiv.innerHTML = data.message;
      fileLink.href = `http://127.0.0.1:5000/file/${data.filename}`;
      downloadLink.style.display = 'block';
    })
    .catch(error => {
      messageDiv.innerHTML = 'An error occurred. Please try again.';
      downloadLink.style.display = 'none';
    });
  });
  