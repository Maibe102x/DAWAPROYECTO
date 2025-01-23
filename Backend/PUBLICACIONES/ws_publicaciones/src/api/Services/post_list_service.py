from flask_restful import Resource
from ws_publicaciones.src.utils.general.logs import HandleLogs
from ws_publicaciones.src.api.Components.post_component import PostComponent
from ws_publicaciones.src.utils.general.response import (
    response_error,response_success
)
class PostListService(Resource):
    @staticmethod
    def get():
        try:
            HandleLogs.write_log("servicio de consulta Ejecutando")

            # llamo al metodo del componente
            result_user = PostComponent.get_all_post()
            if result_user['result']:
                return response_success(result_user['data'])
            else:
                return response_error(result_user['message'])
        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('error en el Servicio ->' + err.__str__())