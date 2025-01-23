from flask_restful import Resource
from ws_chats.src.utils.general.logs import HandleLogs
from ws_chats.src.api.Components.list_chat_component import ChatListComponent
from ws_chats.src.utils.general.response import (
    response_error,response_success
)
class ChatUserService(Resource):
    @staticmethod
    def get(chat_id):
        try:
            HandleLogs.write_log("servicio de consulta Ejecutando")
            result_user = ChatListComponent.get_user_chat(chat_id)
            if result_user['result']:
                return response_success(result_user['data'])
            else:
                return response_error(result_user['message'])
        except Exception as err:
            HandleLogs.write_error(err)
            return response_error('error en el Servicio ->' + err.__str__())