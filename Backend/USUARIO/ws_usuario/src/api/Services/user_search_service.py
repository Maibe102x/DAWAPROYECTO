from flask_restful import Resource
from flask import request
from ws_usuario.src.api.Components.user_component import UserComponent
from ws_usuario.src.utils.general.logs import HandleLogs
from ws_usuario.src.utils.general.response import response_error, response_success

class UserSearch(Resource):
    @staticmethod
    def get():
        try:
            HandleLogs.write_log("servicio de consulta de usuarios Ejecutando")

            query = request.args.get('q', '')  # Obtener el término de búsqueda
            # Simular búsqueda en la base de datos (ajusta según tu ORM o consulta)
            result_users = UserComponent.search_users_by_name(query)  # Implementa esta función en tu componente
            if result_users['result']:
                return response_success(result_users['data'])
            else:
                return response_error(result_users['message'])
        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('error en el Servicio ->' + err.__str__())
