from flask import request
from flask_restful import Resource
from ws_login.src.api.Components.reset_password_component import ResetPasswordComponent
from ws_login.src.utils.general.logs import HandleLogs
from ws_login.src.utils.general.response import response_error, response_success

class ResetPasswordService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Servicio de Reset Password Ejecutando")

            # Obtener JSON del cuerpo de la solicitud
            rq_json = request.get_json()
            if not rq_json:
                return response_error("El cuerpo de la solicitud no contiene un JSON válido.")

            # Validar campos requeridos
            if 'reset_email' not in rq_json or 'reset_new_password' not in rq_json:
                return response_error("Faltan campos requeridos: 'reset_email' o 'reset_new_password'.")

            reset_email = rq_json['reset_email']
            reset_new_password = rq_json['reset_new_password']

            # Llamar al componente ResetPasswordComponent
            result_reset = ResetPasswordComponent.reset_password(reset_email, reset_new_password)

            # Retornar el resultado de la operación
            if result_reset['result']:
                return response_success(result_reset['message'])
            else:
                return response_error(result_reset['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('Error en el reset password -> ' + str(err))
