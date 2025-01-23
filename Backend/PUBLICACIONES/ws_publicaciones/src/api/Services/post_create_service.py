from flask import request
from flask_restful import Resource
from ws_publicaciones.src.api.Model.Request.create_post_request import PostRequest
from ws_publicaciones.src.utils.general.logs import HandleLogs
from ws_publicaciones.src.api.Components.post_component import PostComponent
from ws_publicaciones.src.utils.general.response import (
    response_error,
    response_success
)
class PostCreateService(Resource):
    @staticmethod
    def post():
        """
        Endpoint para crear una nueva publicación.
        """
        try:
            # Obtener el JSON de la solicitud
            rq_json = request.get_json()
            if not rq_json:
                return response_error("El cuerpo de la solicitud no contiene un JSON válido.")

                # Mapear los campos para que coincidan con los del esquema
            mapped_request = {
                "u_login": rq_json.get("u_login"),
                "post_content": rq_json.get("post_content"),
                "post_likes": rq_json.get("post_likes"),
                "post_image_url": rq_json.get("post_image_url", None),
            }
            # Validar los datos de la solicitud
            post_request = PostRequest()
            errors_en_validacion = post_request.validate(mapped_request)
            if errors_en_validacion:
                return response_error(f"Error al validar el request -> {str(errors_en_validacion)}")

            # Crear la publicación
            result_register = PostComponent.create_post(
                mapped_request["u_login"],
                mapped_request["post_content"],
                mapped_request["post_likes"],
                mapped_request.get("post_image_url")
            )
            if result_register['result']:
                return response_success(result_register['message'])
            else:
                return response_error(result_register['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('Error en el registro -> ' + err.__str__())

