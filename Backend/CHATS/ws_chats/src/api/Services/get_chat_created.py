from flask import request
from flask_restful import Resource
from ws_chats.src.api.Components.list_chat_component import ChatListComponent
from ws_chats.src.utils.general.logs import HandleLogs
from ws_chats.src.utils.general.response import response_error, response_success

class ChatCreated(Resource):
    @staticmethod
    def get(user_1, user_2):
        try:
            HandleLogs.write_log(f"Servicio para obtener chat creado entre {user_1} y {user_2}")

            # Crear el chat
            result_chat = ChatListComponent.get_chat(user_1, user_2)

            if result_chat['result']:
                return response_success(result_chat['data'])
            else:
                return response_error(result_chat['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('Error al obtener el chat -> ' + err.__str__())
