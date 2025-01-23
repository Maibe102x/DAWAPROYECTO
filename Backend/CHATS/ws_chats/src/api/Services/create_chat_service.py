from flask import request
from flask_restful import Resource
from ws_chats.src.api.Components.create_chat_component import RegisterChat
from ws_chats.src.api.Model.Request.chat_create_request import ChatCreateRequest
from ws_chats.src.utils.general.logs import HandleLogs
from ws_chats.src.utils.general.response import response_error, response_success

class ChatCreateService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Servicio de Creación de Chat ejecutando")
            rq_json = request.get_json()

            if not rq_json:
                return response_error("El cuerpo de la solicitud no contiene un JSON válido.")

            # Validación de la solicitud mediante Marshmallow
            schema = ChatCreateRequest()
            errors = schema.validate(rq_json)
            if errors:
                HandleLogs.write_log("Error en la validación del request ->" + str(errors))
                return response_error("Error en la validación del request ->" + str(errors))

            # Extraer los datos de la solicitud
            user_1 = rq_json['user_1']
            user_2 = rq_json['user_2']

            # Crear el chat
            result_chat = RegisterChat.create_chat(user_1, user_2)

            if result_chat['result']:
                return response_success(result_chat['message'])
            else:
                return response_error(result_chat['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('Error al crear el chat -> ' + err.__str__())
