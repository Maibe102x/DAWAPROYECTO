from flask_restful import Resource
from ws_publicaciones.src.api.Model.Request.like_post_request import LikeRequest
from ws_publicaciones.src.utils.general.logs import HandleLogs
from ws_publicaciones.src.api.Components.post_component import PostComponent
from ws_publicaciones.src.utils.general.response import (
    response_error,
    response_success,
    response_unauthorize,
)
class PostDeleteService(Resource):
    @staticmethod
    def delete(post_id):
        """
        Endpoint para eliminar una publicación.
        """
        try:
            # Verificar si el 'post_id' es válido
            like_request = LikeRequest()
            validated_data = like_request.load({'post_id': post_id})
            errors = like_request.validate({'post_id': post_id})

            if errors:
                return response_error(f"Error al validar el request -> {str(errors)}")

            # Eliminar la publicación
            result = PostComponent.delete_post(post_id)

            if result['result']:
                return response_success("Publicación eliminada exitosamente.")
            return response_error(result['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error(f"Error al procesar la solicitud: {str(err)}")