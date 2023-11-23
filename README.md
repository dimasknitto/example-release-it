# Contoh Repository Event Driven

### Cara menjalakan aplikasi

1. Pastikan file `.env.example` pada setiap folder repository sudah di ganti ke `.env` sesuai dengan environtment yang di sediakan.
2. Install docker sesuai dengan sistem operasi dan dokumentasi [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).
3. Jalankan perintah docker compose pada repository seperti berikut:
    1. Tools Compose
       ```console
       > docker compose -f docker-compose.tools.yml build
       > docker compose -f docker-compose.tools.yml up -d
       ```
    2. Service Compose
       ```console
       > docker compose -f docker-compose.service.yml build
       > docker compose -f docker-compose.service.yml up -d
       ```

### Postman Collection 

[Documentation Link](https://documenter.getpostman.com/view/29997670/2s9YeBeDYs)