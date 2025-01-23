from ws_chats.src.utils.database.connection_db import DataBaseHandle
from ws_chats.src.utils.general.logs import HandleLogs
from ws_chats.src.utils.general.response import internal_response

class ChatListComponent:
    # muestra un chat en especifico basado en el nombre de un ususario y el id del chat

    # muestra la lista dechats de un ususario y el ultimo mensaje enviado
    @staticmethod
    def get_user_chats_list(user_1,user_2,sender_user):
        try:
            result = False
            data = None
            message = None

            sql = """
            SELECT DISTINCT ON (c.chat_id) 
                c.chat_id,
                c.user_2,
                c.user_1,
                m.message_content,
                TO_CHAR(m.message_timestamp, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS formatted_message_timestamp
            FROM 
                public.tb_chat c
            LEFT JOIN 
                public.tb_message m ON c.chat_id = m.chat_id
            WHERE 
                c.user_1 = %s OR c.user_2 = %s
            AND 
                c.chat_id IN (
                    SELECT chat_id 
                    FROM public.tb_message 
                    WHERE sender_id = %s
                )
            ORDER BY 
                c.chat_id, 
                m.message_timestamp DESC;
            """
            # Ejecutar la consulta
            record = (user_1,user_2,sender_user)
            result_chat = DataBaseHandle.getRecords(sql, 0,record)

            HandleLogs.write_log(f"Consulta SQL: {sql}, Parametros: {record}")

            if result_chat['result']:
                if len(result_chat['data']) > 0:
                    result = True
                    data = result_chat['data']
                else:
                    message = "No tienes mensajes."
            else:
                message = result_chat.get('message', 'Error desconocido al obtener los chats.')

        except Exception as err:
            HandleLogs.write_log("Error al obtener lista de chats: " + str(err))
            HandleLogs.write_error(err)
            message = 'Ocurrió un error al obtener la lista de chats: ' + err.__str__()

        finally:
            return internal_response(result, data, message)

    @staticmethod
    def get_user_chat(chat_id):
        try:
            result = False
            data = None
            message = None

            sql = """
            SELECT sender_id, message_content, 
                TO_CHAR(message_timestamp, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS message_timestamp
	        FROM public.tb_message
	        WHERE chat_id = %s 
            """
            record = (chat_id,)
            HandleLogs.write_log(f"Consulta SQL: {sql}, Parametros: {record}")
            result_user = DataBaseHandle.getRecords(sql, 0,record)

            if result_user['result']:
                result = True
                data = result_user['data']
            else:
                message = result_user['message']

        except Exception as err:
            HandleLogs.write_log("Error al Buscar usuarios " + str(err))
            HandleLogs.write_error(err)
            message = 'Ocurrio un Error al Buscar usuarios ' + err.__str__()
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def get_chat(user_1, user_2):
        try:
            result = False
            data = None  # Default to None (null equivalent in Python)
            message = None

            # SQL query to retrieve chat
            sql = """
                    SELECT chat_id
                    FROM public.tb_chat
                    WHERE (user_1 = %s AND user_2 = %s) OR (user_1 = %s AND user_2 = %s)
                """
            record = (user_1, user_2, user_2, user_1)
            HandleLogs.write_log(f"Consulta SQL: {sql}, Parametros: {record}")

            # Execute query
            result_user = DataBaseHandle.getRecords(sql, 1, record)

            # Check if query was successful and contains data
            if result_user['result'] and result_user['data']:
                result = True
                data = result_user['data']  # Assuming data contains 'chat_id'
            else:
                message = result_user.get('message', 'No chat found or error in query.')

            if not result:
                HandleLogs.write_log(f"Error: {message}")

        except Exception as err:
            HandleLogs.write_log("Error al obtener chat " + str(err))
            HandleLogs.write_error(err)
            message = 'Ocurrió un error al obtener el chat: ' + err.__str__()

        finally:
            # Return the response including a status code
            # If no chat is found, return None (null equivalent) for 'data'
            if not result:
                data = None  # Explicitly setting data to None if no chat is found
            return internal_response(result, data, message)
