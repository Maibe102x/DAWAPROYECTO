from flask import request
from flask_restful import Resource
from ws_chats.src.api.Components.delete_message_component import DeleteMessageChat
from ws_chats.src.utils.general.response import response_success, response_error
from ws_chats.src.utils.general.logs import HandleLogs

class DeleteMessageService(Resource):
    @staticmethod
    def delete(message_id):
        try:
            HandleLogs.write_log(f"Servicio de Eliminación de Mensaje ejecutando para message_id {message_id}")

            rq_json = request.get_json()
            if not rq_json:
                return response_error("El cuerpo de la solicitud no contiene un JSON válido.")

            sender_user = rq_json.get("sender_user")
            token = rq_json.get("token")

            if not sender_user or not token:
                return response_error("Faltan parámetros obligatorios: sender_user o token.")

            # Llamar al componente de eliminación de mensajes
            result = DeleteMessageChat.delete_message(message_id, sender_user, token)

            if result['result']:
                return response_success(result['message'])
            else:
                return response_error(result['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error(f"Error al eliminar el mensaje: {err.__str__()}")
