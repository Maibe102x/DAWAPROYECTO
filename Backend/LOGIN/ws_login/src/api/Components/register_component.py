from ws_login.src.utils.general.logs import HandleLogs
from ws_login.src.utils.database.connection_db import DataBaseHandle
from ws_login.src.utils.general.response import internal_response

class RegisterComponent:
    @staticmethod
    def register(p_user, p_clave, p_email, p_image_url=None):
        try:
            data = None
            message = None
            result = False

            # Consulta SQL para insertar los datos del usuario, incluyendo la URL de la imagen
            sql = (
                "INSERT INTO public.tb_user (u_login, u_password, u_email, u_state, u_image_url) "
                "VALUES (%s, %s, %s, true, %s)"
            )

            # Si no se proporciona una URL de imagen, asignar un valor predeterminado
            if not p_image_url:
                p_image_url = "/default-avatar.png"  # Ruta predeterminada de la imagen

            record = (p_user, p_clave, p_email, p_image_url)
            register_result = DataBaseHandle.ExecuteNonQuery(sql, record)

            if register_result['result']:
                result = True
                message = 'Registro exitoso'
            else:
                HandleLogs.write_log('Error al ejecutar Register ->' + register_result['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            message = 'Error en el registro -> ' + err.__str__()
        finally:
            return internal_response(result, data, message)
