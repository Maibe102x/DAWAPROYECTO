#eliminara a traves del token
from ws_chats.src.utils.general.logs import HandleLogs
from ws_chats.src.utils.database.connection_db import DataBaseHandle
from ws_chats.src.utils.general.response import internal_response
from ws_chats.src.api.Components.jwt_component import JWTComponent
from ws_chats.src.utils.general.config import Parametros

class DeleteMessageChat:
    @staticmethod
    def delete_message(message_id, sender_user, token):

        #Metodo para eliminar un mensaje de la base de datos si el token es válido.

        #:param message_id: ID del mensaje que se desea eliminar
        #:param sender_user: Usuario que envió el mensaje
        #:param token: Token JWT que valida la acción
        #:return: Resultado de la operación de eliminación

        try:
            # Validar el token
            if not JWTComponent.token_Validate(token):
                HandleLogs.write_log(f"Token inválido o expirado para el usuario {sender_user}")
                return {
                    "result": False,
                    "message": "Token inválido o expirado. No se puede eliminar el mensaje."
                }

            # Consulta para eliminar el mensaje
            sql = "DELETE FROM public.tb_message WHERE message_id = %s AND sender_id = %s"
            record = (message_id, sender_user)

            # Ejecutar la consulta de eliminación
            delete_result = DataBaseHandle.ExecuteNonQuery(sql, record)

            if delete_result['result']:
                HandleLogs.write_log(f"Mensaje {message_id} eliminado por el usuario {sender_user}")
                return {
                    "result": True,
                    "message": "El mensaje ha sido eliminado exitosamente."
                }
            else:
                HandleLogs.write_log(f"No se pudo eliminar el mensaje {message_id}. Error: {delete_result['message']}")
                return {
                    "result": False,
                    "message": f"No se pudo eliminar el mensaje. Detalles: {delete_result['message']}"
                }

        except Exception as err:
            HandleLogs.write_error(err)
            return {
                "result": False,
                "message": f"Ocurrió un error al intentar eliminar el mensaje: {err.__str__()}"
            }
