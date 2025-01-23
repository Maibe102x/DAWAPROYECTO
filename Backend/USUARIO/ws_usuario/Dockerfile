#docker build -t ws_usuario_image:latest .
#docker container run -it taller_ws_container

FROM python_base:latest
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata
WORKDIR /USUARIO/ws_usuario
COPY . /USUARIO/ws_usuario
RUN pip3 --no-cache-dir install -r src/utils/requerimientos.txt
ENV PYTHONPATH=/USUARIO
CMD ["python3", "-m", "ws_usuario.app"]

