#docker build -t ws_login_image:latest .
#docker container run -it taller_ws_container

FROM python_base:latest
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata
WORKDIR /LOGIN/ws_login
COPY . /LOGIN/ws_login
RUN pip3 --no-cache-dir install -r src/utils/requerimientos.txt
ENV PYTHONPATH=/LOGIN
CMD ["python3", "-m", "ws_login.app"]

