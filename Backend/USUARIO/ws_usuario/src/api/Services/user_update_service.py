from flask import request
from flask_restful import Resource
from ws_usuario.src.api.Components.user_component import UserComponent
from ws_usuario.src.api.Model.Request.user_update_request import UpdateUserRequest
from ws_usuario.src.utils.general.logs import HandleLogs
from ws_usuario.src.utils.general.response import response_error, response_success

class UpdateUserService(Resource):
    @staticmethod
    def put(user_id):
        try:
            rq_json = request.get_json()
            if not rq_json:
                return response_error("El cuerpo de la solicitud no contiene un JSON válido.")

            # Validar el JSON recibido
            update_request = UpdateUserRequest()
            validated_data, errors = update_request.load(rq_json), update_request.validate(rq_json)
            if errors:
                HandleLogs.write_log("Error al validar el request ->" + str(errors))
                return response_error("Error al validar el request ->" + str(errors))

            # Actualizar los datos del usuario
            update_result = UserComponent.update_user(user_id, validated_data)

            if update_result:
                return response_success("Usuario actualizado exitosamente.")
            return response_error("No se pudo actualizar el usuario.")

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error al actualizar el usuario.")
