from enum import nonmember
from ws_login.src.utils.general.logs import HandleLogs
from ws_login.src.utils.database.connection_db import DataBaseHandle
from ws_login.src.utils.general.response import internal_response
from ws_login.src.api.Components.jwt_component import JWTComponent

class LoginComponent:
    @staticmethod
    def login(p_user, p_clave):
        try:
            data = None
            message = None
            result = False

            sql = (
                """
                SELECT u_id, COUNT(*) AS valor
                FROM public.tb_user
                WHERE u_email = %s 
                  AND u_password = %s 
                  AND u_state = true
                GROUP BY u_id;
                """
            )

            record = (p_user, p_clave)
            login_result = DataBaseHandle.getRecords(sql, 1, record)

            # Debugging log
            HandleLogs.write_log(f"Login result: {login_result}")

            if login_result['result'] and login_result['data']:
                if 'valor' in login_result['data'] and login_result['data']['valor'] > 0:
                    token = JWTComponent.token_generate(p_user)
                    if token is not None:
                        user_id = login_result['data']['u_id']
                        result = True
                        message = 'LogIn Exitoso'
                        data = {'Token': token, 'user_id': user_id}
                    else:
                        message = 'Error al generar token'
                else:
                    message = 'Login Invalido'
            else:
                message = login_result.get('message', 'Error desconocido en la consulta')
                HandleLogs.write_log(f"Error al ejecutar Login: {message}")

        except Exception as err:
            HandleLogs.write_error(err)
            message = 'error en el login ->' + err.__str__()
        finally:
            return internal_response(result, data, message)




















