from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from ws_publicaciones.src.utils.general.logs import HandleLogs
from ws_publicaciones.src.api.Components.post_component import PostComponent
from ws_publicaciones.src.utils.general.response import response_error, response_success
from ws_publicaciones.src.api.Model.Request.like_post_request import LikeRequest


class PostLikeService(Resource):
    def put(self):
        """
        Endpoint para dar like a una publicación.
        """
        try:
            # Obtener datos del cuerpo de la solicitud
            request_data = request.get_json()

            # Validar datos con el esquema
            schema = LikeRequest()
            validated_data = schema.load(request_data)

            # Obtener el post_id validado
            post_id = validated_data['post_id']

            # Intentar dar like a la publicación
            result = PostComponent.like_post(post_id)

            # Verificar resultado
            if result:
                return response_success("Like agregado correctamente.")
            return response_error("No se pudo agregar el like. Verifique el post_id.")

        except ValidationError as ve:
            # Capturar errores de validación
            HandleLogs.write_error(ve)
            return response_error(f"Error al validar el request: {ve.messages}")
        except Exception as err:
            # Capturar errores generales
            HandleLogs.write_error(err)
            return response_error(f"Error al procesar la solicitud: {str(err)}")
