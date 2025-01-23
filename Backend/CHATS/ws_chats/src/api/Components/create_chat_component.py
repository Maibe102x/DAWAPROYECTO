#send message (token - servicio)
#create chat ...chatting as well
from ws_chats.src.utils.general.logs import HandleLogs
from ws_chats.src.utils.database.connection_db import DataBaseHandle
from ws_chats.src.utils.general.response import internal_response
from ws_chats.src.api.Components.jwt_component import JWTComponent

class RegisterChat:
    @staticmethod
    def create_chat(user_1, user_2):
        try:
            data = None
            message = None
            result = False

            # Consulta SQL para crear chat
            sql_chat = (""" INSERT INTO public.tb_chat (user_1, user_2)
                        VALUES (%s,%s)
                        RETURNING chat_id;"""
            )

            record = (user_1, user_2)
            chat_id = DataBaseHandle.ExecuteNonQuery(sql_chat, record)

            if chat_id['result']:
                result = True
                message = 'Se ha creado una sala de chat'
            else:
                HandleLogs.write_log('Error al crear una sala de chat ->' + chat_id['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            message = 'Error en el registro -> ' + err.__str__()
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def create_message(sender_user,message_content,chat_id):
        try:
            data = None
            message = None
            result = False
            token = JWTComponent.token_generate(sender_user)

            if not token:
                return {
                    "result": False,
                    "message": "Error al generar el token para el mensaje.",
                }

            sql_message = (""" INSERT INTO public.tb_message (chat_id, sender_id, message_content)
                            VALUES (%s, %s, %s)
                            RETURNING message_id;"""
                           )
            record = (chat_id, sender_user, message_content)
            register_result = DataBaseHandle.ExecuteNonQuery(sql_message, record)
            HandleLogs.write_log(f"Token generado para {sender_user}: {token}")
            if register_result:
                result = True
                message = 'Mensaje enviado con éxito'
                data = {
                    "message_id": register_result,
                    "token": token
                }
            else:
                HandleLogs.write_log('Error al generar mensaje ->' + register_result['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            message = 'Error en el registro -> ' + err.__str__()
        finally:
            return internal_response(result, data, message)
