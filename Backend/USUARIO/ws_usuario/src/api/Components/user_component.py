from ws_usuario.src.utils.database.connection_db import DataBaseHandle
from ws_usuario.src.utils.general.logs import HandleLogs
from ws_usuario.src.utils.general.response import internal_response
class UserComponent:
    @staticmethod
    def get_user_by_id(user_id):
        try:
            sql = """
                    SELECT u_login, u_password, u_email, u_image_url,
                         TO_CHAR(u_updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS u_updated_at
                    FROM public.tb_user
                    WHERE u_id = %s
                """
            record = (user_id,)
            return DataBaseHandle.getRecords(sql, 1, record)
        except Exception as err:
            HandleLogs.write_error(err)
            return None

    @staticmethod
    def get_user_by_username(username):
        try:
            sql = """
                        SELECT u_id, u_login, u_email, u_image_url
                        FROM public.tb_user
                        WHERE u_login = %s
                    """
            record = (username,)
            return DataBaseHandle.getRecords(sql, 1, record)
        except Exception as err:
            HandleLogs.write_error(err)
            return None

    @staticmethod
    def search_users_by_name(query):
        try:
            sql = """
                    SELECT u_id, u_login, u_email, u_image_url
                    FROM public.tb_user
                    WHERE u_login ILIKE %s
                """
            # Usamos '%' para realizar una búsqueda parcial
            record = (query + '%',)
            return DataBaseHandle.getRecords(sql, 0, record)  # None para obtener múltiples resultados
        except Exception as err:
            HandleLogs.write_error(err)
            return None

    @staticmethod
    def update_user(user_id, updates):
        try:
            # Construir la parte dinámica de la sentencia UPDATE
            sql = "UPDATE public.tb_user SET {} WHERE u_id = %s RETURNING *".format(
                ", ".join([f"{key} = %s" for key in updates.keys()])
            )

            # Los valores son los que se actualizarán y el ID del usuario
            values = tuple(updates.values()) + (user_id,)

            # Ejecutar la sentencia de actualización
            result = DataBaseHandle.ExecuteNonQuery(sql, values)

            # Verificar si la actualización fue exitosa
            if result["result"]:
                return {"result": True, "message": "Usuario actualizado exitosamente."}
            else:
                return {"result": False, "message": "No se pudo actualizar el usuario."}

        except Exception as err:
            # Registrar el error en los logs
            HandleLogs.write_error(err)
            return {"result": False, "message": "Error al actualizar el usuario.", "data": str(err)}

    @staticmethod
    def update_photo(user_id, photo_url):
        try:
            sql = "UPDATE public.tb_user SET u_image_url = %s WHERE u_id = %s"
            record = (photo_url, user_id)
            return DataBaseHandle.ExecuteNonQuery(sql, record)
        except Exception as err:
            HandleLogs.write_error(err)
            return False