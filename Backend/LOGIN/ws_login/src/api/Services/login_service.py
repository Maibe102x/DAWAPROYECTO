from flask import request
from flask_restful import Resource
from ws_login.src.api.Components.login_component import LoginComponent
from ws_login.src.api.Model.Request.login_request import LoginRequest
from ws_login.src.utils.general.logs import HandleLogs
from ws_login.src.utils.general.response import response_error, response_success

class LoginService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("servicio de Login Ejecutando")
            # Obtener el request
            rq_json = request.get_json()
            if not rq_json:
                return response_error("El cuerpo de la solicitud no contiene un JSON válido.")

            # Validar q el request sea compatible con el modelo
            new_request = LoginRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_log("Error al validar el request ->" + str(error_en_validacion))
                return response_error("Error al validar el request ->" + str(error_en_validacion))

            # Verificar si las claves necesarias están en el JSON
            if 'login_user' not in rq_json or 'login_password' not in rq_json:
                return response_error("Faltan campos requeridos: 'login_user' o 'login_password'.")

            # llamo al metodo del componente
            result_login = LoginComponent.login(rq_json['login_user'], rq_json['login_password'])

            # Devolver la respuesta basada en el status_code
            return result_login, result_login['status_code']

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('error en el login ->' + err.__str__())
















