from flask import request
from flask_restful import Resource
from ws_login.src.api.Components.register_component import RegisterComponent
from ws_login.src.api.Model.Request.register_request import RegisterRequest
from ws_login.src.utils.general.logs import HandleLogs
from ws_login.src.utils.general.response import response_error, response_success

class RegisterService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Servicio de Registro ejecutando")
            rq_json = request.get_json()
            if not rq_json:
                return response_error("El cuerpo de la solicitud no contiene un JSON válido.")

            # Mapear los campos para que coincidan con los del esquema
            mapped_request = {
                "register_user": rq_json.get("p_user"),
                "register_password": rq_json.get("p_clave"),
                "register_email": rq_json.get("p_email"),
                "register_image": rq_json.get("p_image_url",None),
            }

            new_request = RegisterRequest()
            error_en_validacion = new_request.validate(mapped_request)
            if error_en_validacion:
                HandleLogs.write_log("Error al validar el request ->" + str(error_en_validacion))
                return response_error("Error al validar el request ->" + str(error_en_validacion))

            result_register = RegisterComponent.register(
                mapped_request["register_user"],
                mapped_request["register_password"],
                mapped_request["register_email"],
                mapped_request.get("register_image")
            )

            if result_register['result']:
                return response_success(result_register['message'])
            else:
                return response_error(result_register['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('Error en el registro -> ' + err.__str__())
