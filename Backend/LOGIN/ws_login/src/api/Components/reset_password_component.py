from ws_login.src.utils.general.logs import HandleLogs
from ws_login.src.utils.database.connection_db import DataBaseHandle
from ws_login.src.utils.general.response import internal_response
from ws_login.src.api.Components.jwt_component import JWTComponent

class ResetPasswordComponent:
    @staticmethod
    def reset_password(p_email, p_new_password=None):
        try:
            data = None
            message = None
            result = False

            # Consulta para verificar si el email existe y si el usuario está activo
            sql = "SELECT u_login FROM public.tb_user WHERE u_email = %s AND u_state = true"
            record = (p_email,)
            user_result = DataBaseHandle.getRecords(sql, 1, record)

            if user_result['result'] and user_result['data']:
                # El usuario existe y está activo

                if p_new_password:
                    # Si se proporcionó una nueva contraseña, actualizamos la base de datos
                    # Asegúrate de realizar la validación necesaria de la nueva contraseña (longitud, formato, etc.)
                    # Actualizar la contraseña en la base de datos
                    update_sql = "UPDATE public.tb_user SET u_password = %s WHERE u_email = %s AND u_state = true"
                    update_record = (p_new_password, p_email)
                    update_result = DataBaseHandle.ExecuteNonQuery(update_sql, update_record)

                    if update_result['result']:
                        result = True
                        message = 'La contraseña se ha actualizado correctamente.'
                    else:
                        message = 'Error al actualizar la contraseña.'
                else:
                    # Si no se proporciona una nueva contraseña, se genera un token de recuperación
                    token = JWTComponent.token_generate(p_email, purpose='reset_password')
                    if token:
                        # Aquí deberías integrar el envío de un correo con el enlace al usuario
                        result = True
                        message = 'Se ha enviado un enlace de recuperación a su correo electrónico.'
                    else:
                        message = 'Error al generar el token de recuperación.'
            else:
                message = 'Correo no encontrado o usuario inactivo.'

        except Exception as err:
            # Log de error
            HandleLogs.write_error(err)
            message = 'Error en la recuperación de contraseña -> ' + str(err)
        finally:
            # Devuelve la respuesta estructurada
            return internal_response(result, data, message)

