from flask import request
from flask_restful import Resource
from ws_login.src.utils.general.logs import HandleLogs
from ws_login.src.utils.general.response import response_error, response_success
from ws_login.src.api.Components.jwt_component import JWTComponent

class LogoutService(Resource):
    @staticmethod
    def post():
        try:
            rq_json = request.get_json()
            if not rq_json or "token" not in rq_json:
                return response_error("No se proporcionó un token válido")

            p_token = rq_json["token"]
            response = JWTComponent.invalidate_token(p_token)

            if response["result"]:
                return response_success("Cierre de sesión exitoso")
            else:
                return response_error(response["message"])
        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Ocurrió un error inesperado al cerrar sesión")
