#docker build -t ws_publicaciones_image:latest .
#docker container run -it taller_ws_container

FROM python_base:latest
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata
WORKDIR /PUBLICACIONES/ws_publicaciones
COPY . /PUBLICACIONES/ws_publicaciones
RUN pip3 --no-cache-dir install -r src/utils/requerimientos.txt
ENV PYTHONPATH=/PUBLICACIONES
CMD ["python3", "-m", "ws_publicaciones.app"]

