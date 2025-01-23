from flask import request
from flask_restful import Resource
from ws_chats.src.api.Model.Request.message_request import MessageCreateRequest
from ws_chats.src.utils.general.logs import HandleLogs
from ws_chats.src.utils.general.response import response_error, response_success
from ws_chats.src.api.Components.create_chat_component import RegisterChat

class MessageCreateService(Resource):
    @staticmethod
    def post(chat_id):
        try:
            HandleLogs.write_log("Servicio de Creación de Mensaje ejecutando")
            rq_json = request.get_json()

            if not rq_json:
                return response_error("El cuerpo de la solicitud no contiene un JSON válido.")

            # Validación de la solicitud mediante Marshmallow
            schema = MessageCreateRequest()
            errors = schema.validate(rq_json)
            if errors:
                HandleLogs.write_log("Error en la validación del request ->" + str(errors))
                return response_error("Error en la validación del request ->" + str(errors))

            # Extraer los datos de la solicitud
            sender_user = rq_json['sender_user']
            message_content = rq_json['message_content']

            # Crear el mensaje
            result_message = RegisterChat.create_message(sender_user, message_content, chat_id)

            if result_message['result']:
                message_data=result_message['data']
                return response_success({
                    "token": message_data.get("token"),
                    "sender_user": sender_user,
                    "message_content": message_content
                })
            else:
                return response_error(result_message['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('Error al crear el mensaje -> ' + err.__str__())
