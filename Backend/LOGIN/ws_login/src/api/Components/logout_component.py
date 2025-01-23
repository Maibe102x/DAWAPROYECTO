from ws_login.src.utils.general.logs import HandleLogs
from ws_login.src.utils.general.response import internal_response
from ws_login.src.api.Components.jwt_component import JWTComponent

class LogoutComponent:
    @staticmethod
    def logout(token):
        try:
            data = None
            message = None
            result = JWTComponent.invalidate_token(token)

            if result:
                message = 'Logout exitoso'
            else:
                message = 'Error al cerrar sesión'

        except Exception as err:
            HandleLogs.write_error(err)
            message = 'Error en el logout -> ' + err.__str__()
        finally:
            return internal_response(result, data, message)
