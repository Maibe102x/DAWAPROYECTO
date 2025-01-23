from flask import request
from flask_restful import Resource
from ws_publicaciones.src.api.Model.Request.update_post_request import UpdatePostRequest
from ws_publicaciones.src.utils.general.logs import HandleLogs
from ws_publicaciones.src.api.Components.post_component import PostComponent
from ws_publicaciones.src.utils.general.response import (
    response_error,
    response_success,
    response_unauthorize,
)
class PostUpdateService(Resource):
    @staticmethod
    def put(post_id):
        """
        Endpoint para actualizar una publicación existente.
        """
        try:
            # Obtener el JSON de la solicitud
            rq_json = request.get_json()
            if not rq_json:
                return response_error("El cuerpo de la solicitud no contiene un JSON válido.")

            # Validar los datos de la solicitud con una clase específica para actualizaciones
            update_request = UpdatePostRequest()
            validated_data = update_request.load(rq_json)

            errors = update_request.validate(rq_json)
            if errors:
                return response_error(f"Error al validar el request -> {str(errors)}")

            # Verificar que se hayan proporcionado 'author_name'
            u_login = validated_data.get('u_login')
            # Asegúrate de incluir este campo en la validación
            if not u_login:
                return response_error("Los campos 'post_id' y 'author_name' son obligatorios para actualizar la publicación.")

            # Actualizar la publicación
            post_content = validated_data.get('post_content')
            post_image_url = validated_data.get('post_image_url')
            result = PostComponent.update_post_by_author_and_id(u_login, post_id, post_content, post_image_url)

            if result:
                return response_success("Publicación actualizada exitosamente.")
            return response_error(f"No se pudo actualizar la publicación. Verifica que el 'post_id' pertenece al autor '{author_name}'.")

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error(f"Error al procesar la solicitud: {str(err)}")
