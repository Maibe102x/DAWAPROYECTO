#docker build -t  ws_chats_image:latest .
#docker container run -it taller_ws_container

FROM python_base:latest
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata
WORKDIR /CHATS/ws_chats
COPY . /CHATS/ws_chats
RUN pip3 --no-cache-dir install -r src/utils/requerimientos.txt
ENV PYTHONPATH=/CHATS
CMD ["python3", "-m", "ws_chats.app"]

